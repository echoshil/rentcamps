import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";


import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";
import Bookings from "./pages/Bookings";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";


export default function App() {
const [view, setView] = useState("dashboard");


return (
<div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
<div className="max-w-7xl mx-auto p-6">
<div className="grid grid-cols-12 gap-6">
<aside className="col-span-12 md:col-span-3 lg:col-span-2">
<Sidebar view={view} setView={setView} />
</aside>


<main className="col-span-12 md:col-span-9 lg:col-span-10">
<Header />


{view === "dashboard" && <Dashboard />}
{view === "items" && <Items />}
{view === "bookings" && <Bookings />}
{view === "customers" && <Customers />}
{view === "analytics" && <Analytics />}
{view === "settings" && <Settings />}
</main>
</div>
</div>
</div>
);
}