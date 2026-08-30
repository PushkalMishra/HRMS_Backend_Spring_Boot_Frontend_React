package com.example.hrms_backend.auth.service.impl;

import com.example.hrms_backend.auth.dto.JwtResponse;
import com.example.hrms_backend.auth.dto.LoginRequest;
import com.example.hrms_backend.auth.dto.RegisterRequest;
import com.example.hrms_backend.auth.model.User;
import com.example.hrms_backend.auth.repository.UserRepository;
import com.example.hrms_backend.auth.service.AuthService;
import com.example.hrms_backend.common.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public JwtResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsernameOrEmail(),
                        request.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(request.getUsernameOrEmail())
                .orElseGet(() -> userRepository.findByEmail(request.getUsernameOrEmail())
                        .orElseThrow(() -> new RuntimeException("User not found")));

        return new JwtResponse(token, user.getId(), user.getUsername(), user.getEmail(), user.getRole().name());
    }

    @Override
    public String register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already exists!");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists!");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);
        return "User registered successfully!";
    }
}