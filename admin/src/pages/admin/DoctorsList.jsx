import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setDoctorAvailability, setDoctors } from "../../store/slices/doctorSlice";
import {toast} from 'react-toastify'

const DoctorsList = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors);
  const token = useSelector((state) => state.admin.token);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}api/admin/all-doctors`, {
        headers: { token },
      });
      dispatch(setDoctors({ data: data.doctors }));
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const changeAvailabilityHandler = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}api/admin/change-availability`, {docId},
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message)
        dispatch(setDoctorAvailability({docId : docId}))
      }
    } catch (error) {
      toast.error(`${error.message}`)
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll ">
      <h1 className="text-lg font-medium">Add Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 mt-5 gap-y-6">
        {doctors.doctors &&
          doctors.doctors.map((item, index) => {
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group transition-all duration-500"
              >
                <img src={item.image} alt="" className="bg-gray-50" />
                <div className="p-4">
                  <p className="text-neutral-800 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-zinc-600 text-sm">{item.speciality}</p>
                </div>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={(e) => changeAvailabilityHandler(item._id)}
                  />
                  <p>Available</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DoctorsList;
