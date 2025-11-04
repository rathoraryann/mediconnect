import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const MyAppointments = () => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.token);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      getAppointments();
      if (data.success) {
        toast.success(`${data.message}`);
      } else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async(response) =>{
        console.log(response)
        try {
          const {data} = await axios.post(`${backendUrl}api/user/verify-razorpay`, response, {headers: {token}})
          if (data.success) {
            getAppointments();
            navigate('/my-appointments')
          }
        } catch (error) {
          toast.error(`${error.message}`);
        }
      }
    };
    const rzp = new window.Razorpay(options)
    rzp.open()
  };


  const appointmentRazorpay = async function (appointmentId) {
    try {
      const { data } = await axios.post(
        `${backendUrl}api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {}
  };

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments.map((item, idx) => {
          return (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={idx}
            >
              <div>
                <img className="w-32" src={item.docData.image} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.docData.name}
                </p>
                <p className="text-neutral-800 font-medium mt-1">
                  {item.docData.speciality}
                </p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData.address}</p>
                <p className="text-xs mt-1">
                  <span>Date & Time :</span>
                  {" " + item.slotDate} | {item.slotTime}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col justify-end gap-2">
              {!item.cancelled && item.payment && !item.isCompleted && <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">Paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                    onClick={() => appointmentRazorpay(item._id)}
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={(e) => {
                      cancelAppointment(item._id);
                    }}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-rose-600 hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && !item.isCompleted &&(
                  <button className="sm:min-w-48 py-2 bg-red-100 text-red-500">
                    Appointment cancelled
                  </button>
                )}
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
