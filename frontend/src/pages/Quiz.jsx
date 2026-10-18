import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./Quiz.css";


function Quiz() {
    const { algorithm } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [quizzes, setQuizzes] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);

    /*
     * QUIZ LIBRARY
     */
    useEffect(() => {
        if (!algorithm) {
            fetchQuizLibrary();
        }
    }, [algorithm]);

    const fetchQuizLibrary = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/quizzes`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && {
                            Authorization: `Bearer ${token}`,
                        }),
                    },
                }
            );

            if (!response.ok) {
                if (
                    response.status === 401 ||
                    response.status === 403
                ) {
                    throw new Error(
                        "Your session has expired. Please login again."
                    );
                }

                throw new Error(
                    "Failed to load quiz library."
                );
            }

            const data = await response.json();

            setQuizzes(data);
        } catch (err) {
            console.error(err);
            setError(
                err.message ||
                "Unable to load quizzes."
            );
        } finally {
            setLoading(false);
        }
    };

    /*
     * ACTUAL QUIZ
     */
    useEffect(() => {
        if (algorithm) {
            fetchQuiz();
        }
    }, [algorithm]);

    const fetchQuiz = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/quizzes/${algorithm}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && {
                            Authorization: `Bearer ${token}`,
                        }),
                    },
                }
            );

            if (!response.ok) {
                if (
                    response.status === 401 ||
                    response.status === 403
                ) {
                    throw new Error(
                        "Your session has expired. Please login again."
                    );
                }

                throw new Error(
                    "Failed to load quiz."
                );
            }

            const data = await response.json();

            setQuiz(data);
            setCurrentQuestion(0);
            setAnswers({});
            setResult(null);
        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                "Unable to load quiz. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleStartQuiz = (quizItem) => {
        navigate(`/quiz/${quizItem.algorithm}`);
    };

    /*
     * QUIZ ANSWERS
     */
    const handleAnswer = (option) => {
        const questionId =
            quiz.questions[currentQuestion].id;

        setAnswers((previousAnswers) => ({
            ...previousAnswers,
            [questionId]: option,
        }));
    };

    const goToNext = () => {
        if (
            currentQuestion <
            quiz.questions.length - 1
        ) {
            setCurrentQuestion(
                (previous) => previous + 1
            );
        }
    };

    const goToPrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(
                (previous) => previous - 1
            );
        }
    };

    const handleSubmit = async () => {
        if (!quiz) return;

        const unanswered =
            quiz.questions.filter(
                (question) =>
                    !answers[question.id]
            );

        if (unanswered.length > 0) {
            const firstUnansweredIndex =
                quiz.questions.findIndex(
                    (question) =>
                        !answers[question.id]
                );

            setCurrentQuestion(
                firstUnansweredIndex
            );

            alert(
                "Please answer all questions before submitting."
            );

            return;
        }

        try {
            setSubmitting(true);
            setError("");

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/quizzes/${quiz.id}/submit`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                        ...(token && {
                            Authorization:
                                `Bearer ${token}`,
                        }),
                    },
                    body: JSON.stringify({
                        answers: answers,
                    }),
                }
            );

            if (!response.ok) {
                if (
                    response.status === 401 ||
                    response.status === 403
                ) {
                    throw new Error(
                        "Your session has expired. Please login again."
                    );
                }

                throw new Error(
                    "Failed to submit quiz."
                );
            }

            const data =
                await response.json();

            setResult(data);
        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                "Unable to submit quiz."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setResult(null);
        setError("");
    };

    const getOptionText = (
        question,
        option
    ) => {
        switch (option) {
            case "A":
                return question.optionA;

            case "B":
                return question.optionB;

            case "C":
                return question.optionC;

            case "D":
                return question.optionD;

            default:
                return "";
        }
    };

    /*
     * LOADING
     */
    if (loading) {
        return (
            <div className="quiz-page">
                <div className="quiz-loading">
                    <div className="quiz-spinner"></div>

                    <p>
                        {algorithm
                            ? "Loading quiz..."
                            : "Loading quiz library..."}
                    </p>
                </div>
            </div>
        );
    }

    /*
     * ERROR
     */
    if (error && !quiz && !algorithm) {
        return (
            <div className="quiz-page">
                <div className="quiz-error">
                    <h2>
                        Unable to Load Quiz Library
                    </h2>

                    <p>{error}</p>

                    <button
                        className="quiz-primary-btn"
                        onClick={fetchQuizLibrary}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (error && !quiz && algorithm) {
        return (
            <div className="quiz-page">
                <div className="quiz-error">
                    <h2>
                        Unable to Load Quiz
                    </h2>

                    <p>{error}</p>

                    <div className="quiz-error-actions">
                        <button
                            className="quiz-secondary-btn"
                            onClick={() =>
                                navigate("/quiz")
                            }
                        >
                            ← Quiz Library
                        </button>

                        <button
                            className="quiz-primary-btn"
                            onClick={fetchQuiz}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /*
     * QUIZ LIBRARY
     */
    if (!algorithm) {
        return (
            <div className="quiz-page">
                <div className="quiz-library-container">

                    <div className="quiz-library-header">
                        <div>
                            <span className="quiz-eyebrow">
                                LEARNING & PRACTICE
                            </span>

                            <h1>
                                Quiz Library
                            </h1>

                            <p>
                                Test your understanding
                                of the algorithms you
                                have learned.
                            </p>
                        </div>

                        <div className="quiz-library-count">
                            <strong>
                                {quizzes.length}
                            </strong>

                            <span>
                                Available Quizzes
                            </span>
                        </div>
                    </div>

                    {quizzes.length === 0 ? (
                        <div className="quiz-empty-state">
                            <div className="empty-icon">
                                ?
                            </div>

                            <h2>
                                No quizzes available
                            </h2>

                            <p>
                                Quizzes will appear here
                                when they become available.
                            </p>
                        </div>
                    ) : (
                        <div className="quiz-library-grid">
                            {quizzes.map(
                                (quizItem) => (
                                    <div
                                        className="quiz-library-card"
                                        key={
                                            quizItem.id
                                        }
                                    >
                                        <div className="quiz-card-top">
                                            <div className="quiz-card-icon">
                                                ?
                                            </div>

                                            <span
                                                className={
                                                    quizItem.completed
                                                        ? "quiz-status completed"
                                                        : "quiz-status"
                                                }
                                            >
                                                {quizItem.completed
                                                    ? "Completed"
                                                    : "Not Attempted"}
                                            </span>
                                        </div>

                                        <div className="quiz-card-content">
                                            <h2>
                                                {
                                                    quizItem.title
                                                }
                                            </h2>

                                            <p className="quiz-card-algorithm">
                                                {
                                                    quizItem.algorithm
                                                }
                                            </p>

                                            <div className="quiz-card-meta">
                                                <span>
                                                    <strong>
                                                        {
                                                            quizItem.totalQuestions
                                                        }
                                                    </strong>{" "}
                                                    Questions
                                                </span>

                                                <span>
                                                    <strong>
                                                        {
                                                            quizItem.attemptCount
                                                        }
                                                    </strong>{" "}
                                                    Attempts
                                                </span>
                                            </div>

                                            {quizItem.completed && (
                                                <div className="quiz-best-score">
                                                    <div>
                                                        <span>
                                                            Best Score
                                                        </span>

                                                        <strong>
                                                            {
                                                                quizItem.bestScore
                                                            }
                                                            /
                                                            {
                                                                quizItem.totalQuestions
                                                            }
                                                        </strong>
                                                    </div>

                                                    <div className="quiz-best-percentage">
                                                        {Number(
                                                            quizItem.bestPercentage
                                                        ).toFixed(
                                                            0
                                                        )}
                                                        %
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            className="quiz-library-btn"
                                            onClick={() =>
                                                handleStartQuiz(
                                                    quizItem
                                                )
                                            }
                                        >
                                            {quizItem.completed
                                                ? "Retake Quiz"
                                                : "Start Quiz"}

                                            <span>
                                                →
                                            </span>
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    )}

                </div>
            </div>
        );
    }

    /*
     * RESULT
     */
    if (result) {
        return (
            <div className="quiz-page">
                <div className="quiz-result-card">

                    <div className="result-icon">
                        ✓
                    </div>

                    <h1>
                        Quiz Completed!
                    </h1>

                    <p className="result-title">
                        {quiz.title}
                    </p>

                    <div className="result-score">
                        <span className="score-number">
                            {result.score}
                        </span>

                        <span className="score-total">
                            / {result.totalQuestions}
                        </span>
                    </div>

                    <p className="result-label">
                        Your Score
                    </p>

                    <div className="percentage-container">
                        <div className="percentage-value">
                            {Number(
                                result.percentage
                            ).toFixed(1)}
                            %
                        </div>
                    </div>

                    <div className="result-message">
                        {result.percentage >= 80
                            ? "Excellent work! You have a strong understanding of this algorithm."
                            : result.percentage >= 60
                            ? "Good job! Keep practicing to improve your understanding."
                            : result.percentage >= 40
                            ? "You're making progress. Review the algorithm and try again."
                            : "Keep learning and practicing. You can improve with another attempt."}
                    </div>

                    <div className="result-actions">
                        <button
                            className="quiz-secondary-btn"
                            onClick={handleRetry}
                        >
                            Retry Quiz
                        </button>

                        <button
                            className="quiz-primary-btn"
                            onClick={() =>
                                navigate("/quiz")
                            }
                        >
                            Quiz Library
                        </button>

                        <button
                            className="quiz-dashboard-btn"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /*
     * QUESTION UI
     */
    const question =
        quiz.questions[currentQuestion];

    const selectedAnswer =
        answers[question.id];

    const progress =
        ((currentQuestion + 1) /
            quiz.questions.length) *
        100;

    const options = ["A", "B", "C", "D"];

    return (
        <div className="quiz-page">
            <div className="quiz-container">

                <div className="quiz-header">
                    <button
                        className="quiz-back-btn"
                        onClick={() =>
                            navigate("/quiz")
                        }
                    >
                        ← Quiz Library
                    </button>

                    <div className="quiz-heading">
                        <h1>
                            {quiz.title}
                        </h1>

                        <p>
                            Test your understanding
                            of{" "}
                            <strong>
                                {quiz.algorithm}
                            </strong>
                        </p>
                    </div>
                </div>

                <div className="quiz-progress-section">
                    <div className="quiz-progress-info">
                        <span>
                            Question{" "}
                            {currentQuestion + 1}{" "}
                            of{" "}
                            {quiz.questions.length}
                        </span>

                        <span>
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <div className="quiz-progress-bar">
                        <div
                            className="quiz-progress-fill"
                            style={{
                                width: `${progress}%`,
                            }}
                        ></div>
                    </div>
                </div>

                {error && (
                    <div className="quiz-inline-error">
                        {error}
                    </div>
                )}

                <div className="quiz-question-card">

                    <div className="question-number">
                        Question{" "}
                        {currentQuestion + 1}
                    </div>

                    <h2 className="question-text">
                        {question.question}
                    </h2>

                    <div className="options-container">
                        {options.map(
                            (option) => (
                                <button
                                    key={option}
                                    className={`quiz-option ${
                                        selectedAnswer ===
                                        option
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleAnswer(
                                            option
                                        )
                                    }
                                >
                                    <span className="option-letter">
                                        {option}
                                    </span>

                                    <span className="option-text">
                                        {getOptionText(
                                            question,
                                            option
                                        )}
                                    </span>

                                    <span className="option-check">
                                        {selectedAnswer ===
                                        option
                                            ? "✓"
                                            : ""}
                                    </span>
                                </button>
                            )
                        )}
                    </div>
                </div>

                <div className="quiz-navigation">

                    <button
                        className="quiz-secondary-btn"
                        onClick={goToPrevious}
                        disabled={
                            currentQuestion === 0
                        }
                    >
                        ← Previous
                    </button>

                    <div className="question-dots">
                        {quiz.questions.map(
                            (item, index) => (
                                <button
                                    key={item.id}
                                    className={`question-dot ${
                                        index ===
                                        currentQuestion
                                            ? "active"
                                            : ""
                                    } ${
                                        answers[item.id]
                                            ? "answered"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setCurrentQuestion(
                                            index
                                        )
                                    }
                                    aria-label={`Go to question ${
                                        index + 1
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}
                    </div>

                    {currentQuestion <
                    quiz.questions.length - 1 ? (
                        <button
                            className="quiz-primary-btn"
                            onClick={goToNext}
                        >
                            Next →
                        </button>
                    ) : (
                        <button
                            className="quiz-submit-btn"
                            onClick={handleSubmit}
                            disabled={
                                submitting
                            }
                        >
                            {submitting
                                ? "Submitting..."
                                : "Submit Quiz"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Quiz;