import { useAuth } from '../../context/AuthContext.jsx';
import AdminDashboard from './AdminDashboard.jsx'; // (Contains your built Admin view)
import ManagerDashboard from './ManagerDashboard.jsx';
import EmployeeDashboard from './EmployeeDashboard.jsx';

export default function Dashboard() {
    const { user } = useAuth();
    console.log("Current Auth User:", user);

    // 2. Normalize role string to uppercase
    const role = user?.role?.toUpperCase();

    if (role === 'ROLE_HR_MANAGER') {
        return <ManagerDashboard />;
    }

    if (role === 'ROLE_EMPLOYEE') {
        return <EmployeeDashboard />;
    }

    return <AdminDashboard />;
}