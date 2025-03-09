import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RiStore2Fill, RiBox3Fill, RiBarChartFill, RiLineChartFill } from "react-icons/ri"; // Importing React Icons

const Sidebar: React.FC = () => {
  const location = useLocation();
  const activeClass = "bg-gray-200 text-black font-bold"; // Styling for active menu

  return (
    <aside className="bg-gray-100 text-black w-64 min-h-screen p-4">
      <ul>
        <li className={`mb-4 p-2 rounded ${location.pathname === "/" ? activeClass : ""}`}>
          <Link to="/" className="flex items-center gap-2">
            <RiStore2Fill size={20} /> Store
          </Link>
        </li>
        <li className={`mb-4 p-2 rounded ${location.pathname === "/skus" ? activeClass : ""}`}>
          <Link to="/skus" className="flex items-center gap-2">
            <RiBox3Fill size={20} /> SKU
          </Link>
        </li>
        <li className={`mb-4 p-2 rounded ${location.pathname === "/planning" ? activeClass : ""}`}>
          <Link to="/planning" className="flex items-center gap-2">
            <RiBarChartFill size={20} /> Planning
          </Link>
        </li>
        <li className={`mb-4 p-2 rounded ${location.pathname === "/chart" ? activeClass : ""}`}>
          <Link to="/chart" className="flex items-center gap-2">
            <RiLineChartFill size={20} /> Charts
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
