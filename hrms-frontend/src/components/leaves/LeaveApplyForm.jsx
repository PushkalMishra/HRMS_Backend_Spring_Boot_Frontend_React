import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/leaves';

export default function LeaveApplyForm({ onLeaveSubmitted }) {
    const [formData, setFormData] = useState({
        employeeId: '',
        leaveType: 'CASUAL',
        startDate: '',
        endDate: '',
        reason: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const payload = {
                employeeId: Number(formData.employeeId),
                leaveType: formData.leaveType,
                startDate: formData.startDate,
                endDate: formData.endDate,
                reason: formData.reason,
            };

            await axios.post(API_URL, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert('Leave application submitted!');
            setFormData({ employeeId: '', leaveType: 'CASUAL', startDate: '', endDate: '', reason: '' });
            onLeaveSubmitted();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Failed to submit leave request');
        }
    };

    return (
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '32px', border: '1px solid #e9ecef' }}>
            <h3>Apply for Leave</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Employee ID *</label>
                    <input
                        type="number"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Leave Type *</label>
                    <select
                        name="leaveType"
                        value={formData.leaveType}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="CASUAL">CASUAL</option>
                        <option value="SICK">SICK</option>
                        <option value="UNPAID">UNPAID</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Start Date *</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>End Date *</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Reason *</label>
                    <textarea
                        name="reason"
                        rows="3"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                    <button
                        type="submit"
                        style={{ backgroundColor: '#0d6efd', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Submit Leave Request
                    </button>
                </div>
            </form>
        </div>
    );
}