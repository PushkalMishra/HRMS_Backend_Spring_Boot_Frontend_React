package com.example.hrms_backend.payroll.service.impl;

import com.example.hrms_backend.attendance.model.Attendance;
import com.example.hrms_backend.attendance.repository.AttendanceRepository;
import com.example.hrms_backend.employee.model.Employee;
import com.example.hrms_backend.employee.repository.EmployeeRepository;
import com.example.hrms_backend.payroll.dto.PayrollRequest;
import com.example.hrms_backend.payroll.dto.PayrollResponse;
import com.example.hrms_backend.payroll.model.PayrollDisbursement;
import com.example.hrms_backend.payroll.repository.PayrollDisbursementRepository;
import com.example.hrms_backend.payroll.service.PayrollService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PayrollServiceImpl implements PayrollService {

    private final PayrollDisbursementRepository payrollDisbursementRepository;
    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;

    @Override
    public PayrollResponse generatePayroll(PayrollRequest request) {
        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + request.getEmployeeId()));

        // 1. Fetch base salary from Employee entity (fallback to request basic salary if null)
        BigDecimal baseSalary = employee.getBasicSalary() != null
                ? employee.getBasicSalary()
                : (request.getBasicSalary() != null ? BigDecimal.valueOf(request.getBasicSalary()) : BigDecimal.ZERO);

        // 2. Determine targeted month date range
        int year = request.getYear();
        int month = request.getMonth();
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();
        int daysInMonth = yearMonth.lengthOfMonth();

        // 3. Count ABSENT days recorded in attendance repository
        long absentDays = attendanceRepository.countByEmployeeIdAndAttendanceDateBetweenAndStatus(
                employee.getId(), startDate, endDate, Attendance.AttendanceStatus.ABSENT
        );

        // 4. Calculate daily rate and absence deduction
        BigDecimal dailyRate = daysInMonth > 0
                ? baseSalary.divide(BigDecimal.valueOf(daysInMonth), 2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;
        BigDecimal absenceDeduction = dailyRate.multiply(BigDecimal.valueOf(absentDays));

        // 5. Aggregate bonuses & total deductions
        BigDecimal bonus = request.getBonuses() != null ? BigDecimal.valueOf(request.getBonuses()) : BigDecimal.ZERO;
        BigDecimal fixedDeductions = request.getDeductions() != null ? BigDecimal.valueOf(request.getDeductions()) : BigDecimal.ZERO;

        BigDecimal totalDeductions = fixedDeductions.add(absenceDeduction);
        BigDecimal netSalary = baseSalary.add(bonus).subtract(totalDeductions);

        // 6. Build and persist PayrollDisbursement entity
        String payPeriodMonth = String.format("%d-%02d", year, month);
        PayrollDisbursement payroll = PayrollDisbursement.builder()
                .employee(employee)
                .payPeriodMonth(payPeriodMonth)
                .baseSalary(baseSalary)
                .bonuses(bonus)
                .deductions(totalDeductions)
                .netPay(netSalary)
                .disbursementDate(LocalDate.now())
                .status(PayrollDisbursement.PaymentStatus.PENDING)
                .build();

        PayrollDisbursement saved = payrollDisbursementRepository.save(payroll);
        return mapToResponse(saved);
    }

    @Override
    public PayrollResponse getPayrollById(Long id) {
        PayrollDisbursement payroll = payrollDisbursementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payroll record not found with id: " + id));
        return mapToResponse(payroll);
    }

    @Override
    public List<PayrollResponse> getPayrollByEmployee(Long employeeId) {
        return payrollDisbursementRepository.findByEmployeeId(employeeId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PayrollResponse> getAllPayrolls() {
        return payrollDisbursementRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PayrollResponse processPayment(Long id) {
        PayrollDisbursement payroll = payrollDisbursementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payroll record not found with id: " + id));

        payroll.setStatus(PayrollDisbursement.PaymentStatus.PAID);
        PayrollDisbursement updated = payrollDisbursementRepository.save(payroll);
        return mapToResponse(updated);
    }

    private PayrollResponse mapToResponse(PayrollDisbursement payroll) {
        Integer year = null;
        Integer month = null;

        if (payroll.getPayPeriodMonth() != null && payroll.getPayPeriodMonth().contains("-")) {
            String[] parts = payroll.getPayPeriodMonth().split("-");
            if (parts.length == 2) {
                year = Integer.parseInt(parts[0]);
                month = Integer.parseInt(parts[1]);
            }
        }

        return PayrollResponse.builder()
                .id(payroll.getId())
                .employeeId(payroll.getEmployee().getId())
                .employeeName(payroll.getEmployee().getFirstName() + " " + payroll.getEmployee().getLastName())
                .month(month)
                .year(year)
                .basicSalary(payroll.getBaseSalary() != null ? payroll.getBaseSalary().doubleValue() : null)
                .bonuses(payroll.getBonuses() != null ? payroll.getBonuses().doubleValue() : null)
                .deductions(payroll.getDeductions() != null ? payroll.getDeductions().doubleValue() : null)
                .netSalary(payroll.getNetPay() != null ? payroll.getNetPay().doubleValue() : null)
                .status(payroll.getStatus() != null ? payroll.getStatus().name() : null)
                .build();
    }
}