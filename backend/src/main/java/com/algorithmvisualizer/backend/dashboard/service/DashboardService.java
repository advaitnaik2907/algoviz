package com.algorithmvisualizer.backend.dashboard.service;

import com.algorithmvisualizer.backend.dashboard.dto.DashboardResponse;
import com.algorithmvisualizer.backend.entity.User;
import com.algorithmvisualizer.backend.quiz.entity.QuizAttempt;
import com.algorithmvisualizer.backend.quiz.repository.QuizAttemptRepository;
import com.algorithmvisualizer.backend.quiz.repository.QuizRepository;

import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    public DashboardService(
            QuizRepository quizRepository,
            QuizAttemptRepository quizAttemptRepository) {

        this.quizRepository = quizRepository;
        this.quizAttemptRepository = quizAttemptRepository;
    }

    public DashboardResponse getDashboard(User user) {

        // Get all available quizzes
        int totalAlgorithms = (int) quizRepository.count();

        // Get all attempts made by this user
        List<QuizAttempt> attempts =
                quizAttemptRepository.findByUserId(user.getId());

        // Find number of unique completed algorithms
        long completedAlgorithms = attempts.stream()
                .map(attempt -> attempt.getQuiz().getId())
                .distinct()
                .count();

        // Calculate overall progress
        double overallProgress = totalAlgorithms == 0
                ? 0.0
                : ((double) completedAlgorithms / totalAlgorithms) * 100.0;

        // Total attempts
        int totalAttempts = attempts.size();

        // Calculate average score
        double averageScore = 0.0;

        if (!attempts.isEmpty()) {

            double totalScore = 0.0;

            for (QuizAttempt attempt : attempts) {
                totalScore += attempt.getPercentage();
            }

            averageScore = totalScore / attempts.size();
        }

        // Get latest 5 attempts
        List<DashboardResponse.RecentAttempt> recentAttempts =
                attempts.stream()
                        .sorted(
                                Comparator.comparing(
                                        QuizAttempt::getCompletedAt
                                ).reversed()
                        )
                        .limit(5)
                        .map(attempt ->
                                new DashboardResponse.RecentAttempt(
                                        attempt.getQuiz().getAlgorithm(),
                                        attempt.getQuiz().getTitle(),
                                        attempt.getScore(),
                                        attempt.getTotalQuestions(),
                                        attempt.getPercentage(),
                                        attempt.getCompletedAt().toString()
                                )
                        )
                        .collect(Collectors.toList());

        return new DashboardResponse(
                totalAlgorithms,
                (int) completedAlgorithms,
                overallProgress,
                totalAttempts,
                averageScore,
                recentAttempts
        );
    }
}