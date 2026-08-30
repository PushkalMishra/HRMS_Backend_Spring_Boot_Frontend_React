package com.example.hrms_backend.document.repository;

import com.example.hrms_backend.document.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByEmployeeId(Long employeeId);
}