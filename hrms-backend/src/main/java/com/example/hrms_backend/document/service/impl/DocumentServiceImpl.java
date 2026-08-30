package com.example.hrms_backend.document.service.impl;

import com.example.hrms_backend.document.dto.DocumentRequest;
import com.example.hrms_backend.document.dto.DocumentResponse;
import com.example.hrms_backend.document.model.Document;
import com.example.hrms_backend.document.repository.DocumentRepository;
import com.example.hrms_backend.document.service.DocumentService;
import com.example.hrms_backend.employee.model.Employee;
import com.example.hrms_backend.employee.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public DocumentResponse uploadDocument(DocumentRequest request) {
        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + request.getEmployeeId()));

        Document document = Document.builder()
                .employee(employee)
                .documentName(request.getDocumentName())
                .documentType(request.getDocumentType())
                .fileUrl(request.getFileUrl())
                .build();

        Document saved = documentRepository.save(document);
        return mapToResponse(saved);
    }

    @Override
    public DocumentResponse getDocumentById(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document record not found with id: " + id));
        return mapToResponse(document);
    }

    @Override
    public List<DocumentResponse> getDocumentsByEmployee(Long employeeId) {
        return documentRepository.findByEmployeeId(employeeId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<DocumentResponse> getAllDocuments() {
        return documentRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteDocument(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document record not found with id: " + id));
        documentRepository.delete(document);
    }

    private DocumentResponse mapToResponse(Document document) {
        return DocumentResponse.builder()
                .id(document.getId())
                .employeeId(document.getEmployee().getId())
                .employeeName(document.getEmployee().getFirstName() + " " + document.getEmployee().getLastName())
                .documentName(document.getDocumentName())
                .documentType(document.getDocumentType())
                .fileUrl(document.getFileUrl())
                .uploadedAt(document.getUploadedAt())
                .build();
    }
}