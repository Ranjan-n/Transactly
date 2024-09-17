import React, { useState } from "react";
import Logo from "../assets/images/AppLogo.png";
import { useNavigate } from "react-router-dom";

export function AppBar({ letter }) {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <div className="shadow h-16 flex justify-between items-center bg-blue-700 sticky">
        <div className="flex justify-start pl-6">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8 w-8 sm:h-10 sm:w-12" />
            <h1 className="sm:ml-6 text-lg ml-2 sm:text-xl font-extrabold text-white">
              Transactly
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-items-end">
          <div className="sm:mr-4 mr-2 text-white">Hello</div>
          <div
            className="rounded-full h-8 w-8 sm:h-12 sm:w-12 bg-slate-200 flex items-center justify-center mr-10 pointer cursor-pointer"
            onClick={() => setShowLogout(!showLogout)}
          >
            <div className="text-xl">{letter}</div>
          </div>
        </div>
      </div>
      {showLogout && (
        <div className="flex justify-end">
          <button
            className="mr-5 text-blue-500 font-semibold py-2 px-4 bg-slate-100 hover:underline rounded"
            onClick={() => {
              navigate("/update");
            }}
          >
            Update Information
          </button>
          <button
            className="mr-5 text-blue-500 font-semibold py-2 px-4 bg-slate-100 hover:underline rounded"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
