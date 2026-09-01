import { useState } from 'react';
import {
    Users,
    UserCheck,
    Clock,
    CalendarCheck,
    CheckCircle2,
    XCircle,
    ArrowUpRight,
    FileSpreadsheet
} from 'lucide-react';

export default function ManagerDashboard() {
    const [pendingRequests, setPendingRequests] = useState([
        { id: 1, name: 'Alice Green', type: 'Casual Leave', dates: 'Oct 12 - Oct 14', reason: 'Family Emergency', dept: 'Marketing' },
        { id: 2, name: 'Bob Jones', type: 'Sick Leave', dates: 'Oct 10 - Oct 11', reason: 'Medical Checkup', dept: 'IT' },
        { id: 3, name: 'Charlie Day', type: 'Annual Leave', dates: 'Oct 20 - Oct 25', reason: 'Vacation', dept: 'HR' },
    ]);

    const teamMembers = [
        { name: 'Alice Green', role: 'Senior Analyst', status: 'Present', checkIn: '09:02 AM' },
        { name: 'Bob Jones', role: 'Developer', status: 'On Leave', checkIn: '-' },
        { name: 'Ehariel Green', role: 'Developer', status: 'Present', checkIn: '08:55 AM' },
        { name: 'Lara Eldera', role: 'UI Designer', status: 'Late', checkIn: '09:42 AM' },
    ];

    const handleAction = (id, action) => {
        setPendingRequests((prev) => prev.filter((req) => req.id !== id));
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* 1. Manager Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-center">
                    <div>
                        <span className="text-sm font-semibold text-gray-500">Direct Reports</span>
                        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mt-1">12</h2>
                        <span className="text-xs text-emerald-600 font-semibold">100% active</span>
                    </div>
                    <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
                        <Users className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-center">
                    <div>
                        <span className="text-sm font-semibold text-gray-500">Team On Leave Today</span>
                        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mt-1">2</h2>
                        <span className="text-xs text-amber-600 font-semibold">1 Casual, 1 Sick</span>
                    </div>
                    <div className="p-3.5 bg-amber-50 text-amber-600 rounded-xl">
                        <CalendarCheck className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-center">
                    <div>
                        <span className="text-sm font-semibold text-gray-500">Pending Approvals</span>
                        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mt-1">{pendingRequests.length}</h2>
                        <span className="text-xs text-purple-600 font-semibold">Requires action</span>
                    </div>
                    <div className="p-3.5 bg-purple-50 text-purple-600 rounded-xl">
                        <Clock className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-center">
                    <div>
                        <span className="text-sm font-semibold text-gray-500">Team Attendance Rate</span>
                        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mt-1">94.8%</h2>
                        <span className="text-xs text-emerald-600 font-semibold">+2.1% this month</span>
                    </div>
                    <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
                        <UserCheck className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* 2. Actionable Leave Approvals & Team Attendance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Actionable Leave Queue */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-xs p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800 text-base">Actionable Leave Requests</h3>
                        <span className="text-xs text-gray-400 font-medium">Updated live</span>
                    </div>

                    {pendingRequests.length > 0 ? (
                        <div className="space-y-3">
                            {pendingRequests.map((req) => (
                                <div key={req.id} className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-800 text-sm">{req.name}</span>
                                            <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded-md">
                        {req.type}
                      </span>
                                        </div>
                                        <p className="text-xs text-gray-500">{req.dates} • <span className="italic">"{req.reason}"</span></p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleAction(req.id, 'reject')}
                                            className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
                                            title="Reject Request"
                                        >
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleAction(req.id, 'approve')}
                                            className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition flex items-center gap-1.5 px-3 font-semibold text-xs"
                                        >
                                            <CheckCircle2 className="w-4 h-4" /> Approve
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-gray-400 text-sm">
                            All leave requests have been resolved.
                        </div>
                    )}
                </div>

                {/* Live Team Attendance Tracker */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-gray-800 text-base mb-4">Today's Team Attendance</h3>
                        <div className="space-y-3">
                            {teamMembers.map((member, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{member.name}</p>
                                        <p className="text-xs text-gray-400">{member.role}</p>
                                    </div>
                                    <div className="text-right">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                        member.status === 'Present' ? 'bg-emerald-100 text-emerald-700' :
                            member.status === 'Late' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {member.status}
                    </span>
                                        <p className="text-[11px] text-gray-400 mt-0.5">{member.checkIn}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="mt-4 w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-gray-700 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2">
                        View Complete Attendance Log <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}