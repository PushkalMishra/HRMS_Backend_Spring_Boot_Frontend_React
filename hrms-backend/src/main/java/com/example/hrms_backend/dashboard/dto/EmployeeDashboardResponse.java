package com.example.hrms_backend.dashboard.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDashboardResponse {
    private Integer casualLeaveBalance;
    private Integer sickLeaveBalance;
    private String todayAttendanceStatus;
    private String latestPayrollStatus;
}