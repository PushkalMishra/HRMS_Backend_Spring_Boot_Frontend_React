package com.example.hrms_backend.payroll.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayrollResponse {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private Integer month;
    private Integer year;
    private Double basicSalary;
    private Double bonuses;
    private Double deductions;
    private Double netSalary;
    private String status;
}