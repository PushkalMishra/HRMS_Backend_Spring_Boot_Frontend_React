package com.example.hrms_backend.document.service;

import com.example.hrms_backend.document.dto.DocumentRequest;
import com.example.hrms_backend.document.dto.DocumentResponse;

import java.util.List;

public interface DocumentService {
    DocumentResponse uploadDocument(DocumentRequest request);
    DocumentResponse getDocumentById(Long id);
    List<DocumentResponse> getDocumentsByEmployee(Long employeeId);
    List<DocumentResponse> getAllDocuments();
    void deleteDocument(Long id);
}