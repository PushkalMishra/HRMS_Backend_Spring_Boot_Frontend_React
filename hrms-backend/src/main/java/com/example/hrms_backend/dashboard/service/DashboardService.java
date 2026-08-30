package com.example.hrms_backend.dashboard.service;

import com.example.hrms_backend.attendance.model.Attendance.AttendanceStatus;
import com.example.hrms_backend.attendance.repository.AttendanceRepository;
import com.example.hrms_backend.dashboard.dto.EmployeeDashboardResponse;
import com.example.hrms_backend.dashboard.dto.HrDashboardResponse;
import com.example.hrms_backend.employee.model.Employee;
import com.example.hrms_backend.employee.repository.EmployeeRepository;
import com.example.hrms_backend.leave.model.LeaveRequest;
import com.example.hrms_backend.leave.repository.LeaveRepository;
import com.example.hrms_backend.payroll.model.PayrollDisbursement;
import com.example.hrms_backend.payroll.repository.PayrollDisbursementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRepository leaveRepository;
    private final PayrollDisbursementRepository payrollDisbursementRepository;

    public HrDashboardResponse getHrDashboardStats() {
        LocalDate today = LocalDate.now();
        YearMonth currentMonth = YearMonth.now();
        String currentPeriod = String.format("%d-%02d", currentMonth.getYear(), currentMonth.getMonthValue());

        long totalEmployees = employeeRepository.count();

        long presentToday = attendanceRepository.findByAttendanceDate(today).stream()
                .filter(a -> a.getStatus() == AttendanceStatus.PRESENT)
                .count();

        long absentToday = attendanceRepository.findByAttendanceDate(today).stream()
                .filter(a -> a.getStatus() == AttendanceStatus.ABSENT)
                .count();

        long pendingLeaves = leaveRepository.findAll().stream()
                .filter(l -> l.getStatus() == LeaveRequest.LeaveStatus.PENDING)
                .count();

        List<PayrollDisbursement> currentPayrolls = payrollDisbursementRepository.findAll().stream()
                .filter(p -> currentPeriod.equals(p.getPayPeriodMonth()))
                .toList();

        BigDecimal totalPayrollCost = currentPayrolls.stream()
                .map(p -> p.getNetPay() != null ? p.getNetPay() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return HrDashboardResponse.builder()
                .totalEmployees(totalEmployees)
                .presentToday(presentToday)
                .absentToday(absentToday)
                .pendingLeaveRequests(pendingLeaves)
                .totalMonthlyPayrollCost(totalPayrollCost)
                .build();
    }

    public EmployeeDashboardResponse getEmployeeDashboardStats(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + employeeId));

        LocalDate today = LocalDate.now();
        String todayStatus = attendanceRepository.findByEmployeeIdAndAttendanceDate(employeeId, today)
                .map(a -> a.getStatus().name())
                .orElse("NOT_MARKED");

        List<PayrollDisbursement> payrolls = payrollDisbursementRepository.findByEmployeeId(employeeId);
        String latestStatus = payrolls.isEmpty() ? "N/A" : payrolls.get(payrolls.size() - 1).getStatus().name();

        return EmployeeDashboardResponse.builder()
                .casualLeaveBalance(employee.getCasualLeaveBalance())
                .sickLeaveBalance(employee.getSickLeaveBalance())
                .todayAttendanceStatus(todayStatus)
                .latestPayrollStatus(latestStatus)
                .build();
    }
}