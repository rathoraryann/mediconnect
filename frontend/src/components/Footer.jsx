import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        {/* -----------left----------- */}
        <div>
          <h1 className="md:text-3xl text-2xl font-semibold leading-tight cursor-pointer mb-2">
            MediConnect
          </h1>
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Your trusted platform for instant doctor consultations. Connect with
            certified healthcare professionals anytime, anywhere. Book
            appointments, get prescriptions, and expert advice online—secure,
            convenient, and reliable. MediConnect bridges you to better health
            with just a few clicks.
          </p>
        </div>

        {/* -----------mid----------- */}
        <div className="text-xl font-medium mb-5">
          <p>COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* -----------right----------- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+918810253423</li>
            <li>arrathor@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* -----------comment----------- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">copyright © 2025 MediConnect - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
