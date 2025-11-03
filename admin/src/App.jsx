import React from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddDoctor from "./pages/admin/AddDoctor";
import AllAppointments from "./pages/admin/AllAppointments";
import Dashboard from "./pages/admin/Dashboard";
import DoctorsList from "./pages/admin/DoctorsList";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorProfile from "./pages/doctor/DoctorProfile";

const App = () => {
  const aToken = useSelector((state) => state.admin.token);
  const dToken = useSelector((state) => state.value.dToken);
  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}

          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctors-list" element={<DoctorsList />} />

          {/* Doctor Routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
