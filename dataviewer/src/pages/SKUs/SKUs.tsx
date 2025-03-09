import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSKU, removeSKU } from "../../slices/skuSlice";
import { RootState } from "../../store";
import { FaTrash } from "react-icons/fa";

interface SKU {
  id: number;
  name: string;
  price: number;
  cost: number;
}

const SKUs: React.FC = () => {
  const [skuName, setSkuName] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus.skus);

  const handleAddSKU = () => {
    if (skuName.trim() && price && cost) {
      dispatch(addSKU({ id: Date.now(), name: skuName, price: parseFloat(price), cost: parseFloat(cost) }));
      setSkuName("");
      setPrice("");
      setCost("");
      setIsModalOpen(false); // Close modal after adding
    }
  };

  return (
    <div className="p-4">
      {/* SKU Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2"> </th>
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Cost</th>
            </tr>
          </thead>
          <tbody>
            {skus.map((sku) => (
              <tr key={sku.id} className="border-b">
                <td className="px-4 py-2 text-center">
                  <button onClick={() => dispatch(removeSKU(sku.id))} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
                <td className="px-4 py-2">{sku.name}</td>
                <td className="px-4 py-2">${sku.price.toFixed(2)}</td>
                <td className="px-4 py-2">${sku.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fixed Add SKU Button */}
      <div className="fixed bottom-0 w-full bg-gray-100 p-4 flex justify-center shadow-lg">
        <button 
          className="bg-orange-500 text-white px-6 py-2 rounded-md font-bold hover:bg-orange-600"
          onClick={() => setIsModalOpen(true)}
        >
          NEW SKU
        </button>
      </div>

      {/* Modal for Adding SKU */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add SKU</h2>
            <input 
              type="text" 
              className="border p-2 w-full mb-2" 
              value={skuName} 
              onChange={(e) => setSkuName(e.target.value)} 
              placeholder="Enter SKU name" 
            />
            <input 
              type="number" 
              className="border p-2 w-full mb-2" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              placeholder="Price" 
            />
            <input 
              type="number" 
              className="border p-2 w-full mb-2" 
              value={cost} 
              onChange={(e) => setCost(e.target.value)} 
              placeholder="Cost" 
            />
            <div className="flex justify-end gap-2">
              <button 
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                onClick={handleAddSKU}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SKUs;
