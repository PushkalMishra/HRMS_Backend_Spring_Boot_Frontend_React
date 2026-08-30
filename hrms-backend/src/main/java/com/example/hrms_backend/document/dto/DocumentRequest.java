package com.example.hrms_backend.document.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentRequest {

    @NotNull(message = "Employee ID is required")
    private Long employeeId;

    @NotBlank(message = "Document name is required")
    private String documentName;

    @NotBlank(message = "Document type is required (e.g., RESUME, PASSPORT, OFFER_LETTER)")
    private String documentType;

    @NotBlank(message = "File URL is required")
    private String fileUrl;
}