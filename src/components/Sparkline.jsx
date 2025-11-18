export default function Sparkline({ points }) {
const w = 120,
h = 36,
pad = 4;


const max = Math.max(...points);
const min = Math.min(...points);


const sx = (i) => pad + (i / (points.length - 1)) * (w - pad * 2);
const sy = (v) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);


const path = points
.map((p, i) => `${i === 0 ? "M" : "L"} ${sx(i)} ${sy(p)}`)
.join(" ");


return (
<svg width={w} height={h}>
<path d={path} stroke="currentColor" fill="none" strokeWidth="1.5" />
</svg>
);
}