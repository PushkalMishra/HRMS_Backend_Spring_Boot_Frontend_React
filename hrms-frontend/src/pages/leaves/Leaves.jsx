import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LeaveBalanceCards from '../../components/leaves/LeaveBalanceCards';
import LeaveApplyForm from '../../components/leaves/LeaveApplyForm';
import LeaveApprovalTable from '../../components/leaves/LeaveApprovalTable';

const API_URL = 'http://localhost:8080/api/leaves';

export default function Leaves() {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLeaves = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLeaves(res.data);
        } catch (err) {
            console.error('Failed to fetch leaves:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLeaves();
    }, [fetchLeaves]);

    const handleUpdateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_URL}/${id}/status?status=${status}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchLeaves();
        } catch (err) {
            console.error('Failed to update status:', err);
            alert('Could not update status.');
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2>Leave Management</h2>
            <LeaveBalanceCards />
            <LeaveApplyForm onLeaveSubmitted={fetchLeaves} />
            <LeaveApprovalTable leaves={leaves} loading={loading} onUpdateStatus={handleUpdateStatus} />
        </div>
    );
}