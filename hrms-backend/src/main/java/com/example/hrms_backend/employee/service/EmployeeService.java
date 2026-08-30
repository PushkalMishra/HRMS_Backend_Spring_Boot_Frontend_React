package com.example.hrms_backend.employee.service;

import com.example.hrms_backend.employee.dto.EmployeeRequest;
import com.example.hrms_backend.employee.dto.EmployeeResponse;

import java.util.List;

public interface EmployeeService {
    EmployeeResponse createEmployee(EmployeeRequest request);
    EmployeeResponse getEmployeeById(Long id);
    List<EmployeeResponse> getAllEmployees();
    EmployeeResponse updateEmployee(Long id, EmployeeRequest request);
    void deleteEmployee(Long id);
}