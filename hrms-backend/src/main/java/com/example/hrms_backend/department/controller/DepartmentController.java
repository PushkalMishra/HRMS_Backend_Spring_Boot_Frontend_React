package com.example.hrms_backend.department.controller;

import com.example.hrms_backend.department.dto.DepartmentRequest;
import com.example.hrms_backend.department.dto.DepartmentResponse;
import com.example.hrms_backend.department.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @PostMapping
    public ResponseEntity<DepartmentResponse> createDepartment(@Valid @RequestBody DepartmentRequest request) {
        return new ResponseEntity<>(departmentService.createDepartment(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentResponse> getDepartmentById(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }

    @GetMapping
    public ResponseEntity<List<DepartmentResponse>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentResponse> updateDepartment(@PathVariable Long id, @Valid @RequestBody DepartmentRequest request) {
        return ResponseEntity.ok(departmentService.updateDepartment(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok("Department deleted successfully!");
    }
}