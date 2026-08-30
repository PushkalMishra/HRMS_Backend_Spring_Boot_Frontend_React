package com.example.hrms_backend.leave.repository;

import com.example.hrms_backend.leave.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmployeeId(Long employeeId);
    List<LeaveRequest> findByStatus(LeaveRequest.LeaveStatus status);
}