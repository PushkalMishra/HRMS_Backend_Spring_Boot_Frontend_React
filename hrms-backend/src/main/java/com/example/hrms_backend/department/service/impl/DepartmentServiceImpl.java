package com.example.hrms_backend.department.service.impl;

import com.example.hrms_backend.department.dto.DepartmentRequest;
import com.example.hrms_backend.department.dto.DepartmentResponse;
import com.example.hrms_backend.department.model.Department;
import com.example.hrms_backend.department.repository.DepartmentRepository;
import com.example.hrms_backend.department.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public DepartmentResponse createDepartment(DepartmentRequest request) {
        if (departmentRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Department name already exists");
        }
        if (departmentRepository.existsByCode(request.getCode())) {
            throw new IllegalArgumentException("Department code already exists");
        }

        Department department = Department.builder()
                .name(request.getName())
                .code(request.getCode())
                .description(request.getDescription())
                .build();

        Department savedDepartment = departmentRepository.save(department);
        return mapToResponse(savedDepartment);
    }

    @Override
    public DepartmentResponse getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
        return mapToResponse(department);
    }

    @Override
    public List<DepartmentResponse> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DepartmentResponse updateDepartment(Long id, DepartmentRequest request) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));

        department.setName(request.getName());
        department.setCode(request.getCode());
        department.setDescription(request.getDescription());

        Department updatedDepartment = departmentRepository.save(department);
        return mapToResponse(updatedDepartment);
    }

    @Override
    public void deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
        departmentRepository.delete(department);
    }

    private DepartmentResponse mapToResponse(Department department) {
        return DepartmentResponse.builder()
                .id(department.getId())
                .name(department.getName())
                .code(department.getCode())
                .description(department.getDescription())
                .build();
    }
}