package com.example.hrms_backend.attendance.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRequest {

    @NotNull(message = "Employee ID is required")
    private Long employeeId;

    @NotNull(message = "Date is required")
    private LocalDate date;

    private LocalTime checkInTime;
    private LocalTime checkOutTime;

    @NotNull(message = "Status is required (PRESENT, ABSENT, LEAVE)")
    private String status;
}