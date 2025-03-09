import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ChartPage: React.FC = () => {
  const stores = useSelector((state: RootState) => state.stores.stores);
  const planningData = useSelector((state: RootState) => state.planning.planning);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  // Define weeks
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

  // Aggregate GM$ and GM% for the selected store
  const chartData = weeks.map((week) => {
    const storeData = planningData.filter((p) => p.week === week && p.storeId === selectedStore);

    const totalSalesDollars = storeData.reduce((sum, p) => sum + p.salesUnits * p.price, 0);
    const totalGMdollars = storeData.reduce((sum, p) => sum + p.salesUnits * (p.price - p.cost), 0);
    const gmPercentage = totalSalesDollars > 0 ? (totalGMdollars / totalSalesDollars) * 100 : 0;

    return {
      week,
      gmDollars: totalGMdollars.toFixed(2),
      gmPercentage: gmPercentage.toFixed(2),
    };
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Chart Analysis</h2>
      
      <label className="mr-2 font-semibold">Select Store:</label>
      <select 
        className="border p-2"
        onChange={(e) => setSelectedStore(Number(e.target.value))} 
        value={selectedStore || ""}
      >
        <option value="">Select a Store</option>
        {stores.map((store) => (
          <option key={store.id} value={store.id}>{store.name}</option>
        ))}
      </select>

      {selectedStore && (
        <div className="mt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="gmDollars" fill="#82ca9d" name="GM Dollars" />
              <LineChart data={chartData}>
                <Line yAxisId="right" type="monotone" dataKey="gmPercentage" stroke="#8884d8" name="GM %" />
              </LineChart>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ChartPage;
