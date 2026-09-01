import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                usernameOrEmail:email,
                password:password,
            });

            // Pass response.data ({ token, type, id, username, email, role }) to AuthContext
            login(response.data);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <form onSubmit={handleLogin} className="p-8 bg-white rounded-2xl shadow-md w-96 space-y-4">
                <h2 className="text-xl font-bold text-gray-800">HRMS Portal Login</h2>

                {error && (
                    <div className="p-3 text-xs text-red-600 bg-red-50 rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition shadow-sm"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}