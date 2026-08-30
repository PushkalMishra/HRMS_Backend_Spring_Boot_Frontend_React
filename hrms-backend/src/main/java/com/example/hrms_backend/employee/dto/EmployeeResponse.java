package com.example.hrms_backend.employee.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String designation;
    private BigDecimal basicSalary;      // Added
    private Integer casualLeaveBalance; // Added
    private Integer sickLeaveBalance;   // Added
    private LocalDate joiningDate;
    private Long departmentId;
    private String departmentName;
    private Long managerId;
    private String managerName;
    private Long userId;
}