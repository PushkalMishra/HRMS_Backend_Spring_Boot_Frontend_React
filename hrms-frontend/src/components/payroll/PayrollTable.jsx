import React from 'react';

const MONTHS = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
];

export default function PayrollTable({
                                         payrolls,
                                         loading,
                                         isEmployee,
                                         filterEmpId,
                                         setFilterEmpId,
                                         onFilter,
                                         onResetFilter,
                                         onProcessPayment,
                                         onDownloadPdf,
                                     }) {
    return (
        <>
            {/* Filter Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3>{isEmployee ? 'Personal Payslips' : 'Disbursement Logs'}</h3>
                {!isEmployee && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="number"
                            placeholder="Search by Employee ID"
                            value={filterEmpId}
                            onChange={(e) => setFilterEmpId(e.target.value)}
                            style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <button onClick={onFilter} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #6c757d' }}>
                            Filter
                        </button>
                        {filterEmpId && (
                            <button
                                onClick={onResetFilter}
                                style={{ padding: '6px 12px', borderRadius: '4px', border: 'none', background: '#e2e3e5' }}
                            >
                                Reset
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Table */}
            {loading ? (
                <p>Loading payroll records...</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', border: '1px solid #dee2e6' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#f1f3f5', borderBottom: '2px solid #dee2e6' }}>
                        <th style={{ padding: '12px' }}>ID</th>
                        <th style={{ padding: '12px' }}>Employee</th>
                        <th style={{ padding: '12px' }}>Period</th>
                        <th style={{ padding: '12px' }}>Base</th>
                        <th style={{ padding: '12px' }}>Bonus</th>
                        <th style={{ padding: '12px' }}>Deductions</th>
                        <th style={{ padding: '12px' }}>Net Pay</th>
                        <th style={{ padding: '12px' }}>Status</th>
                        <th style={{ padding: '12px' }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payrolls.length === 0 ? (
                        <tr>
                            <td colSpan="9" style={{ padding: '16px', textAlign: 'center', color: '#6c757d' }}>
                                No payroll records found.
                            </td>
                        </tr>
                    ) : (
                        payrolls.map((p) => (
                            <tr key={p.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                                <td style={{ padding: '12px' }}>#{p.id}</td>
                                <td style={{ padding: '12px' }}>
                                    <strong>{p.employeeName || `Emp #${p.employeeId}`}</strong>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {MONTHS.find((m) => m.value === p.month)?.label || p.month} {p.year}
                                </td>
                                <td style={{ padding: '12px' }}>${p.basicSalary?.toFixed(2)}</td>
                                <td style={{ padding: '12px', color: '#198754' }}>+${p.bonuses?.toFixed(2)}</td>
                                <td style={{ padding: '12px', color: '#dc3545' }}>-${p.deductions?.toFixed(2)}</td>
                                <td style={{ padding: '12px' }}>
                                    <strong>${p.netSalary?.toFixed(2)}</strong>
                                </td>
                                <td style={{ padding: '12px' }}>
                    <span
                        style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor: p.status === 'PAID' ? '#d1e7dd' : '#fff3cd',
                            color: p.status === 'PAID' ? '#0f5132' : '#664d03',
                        }}
                    >
                      {p.status}
                    </span>
                                </td>
                                <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                                    {!isEmployee && p.status !== 'PAID' && (
                                        <button
                                            onClick={() => onProcessPayment(p.id)}
                                            style={{
                                                backgroundColor: '#198754',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '6px 10px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '12px',
                                            }}
                                        >
                                            Mark Paid
                                        </button>
                                    )}
                                    <button
                                        onClick={() => onDownloadPdf(p.id, p.employeeName || 'Employee', p.month, p.year)}
                                        style={{
                                            backgroundColor: '#0dcaf0',
                                            color: '#000',
                                            border: 'none',
                                            padding: '6px 10px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                        }}
                                    >
                                        PDF Payslip
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            )}
        </>
    );
}