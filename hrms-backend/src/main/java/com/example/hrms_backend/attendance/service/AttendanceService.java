package com.example.hrms_backend.attendance.service;

import com.example.hrms_backend.attendance.dto.AttendanceRequest;
import com.example.hrms_backend.attendance.dto.AttendanceResponse;

import java.util.List;

public interface AttendanceService {
    AttendanceResponse logAttendance(AttendanceRequest request);
    AttendanceResponse getAttendanceById(Long id);
    List<AttendanceResponse> getAttendanceByEmployee(Long employeeId);
    List<AttendanceResponse> getAllAttendance();
    AttendanceResponse updateAttendance(Long id, AttendanceRequest request);
}