import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAppointments } from "../../store/slices/appointmentsSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { calculateAge } from "../../utils";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const currency = "₹";
  const appointments = useSelector((state) => state.appointment.appointments);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = useSelector((state) => state.admin.token);
  const dispatch = useDispatch();

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}api/admin/appointments`, {
        headers: { token },
      });
      if (data.success) {
        dispatch(setAppointments({ data: data.appointments }));
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}api/admin/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        getAllAppointments();
        toast.success(`${data.message}`);
      } else {
        toast.error(`${data.error}`);
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, [token]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">all appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh]  overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments &&
          appointments.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    src={item.userData.image}
                    alt=""
                    className="w-8 rounded-full"
                  />{" "}
                  <p>{item.userData.name}</p>
                </div>
                {(item.userData.dob != "Not Selected") ? (
                  <p className="max-sm:hidden">
                    {calculateAge(item.userData.dob)}
                  </p>
                ) : (
                  <p>-</p>
                )}
                <p>
                  {item.slotDate}, {item.slotTime}
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src={item.docData.image}
                    alt=""
                    className="w-8 rounded-full bg-gray-200"
                  />{" "}
                  <p>{item.docData.name}</p>
                </div>
                <p>
                  {currency}
                  {item.amount}
                </p>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">Completed</p>
                ) : (
                  <img
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                    onClick={() => cancelAppointment(item._id)}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllAppointments;
