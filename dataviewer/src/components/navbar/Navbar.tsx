import React from "react";
import UserDropDown from '../userDropDown/UserDropDown'
import { MdPivotTableChart } from "react-icons/md";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white text-white p-4 flex justify-between items-center shadow-md">
       <MdPivotTableChart className="text-3xl text-black" />  
      <div className="flex-1 text-center">
        <span className="text-xl font-bold text-black">Data Viewer APP</span>
      </div>
      <UserDropDown />
    </nav>
  );
};

export default Navbar;
