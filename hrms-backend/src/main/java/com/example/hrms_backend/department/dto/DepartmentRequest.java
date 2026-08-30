package com.example.hrms_backend.department.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentRequest {

    @NotBlank(message = "Department name is required")
    private String name;

    @NotBlank(message = "Department code is required")
    private String code;

    private String description;
}