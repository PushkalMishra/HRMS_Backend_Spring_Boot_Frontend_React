package com.example.hrms_backend.attendance.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceResponse {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private LocalDate date;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    private String status;
}