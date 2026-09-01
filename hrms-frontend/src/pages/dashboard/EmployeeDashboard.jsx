import { useState } from 'react';
import {
    Clock,
    Calendar,
    FileText,
    Download,
    CheckCircle,
    ArrowRight,
    TrendingUp,
    Award
} from 'lucide-react';

export default function EmployeeDashboard() {
    const [clockedIn, setClockedIn] = useState(false);
    const [clockTime, setClockTime] = useState(null);

    const handleClockToggle = () => {
        if (!clockedIn) {
            setClockTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setClockedIn(true);
        } else {
            setClockedIn(false);
        }
    };

    const recentPayslips = [
        { month: 'August 2026', amount: '$4,200', id: 'PAY-8902' },
        { month: 'July 2026', amount: '$4,200', id: 'PAY-7821' },
        { month: 'June 2026', amount: '$4,200', id: 'PAY-6710' },
    ];

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* 1. Employee Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-center">
                    <div>
                        <span className="text-sm font-semibold text-gray-500">Casual Leave Balance</span>
                        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mt-1">8 / 12</h2>
                        <span className="text-xs text-gray-400">Days available</span>
                    </div>
                    <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
                        <Calendar className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-center">
                    <div>
                        <span className="text-sm font-semibold text-gray-500">Sick Leave Balance</span>
                        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mt-1">5 / 7</h2>
                        <span className="text-xs text-gray-400">Days available</span>
                    </div>
                    <div className="p-3.5 bg-purple-50 text-purple-600 rounded-xl">
                        <Calendar className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-center">
                    <div>
                        <span className="text-sm font-semibold text-gray-500">Monthly Attendance</span>
                        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mt-1">98%</h2>
                        <span className="text-xs text-emerald-600 font-semibold">On Track</span>
                    </div>
                    <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-center">
                    <div>
                        <span className="text-sm font-semibold text-gray-500">Next Payday</span>
                        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mt-1">Sept 30</h2>
                        <span className="text-xs text-gray-400">Scheduled payout</span>
                    </div>
                    <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-xl">
                        <Award className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* 2. Clock-In Widget & Payslips */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Clock-In Widget */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-gray-800 text-base mb-1">Time Tracker</h3>
                        <p className="text-xs text-gray-400 mb-6">Log daily attendance shift timing</p>

                        <div className="text-center py-6 border border-slate-100 rounded-2xl bg-slate-50/50">
                            <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">Current Status</span>
                            <div className="mt-2 flex items-center justify-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${clockedIn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                                <span className="text-lg font-bold text-gray-800">{clockedIn ? 'Clocked In' : 'Clocked Out'}</span>
                            </div>
                            {clockedIn && <p className="text-xs text-gray-500 mt-1">Shift started at {clockTime}</p>}
                        </div>
                    </div>

                    <button
                        onClick={handleClockToggle}
                        className={`mt-6 w-full py-3 rounded-xl font-bold text-sm transition shadow-sm ${
                            clockedIn
                                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                        }`}
                    >
                        {clockedIn ? 'Clock Out Now' : 'Clock In Now'}
                    </button>
                </div>

                {/* Payslips Download List */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-xs p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 text-base">Recent Payslips</h3>
                        <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">View All</span>
                    </div>

                    <div className="space-y-3">
                        {recentPayslips.map((pay, i) => (
                            <div key={i} className="p-4 rounded-xl border border-gray-100 flex items-center justify-between hover:bg-slate-50/50 transition">
                                <div className="flex items-center gap-3.5">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-sm">{pay.month}</h4>
                                        <span className="text-xs text-gray-400">{pay.id} • Net Pay: {pay.amount}</span>
                                    </div>
                                </div>

                                <button className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-xs rounded-lg transition">
                                    <Download className="w-4 h-4" /> Download PDF
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}