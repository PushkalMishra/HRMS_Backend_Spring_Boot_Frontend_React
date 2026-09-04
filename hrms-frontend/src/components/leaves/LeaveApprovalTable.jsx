import React from 'react';

export default function LeaveApprovalTable({ leaves, loading, onUpdateStatus }) {
    const getBadge = (status) => {
        switch (status) {
            case 'APPROVED':
                return { bg: '#d1e7dd', color: '#0f5132' };
            case 'REJECTED':
                return { bg: '#f8d7da', color: '#842029' };
            default:
                return { bg: '#fff3cd', color: '#664d03' };
        }
    };

    return (
        <div>
            <h3>Manager Approval Board & Request History</h3>
            {loading ? (
                <p>Loading leave requests...</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #dee2e6', textAlign: 'left' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#f1f3f5', borderBottom: '2px solid #dee2e6' }}>
                        <th style={{ padding: '12px' }}>ID</th>
                        <th style={{ padding: '12px' }}>Employee</th>
                        <th style={{ padding: '12px' }}>Type</th>
                        <th style={{ padding: '12px' }}>Dates</th>
                        <th style={{ padding: '12px' }}>Reason</th>
                        <th style={{ padding: '12px' }}>Status</th>
                        <th style={{ padding: '12px' }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {leaves.length === 0 ? (
                        <tr>
                            <td colSpan="7" style={{ padding: '16px', textAlign: 'center', color: '#6c757d' }}>
                                No leave requests logged.
                            </td>
                        </tr>
                    ) : (
                        leaves.map((req) => {
                            const badge = getBadge(req.status);
                            return (
                                <tr key={req.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                                    <td style={{ padding: '12px' }}>#{req.id}</td>
                                    <td style={{ padding: '12px' }}><strong>{req.employeeName || `Emp #${req.employeeId}`}</strong></td>
                                    <td style={{ padding: '12px' }}>{req.leaveType}</td>
                                    <td style={{ padding: '12px' }}>{req.startDate} to {req.endDate}</td>
                                    <td style={{ padding: '12px' }}>{req.reason}</td>
                                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', backgroundColor: badge.bg, color: badge.color }}>
                        {req.status}
                      </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        {req.status === 'PENDING' ? (
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => onUpdateStatus(req.id, 'APPROVED')}
                                                    style={{ backgroundColor: '#198754', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => onUpdateStatus(req.id, 'REJECTED')}
                                                    style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span style={{ color: '#6c757d', fontSize: '12px' }}>Completed</span>
                                        )}
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