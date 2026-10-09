package com.algorithmvisualizer.backend.quiz.repository;

import com.algorithmvisualizer.backend.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    Optional<Quiz> findByAlgorithm(String algorithm);
}

