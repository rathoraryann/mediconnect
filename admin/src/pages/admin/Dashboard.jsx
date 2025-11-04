import React, { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDashboard } from "../../store/slices/DashboardSlice";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const dispatch = useDispatch();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = useSelector((state) => state.admin.token);
  const dashData = useSelector((state) => state.dashboard);
  console.log(dashData);

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}api/admin/dashboard`, {
        headers: { token },
      });
      if (data.success) {
        dispatch(setDashboard({ data: data.dashData }));
      } else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
      toast.error(`${data.message}`);
    }
  };

  useEffect(() => {
    getDashData();
  }, []);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:transition-all">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:transition-all">
            <img src={assets.doctor_icon} alt="" className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
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
                    src={item.docData.image}
                    alt=""
                    className="rounded-full w-10"
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {item.docData.name}
                    </p>
                    <p className="text-gray-600">{item.slotDate}</p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
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
      </div>
    )
  );
};

export default Dashboard;
