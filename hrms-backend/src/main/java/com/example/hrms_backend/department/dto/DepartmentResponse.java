package com.example.hrms_backend.department.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentResponse {
    private Long id;
    private String name;
    private String code;
    private String description;
}