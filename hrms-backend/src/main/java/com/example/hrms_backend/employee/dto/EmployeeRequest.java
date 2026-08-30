package com.example.hrms_backend.employee.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String phoneNumber;

    @NotBlank(message = "Designation is required")
    private String designation;

    @NotNull(message = "Basic salary is required")
    @Positive(message = "Basic salary must be greater than 0")
    private BigDecimal basicSalary; // Added validation

    private Integer casualLeaveBalance; // Added (optional in request)
    private Integer sickLeaveBalance;   // Added (optional in request)

    @NotNull(message = "Joining date is required")
    @PastOrPresent(message = "Joining date cannot be in the future")
    private LocalDate joiningDate;

    @NotNull(message = "Department ID is required")
    private Long departmentId;

    private Long managerId;

    private Long userId;
}