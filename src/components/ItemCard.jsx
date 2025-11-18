// src/components/ItemCard.jsx
export default function ItemCard({ item, onView }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex flex-col" onClick={() => onView(item)}>
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />

      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>

      <div className="flex items-center justify-between mt-auto">
        <span className="font-bold text-blue-600">Rp {item.price.toLocaleString()}</span>

        <span className={'text-xs px-2 py-1 rounded-full ' + (item.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600')}>{item.stock > 0 ? `${item.stock} stok` : 'Habis'}</span>
      </div>
    </div>
  );
}
