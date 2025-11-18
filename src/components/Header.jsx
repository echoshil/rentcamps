export default function Header() {
return (
<header className="flex items-center justify-between mb-6">
<input
placeholder="Search..."
className="w-80 md:w-96 px-4 py-2 border rounded-xl"
/>


<div className="flex items-center gap-4">
<button className="px-3 py-2 rounded-xl bg-white">Notifications</button>
<div className="flex items-center gap-2">
<div className="text-right text-sm">
<div className="font-semibold">Ucok</div>
<div className="text-xs text-slate-500">Admin</div>
</div>
<div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center">
U
</div>
</div>
</div>
</header>
);
}