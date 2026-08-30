package com.example.hrms_backend.dashboard.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HrDashboardResponse {
    private long totalEmployees;
    private long presentToday;
    private long absentToday;
    private long pendingLeaveRequests;
    private BigDecimal totalMonthlyPayrollCost;
}