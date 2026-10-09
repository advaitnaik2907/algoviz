package com.algorithmvisualizer.backend.quiz.dto;

import java.util.List;

public class QuizResponse {

    private Long id;
    private String algorithm;
    private String title;
    private List<QuestionResponse> questions;

    public QuizResponse() {
    }

    public QuizResponse(
            Long id,
            String algorithm,
            String title,
            List<QuestionResponse> questions) {

        this.id = id;
        this.algorithm = algorithm;
        this.title = title;
        this.questions = questions;
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

    public List<QuestionResponse> getQuestions() {
        return questions;
    }
}
