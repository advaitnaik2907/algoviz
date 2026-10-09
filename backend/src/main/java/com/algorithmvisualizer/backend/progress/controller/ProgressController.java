package com.algorithmvisualizer.backend.progress.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algorithmvisualizer.backend.entity.User;
import com.algorithmvisualizer.backend.progress.dto.ProgressResponse;
import com.algorithmvisualizer.backend.progress.service.ProgressService;
import com.algorithmvisualizer.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;
    private final UserRepository userRepository;

    public ProgressController(
            ProgressService progressService,
            UserRepository userRepository) {

        this.progressService = progressService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<ProgressResponse> getProgress(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        ProgressResponse progress =
                progressService.getUserProgress(user);

        return ResponseEntity.ok(progress);
    }
}