import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const Doctors = () => {
  const navigate = useNavigate();
  const doctors = useSelector((state) => state.doctors.doctors);
  const {speciality} = useParams();
  const [filterDoctor, setFilterDoctor] = useState([]);
  const [showFilter, setShowFilter] = useState(false)

  const applyfilter = () =>{
    if(speciality){
      setFilterDoctor(doctors.filter(doct => doct.speciality  == speciality))
      if (speciality == "General-physician") {
        setFilterDoctor(doctors.filter(doct => doct.speciality == "General Physician"))
      }
    }else{
      setFilterDoctor(doctors)
    }
  }


  useEffect(()=>{
    applyfilter();
  }, [doctors, speciality])

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button onClick={()=>setShowFilter(prev => !prev)} className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter? 'bg-primary text-white' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={()=> speciality == 'General physician' ? navigate('/doctors') : navigate('/doctors/General-physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality=="General physician" ? "bg-gray-100 text-black " : ""}`}>General Physician</p>
          <p onClick={()=> speciality == 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto py-1.5 pl-3 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality=="Gynecologist"?"bg-gray-100 text-black " : ""}`}>Gynecologist</p>
          <p onClick={()=> speciality == 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto py-1.5 pl-3 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality=="Dermatologist"?"bg-gray-100 text-black " : ""}`}>Dermatologist</p>
          <p onClick={()=> speciality == 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto py-1.5 pl-3 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality=="Pediatricians"?"bg-gray-100 text-black " : ""}`}>Pediatricians</p>
          <p onClick={()=> speciality == 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto py-1.5 pl-3 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality=="Neurologist"?"bg-gray-100 text-black " : ""}`}>Neurologist</p>
          <p onClick={()=> speciality == 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto py-1.5 pl-3 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality=="Gastroenterologist"?"bg-gray-100 text-black " : ""}`}>Gastroenterologist</p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoctor &&  filterDoctor.map((item, index) => {
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                }}
              >
                <img src={item.image} alt="" className="bg-gray-900" />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center">
                  <p className={`w-2 h-2 rounded-full ${item.available? ' bg-green-500' : 'bg-red-700'}`}></p>
                  <p className={` ${item.available? ' text-green-500' : 'text-red-700'}`}>{item.available? 'Available' : 'Unavailable'}</p>
                </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
