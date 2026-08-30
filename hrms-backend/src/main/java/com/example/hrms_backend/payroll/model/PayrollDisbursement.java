package com.example.hrms_backend.payroll.model;

import com.example.hrms_backend.employee.model.Employee;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "payroll_disbursements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayrollDisbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "pay_period_month", nullable = false, length = 7)
    private String payPeriodMonth;

    @Column(name = "base_salary", nullable = false, precision = 10, scale = 2)
    private BigDecimal baseSalary;

    @Column(precision = 10, scale = 2)
    private BigDecimal bonuses;

    @Column(precision = 10, scale = 2)
    private BigDecimal deductions;

    @Column(name = "net_pay", nullable = false, precision = 10, scale = 2)
    private BigDecimal netPay;

    @Column(name = "disbursement_date", nullable = false)
    private LocalDate disbursementDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;

    @Column(name = "payslip_pdf_url", length = 500)
    private String payslipPdfUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.bonuses == null) this.bonuses = BigDecimal.ZERO;
        if (this.deductions == null) this.deductions = BigDecimal.ZERO;
        if (this.status == null) this.status = PaymentStatus.PAID;
    }

    public enum PaymentStatus {
        PENDING, PAID, FAILED
    }
}