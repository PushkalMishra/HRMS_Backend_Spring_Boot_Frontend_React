package com.example.hrms_backend.leave.service.impl;

import com.example.hrms_backend.employee.model.Employee;
import com.example.hrms_backend.employee.repository.EmployeeRepository;
import com.example.hrms_backend.exception.InsufficientLeaveBalanceException;
import com.example.hrms_backend.exception.ResourceNotFoundException;
import com.example.hrms_backend.leave.dto.LeaveCreateRequest;
import com.example.hrms_backend.leave.dto.LeaveResponse;
import com.example.hrms_backend.leave.model.LeaveRequest;
import com.example.hrms_backend.leave.repository.LeaveRepository;
import com.example.hrms_backend.leave.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public LeaveResponse applyLeave(LeaveCreateRequest request) {
        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + request.getEmployeeId()));

        LeaveRequest leave = LeaveRequest.builder()
                .employee(employee)
                .leaveType(LeaveRequest.LeaveType.valueOf(request.getLeaveType().toUpperCase()))
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .reason(request.getReason())
                .status(LeaveRequest.LeaveStatus.PENDING)
                .build();

        LeaveRequest savedLeave = leaveRepository.save(leave);
        return mapToResponse(savedLeave);
    }

    @Override
    public LeaveResponse getLeaveById(Long id) {
        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave record not found with id: " + id));
        return mapToResponse(leave);
    }

    @Override
    public List<LeaveResponse> getLeavesByEmployee(Long employeeId) {
        return leaveRepository.findByEmployeeId(employeeId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<LeaveResponse> getAllLeaves() {
        return leaveRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LeaveResponse updateLeaveStatus(Long id, String status) {
        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave record not found with id: " + id));

        LeaveRequest.LeaveStatus newStatus = LeaveRequest.LeaveStatus.valueOf(status.toUpperCase());

        // Deduct leave balance when request is transitioned to APPROVED
        if (newStatus == LeaveRequest.LeaveStatus.APPROVED && leave.getStatus() != LeaveRequest.LeaveStatus.APPROVED) {
            Employee employee = leave.getEmployee();
            long requestedDays = ChronoUnit.DAYS.between(leave.getStartDate(), leave.getEndDate()) + 1;

            if (leave.getLeaveType() == LeaveRequest.LeaveType.CASUAL) {
                if (employee.getCasualLeaveBalance() < requestedDays) {
                    throw new InsufficientLeaveBalanceException("Insufficient Casual Leave balance. Available: "
                            + employee.getCasualLeaveBalance() + ", Requested: " + requestedDays);
                }
                employee.setCasualLeaveBalance(employee.getCasualLeaveBalance() - (int) requestedDays);
            } else if (leave.getLeaveType() == LeaveRequest.LeaveType.SICK) {
                if (employee.getSickLeaveBalance() < requestedDays) {
                    throw new InsufficientLeaveBalanceException("Insufficient Sick Leave balance. Available: "
                            + employee.getSickLeaveBalance() + ", Requested: " + requestedDays);
                }
                employee.setSickLeaveBalance(employee.getSickLeaveBalance() - (int) requestedDays);
            }
            employeeRepository.save(employee);
        }

        leave.setStatus(newStatus);
        LeaveRequest updatedLeave = leaveRepository.save(leave);
        return mapToResponse(updatedLeave);
    }

    private LeaveResponse mapToResponse(LeaveRequest leave) {
        return LeaveResponse.builder()
                .id(leave.getId())
                .employeeId(leave.getEmployee().getId())
                .employeeName(leave.getEmployee().getFirstName() + " " + leave.getEmployee().getLastName())
                .leaveType(leave.getLeaveType() != null ? leave.getLeaveType().name() : null)
                .startDate(leave.getStartDate())
                .endDate(leave.getEndDate())
                .reason(leave.getReason())
                .status(leave.getStatus() != null ? leave.getStatus().name() : null)
                .build();
    }
}