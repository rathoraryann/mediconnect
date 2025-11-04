import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { assets } from "../assets/assets";
import axios from "axios";
import {toast} from 'react-toastify'
import { setUser } from "../store/slices/userSlice";

const MyProfile = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state=>state.user.user)
  const token = useSelector(state=>state.user.token)
  const [formData, setFormData] = useState()
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState()
  const backendUrl = import.meta.env.VITE_BACKEND_URL


  const updateProfile = async() =>{
    try {
      const newForm = new FormData()
      newForm.append('name', formData.name)
      newForm.append('phone', formData.phone)
      newForm.append('address', formData.address)
      newForm.append('gender', formData.gender)
      newForm.append('dob', formData.dob)

      image && newForm.append('image', image)
      const {data} = await axios.post(backendUrl+'api/user/update-profile', newForm, {headers: {token}})
      if (data.success) {
        toast.success(`${data.message}`)
        dispatch(setUser({data: data.user}))
        setFormData(data.user)
        setIsEdit(false)
        setImage(null)
      }else{
        toast.error(`${data.message}`)
      }
    } catch (error) {
      toast.error(`${error.message}`)
    }
  }

  useEffect(()=>{
    if (userData) {
      setFormData(userData)
    }
  }, [userData])
    
  return formData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">

      {
        isEdit ? 
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img src={image ? URL.createObjectURL(image) : formData.image} alt="" className="w-36 rounded opacity-75"/>
            <img src={image ? null : assets.upload_icon} alt="" className="w-10 absolute bottom-12 right-12"/>
          </div>
          <input type="file" id="image" hidden onChange={(e)=>{setImage(e.target.files[0])}}/>
        </label> : 
        <img src={formData.image} alt="" className="w-36 rounded"/>
      }

      {isEdit ? (
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>{
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          }
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{formData.name}</p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none"/>
      <div>
        <p className="text-neutral-500 underline mt-3">Contact Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
           <p className="font-medium">Email: </p>          
            <p>{formData.email}</p>
          <p className="font-medium">Phone No:</p>
          {isEdit ? (
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="bg-gray-100 max-w-52"
            />
          ) : (
            <p>{formData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                  address: e.target.value,
                  }))
                }
                className="bg-gray-50"
              />
              <br />
            </p>
          ) : (
            <p className="text-gray-500">
              {formData.address} 
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit?
          <select className="max-w-20 bg-gray-100" value={formData.gender || ""} name="" id="" required onChange={(e)=>setFormData(prev=>({...prev, gender : e.target.value}))}>
            <option value="Male" >Male</option>
            <option value="Female">Female</option>
          </select>
          :
          <p className="text-gray-400">
            {formData.gender}
          </p>
          }
          <p className="font-medium">DOB:</p>
          {isEdit?
          <input className="max-w-28 bg-gray-100" type="date" value={formData.dob} onChange={(e)=>setFormData(prev=>({...prev, dob: e.target.value}))} />
          :
          <p className="text-gray-400">
            {formData.dob}
          </p>
          }
        </div>
      </div>
      <div className="mt-10">
        {isEdit?
        <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={()=>updateProfile()}>Save</button>
        :
        <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  );
};

export default MyProfile;
