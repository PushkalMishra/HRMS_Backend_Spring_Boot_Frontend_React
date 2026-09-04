import React from 'react';

export default function AttendanceTable({ records, loading }) {
    const getBadgeStyle = (status) => {
        switch (status) {
            case 'PRESENT':
                return { bg: '#d1e7dd', color: '#0f5132' };
            case 'ABSENT':
                return { bg: '#f8d7da', color: '#842029' };
            case 'LATE':
                return { bg: '#fff3cd', color: '#664d03' };
            case 'HALF_DAY':
                return { bg: '#cff4fc', color: '#055160' };
            default:
                return { bg: '#e2e3e5', color: '#41464b' };
        }
    };

    return (
        <div>
            <h3>Attendance Logs</h3>
            {loading ? (
                <p>Loading attendance history...</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #dee2e6', textAlign: 'left' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#f1f3f5', borderBottom: '2px solid #dee2e6' }}>
                        <th style={{ padding: '12px' }}>ID</th>
                        <th style={{ padding: '12px' }}>Employee</th>
                        <th style={{ padding: '12px' }}>Date</th>
                        <th style={{ padding: '12px' }}>Check In</th>
                        <th style={{ padding: '12px' }}>Check Out</th>
                        <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ padding: '16px', textAlign: 'center', color: '#6c757d' }}>
                                No attendance records found.
                            </td>
                        </tr>
                    ) : (
                        records.map((row) => {
                            const badge = getBadgeStyle(row.status);
                            return (
                                <tr key={row.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                                    <td style={{ padding: '12px' }}>#{row.id}</td>
                                    <td style={{ padding: '12px' }}><strong>{row.employeeName || `Emp #${row.employeeId}`}</strong></td>
                                    <td style={{ padding: '12px' }}>{row.date}</td>
                                    <td style={{ padding: '12px' }}>{row.checkInTime || '-'}</td>
                                    <td style={{ padding: '12px' }}>{row.checkOutTime || '-'}</td>
                                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', backgroundColor: badge.bg, color: badge.color }}>
                        {row.status}
                      </span>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
}