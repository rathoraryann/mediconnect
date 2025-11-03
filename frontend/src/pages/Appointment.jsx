import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { data, useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = ({getDoctors}) => {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();
  const { docId } = useParams();
  const doctors = useSelector((state) => state.doctors.doctors);
  const [doctorInformation, setDoctorInformation] = useState();
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const token = useSelector((state) => state.user.token);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchDoctorInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id == docId);
    setDoctorInformation(docInfo);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to Book Appointment')
      return navigate('/login')
    }
    try {
      const date = doctorSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()

      const slotDate = day+"-"+month+'-'+year

      const {data} = await axios.post(backendUrl+'/api/user/book-appointment',{docId, slotDate, slotTime}, {headers: {token}})
      if (data.success) {
        toast.success(`${data.message}`)
        getDoctors()
        navigate('/my-appointments')
      }else{
        toast.error(`${data.message}`)
      }

    } catch (error) {
      toast.error(`${error.message}`)
    }
  }

  const getAvailSlots = async () => {
    setDoctorSlots([]);
    // getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedDate = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedDate,
        });
        // increment current time by 30 minuts
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDoctorSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDoctorInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailSlots();
  }, [doctorInformation]);

  return (
    doctorInformation && (
      <div>
        {/* ----------doctors detail--------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              src={doctorInformation.image}
              alt=""
              className="bg-primary w-full sm:max-w-72 rounded-lg"
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white ms-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* doc info - name, degree.... */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {doctorInformation.name}
              <img src={assets.verified_icon} alt="" className="w-5" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {doctorInformation.degree} - {doctorInformation.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {doctorInformation.experience}
              </button>
            </div>
            {/* doc about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {doctorInformation.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee : <span className="text-gray-600">₹1750</span>
            </p>
          </div>
        </div>
        {/* booking slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {doctorSlots &&
              doctorSlots.map((item, index) => {
                return (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      slotIndex == index
                        ? "bg-primary text-white"
                        : "border border-gray-200"
                    }`}
                    key={index}
                  >
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {doctorSlots.length &&
              doctorSlots[slotIndex].map((item, index) => {
                return (
                  <p
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                      item.time == slotTime
                        ? "bg-primary text-white"
                        : "text-gray-400 border border-gray-300"
                    }`}
                    key={index}
                  >
                    {item.time.toLowerCase()}
                  </p>
                );
              })}
          </div>
          <button onClick={()=>{bookAppointment()}} className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">
            Book an Appointment
          </button>
        </div>
        {/* related doctors */}
        <RelatedDoctors
          docId={docId}
          speciality={doctorInformation.speciality}
        />
      </div>
    )
  );
};

export default Appointment;
