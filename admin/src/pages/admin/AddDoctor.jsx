import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const token = useSelector((state) => state.admin.token);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [value, setValue] = useState({
    docImg: false,
    name: "",
    email: "",
    password: "",
    experience: "1 Year",
    fees: "",
    about: "",
    speciality: "General Physician",
    degree: "",
    address: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!value.docImg) {
        return toast.error("Image not selected");
      }
      const formData = new FormData();
      formData.append("image", value.docImg);
      formData.append("name", value.name);
      formData.append("email", value.email);
      formData.append("password", value.password);
      formData.append("experience", value.experience);
      formData.append("fees", value.fees);
      formData.append("about", value.about);
      formData.append("speciality", value.speciality);
      formData.append("degree", value.degree);
      formData.append("address", value.address);
      const { data } = await axios.post(
        `${backendUrl}api/admin/add-doctor`,
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(`${data.message}`);
        setValue({
          docImg: false,
          name: "",
          email: "",
          password: "",
          experience: "1 Year",
          fees: "",
          about: "",
          speciality: "General Physician",
          degree: "",
          address: "",
        });
      } else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
      toast.error(`${error.message}`)
    }
  };

  return (
    <form onSubmit={submitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={
                value.docImg
                  ? URL.createObjectURL(value.docImg)
                  : assets.upload_area
              }
              alt=""
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setValue({ ...value, docImg: e.target.files[0] })}
          />
          <p>
            Upload doctor <br />
            picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                onChange={(e) => setValue({ ...value, name: e.target.value })}
                placeholder="Name"
                value={value.name}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor email</p>
              <input
                onChange={(e) => setValue({ ...value, email: e.target.value })}
                value={value.email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                className="border rounded px-3 py-2"
                type="password"
                value={value.password}
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
                placeholder="Password"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                value={value.experience}
                onChange={(e) =>
                  setValue({ ...value, experience: e.target.value })
                }
                name=""
                id="experience"
                className="border rounded px-3 py-2"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                value={value.fees}
                onChange={(e) => setValue({ ...value, fees: e.target.value })}
                className="border rounded px-3 py-2"
                type="Number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                value={value.speciality}
                onChange={(e) =>
                  setValue({ ...value, speciality: e.target.value })
                }
                name=""
                id="speciality"
                className="border rounded px-3 py-2"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                value={value.degree}
                onChange={(e) => setValue({ ...value, degree: e.target.value })}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                value={value.address}
                onChange={(e) =>
                  setValue({ ...value, address: e.target.value })
                }
                placeholder="Address"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            value={value.about}
            onChange={(e) => setValue({ ...value, about: e.target.value })}
            type="text"
            placeholder="Write about Doctor"
            rows={5}
            required
            className="w-full px-4 pt-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 text-white rounded-full"
        >
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
