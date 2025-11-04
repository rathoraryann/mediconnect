import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setDoctorDashboard, setAppointmentsForDoctor } from "../../store/slices/valueSlice";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const currency = "₹";
  const dispatch = useDispatch();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const dToken = useSelector((state) => state.value.dToken);
  const dashData = useSelector((state) => state.value.doctorDashboard);
  const appointments = useSelector((state)=>state.value.appointmentsForDoctor)

  const getDashboardData = async () => {
    console.log('getDashData')
    try {
      const { data } = await axios.get(`${backendUrl}api/doctor/dashboard`, {
        headers: { token: dToken },
      });
      if (data.success) {
        dispatch(setDoctorDashboard({ data: data.dashData }));
      } else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  console.log(dashData)
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}api/doctor/appointments`,
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
        `${backendUrl}api/doctor/cancel-appointment`,
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
        `${backendUrl}api/doctor/complete-appointment`,
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
    if (dToken) {
      getDashboardData();
    }
  }, [dToken, appointments]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:transition-all">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:transition-all">
            <img src={assets.earning_icon} alt="" className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency} {dashData.earnings}
              </p>
              <p className="text-gray-400">Earning</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:transition-all">
            <img src={assets.appointments_icon} alt="" className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:transition-all">
            <img src={assets.patients_icon} alt="" className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p>Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                >
                  <img
                    src={item.userData.image}
                    alt=""
                    className="rounded-full w-10"
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {item.userData.name}
                    </p>
                    <p className="text-gray-600">{item.slotDate}</p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-sm font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-sm font-medium">
                      Completed
                    </p>
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
      </div>
    )
  );
};

export default DoctorDashboard;
