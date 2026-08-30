package com.example.hrms_backend.payroll.service;

import com.example.hrms_backend.payroll.dto.PayrollRequest;
import com.example.hrms_backend.payroll.dto.PayrollResponse;

import java.util.List;

public interface PayrollService {
    PayrollResponse generatePayroll(PayrollRequest request);
    PayrollResponse getPayrollById(Long id);
    List<PayrollResponse> getPayrollByEmployee(Long employeeId);
    List<PayrollResponse> getAllPayrolls();
    PayrollResponse processPayment(Long id);
}