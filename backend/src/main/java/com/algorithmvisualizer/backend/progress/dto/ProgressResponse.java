package com.algorithmvisualizer.backend.progress.dto;

import java.util.List;

public class ProgressResponse {

    private int totalAlgorithms;
    private int completedAlgorithms;
    private double overallProgress;
    private int totalAttempts;
    private double averageScore;
    private List<AlgorithmProgress> algorithms;

    public ProgressResponse() {
    }

    public ProgressResponse(
            int totalAlgorithms,
            int completedAlgorithms,
            double overallProgress,
            int totalAttempts,
            double averageScore,
            List<AlgorithmProgress> algorithms) {

        this.totalAlgorithms = totalAlgorithms;
        this.completedAlgorithms = completedAlgorithms;
        this.overallProgress = overallProgress;
        this.totalAttempts = totalAttempts;
        this.averageScore = averageScore;
        this.algorithms = algorithms;
    }

    public int getTotalAlgorithms() {
        return totalAlgorithms;
    }

    public int getCompletedAlgorithms() {
        return completedAlgorithms;
    }

    public double getOverallProgress() {
        return overallProgress;
    }

    public int getTotalAttempts() {
        return totalAttempts;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public List<AlgorithmProgress> getAlgorithms() {
        return algorithms;
    }

    public static class AlgorithmProgress {

        private Long quizId;
        private String algorithm;
        private String quizTitle;
        private boolean completed;
        private int attempts;
        private double bestScore;
        private double latestScore;

        public AlgorithmProgress() {
        }

        public AlgorithmProgress(
                Long quizId,
                String algorithm,
                String quizTitle,
                boolean completed,
                int attempts,
                double bestScore,
                double latestScore) {

            this.quizId = quizId;
            this.algorithm = algorithm;
            this.quizTitle = quizTitle;
            this.completed = completed;
            this.attempts = attempts;
            this.bestScore = bestScore;
            this.latestScore = latestScore;
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

        public boolean isCompleted() {
            return completed;
        }

        public int getAttempts() {
            return attempts;
        }

        public double getBestScore() {
            return bestScore;
        }

        public double getLatestScore() {
            return latestScore;
        }
    }
}