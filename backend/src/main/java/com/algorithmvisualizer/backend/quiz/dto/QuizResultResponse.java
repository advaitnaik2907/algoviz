package com.algorithmvisualizer.backend.quiz.dto;

public class QuizResultResponse {

    private int score;
    private int totalQuestions;
    private double percentage;

    public QuizResultResponse() {
    }

    public QuizResultResponse(
            int score,
            int totalQuestions,
            double percentage) {

        this.score = score;
        this.totalQuestions = totalQuestions;
        this.percentage = percentage;
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
}

