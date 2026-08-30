package com.example.hrms_backend.leave.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LeaveCreateRequest {

    @NotNull(message = "Employee ID is required")
    private Long employeeId;

    @NotBlank(message = "Leave type is required (e.g., SICK, CASUAL, ANNUAL)")
    private String leaveType;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    private String reason;
}