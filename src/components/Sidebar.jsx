export default function Sidebar({ view, setView }) {
const menus = [
["dashboard", "Dashboard"],
["items", "Inventory"],
["bookings", "Bookings"],
["customers", "Customers"],
["analytics", "Analytics"],
["settings", "Settings"],
];


return (
<div className="bg-white/70 rounded-3xl p-4 shadow">
<div className="flex items-center gap-3 mb-6">
<div className="bg-gradient-to-tr from-emerald-400 to-sky-500 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold">
RC
</div>
<div>
<div className="font-semibold">Rental Camp</div>
<div className="text-xs text-slate-500">Admin Dashboard</div>
</div>
</div>


<nav className="space-y-1">
{menus.map(([id, label]) => (
<button
key={id}
onClick={() => setView(id)}
className={`w-full px-3 py-2 rounded-lg text-left hover:bg-slate-100 ${
view === id ? "bg-slate-200 font-semibold" : ""
}`}
>
{label}
</button>
))}
</nav>
</div>
);
}