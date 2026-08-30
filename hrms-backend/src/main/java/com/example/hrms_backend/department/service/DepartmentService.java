package com.example.hrms_backend.department.service;

import com.example.hrms_backend.department.dto.DepartmentRequest;
import com.example.hrms_backend.department.dto.DepartmentResponse;

import java.util.List;

public interface DepartmentService {
    DepartmentResponse createDepartment(DepartmentRequest request);
    DepartmentResponse getDepartmentById(Long id);
    List<DepartmentResponse> getAllDepartments();
    DepartmentResponse updateDepartment(Long id, DepartmentRequest request);
    void deleteDepartment(Long id);
}