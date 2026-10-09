package com.algorithmvisualizer.backend.quiz.dto;

import java.time.LocalDateTime;

public class QuizAttemptResponse {

    private Long attemptId;
    private Long quizId;
    private String algorithm;
    private String quizTitle;
    private int score;
    private int totalQuestions;
    private double percentage;
    private LocalDateTime completedAt;

    public QuizAttemptResponse() {
    }

    public QuizAttemptResponse(
            Long attemptId,
            Long quizId,
            String algorithm,
            String quizTitle,
            int score,
            int totalQuestions,
            double percentage,
            LocalDateTime completedAt) {

        this.attemptId = attemptId;
        this.quizId = quizId;
        this.algorithm = algorithm;
        this.quizTitle = quizTitle;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.percentage = percentage;
        this.completedAt = completedAt;
    }

    public Long getAttemptId() {
        return attemptId;
    }

    public Long getQuizId() {
        return quizId;
    }

    public String getAlgorithm() {
        return algorithm;
    }

    public String getQuizTitle() {
        return quizTitle;
    }

    public int getScore() {
        return score;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public double getPercentage() {
        return percentage;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }
}