package com.example.hrms_backend.attendance.controller;

import com.example.hrms_backend.attendance.dto.AttendanceRequest;
import com.example.hrms_backend.attendance.dto.AttendanceResponse;
import com.example.hrms_backend.attendance.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping
    public ResponseEntity<AttendanceResponse> logAttendance(@Valid @RequestBody AttendanceRequest request) {
        return new ResponseEntity<>(attendanceService.logAttendance(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceResponse> getAttendanceById(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.getAttendanceById(id));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<AttendanceResponse>> getAttendanceByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByEmployee(employeeId));
    }

    @GetMapping
    public ResponseEntity<List<AttendanceResponse>> getAllAttendance() {
        return ResponseEntity.ok(attendanceService.getAllAttendance());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttendanceResponse> updateAttendance(@PathVariable Long id, @Valid @RequestBody AttendanceRequest request) {
        return ResponseEntity.ok(attendanceService.updateAttendance(id, request));
    }
}