import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Stores from "./pages/stores/Stores";
import SKUs from "./pages/SKUs/SKUs";
import Planning from "./pages/planning/Planning";
import ChartPage from "./pages/chart/Chart";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Stores />} />
              <Route path="/skus" element={<SKUs />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/chart" element={<ChartPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
