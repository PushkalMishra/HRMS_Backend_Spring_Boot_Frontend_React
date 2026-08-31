package com.example.hrms_backend.payroll.service;

import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class PdfGeneratorService {

    public ByteArrayInputStream generatePayslipPdf(String employeeName, String monthYear,
                                                   double basic, double bonus,
                                                   double deductions, double netSalary) {
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Header Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, Color.DARK_GRAY);
            Paragraph title = new Paragraph("PAYSLIP - " + monthYear, titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            // Employee Details Table
            PdfPTable empTable = new PdfPTable(2);
            empTable.setWidthPercentage(100);
            empTable.addCell("Employee Name:");
            empTable.addCell(employeeName);
            document.add(empTable);
            document.add(Chunk.NEWLINE);

            // Salary Breakdown Table
            PdfPTable salaryTable = new PdfPTable(2);
            salaryTable.setWidthPercentage(100);

            // Table Header
            PdfPCell header1 = new PdfPCell(new Phrase("Description"));
            PdfPCell header2 = new PdfPCell(new Phrase("Amount (INR)"));
            header1.setBackgroundColor(Color.LIGHT_GRAY);
            header2.setBackgroundColor(Color.LIGHT_GRAY);
            salaryTable.addCell(header1);
            salaryTable.addCell(header2);

            // Rows
            salaryTable.addCell("Basic Salary");
            salaryTable.addCell(String.valueOf(basic));
            salaryTable.addCell("Bonuses");
            salaryTable.addCell(String.valueOf(bonus));
            salaryTable.addCell("Deductions");
            salaryTable.addCell("- " + deductions);
            salaryTable.addCell("Net Payable Salary");
            salaryTable.addCell(String.valueOf(netSalary));

            document.add(salaryTable);
            document.close();

        } catch (DocumentException e) {
            throw new RuntimeException("Error generating PDF payslip", e);
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}