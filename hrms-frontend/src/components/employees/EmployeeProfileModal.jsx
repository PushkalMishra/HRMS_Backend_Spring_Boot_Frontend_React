import { X, Mail, Building2, ShieldCheck, DollarSign, UserCheck, Calendar } from 'lucide-react';

export default function EmployeeProfileModal({ employee, onClose }) {
    if (!employee) return null;

    const initials = employee.name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-28 p-4 flex justify-end">
                    <button onClick={onClose} className="text-white/80 hover:text-white bg-black/20 p-1.5 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-6 pb-6 relative">
                    <div className="flex justify-between items-end -mt-12 mb-4">
                        <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-md">
                            <div className="w-full h-full rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold">
                                {initials}
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            employee.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                        }`}>
                            {employee.status}
                        </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">{employee.name}</h2>
                    <p className="text-xs text-gray-500 font-medium">{employee.role.replace('ROLE_', '')}</p>

                    <div className="mt-6 space-y-3.5 border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{employee.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span>Department: <strong className="text-gray-800">{employee.department}</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <UserCheck className="w-4 h-4 text-gray-400" />
                            <span>Reports To: <strong className="text-gray-800">{employee.manager || 'Unassigned'}</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span>Base Salary: <strong className="text-gray-800">${Number(employee.salary).toLocaleString()}/yr</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>Joined: <strong className="text-gray-800">Jan 15, 2024</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}