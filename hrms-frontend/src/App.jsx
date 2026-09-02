import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Employees from './pages/employees/Employees';
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Route */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes with Sidebar Layout */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/* Restricted to Admin and Manager only */}
                        <Route path="/employees"
                            element={
                                <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}>
                                    <Employees />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/payroll" element={<div className="p-4">Payroll Page</div>} />
                        <Route path="/departments" element={<div className="p-4">Departments Page</div>} />
                        <Route path="/attendance" element={<div className="p-4">Attendance Page</div>} />
                        <Route path="/leaves" element={<div className="p-4">Leaves Page</div>} />
                        <Route path="/profile" element={<div className="p-4">Profile Page</div>} />
                        <Route path="/settings" element={<div className="p-4">Settings Page</div>} />
                    </Route>

                    {/* Catch-all redirect */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}