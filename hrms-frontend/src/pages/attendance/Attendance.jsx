import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AttendanceClock from '../../components/attendance/AttendanceClock';
import AttendanceTable from '../../components/attendance/AttendanceTable';

const API_URL = 'http://localhost:8080/api/attendance';

export default function Attendance() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAttendance = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRecords(res.data);
        } catch (err) {
            console.error('Failed to fetch attendance:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAttendance();
    }, [fetchAttendance]);

    return (
        <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2>Attendance Tracker</h2>
            <AttendanceClock onAttendanceLogged={fetchAttendance} />
            <AttendanceTable records={records} loading={loading} />
        </div>
    );
}