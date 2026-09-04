import React from 'react';

export default function LeaveBalanceCards() {
    const balances = [
        { type: 'Casual Leave', available: 12, total: 12, bg: '#e7f1ff', color: '#0d6efd' },
        { type: 'Sick Leave', available: 10, total: 10, bg: '#f8d7da', color: '#842029' },
        { type: 'Unpaid Leave', available: 'Unlimited', total: 'N/A', bg: '#e2e3e5', color: '#41464b' },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {balances.map((b) => (
                <div key={b.type} style={{ background: b.bg, color: b.color, padding: '16px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>{b.type}</h4>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
                        {b.available} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>/ {b.total} days</span>
                    </p>
                </div>
            ))}
        </div>
    );
}