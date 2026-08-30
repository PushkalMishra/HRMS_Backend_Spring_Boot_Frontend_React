package com.example.hrms_backend.document.model;

import com.example.hrms_backend.employee.model.Employee;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "document_name", nullable = false)
    private String documentName;

    @Column(name = "document_type", nullable = false)
    private String documentType;

    @Column(name = "file_url", nullable = false, length = 1000)
    private String fileUrl;

    @Column(name = "uploaded_at", updatable = false)
    private LocalDateTime uploadedAt;

    @PrePersist
    protected void onCreate() {
        this.uploadedAt = LocalDateTime.now();
    }
}