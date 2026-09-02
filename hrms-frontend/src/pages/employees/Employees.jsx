import { useState } from 'react';
import { Search, Plus, Filter, Eye, Edit2, Trash2, Building2 } from 'lucide-react';
import EmployeeModal from '../../components/employees/EmployeeModal.jsx';
import EmployeeProfileModal from '../../components/employees/EmployeeProfileModal.jsx';

const INITIAL_EMPLOYEES = [
    { id: 1, name: 'Pushkal Mishra', email: 'pushkal@company.com', role: 'ROLE_ADMIN', department: 'Engineering', salary: '95000', manager: 'Board', status: 'Active' },
    { id: 2, name: 'Sarah Jenkins', email: 'sarah.j@company.com', role: 'ROLE_MANAGER', department: 'Human Resources', salary: '82000', manager: 'Pushkal Mishra', status: 'Active' },
    { id: 3, name: 'Michael Chen', email: 'm.chen@company.com', role: 'ROLE_EMPLOYEE', department: 'Engineering', salary: '78000', manager: 'Pushkal Mishra', status: 'On Leave' },
    { id: 4, name: 'Emily Davis', email: 'emily.d@company.com', role: 'ROLE_EMPLOYEE', department: 'Finance', salary: '71000', manager: 'Sarah Jenkins', status: 'Active' },
];

export default function Employees() {
    const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [viewingEmployee, setViewingEmployee] = useState(null);

    // Filter Logic
    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
        const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;
        return matchesSearch && matchesDept && matchesStatus;
    });

    const handleSaveEmployee = (formData) => {
        if (editingEmployee) {
            setEmployees(employees.map(emp => emp.id === editingEmployee.id ? { ...formData, id: emp.id } : emp));
        } else {
            setEmployees([...employees, { ...formData, id: Date.now() }]);
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this employee record?')) {
            setEmployees(employees.filter(emp => emp.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Title & Top Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Employee Directory</h1>
                    <p className="text-xs text-gray-500 mt-1">Manage workforce records, department assignments, and onboarding.</p>
                </div>
                <button
                    onClick={() => { setEditingEmployee(null); setIsFormModalOpen(true); }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    <span>Onboard Employee</span>
                </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                        <select
                            value={selectedDept}
                            onChange={(e) => setSelectedDept(e.target.value)}
                            className="w-full sm:w-auto p-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none"
                        >
                            <option value="All">All Departments</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>

                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full sm:w-auto p-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                    </select>
                </div>
            </div>

            {/* Responsive Table Container */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-slate-50/70 text-gray-500 text-xs font-semibold border-b border-gray-100">
                            <th className="py-3.5 px-6">Employee</th>
                            <th className="py-3.5 px-6">Department</th>
                            <th className="py-3.5 px-6">Role</th>
                            <th className="py-3.5 px-6">Status</th>
                            <th className="py-3.5 px-6 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                        {filteredEmployees.map((emp) => {
                            const initials = emp.name.split(' ').map(n => n[0]).join('').toUpperCase();
                            return (
                                <tr key={emp.id} className="hover:bg-slate-50/50 transition">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                                                {initials}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{emp.name}</p>
                                                <p className="text-xs text-gray-400">{emp.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600 font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <Building2 className="w-4 h-4 text-gray-400" />
                                            <span>{emp.department}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600 font-medium">
                                        {emp.role.replace('ROLE_', '')}
                                    </td>
                                    <td className="py-4 px-6">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                emp.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                                            }`}>
                                                {emp.status}
                                            </span>
                                    </td>
                                    <td className="py-4 px-6 text-right space-x-2">
                                        <button
                                            onClick={() => setViewingEmployee(emp)}
                                            className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => { setEditingEmployee(emp); setIsFormModalOpen(true); }}
                                            className="p-1.5 text-gray-400 hover:text-amber-600 rounded-lg hover:bg-slate-100 transition"
                                            title="Edit Employee"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(emp.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition"
                                            title="Delete Employee"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            <EmployeeModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSave={handleSaveEmployee}
                initialData={editingEmployee}
            />

            <EmployeeProfileModal
                employee={viewingEmployee}
                onClose={() => setViewingEmployee(null)}
            />
        </div>
    );
}