package com.algorithmvisualizer.backend.quiz.repository;

import com.algorithmvisualizer.backend.quiz.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByQuizId(Long quizId);
}

