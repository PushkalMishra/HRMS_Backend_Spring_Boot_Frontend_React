package com.example.hrms_backend.document.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentResponse {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private String documentName;
    private String documentType;
    private String fileUrl;
    private LocalDateTime uploadedAt;
}