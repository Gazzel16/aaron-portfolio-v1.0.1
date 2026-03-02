"use client"
import CardCount from "./components/CardCount"
import LineChart from "./components/LineChart"
import RolePieChart from "./components/PieChart"

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-gray-100 text-[#111827] antialiased">
            <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tight text-slate-900">
                            Overview Dashboard
                        </h1>
                        <p className="text-slate-500 font-medium flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Live updates for your roles and activity.
                        </p>
                    </div>
                </div>

                {/* Stat Cards */}
                <CardCount />

                {/* Main Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Growth Chart Container */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden h-[400px]">
                        <div className="p-6 pb-0">
                            <h3 className="text-lg font-bold text-slate-800">Role Creation Trend</h3>
                            <p className="text-sm text-slate-400">Monthly user engagement activity</p>
                        </div>
                        
                        {/* IMPORTANT: Ensure your LineChart component uses 
                            <ResponsiveContainer width="100%" height="100%"> 
                        */}
                        <div className="flex-1 w-full p-4 min-h-0">
                            <LineChart />
                        </div>
                    </div>

                    {/* Distribution Card */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
                        <div className="p-6 pb-0">
                            <h3 className="text-lg font-bold text-slate-800">Distribution</h3>
                            <p className="text-sm text-slate-400">Total role split</p>
                        </div>
                        
                        <div className="flex-1 w-full flex items-center justify-center p-4 min-h-0">
                            <RolePieChart />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}