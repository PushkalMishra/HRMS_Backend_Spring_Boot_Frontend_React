package com.example.hrms_backend.attendance.repository;

import com.example.hrms_backend.attendance.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByEmployeeIdAndAttendanceDate(Long employeeId, LocalDate attendanceDate);
    List<Attendance> findByEmployeeId(Long employeeId);
    List<Attendance> findByAttendanceDate(LocalDate attendanceDate);
    long countByEmployeeIdAndAttendanceDateBetweenAndStatus(
            Long employeeId,
            LocalDate startDate,
            LocalDate endDate,
            Attendance.AttendanceStatus status
    );
}