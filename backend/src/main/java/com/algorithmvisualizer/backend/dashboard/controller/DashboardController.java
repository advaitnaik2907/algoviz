package com.algorithmvisualizer.backend.dashboard.controller;

import com.algorithmvisualizer.backend.dashboard.dto.DashboardResponse;
import com.algorithmvisualizer.backend.dashboard.service.DashboardService;
import com.algorithmvisualizer.backend.entity.User;
import com.algorithmvisualizer.backend.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;
    private final UserRepository userRepository;

    public DashboardController(
            DashboardService dashboardService,
            UserRepository userRepository) {

        this.dashboardService = dashboardService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public DashboardResponse getDashboard(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return dashboardService.getDashboard(user);
    }
}