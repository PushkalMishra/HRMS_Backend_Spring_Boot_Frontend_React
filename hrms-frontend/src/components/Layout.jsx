import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Users,
    FileText,
    Building2,
    Clock,
    Calendar,
    User,
    Settings,
    LogOut,
    Menu,
    Bell,
    Search
} from 'lucide-react';

export default function Layout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    // Extract dynamic display details from auth context
    const displayName = user?.username || user?.email?.split('@')[0] || 'User';
    const displayRole = user?.role?.replace('ROLE_', '') || 'STAFF';
    const initials = displayName.substring(0, 2).toUpperCase();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Employees', path: '/employees', icon: Users, roles: ['ROLE_ADMIN', 'ROLE_HR_MANAGER']},
        { name: 'Payroll', path: '/payroll', icon: FileText },
        { name: 'Departments', path: '/departments', icon: Building2 },
        { name: 'Attendance', path: '/attendance', icon: Clock },
        { name: 'Leaves', path: '/leaves', icon: Calendar },
        { name: 'Profile', path: '/profile', icon: User },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    const filteredNavItems = navItems.filter(item =>
        !item.roles || item.roles.includes(user?.role)
    );
    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            {/* Sidebar */}
            <aside
                className={`${
                    isCollapsed ? 'w-20' : 'w-64'
                } bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out relative z-20`}
            >
                {/* User Profile Card (Initials Badge, No Photo) */}
                {/* Dynamic User Card */}
                {!isCollapsed ? (
                    <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-xs mb-3">
                            {initials}
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm capitalize">{displayName}</h3>
                        <p className="text-xs text-blue-600 bg-blue-50 font-semibold px-2.5 py-0.5 rounded-md mt-1">
                            {displayRole}
                        </p>
                    </div>
                ) : (
                    <div className="p-4 border-b border-gray-100 flex justify-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                            {initials}
                        </div>
                    </div>
                )}

                {/* Navigation Menu */}
                <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                    {filteredNavItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                            : 'text-gray-600 hover:bg-slate-50 hover:text-gray-900'
                                    } ${isCollapsed ? 'justify-center px-0' : ''}`
                                }
                                title={isCollapsed ? item.name : ''}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                {!isCollapsed && <span>{item.name}</span>}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Logout Option */}
                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition ${
                            isCollapsed ? 'justify-center px-0' : ''
                        }`}
                        title={isCollapsed ? "Logout" : ""}
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {!isCollapsed && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-100 px-8 py-3.5 flex justify-between items-center shadow-2xs h-16 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-2 text-gray-500 hover:bg-slate-100 rounded-lg transition"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">H</span>
                            <h1 className="text-lg font-bold text-gray-800 tracking-tight">HRMS Portal</h1>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-96 hidden md:block">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Employees or Records..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-100/70 border border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Header Action / Admin Info */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-slate-100 transition relative">
                            <Bell className="w-5 h-5" />
                            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5 border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-gray-400 font-medium">HR Administrator</p>
                                <p className="text-sm font-semibold text-gray-700">Pushkal Mishra</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                                PM
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Outlet Pages */}
                <main className="flex-1 overflow-y-auto p-8 bg-[#F8FAFC]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}