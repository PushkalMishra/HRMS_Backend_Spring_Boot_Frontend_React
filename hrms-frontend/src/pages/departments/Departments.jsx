import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Building2, Edit2, Trash2, Hash } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DepartmentModal from '../../components/departments/DepartmentModal';

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDept, setEditingDept] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const API_BASE_URL = 'http://localhost:8080/api/departments';

    const authHeaders = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // Fetch Departments from Backend
    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_BASE_URL, authHeaders);
            setDepartments(res.data);
        } catch (err) {
            console.error('Failed to fetch departments:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    // Create or Update Department
    const handleSaveDepartment = async (formData) => {
        try {
            if (editingDept) {
                const res = await axios.put(`${API_BASE_URL}/${editingDept.id}`, formData, authHeaders);
                setDepartments(departments.map(d => d.id === editingDept.id ? res.data : d));
            } else {
                const res = await axios.post(API_BASE_URL, formData, authHeaders);
                setDepartments([...departments, res.data]);
            }
        } catch (err) {
            console.error('Failed to save department:', err);
        }
    };

    // Delete Department
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this department?')) {
            try {
                await axios.delete(`${API_BASE_URL}/${id}`, authHeaders);
                setDepartments(departments.filter(d => d.id !== id));
            } catch (err) {
                console.error('Failed to delete department:', err);
            }
        }
    };

    const filteredDepartments = departments.filter((dept) =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Department Management</h1>
                    <p className="text-xs text-gray-500 mt-1">Configure corporate structure and organizational units.</p>
                </div>
                <button
                    onClick={() => { setEditingDept(null); setIsModalOpen(true); }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Department</span>
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
                <div className="relative max-w-md">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by department name or code..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-sm text-gray-500">Loading departments...</div>
            ) : filteredDepartments.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-sm text-gray-400">
                    No departments found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDepartments.map((dept) => (
                        <div
                            key={dept.id}
                            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-base">{dept.name}</h3>
                                            <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-gray-600 rounded-md inline-flex items-center gap-0.5">
                                                <Hash className="w-3 h-3 text-gray-400" />
                                                {dept.code}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => { setEditingDept(dept); setIsModalOpen(true); }}
                                            className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-slate-50 rounded-lg transition"
                                            title="Edit Department"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(dept.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-slate-50 rounded-lg transition"
                                            title="Delete Department"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 line-clamp-3">
                                    {dept.description || 'No description provided for this department.'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <DepartmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveDepartment}
                initialData={editingDept}
            />
        </div>
    );
}