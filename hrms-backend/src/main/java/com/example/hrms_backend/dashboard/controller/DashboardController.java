package com.example.hrms_backend.dashboard.controller;

import com.example.hrms_backend.dashboard.dto.EmployeeDashboardResponse;
import com.example.hrms_backend.dashboard.dto.HrDashboardResponse;
import com.example.hrms_backend.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/hr")
    public ResponseEntity<HrDashboardResponse> getHrDashboard() {
        return ResponseEntity.ok(dashboardService.getHrDashboardStats());
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<EmployeeDashboardResponse> getEmployeeDashboard(@PathVariable Long employeeId) {
        return ResponseEntity.ok(dashboardService.getEmployeeDashboardStats(employeeId));
    }
}