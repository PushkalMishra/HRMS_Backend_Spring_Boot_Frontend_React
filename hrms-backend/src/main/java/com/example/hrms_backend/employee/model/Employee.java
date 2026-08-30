package com.example.hrms_backend.employee.model;

import com.example.hrms_backend.auth.model.User;
import com.example.hrms_backend.department.model.Department;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Employee manager;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(nullable = false, length = 100)
    private String designation;

    @Column(name = "joining_date", nullable = false)
    private LocalDate joiningDate;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "basic_salary", nullable = false, precision = 10, scale = 2)
    private BigDecimal basicSalary;

    @Builder.Default
    @Column(name = "casual_leave_balance", nullable = false)
    private Integer casualLeaveBalance = 12;

    @Builder.Default
    @Column(name = "sick_leave_balance", nullable = false)
    private Integer sickLeaveBalance = 10;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}