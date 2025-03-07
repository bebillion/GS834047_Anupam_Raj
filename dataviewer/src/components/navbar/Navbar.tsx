import React from "react";
import UserDropDown from '../userDropDown/UserDropDown'


const Navbar: React.FC = () => {
  return (
    <nav className="bg-white-600 text-white p-4 flex justify-between items-center">
      <img src="/Gsynergy Logo V2 Long Description.svg" alt="GSynergy Logo" className="h-10" />  
      <UserDropDown />
    </nav>
  );
};

export default Navbar;
