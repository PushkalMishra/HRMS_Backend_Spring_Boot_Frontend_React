package com.example.hrms_backend.auth.service;

import com.example.hrms_backend.auth.dto.JwtResponse;
import com.example.hrms_backend.auth.dto.LoginRequest;
import com.example.hrms_backend.auth.dto.RegisterRequest;

public interface AuthService {
    JwtResponse login(LoginRequest request);
    String register(RegisterRequest request);
}