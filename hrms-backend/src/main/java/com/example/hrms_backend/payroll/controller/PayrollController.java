package com.example.hrms_backend.payroll.controller;

import com.example.hrms_backend.payroll.dto.PayrollRequest;
import com.example.hrms_backend.payroll.dto.PayrollResponse;
import com.example.hrms_backend.payroll.service.PayrollService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payrolls")
@RequiredArgsConstructor
public class PayrollController {

    private final PayrollService payrollService;

    @PostMapping
    public ResponseEntity<PayrollResponse> generatePayroll(@Valid @RequestBody PayrollRequest request) {
        return new ResponseEntity<>(payrollService.generatePayroll(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PayrollResponse> getPayrollById(@PathVariable Long id) {
        return ResponseEntity.ok(payrollService.getPayrollById(id));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<PayrollResponse>> getPayrollByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(payrollService.getPayrollByEmployee(employeeId));
    }

    @GetMapping
    public ResponseEntity<List<PayrollResponse>> getAllPayrolls() {
        return ResponseEntity.ok(payrollService.getAllPayrolls());
    }

    @PutMapping("/{id}/pay")
    public ResponseEntity<PayrollResponse> processPayment(@PathVariable Long id) {
        return ResponseEntity.ok(payrollService.processPayment(id));
    }
}