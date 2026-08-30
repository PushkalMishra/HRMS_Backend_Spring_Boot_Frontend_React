package com.example.hrms_backend.leave.controller;

import com.example.hrms_backend.leave.dto.LeaveCreateRequest;
import com.example.hrms_backend.leave.dto.LeaveResponse;
import com.example.hrms_backend.leave.service.LeaveService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class LeaveController {

    private final LeaveService leaveService;

    @PostMapping
    public ResponseEntity<LeaveResponse> applyLeave(@Valid @RequestBody LeaveCreateRequest request) {
        return new ResponseEntity<>(leaveService.applyLeave(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeaveResponse> getLeaveById(@PathVariable Long id) {
        return ResponseEntity.ok(leaveService.getLeaveById(id));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveResponse>> getLeavesByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveService.getLeavesByEmployee(employeeId));
    }

    @GetMapping
    public ResponseEntity<List<LeaveResponse>> getAllLeaves() {
        return ResponseEntity.ok(leaveService.getAllLeaves());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<LeaveResponse> updateLeaveStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(leaveService.updateLeaveStatus(id, status));
    }
}