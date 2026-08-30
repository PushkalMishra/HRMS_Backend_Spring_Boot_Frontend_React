package com.example.hrms_backend.leave.service;

import com.example.hrms_backend.leave.dto.LeaveCreateRequest;
import com.example.hrms_backend.leave.dto.LeaveResponse;

import java.util.List;

public interface LeaveService {
    LeaveResponse applyLeave(LeaveCreateRequest request);
    LeaveResponse getLeaveById(Long id);
    List<LeaveResponse> getLeavesByEmployee(Long employeeId);
    List<LeaveResponse> getAllLeaves();
    LeaveResponse updateLeaveStatus(Long id, String status);
}