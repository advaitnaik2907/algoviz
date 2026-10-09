package com.algorithmvisualizer.backend.dashboard.dto;

import java.util.List;

public class DashboardResponse {

    private int totalAlgorithms;
    private int completedAlgorithms;
    private double overallProgress;

    private int totalAttempts;
    private double averageScore;

    private List<RecentAttempt> recentAttempts;

    public DashboardResponse() {
    }

    public DashboardResponse(
            int totalAlgorithms,
            int completedAlgorithms,
            double overallProgress,
            int totalAttempts,
            double averageScore,
            List<RecentAttempt> recentAttempts) {

        this.totalAlgorithms = totalAlgorithms;
        this.completedAlgorithms = completedAlgorithms;
        this.overallProgress = overallProgress;
        this.totalAttempts = totalAttempts;
        this.averageScore = averageScore;
        this.recentAttempts = recentAttempts;
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

    public List<RecentAttempt> getRecentAttempts() {
        return recentAttempts;
    }

    public static class RecentAttempt {

        private String algorithm;
        private String quizTitle;
        private int score;
        private int totalQuestions;
        private double percentage;
        private String completedAt;

        public RecentAttempt() {
        }

        public RecentAttempt(
                String algorithm,
                String quizTitle,
                int score,
                int totalQuestions,
                double percentage,
                String completedAt) {

            this.algorithm = algorithm;
            this.quizTitle = quizTitle;
            this.score = score;
            this.totalQuestions = totalQuestions;
            this.percentage = percentage;
            this.completedAt = completedAt;
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

        public String getCompletedAt() {
            return completedAt;
        }
    }
}