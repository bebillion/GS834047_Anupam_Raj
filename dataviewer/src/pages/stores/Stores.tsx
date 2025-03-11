import React, { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addStore, removeStore, updateStoreOrder } from "../../slices/storeSlice";

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

// Defining the StoreRow component
const StoreRow: React.FC<{ store: Store; index: number; onRemove: (id: number) => void }> = ({ store, index, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: store.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-grab border-b border-gray-300">
      <td className="px-4 py-2 flex items-center gap-2">
        <span className="cursor-move">☰</span> {index + 1}
      </td>
      <td className="px-4 py-2">{store.name}</td>
      <td className="px-4 py-2">{store.city}</td>
      <td className="px-4 py-2">{store.state}</td>
      <td className="px-4 py-2">
        <button className="text-red-500 hover:text-red-700" onClick={() => onRemove(store.id)}>
          <RiDeleteBin6Line size={18} />
        </button>
      </td>
    </tr>
  );
};

const Stores: React.FC = () => {
  const stores = useSelector((state: RootState) => state.stores.stores);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleRemoveStore = (id: number) => {
    dispatch(removeStore(id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = stores.findIndex((store) => store.id === active.id);
      const newIndex = stores.findIndex((store) => store.id === over.id);
      const newStores = arrayMove(stores, oldIndex, newIndex);
      dispatch(updateStoreOrder(newStores));
    }
  };

  const handleAddStore = () => {
    if (storeName.trim() === "" || city.trim() === "" || state.trim() === "") return;
    const newStore = {
      id: Date.now(),
      name: storeName,
      city,
      state,
    };
    dispatch(addStore(newStore));
    setStoreName("");
    setCity("");
    setState("");
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">Store</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">State</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <SortableContext items={stores.map((store) => store.id)}>
              <tbody>
                {stores.map((store, index) => (
                  <StoreRow key={store.id} store={store} index={index} onRemove={handleRemoveStore} />
                ))}
              </tbody>
            </SortableContext>
          </table>
        </DndContext>
      </div>

      {/* Button to open modal */}
      <div className="fixed bottom-0 w-full bg-gray-100 p-4 flex justify-center shadow-lg">
        <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-6 py-2 rounded-md font-bold hover:bg-orange-600">
          NEW STORE
        </button>
      </div>

      {/* Modal with Light Blurred Background */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Store</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Store Name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleAddStore} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stores;
