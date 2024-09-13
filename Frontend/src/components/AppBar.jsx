import React from "react";
import Logo from "../assets/images/AppLogo.png";

export function AppBar() {
  return (
    <div className="shadow h-16 flex justify-between items-center bg-blue-700">
      <div className="flex justify-start pl-6">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 w-12" />
          <h1 className="ml-6 text-xl font-extrabold text-white">Transactly</h1>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-4 text-white">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center mr-10">
          <div className="text-xl">U</div>
        </div>
      </div>
    </div>
  );
}
