import { Users, Building2, CalendarCheck, DollarSign, Activity, ArrowUpRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Employees', value: '940', change: '+12% this month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Active Departments', value: '15', change: '2 positions hiring', icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'On Leave Today', value: '18', change: '+5% vs last week', icon: CalendarCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Monthly Payroll Outflow', value: '$1.2M', change: '+8% vs prev. month', icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];

    const recentLogs = [
        { id: 1, action: 'Global Payroll Executed', target: 'August 2026 Cycle', time: '10 mins ago', user: 'System Automated' },
        { id: 2, action: 'Role Updated', target: 'User #104 -> ROLE_MANAGER', time: '1 hour ago', user: 'Pushkal Mishra' },
        { id: 3, action: 'New Department Created', target: 'AI Research & Dev', time: '3 hours ago', user: 'Pushkal Mishra' },
    ];

    return (
        <div className="space-y-6">
            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 font-medium mt-3 flex items-center gap-1">
                                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                                {stat.change}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions & Activity Logs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs">
                        <h3 className="text-base font-bold text-gray-800 mb-4">Admin Quick Actions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link to="/employees" className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition">
                                <Users className="w-5 h-5 text-blue-600 mb-2" />
                                <p className="font-semibold text-sm text-gray-800">Onboard Employee</p>
                                <p className="text-xs text-gray-400 mt-0.5">Register staff & credentials</p>
                            </Link>
                            <Link to="/payroll" className="p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition">
                                <DollarSign className="w-5 h-5 text-indigo-600 mb-2" />
                                <p className="font-semibold text-sm text-gray-800">Process Payroll</p>
                                <p className="text-xs text-gray-400 mt-0.5">Disburse company salaries</p>
                            </Link>
                            <Link to="/settings" className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 transition">
                                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
                                <p className="font-semibold text-sm text-gray-800">Role Assignments</p>
                                <p className="text-xs text-gray-400 mt-0.5">Manage user permissions</p>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs">
                        <h3 className="text-base font-bold text-gray-800 mb-4">System Activity Audit Log</h3>
                        <div className="space-y-3">
                            {recentLogs.map((log) => (
                                <div key={log.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-50/70 text-sm">
                                    <div>
                                        <p className="font-semibold text-gray-800">{log.action}</p>
                                        <p className="text-xs text-gray-500">{log.target} • <span className="text-gray-400">{log.user}</span></p>
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium">{log.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* System Health Panel */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs">
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <h3 className="text-base font-bold text-gray-800">System Health Monitor</h3>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                            <span className="font-medium text-emerald-900">Spring Boot REST API</span>
                            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" /> Operational
              </span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                            <span className="font-medium text-emerald-900">PDF Generator Service</span>
                            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" /> Active
              </span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100 flex items-center justify-between">
                            <span className="font-medium text-amber-900">Database Connection Pool</span>
                            <span className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
                <AlertTriangle className="w-4 h-4" /> High Load (78%)
              </span>
                        </div>

                        <div className="pt-2 border-t border-gray-100">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Memory Usage</span>
                                <span>2.32 GB / 4 GB</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full w-[58%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}