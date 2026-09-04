import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/attendance';

export default function AttendanceClock({ onAttendanceLogged }) {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().split(' ')[0].substring(0, 5); // "HH:MM"

    const [formData, setFormData] = useState({
        employeeId: '',
        date: today,
        checkInTime: now,
        checkOutTime: '',
        status: 'PRESENT',
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
                date: formData.date,
                checkInTime: formData.checkInTime ? `${formData.checkInTime}:00` : null,
                checkOutTime: formData.checkOutTime ? `${formData.checkOutTime}:00` : null,
                status: formData.status,
            };

            await axios.post(API_URL, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert('Attendance logged successfully!');
            setFormData({
                employeeId: '',
                date: today,
                checkInTime: now,
                checkOutTime: '',
                status: 'PRESENT',
            });
            onAttendanceLogged();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Failed to log attendance');
        }
    };

    return (
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #e9ecef' }}>
            <h3>Daily Attendance Entry</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
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
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Date *</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Check-In Time</label>
                    <input
                        type="time"
                        name="checkInTime"
                        value={formData.checkInTime}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Check-Out Time</label>
                    <input
                        type="time"
                        name="checkOutTime"
                        value={formData.checkOutTime}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Status *</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="PRESENT">PRESENT</option>
                        <option value="ABSENT">ABSENT</option>
                        <option value="LATE">LATE</option>
                        <option value="HALF_DAY">HALF_DAY</option>
                    </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                    <button
                        type="submit"
                        style={{ backgroundColor: '#0d6efd', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Log Attendance
                    </button>
                </div>
            </form>
        </div>
    );
}