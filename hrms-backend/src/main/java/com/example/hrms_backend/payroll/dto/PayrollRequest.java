package com.example.hrms_backend.payroll.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayrollRequest {

    @NotNull(message = "Employee ID is required")
    private Long employeeId;

    @NotNull(message = "Month is required")
    private Integer month;

    @NotNull(message = "Year is required")
    private Integer year;

    private Double basicSalary;
    private Double bonuses;
    private Double deductions;
}