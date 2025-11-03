import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAppointmentsForDoctor } from "../../store/slices/valueSlice";
import { assets } from "../../assets/assets";
import { calculateAge } from "../../utils";

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const dToken = useSelector((state) => state.value.dToken);
  const currency = "₹";
  const appointments = useSelector(
    (state) => state.value.appointmentsForDoctor
  );

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        { headers: { token: dToken } }
      );
      if (data.success) {
        dispatch(
          setAppointmentsForDoctor({ data: data.appointments.reverse() })
        );
      } else {
        toast.error("unable to show appointments");
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { token: dToken } }
      );
      if (data.success) {
        getAppointments();
        toast.success(`${data.message}`);
      } else {
        toast.success(`${data.message}`);
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { token: dToken } }
      );
      if (data.success) {
        getAppointments();
        toast.success(`${data.message}`);
      } else {
        toast.success(`${data.message}`);
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  useEffect(() => {
    getAppointments();
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll ">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments &&
          appointments.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    src={item.userData.image}
                    alt=""
                    className="w-8 rounded-full"
                  />
                  <p>{item.userData.name}</p>
                </div>
                <div>
                  <p className="text-xs inline border border-primary px-2 rounded-full">
                    {item.payment ? "Online" : "CASH"}
                  </p>
                </div>
                {item.userData.dob instanceof Date ? (
                  <p className="max-sm:hidden">
                    {calculateAge(item.userData.dob)}
                  </p>
                ) : (
                  <p className="max-sm:hidden">-</p>
                )}
                <p>
                  {item.slotDate}, {item.slotTime}
                </p>
                <p>
                  {currency}
                  {item.amount}
                </p>
                {item.cancelled ? (
                  <p className="text-red-400 text-sm font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-sm font-medium">Completed</p>
                ) : (
                  <div className="flex">
                    <img
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                      onClick={() => cancelAppointment(item._id)}
                    />
                    <img
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt=""
                      onClick={() => completeAppointment(item._id)}
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DoctorAppointments;
