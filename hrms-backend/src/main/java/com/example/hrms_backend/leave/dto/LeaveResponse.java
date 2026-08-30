package com.example.hrms_backend.leave.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveResponse {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private String leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private String status;
}