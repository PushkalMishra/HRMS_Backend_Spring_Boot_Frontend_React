package com.example.hrms_backend.config;

import com.example.hrms_backend.auth.model.Role;
import com.example.hrms_backend.auth.model.User;
import com.example.hrms_backend.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByEmail("admin@hrms.com").isEmpty()) {
            User admin = User.builder()
                    .username("admin") // <-- Added missing non-null field
                    .email("admin@hrms.com")
                    .password(passwordEncoder.encode("Admin@123"))
                    .role(Role.ROLE_ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println(">>> Initial Admin Account Created: admin@hrms.com / Admin@123");
        }
    }
}