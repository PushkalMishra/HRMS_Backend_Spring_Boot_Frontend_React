package com.example.hrms_backend.payroll.controller;

import com.example.hrms_backend.payroll.dto.PayrollRequest;
import com.example.hrms_backend.payroll.dto.PayrollResponse;
import com.example.hrms_backend.payroll.service.PayrollService;
import com.example.hrms_backend.payroll.service.PdfGeneratorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/api/payrolls")
@RequiredArgsConstructor
public class PayrollController {

    private final PayrollService payrollService;
    private final PdfGeneratorService pdfGeneratorService;
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'HR_MANAGER')")
    public ResponseEntity<PayrollResponse> generatePayroll(@Valid @RequestBody PayrollRequest request) {
        return new ResponseEntity<>(payrollService.generatePayroll(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','HR_MANAGER', 'EMPLOYEE')")
    public ResponseEntity<PayrollResponse> getPayrollById(@PathVariable Long id) {
        return ResponseEntity.ok(payrollService.getPayrollById(id));
    }

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasAnyRole('ADMIN','HR_MANAGER', 'EMPLOYEE')")
    public ResponseEntity<List<PayrollResponse>> getPayrollByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(payrollService.getPayrollByEmployee(employeeId));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','HR_MANAGER')")
    public ResponseEntity<List<PayrollResponse>> getAllPayrolls() {
        return ResponseEntity.ok(payrollService.getAllPayrolls());
    }

    @PutMapping("/{id}/pay")
    @PreAuthorize("hasAnyRole('ADMIN','HR_MANAGER')")
    public ResponseEntity<PayrollResponse> processPayment(@PathVariable Long id) {
        return ResponseEntity.ok(payrollService.processPayment(id));
    }
    @GetMapping("/{id}/download-pdf")
    @PreAuthorize("hasAnyRole('ADMIN','HR_MANAGER', 'EMPLOYEE')")
    public ResponseEntity<InputStreamResource> downloadPayslip(@PathVariable Long id) {
        PayrollResponse payroll = payrollService.getPayrollById(id);

        ByteArrayInputStream pdfStream = pdfGeneratorService.generatePayslipPdf(
                payroll.getEmployeeName(),
                payroll.getMonth() + "/" + payroll.getYear(),
                payroll.getBasicSalary(),
                payroll.getBonuses(),
                payroll.getDeductions(),
                payroll.getNetSalary()
        );

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=payslip_" + id + ".pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(pdfStream));
    }
}