package com.algorithmvisualizer.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algorithmvisualizer.backend.entity.User;
import com.algorithmvisualizer.backend.security.JwtService;
import com.algorithmvisualizer.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(
            UserService userService,
            JwtService jwtService
    ) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody User user) {

        User savedUser = userService.signup(user);

        AuthResponse response = new AuthResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        return userService.findByEmail(request.getEmail())
                .map(user -> {

                    boolean passwordMatches =
                            userService.checkPassword(
                                    request.getPassword(),
                                    user.getPassword()
                            );

                    if (!passwordMatches) {
                        return ResponseEntity.status(401)
                                .body("Invalid email or password");
                    }

                    String token =
                            jwtService.generateToken(user.getEmail());

                    Map<String, Object> response = new HashMap<>();

                    response.put("token", token);
                    response.put("name", user.getName());
                    response.put("email", user.getEmail());

                    return ResponseEntity.ok(response);
                })
                .orElse(
                        ResponseEntity.status(401)
                                .body("Invalid email or password")
                );
    }
}