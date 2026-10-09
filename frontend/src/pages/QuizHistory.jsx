import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./QuizHistory.css";


function QuizHistory() {
    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAttemptHistory();
    }, []);

    const fetchAttemptHistory = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/quizzes/attempts/history`,
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
                if (response.status === 401 || response.status === 403) {
                    throw new Error(
                        "Your session has expired. Please login again."
                    );
                }

                throw new Error("Failed to load quiz history.");
            }

            const data = await response.json();

            setAttempts(data);
        } catch (err) {
            console.error(err);
            setError(
                err.message || "Unable to load quiz history."
            );
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return "Unknown date";
        }

        const date = new Date(dateString);

        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getScoreClass = (percentage) => {
        if (percentage >= 80) {
            return "history-score excellent";
        }

        if (percentage >= 60) {
            return "history-score good";
        }

        if (percentage >= 40) {
            return "history-score average";
        }

        return "history-score low";
    };

    const getResultLabel = (percentage) => {
        if (percentage >= 80) {
            return "Excellent";
        }

        if (percentage >= 60) {
            return "Good";
        }

        if (percentage >= 40) {
            return "Needs Practice";
        }

        return "Keep Practicing";
    };

    if (loading) {
        return (
            <div className="history-page">
                <div className="history-loading">
                    <div className="history-spinner"></div>
                    <p>Loading quiz history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="history-page">
            <div className="history-container">

                <div className="history-header">
                    <button
                        className="history-back-btn"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>

                    <div>
                        <h1>Quiz History</h1>
                        <p>
                            Review your previous quiz attempts and
                            scores.
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="history-error">
                        <p>{error}</p>

                        <button
                            className="history-retry-btn"
                            onClick={fetchAttemptHistory}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!error && attempts.length === 0 && (
                    <div className="history-empty">
                        <div className="empty-icon">?</div>

                        <h2>No Quiz Attempts Yet</h2>

                        <p>
                            Complete a quiz to see your score
                            history here.
                        </p>

                        <button
                            className="history-primary-btn"
                            onClick={() => navigate(-1)}
                        >
                            Take a Quiz
                        </button>
                    </div>
                )}

                {!error && attempts.length > 0 && (
                    <>
                        <div className="history-summary">
                            <div className="summary-card">
                                <span className="summary-label">
                                    Total Attempts
                                </span>

                                <span className="summary-value">
                                    {attempts.length}
                                </span>
                            </div>

                            <div className="summary-card">
                                <span className="summary-label">
                                    Average Score
                                </span>

                                <span className="summary-value">
                                    {(
                                        attempts.reduce(
                                            (sum, attempt) =>
                                                sum +
                                                attempt.percentage,
                                            0
                                        ) / attempts.length
                                    ).toFixed(1)}
                                    %
                                </span>
                            </div>

                            <div className="summary-card">
                                <span className="summary-label">
                                    Best Score
                                </span>

                                <span className="summary-value">
                                    {Math.max(
                                        ...attempts.map(
                                            (attempt) =>
                                                attempt.percentage
                                        )
                                    ).toFixed(1)}
                                    %
                                </span>
                            </div>
                        </div>

                        <div className="history-list">
                            {attempts.map((attempt) => (
                                <div
                                    className="history-card"
                                    key={attempt.attemptId}
                                >
                                    <div className="history-card-main">

                                        <div className="history-quiz-info">
                                            <h2>
                                                {attempt.quizTitle}
                                            </h2>

                                            <span className="history-algorithm">
                                                {attempt.algorithm}
                                            </span>

                                            <p className="history-date">
                                                Completed{" "}
                                                {formatDate(
                                                    attempt.completedAt
                                                )}
                                            </p>
                                        </div>

                                        <div className="history-score-section">
                                            <div
                                                className={getScoreClass(
                                                    attempt.percentage
                                                )}
                                            >
                                                {attempt.score}/
                                                {
                                                    attempt.totalQuestions
                                                }
                                            </div>

                                            <div className="history-percentage">
                                                {Number(
                                                    attempt.percentage
                                                ).toFixed(1)}
                                                %
                                            </div>

                                            <span className="history-result-label">
                                                {getResultLabel(
                                                    attempt.percentage
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default QuizHistory;

