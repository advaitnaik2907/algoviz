package com.algorithmvisualizer.backend.quiz.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.algorithmvisualizer.backend.entity.User;
import com.algorithmvisualizer.backend.quiz.dto.QuestionResponse;
import com.algorithmvisualizer.backend.quiz.dto.QuizAttemptResponse;
import com.algorithmvisualizer.backend.quiz.dto.QuizLibraryResponse;
import com.algorithmvisualizer.backend.quiz.dto.QuizResponse;
import com.algorithmvisualizer.backend.quiz.dto.QuizResultResponse;
import com.algorithmvisualizer.backend.quiz.dto.QuizSubmitRequest;
import com.algorithmvisualizer.backend.quiz.entity.Question;
import com.algorithmvisualizer.backend.quiz.entity.Quiz;
import com.algorithmvisualizer.backend.quiz.entity.QuizAttempt;
import com.algorithmvisualizer.backend.quiz.repository.QuestionRepository;
import com.algorithmvisualizer.backend.quiz.repository.QuizAttemptRepository;
import com.algorithmvisualizer.backend.quiz.repository.QuizRepository;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    public QuizService(
            QuizRepository quizRepository,
            QuestionRepository questionRepository,
            QuizAttemptRepository quizAttemptRepository) {

        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.quizAttemptRepository = quizAttemptRepository;
    }

    public QuizResponse getQuizByAlgorithm(String algorithm) {

        Optional<Quiz> quizOptional =
                quizRepository.findByAlgorithm(algorithm);

        if (quizOptional.isEmpty()) {
            throw new RuntimeException(
                    "Quiz not found for algorithm: " + algorithm);
        }

        Quiz quiz = quizOptional.get();

        List<Question> questions =
                questionRepository.findByQuizId(quiz.getId());

        List<QuestionResponse> questionResponses =
                questions.stream()
                        .map(question -> new QuestionResponse(
                                question.getId(),
                                question.getQuestion(),
                                question.getOptionA(),
                                question.getOptionB(),
                                question.getOptionC(),
                                question.getOptionD()))
                        .collect(Collectors.toList());

        return new QuizResponse(
                quiz.getId(),
                quiz.getAlgorithm(),
                quiz.getTitle(),
                questionResponses);
    }

    public List<QuizLibraryResponse> getQuizLibrary(User user) {

        List<Quiz> quizzes = quizRepository.findAll();

        List<QuizAttempt> attempts =
                quizAttemptRepository.findByUserId(user.getId());

        return quizzes.stream()
                .map(quiz -> {

                    List<Question> questions =
                            questionRepository.findByQuizId(quiz.getId());

                    List<QuizAttempt> quizAttempts =
                            attempts.stream()
                                    .filter(attempt ->
                                            attempt.getQuiz()
                                                    .getId()
                                                    .equals(quiz.getId()))
                                    .collect(Collectors.toList());

                    boolean completed =
                            !quizAttempts.isEmpty();

                    int attemptCount =
                            quizAttempts.size();

                    int bestScore = 0;
                    double bestPercentage = 0;

                    if (!quizAttempts.isEmpty()) {

                        QuizAttempt bestAttempt =
                                quizAttempts.stream()
                                        .max(
                                                Comparator.comparingDouble(
                                                        QuizAttempt::getPercentage))
                                        .orElse(null);

                        if (bestAttempt != null) {
                            bestScore =
                                    bestAttempt.getScore();

                            bestPercentage =
                                    bestAttempt.getPercentage();
                        }
                    }

                    return new QuizLibraryResponse(
                            quiz.getId(),
                            quiz.getAlgorithm(),
                            quiz.getTitle(),
                            questions.size(),
                            completed,
                            attemptCount,
                            bestScore,
                            bestPercentage);
                })
                .collect(Collectors.toList());
    }

    public QuizResultResponse submitQuiz(
            Long quizId,
            QuizSubmitRequest request,
            User user) {

        Optional<Quiz> quizOptional =
                quizRepository.findById(quizId);

        if (quizOptional.isEmpty()) {
            throw new RuntimeException("Quiz not found");
        }

        Quiz quiz = quizOptional.get();

        List<Question> questions =
                questionRepository.findByQuizId(quizId);

        Map<Long, String> answers =
                request.getAnswers();

        int score = 0;

        for (Question question : questions) {

            String selectedAnswer =
                    answers.get(question.getId());

            if (selectedAnswer != null &&
                    selectedAnswer.equalsIgnoreCase(
                            question.getCorrectAnswer())) {

                score++;
            }
        }

        int totalQuestions =
                questions.size();

        double percentage =
                totalQuestions == 0
                        ? 0
                        : ((double) score / totalQuestions) * 100;

        QuizAttempt attempt =
                new QuizAttempt(
                        user,
                        quiz,
                        score,
                        totalQuestions,
                        percentage,
                        LocalDateTime.now());

        quizAttemptRepository.save(attempt);

        return new QuizResultResponse(
                score,
                totalQuestions,
                percentage);
    }

    public List<QuizAttemptResponse> getUserAttemptHistory(
            User user) {

        List<QuizAttempt> attempts =
                quizAttemptRepository.findByUserId(
                        user.getId());

        return attempts.stream()
                .map(attempt -> new QuizAttemptResponse(
                        attempt.getId(),
                        attempt.getQuiz().getId(),
                        attempt.getQuiz().getAlgorithm(),
                        attempt.getQuiz().getTitle(),
                        attempt.getScore(),
                        attempt.getTotalQuestions(),
                        attempt.getPercentage(),
                        attempt.getCompletedAt()))
                .collect(Collectors.toList());
    }
}