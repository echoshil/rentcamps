import React from "react";

const popularItems = [
  { id: "TNT-01", name: "Tenda Dome 4 Orang", rented: 34 },
  { id: "SLP-02", name: "Sleeping Bag Premium", rented: 28 },
  { id: "BTN-03", name: "Matras Inflatable", rented: 22 },
  { id: "CKT-04", name: "Kompor Gas Portable", rented: 18 },
];

const PopularEquipment = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Popular Equipment</h2>

      <ul className="space-y-3">
        {popularItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
          >
            <span>{item.name}</span>
            <span className="font-semibold text-blue-600">{item.rented}x rented</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularEquipment;
