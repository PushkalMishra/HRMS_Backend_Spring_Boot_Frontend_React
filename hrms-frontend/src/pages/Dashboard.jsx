import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { logout, user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto flex justify-between items-center bg-white p-6 rounded-lg shadow">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">HRMS Dashboard</h1>
                    <p className="text-gray-600 mt-1">Logged in as: {user?.email || 'Admin'}</p>
                </div>
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}