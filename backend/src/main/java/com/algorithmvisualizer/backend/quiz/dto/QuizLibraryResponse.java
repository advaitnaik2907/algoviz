package com.algorithmvisualizer.backend.quiz.dto;

public class QuizLibraryResponse {

    private Long id;
    private String algorithm;
    private String title;
    private int totalQuestions;
    private boolean completed;
    private int attemptCount;
    private int bestScore;
    private double bestPercentage;

    public QuizLibraryResponse(
            Long id,
            String algorithm,
            String title,
            int totalQuestions,
            boolean completed,
            int attemptCount,
            int bestScore,
            double bestPercentage) {

        this.id = id;
        this.algorithm = algorithm;
        this.title = title;
        this.totalQuestions = totalQuestions;
        this.completed = completed;
        this.attemptCount = attemptCount;
        this.bestScore = bestScore;
        this.bestPercentage = bestPercentage;
    }

    public Long getId() {
        return id;
    }

    public String getAlgorithm() {
        return algorithm;
    }

    public String getTitle() {
        return title;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public boolean isCompleted() {
        return completed;
    }

    public int getAttemptCount() {
        return attemptCount;
    }

    public int getBestScore() {
        return bestScore;
    }

    public double getBestPercentage() {
        return bestPercentage;
    }
}