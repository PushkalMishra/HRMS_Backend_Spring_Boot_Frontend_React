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

export default function PayrollForm({ formData, onChange, onSubmit }) {
    return (
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '32px', border: '1px solid #e9ecef' }}>
            <h3>Generate Payroll Record</h3>
            <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Employee ID *</label>
                    <input
                        type="number"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={onChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Month *</label>
                    <select
                        name="month"
                        value={formData.month}
                        onChange={onChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        {MONTHS.map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Year *</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={onChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Basic Salary ($) *</label>
                    <input
                        type="number"
                        step="0.01"
                        name="basicSalary"
                        value={formData.basicSalary}
                        onChange={onChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Bonuses ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="bonuses"
                        value={formData.bonuses}
                        onChange={onChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Deductions ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="deductions"
                        value={formData.deductions}
                        onChange={onChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#0d6efd',
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Calculate & Submit Payroll
                    </button>
                </div>
            </form>
        </div>
    );
}