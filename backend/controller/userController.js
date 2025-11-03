import validator from "validator";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.json({ success: false, message: "user exist with the email" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ success: false, message: "fill the fiels" });
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {}
};

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imgFile = req.file;
    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data missing" });
    }
    if (imgFile) {
      const imageUpload = await cloudinary.uploader.upload(imgFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    const user = await userModel.findByIdAndUpdate(
      userId,
      { name, phone, address, dob, gender },
      { new: true }
    );
    res.json({ success: true, message: "Profile updated", user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ seccess: false, message: "Doctor not available" });
    }

    // let slots_booked = docData.slots_booked;
    // if (slots_booked) {
    //   if (slots_booked[slotDate].includes(slotTime)) {
    //     return res.json({ success: false, message: "Slot not available" });
    //   } else {
    //     slots_booked[slotDate].push(slotTime);
    //   }
    // } else {
    //   slots_booked[slotDate] = [];
    //   slots_booked[slotDate].push(slotTime);
    // }

    let slots_booked = docData.slots_booked || {};
    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = [];
    }
    if (slots_booked[slotDate].includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    } else {
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };
    const newAppointment = await appointmentModel.create(appointmentData);
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slotsBooked = doctorData.slots_booked;
    slotsBooked[slotDate] = slotsBooked[slotDate].filter((e) => e !== slotTime);
    await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });
    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found",
      });
    }
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };
    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async(req, res)=>{
  try {
    const {razorpay_order_id} = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if (orderInfo.status == 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment: true})
      res.json({success: true, message: "Payment Successful"})
    }else {
      res.json({success: false, message: "Payment failed"})
    }
  } catch (error) {
    res.json({success: false, message: "Payment failed"})    
  }
}

export {
  registerUser,
  loginUser,
  updateProfile,
  getProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay
};
