import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSKU, removeSKU, updateSKUOrder } from "../../slices/skuSlice";
import { RootState } from "../../store";
import { FaTrash } from "react-icons/fa";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Define the SKU type
type SKU = {
  id: number;
  name: string;
  price: number;
  cost: number;
};

// Define the SKURow component
const SKURow: React.FC<{ sku: SKU; index: number; onRemove: (id: number) => void }> = ({ sku, index, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sku.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-grab border-b">
      <td className="px-4 py-2 flex items-center gap-2">
        <span className="cursor-move">☰</span> {index + 1}
      </td>
      <td className="px-4 py-2">{sku.name}</td>
      <td className="px-4 py-2">${sku.price.toFixed(2)}</td>
      <td className="px-4 py-2">${sku.cost.toFixed(2)}</td>
      <td className="px-4 py-2 text-center">
        <button onClick={() => onRemove(sku.id)} className="text-red-500 hover:text-red-700">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

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

  const handleRemoveSKU = (id: number) => {
    dispatch(removeSKU(id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = skus.findIndex((sku) => sku.id === active.id);
      const newIndex = skus.findIndex((sku) => sku.id === over?.id);
      const newSkus = arrayMove(skus, oldIndex, newIndex);
      dispatch(updateSKUOrder(newSkus));
    }
  };

  return (
    <div className="p-4">
      {/* SKU Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">SKU</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Cost</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <SortableContext items={skus.map((sku) => sku.id)}>
              <tbody>
                {skus.map((sku, index) => (
                  <SKURow key={sku.id} sku={sku} index={index} onRemove={handleRemoveSKU} />
                ))}
              </tbody>
            </SortableContext>
          </table>
        </DndContext>
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
