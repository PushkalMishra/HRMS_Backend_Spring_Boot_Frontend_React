import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PayrollForm from '../../components/payroll/PayrollForm';
import PayrollTable from '../../components/payroll/PayrollTable';

const API_BASE_URL = 'http://localhost:8080/api/payrolls';

export default function Payroll() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = (user.role || '').toUpperCase();
    const isEmployee = userRole === 'ROLE_EMPLOYEE' || userRole ==='EMPLOYEE';
    const currentEmployeeId = user.employeeId || user.id;
    const [payrolls, setPayrolls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterEmpId, setFilterEmpId] = useState('');

    const [formData, setFormData] = useState({
        employeeId: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        basicSalary: '',
        bonuses: '0',
        deductions: '0',
    });

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    };

    const fetchPayrolls = useCallback(async () => {
        setLoading(true);
        try {
            // Employees only query their own history endpoint
            const endpoint = isEmployee
                ? `${API_BASE_URL}/employee/${currentEmployeeId}`
                : API_BASE_URL;

            const response = await axios.get(endpoint, getAuthHeaders());
            setPayrolls(response.data);
        } catch (err) {
            console.error('Failed to fetch payrolls:', err);
        } finally {
            setLoading(false);
        }
    }, [isEmployee, currentEmployeeId]);

    useEffect(() => {
        fetchPayrolls();
    }, [fetchPayrolls]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                employeeId: Number(formData.employeeId),
                month: Number(formData.month),
                year: Number(formData.year),
                basicSalary: Number(formData.basicSalary),
                bonuses: Number(formData.bonuses || 0),
                deductions: Number(formData.deductions || 0),
            };

            await axios.post(API_BASE_URL, payload, getAuthHeaders());
            setFormData({
                employeeId: '',
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                basicSalary: '',
                bonuses: '0',
                deductions: '0',
            });
            fetchAllPayrolls();
        } catch (err) {
            console.error('Failed to generate payroll:', err);
            alert(err.response?.data?.message || 'Error processing payroll submission');
        }
    };

    const handleProcessPayment = async (id) => {
        try {
            await axios.put(`${API_BASE_URL}/${id}/pay`, {}, getAuthHeaders());
            fetchAllPayrolls();
        } catch (err) {
            console.error('Failed to process payment status:', err);
        }
    };

    const handleDownloadPdf = async (id, employeeName, month, year) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/${id}/download-pdf`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob',
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `payslip_${employeeName.replace(/\s+/g, '_')}_${month}_${year}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (err) {
            console.error('Failed to download PDF:', err);
        }
    };

    const handleFilterByEmployee = async () => {
        if (!filterEmpId.trim()) {
            fetchAllPayrolls();
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/employee/${filterEmpId}`, getAuthHeaders());
            setPayrolls(response.data);
        } catch (err) {
            console.error('Failed to filter payrolls:', err);
            setPayrolls([]);
        } finally {
            setLoading(false);
        }
    };

    const handleResetFilter = () => {
        setFilterEmpId('');
        fetchAllPayrolls();
    };

    return (
        <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2>Payroll & Payslip Hub</h2>

            <PayrollForm
                formData={formData}
                onChange={handleInputChange}
                onSubmit={handleFormSubmit}
            />

            <PayrollTable
                payrolls={payrolls}
                loading={loading}
                filterEmpId={filterEmpId}
                setFilterEmpId={setFilterEmpId}
                onFilter={handleFilterByEmployee}
                onResetFilter={handleResetFilter}
                onProcessPayment={handleProcessPayment}
                onDownloadPdf={handleDownloadPdf}
            />
        </div>
    );
}