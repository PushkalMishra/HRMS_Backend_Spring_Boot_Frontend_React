package com.example.hrms_backend.document.controller;

import com.example.hrms_backend.document.dto.DocumentRequest;
import com.example.hrms_backend.document.dto.DocumentResponse;
import com.example.hrms_backend.document.service.DocumentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping
    public ResponseEntity<DocumentResponse> uploadDocument(@Valid @RequestBody DocumentRequest request) {
        DocumentResponse response = documentService.uploadDocument(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentResponse> getDocumentById(@PathVariable Long id) {
        return ResponseEntity.ok(documentService.getDocumentById(id));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<DocumentResponse>> getDocumentsByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(documentService.getDocumentsByEmployee(employeeId));
    }

    @GetMapping
    public ResponseEntity<List<DocumentResponse>> getAllDocuments() {
        return ResponseEntity.ok(documentService.getAllDocuments());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }
}