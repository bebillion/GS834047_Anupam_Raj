import React from "react";
import UserDropDown from '../userDropDown/UserDropDown'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white text-white p-4 flex justify-between items-center shadow-md">
      <img src="/Gsynergy Logo V2 Long Description.svg" alt="GSynergy Logo" className="h-10 w-auto" />  
      <div className="flex-1 text-center">
        <span className="text-xl font-bold text-black">Data Viewer APP</span>
      </div>
      <UserDropDown />
    </nav>
  );
};

export default Navbar;
