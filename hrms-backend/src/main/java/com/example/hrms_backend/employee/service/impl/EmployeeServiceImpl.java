package com.example.hrms_backend.employee.service.impl;

import com.example.hrms_backend.auth.model.User;
import com.example.hrms_backend.auth.repository.UserRepository;
import com.example.hrms_backend.department.model.Department;
import com.example.hrms_backend.department.repository.DepartmentRepository;
import com.example.hrms_backend.employee.dto.EmployeeRequest;
import com.example.hrms_backend.employee.dto.EmployeeResponse;
import com.example.hrms_backend.employee.model.Employee;
import com.example.hrms_backend.employee.repository.EmployeeRepository;
import com.example.hrms_backend.employee.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;

    @Override
    public EmployeeResponse createEmployee(EmployeeRequest request) {
        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Employee email already exists");
        }

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + request.getDepartmentId()));

        Employee manager = null;
        if (request.getManagerId() != null) {
            manager = employeeRepository.findById(request.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Manager not found with id: " + request.getManagerId()));
        }

        User user = null;
        if (request.getUserId() != null) {
            user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + request.getUserId()));
        }

        Employee employee = Employee.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .designation(request.getDesignation())
                .basicSalary(request.getBasicSalary())
                .casualLeaveBalance(request.getCasualLeaveBalance() != null ? request.getCasualLeaveBalance() : 12)
                .sickLeaveBalance(request.getSickLeaveBalance() != null ? request.getSickLeaveBalance() : 10)
                .joiningDate(request.getJoiningDate())
                .department(department)
                .manager(manager)
                .user(user)
                .build();

        Employee savedEmployee = employeeRepository.save(employee);
        return mapToResponse(savedEmployee);
    }

    @Override
    public EmployeeResponse getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        return mapToResponse(employee);
    }

    @Override
    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + request.getDepartmentId()));

        Employee manager = null;
        if (request.getManagerId() != null) {
            manager = employeeRepository.findById(request.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Manager not found with id: " + request.getManagerId()));
        }

        User user = null;
        if (request.getUserId() != null) {
            user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + request.getUserId()));
        }

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPhoneNumber(request.getPhoneNumber());
        employee.setDesignation(request.getDesignation());
        if (request.getBasicSalary() != null) {
            employee.setBasicSalary(request.getBasicSalary());
        }
        if (request.getCasualLeaveBalance() != null) {
            employee.setCasualLeaveBalance(request.getCasualLeaveBalance());
        }
        if (request.getSickLeaveBalance() != null) {
            employee.setSickLeaveBalance(request.getSickLeaveBalance());
        }
        employee.setJoiningDate(request.getJoiningDate());
        employee.setDepartment(department);
        employee.setManager(manager);
        employee.setUser(user);

        Employee updatedEmployee = employeeRepository.save(employee);
        return mapToResponse(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        employeeRepository.delete(employee);
    }

    private EmployeeResponse mapToResponse(Employee employee) {
        return EmployeeResponse.builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .phoneNumber(employee.getPhoneNumber())
                .designation(employee.getDesignation())
                .basicSalary(employee.getBasicSalary())
                .casualLeaveBalance(employee.getCasualLeaveBalance())
                .sickLeaveBalance(employee.getSickLeaveBalance())
                .joiningDate(employee.getJoiningDate())
                .departmentId(employee.getDepartment() != null ? employee.getDepartment().getId() : null)
                .departmentName(employee.getDepartment() != null ? employee.getDepartment().getName() : null)
                .managerId(employee.getManager() != null ? employee.getManager().getId() : null)
                .managerName(employee.getManager() != null ? employee.getManager().getFirstName() + " " + employee.getManager().getLastName() : null)
                .userId(employee.getUser() != null ? employee.getUser().getId() : null)
                .build();
    }
}