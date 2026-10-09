package com.algorithmvisualizer.backend.progress.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.algorithmvisualizer.backend.entity.User;
import com.algorithmvisualizer.backend.progress.dto.ProgressResponse;
import com.algorithmvisualizer.backend.quiz.entity.Quiz;
import com.algorithmvisualizer.backend.quiz.entity.QuizAttempt;
import com.algorithmvisualizer.backend.quiz.repository.QuizAttemptRepository;
import com.algorithmvisualizer.backend.quiz.repository.QuizRepository;

@Service
public class ProgressService {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    public ProgressService(
            QuizRepository quizRepository,
            QuizAttemptRepository quizAttemptRepository) {

        this.quizRepository = quizRepository;
        this.quizAttemptRepository = quizAttemptRepository;
    }

    public ProgressResponse getUserProgress(User user) {

        // Get all available quizzes
        List<Quiz> quizzes = quizRepository.findAll();

        // Get all quiz attempts made by this user
        List<QuizAttempt> attempts =
                quizAttemptRepository.findByUserId(user.getId());

        // Group attempts by quiz ID
        Map<Long, List<QuizAttempt>> attemptsByQuiz =
                attempts.stream()
                        .collect(Collectors.groupingBy(
                                attempt -> attempt.getQuiz().getId()
                        ));

        List<ProgressResponse.AlgorithmProgress> algorithmProgress =
                new ArrayList<>();

        int completedAlgorithms = 0;

        for (Quiz quiz : quizzes) {

            List<QuizAttempt> quizAttempts =
                    attemptsByQuiz.getOrDefault(
                            quiz.getId(),
                            new ArrayList<>()
                    );

            boolean completed = !quizAttempts.isEmpty();

            if (completed) {
                completedAlgorithms++;
            }

            double bestScore = 0.0;
            double latestScore = 0.0;

            if (!quizAttempts.isEmpty()) {

                // Find best score
                bestScore = quizAttempts.stream()
                        .mapToDouble(QuizAttempt::getPercentage)
                        .max()
                        .orElse(0.0);

                // Find latest attempt
                QuizAttempt latestAttempt = quizAttempts.stream()
                        .max(Comparator.comparing(
                                QuizAttempt::getCompletedAt
                        ))
                        .orElse(null);

                if (latestAttempt != null) {
                    latestScore = latestAttempt.getPercentage();
                }
            }

            algorithmProgress.add(
                    new ProgressResponse.AlgorithmProgress(
                            quiz.getId(),
                            quiz.getAlgorithm(),
                            quiz.getTitle(),
                            completed,
                            quizAttempts.size(),
                            bestScore,
                            latestScore
                    )
            );
        }

        int totalAlgorithms = quizzes.size();

        double overallProgress = totalAlgorithms == 0
                ? 0.0
                : ((double) completedAlgorithms / totalAlgorithms) * 100.0;

        // Calculate average score
        double averageScore = 0.0;

        if (!attempts.isEmpty()) {

            double totalScore = 0.0;

            for (QuizAttempt attempt : attempts) {
                totalScore += attempt.getPercentage();
            }

            averageScore = totalScore / attempts.size();
        }

        return new ProgressResponse(
                totalAlgorithms,
                completedAlgorithms,
                overallProgress,
                attempts.size(),
                averageScore,
                algorithmProgress
        );
    }
}