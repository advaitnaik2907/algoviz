package com.algorithmvisualizer.backend.quiz.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algorithmvisualizer.backend.entity.User;
import com.algorithmvisualizer.backend.quiz.dto.QuizAttemptResponse;
import com.algorithmvisualizer.backend.quiz.dto.QuizLibraryResponse;
import com.algorithmvisualizer.backend.quiz.dto.QuizResponse;
import com.algorithmvisualizer.backend.quiz.dto.QuizResultResponse;
import com.algorithmvisualizer.backend.quiz.dto.QuizSubmitRequest;
import com.algorithmvisualizer.backend.quiz.service.QuizService;
import com.algorithmvisualizer.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    private final QuizService quizService;
    private final UserRepository userRepository;

    public QuizController(
            QuizService quizService,
            UserRepository userRepository) {

        this.quizService = quizService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<QuizLibraryResponse>> getQuizLibrary(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<QuizLibraryResponse> quizzes =
                quizService.getQuizLibrary(user);

        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/{algorithm}")
    public ResponseEntity<QuizResponse> getQuiz(
            @PathVariable String algorithm) {

        QuizResponse quiz =
                quizService.getQuizByAlgorithm(algorithm);

        return ResponseEntity.ok(quiz);
    }

    @PostMapping("/{quizId}/submit")
    public ResponseEntity<QuizResultResponse> submitQuiz(
            @PathVariable Long quizId,
            @RequestBody QuizSubmitRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        QuizResultResponse result =
                quizService.submitQuiz(
                        quizId,
                        request,
                        user);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/attempts/history")
    public ResponseEntity<List<QuizAttemptResponse>> getAttemptHistory(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<QuizAttemptResponse> attempts =
                quizService.getUserAttemptHistory(user);

        return ResponseEntity.ok(attempts);
    }
}