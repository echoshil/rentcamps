export default function KPICard({ title, value, delta }) {
return (
<div className="bg-white/80 rounded-xl p-4 shadow-sm">
<div className="text-xs text-slate-500">{title}</div>
<div className="text-2xl font-semibold mt-1">{value}</div>
<div className="text-xs text-slate-400 mt-1">{delta}</div>
</div>
);
}