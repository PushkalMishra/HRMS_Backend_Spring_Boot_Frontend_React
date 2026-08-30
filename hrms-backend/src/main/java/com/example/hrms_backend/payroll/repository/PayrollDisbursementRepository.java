package com.example.hrms_backend.payroll.repository;

import com.example.hrms_backend.payroll.model.PayrollDisbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PayrollDisbursementRepository extends JpaRepository<PayrollDisbursement, Long> {
    List<PayrollDisbursement> findByEmployeeId(Long employeeId);
    List<PayrollDisbursement> findByPayPeriodMonth(String payPeriodMonth);
}