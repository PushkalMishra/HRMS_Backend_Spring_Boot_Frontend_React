import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Employees from './pages/employees/Employees';
import Departments from './pages/departments/Departments';
import Payroll from './pages/payroll/Payroll';
import Attendance from './pages/attendance/Attendance';
import Leaves from './pages/leaves/Leaves';
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
                                <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_HR_MANAGER']}>
                                    <Employees />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/payroll" element={<Payroll />} />
                        <Route path="/departments" element={<Departments/>}/>
                        <Route path="/attendance" element={<Attendance />} />
                        <Route path="/leaves" element={<Leaves />} />
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