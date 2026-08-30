package com.example.hrms_backend.department.repository;

import com.example.hrms_backend.department.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findByName(String name);
    Optional<Department> findByCode(String code);
    Boolean existsByName(String name);
    Boolean existsByCode(String code);
}