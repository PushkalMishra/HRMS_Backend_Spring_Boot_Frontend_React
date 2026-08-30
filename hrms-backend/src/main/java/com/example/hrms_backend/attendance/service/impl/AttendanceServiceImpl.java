package com.example.hrms_backend.attendance.service.impl;

import com.example.hrms_backend.attendance.dto.AttendanceRequest;
import com.example.hrms_backend.attendance.dto.AttendanceResponse;
import com.example.hrms_backend.attendance.model.Attendance;
import com.example.hrms_backend.attendance.repository.AttendanceRepository;
import com.example.hrms_backend.attendance.service.AttendanceService;
import com.example.hrms_backend.employee.model.Employee;
import com.example.hrms_backend.employee.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public AttendanceResponse logAttendance(AttendanceRequest request) {
        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + request.getEmployeeId()));

        LocalDateTime checkIn = (request.getDate() != null && request.getCheckInTime() != null)
                ? LocalDateTime.of(request.getDate(), request.getCheckInTime()) : null;

        LocalDateTime checkOut = (request.getDate() != null && request.getCheckOutTime() != null)
                ? LocalDateTime.of(request.getDate(), request.getCheckOutTime()) : null;

        Attendance.AttendanceStatus status = Attendance.AttendanceStatus.valueOf(request.getStatus().toUpperCase());

        Attendance attendance = Attendance.builder()
                .employee(employee)
                .attendanceDate(request.getDate())
                .checkInTime(checkIn)
                .checkOutTime(checkOut)
                .status(status)
                .build();

        Attendance saved = attendanceRepository.save(attendance);
        return mapToResponse(saved);
    }

    @Override
    public AttendanceResponse getAttendanceById(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance record not found with id: " + id));
        return mapToResponse(attendance);
    }

    @Override
    public List<AttendanceResponse> getAttendanceByEmployee(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceResponse> getAllAttendance() {
        return attendanceRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AttendanceResponse updateAttendance(Long id, AttendanceRequest request) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance record not found with id: " + id));

        LocalDateTime checkIn = (request.getDate() != null && request.getCheckInTime() != null)
                ? LocalDateTime.of(request.getDate(), request.getCheckInTime()) : null;

        LocalDateTime checkOut = (request.getDate() != null && request.getCheckOutTime() != null)
                ? LocalDateTime.of(request.getDate(), request.getCheckOutTime()) : null;

        attendance.setAttendanceDate(request.getDate());
        attendance.setCheckInTime(checkIn);
        attendance.setCheckOutTime(checkOut);
        attendance.setStatus(Attendance.AttendanceStatus.valueOf(request.getStatus().toUpperCase()));

        Attendance updated = attendanceRepository.save(attendance);
        return mapToResponse(updated);
    }

    private AttendanceResponse mapToResponse(Attendance attendance) {
        return AttendanceResponse.builder()
                .id(attendance.getId())
                .employeeId(attendance.getEmployee().getId())
                .employeeName(attendance.getEmployee().getFirstName() + " " + attendance.getEmployee().getLastName())
                .date(attendance.getAttendanceDate())
                .checkInTime(attendance.getCheckInTime() != null ? attendance.getCheckInTime().toLocalTime() : null)
                .checkOutTime(attendance.getCheckOutTime() != null ? attendance.getCheckOutTime().toLocalTime() : null)
                .status(attendance.getStatus() != null ? attendance.getStatus().name() : null)
                .build();
    }
}