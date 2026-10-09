package com.algorithmvisualizer.backend.quiz.dto;

import java.util.Map;

public class QuizSubmitRequest {

    private Map<Long, String> answers;

    public QuizSubmitRequest() {
    }

    public Map<Long, String> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<Long, String> answers) {
        this.answers = answers;
    }
}

