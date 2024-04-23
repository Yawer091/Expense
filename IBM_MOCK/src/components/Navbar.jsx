import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="shadow-md">
      <div className=" flex justify-between p-[20px] w-[80%] m-auto text-[28px] font-semibold ">
        <NavLink to="/signup" className="hover:underline hover:text-green-400">
          Signup
        </NavLink>
        <NavLink to="/login" className="hover:underline hover:text-green-400">
          Login
        </NavLink>
        <NavLink
          to="/dashboard"
          className="hover:underline hover:text-green-400"
        >
          Dashboard
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
