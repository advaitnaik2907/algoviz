import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { getToken } from "../../utils/auth";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const token = getToken();

            if (!token) {
                setError("Please login to view your dashboard.");
                return;
            }

            const response = await fetch(
                `${API_BASE_URL}/api/dashboard`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 401) {
                setError(
                    "Your session has expired. Please login again."
                );
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to load dashboard");
            }

            const data = await response.json();
            setDashboard(data);
        } catch (err) {
            console.error("Dashboard error:", err);
            setError("Unable to load dashboard.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const formatPercentage = (value) =>
        Number(value || 0).toFixed(1);

    if (loading) {
        return (
            <div className="dv-page">
                <div className="dv-loading">
                    <div className="dv-spinner"></div>
                    <h2>Loading Dashboard...</h2>
                    <p>Please wait.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dv-page">
                <div className="dv-error">
                    <div className="dv-error-icon">!</div>

                    <h1>Dashboard</h1>

                    <p>{error}</p>

                    <button
                        className="dv-primary-button"
                        onClick={() => navigate("/login")}
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="dv-page">

            <main className="dv-container">

                {/* Page Header */}
                <header className="dv-header">
                    <div>
                        <span className="dv-eyebrow">
                            LEARNING OVERVIEW
                        </span>

                        <h1>Dashboard</h1>

                        <p>
                            Track your algorithm learning progress
                            and recent quiz activity.
                        </p>
                    </div>
                </header>

                {/* Statistics */}
                <section className="dv-stats-grid">

                    <div className="dv-stat-card">
                        <span className="dv-stat-label">
                            Total Algorithms
                        </span>

                        <strong className="dv-stat-value">
                            {dashboard.totalAlgorithms}
                        </strong>

                        <span className="dv-stat-description">
                            Available to learn
                        </span>
                    </div>

                    <div className="dv-stat-card">
                        <span className="dv-stat-label">
                            Completed
                        </span>

                        <strong className="dv-stat-value">
                            {dashboard.completedAlgorithms}
                        </strong>

                        <span className="dv-stat-description">
                            Algorithms completed
                        </span>
                    </div>

                    <div className="dv-stat-card">
                        <span className="dv-stat-label">
                            Overall Progress
                        </span>

                        <strong className="dv-stat-value">
                            {formatPercentage(
                                dashboard.overallProgress
                            )}
                            %
                        </strong>

                        <span className="dv-stat-description">
                            Learning progress
                        </span>
                    </div>

                    <div className="dv-stat-card">
                        <span className="dv-stat-label">
                            Quiz Attempts
                        </span>

                        <strong className="dv-stat-value">
                            {dashboard.totalAttempts}
                        </strong>

                        <span className="dv-stat-description">
                            Total attempts
                        </span>
                    </div>

                    <div className="dv-stat-card">
                        <span className="dv-stat-label">
                            Average Score
                        </span>

                        <strong className="dv-stat-value">
                            {formatPercentage(
                                dashboard.averageScore
                            )}
                            %
                        </strong>

                        <span className="dv-stat-description">
                            Across all quizzes
                        </span>
                    </div>

                </section>

                {/* Overall Progress */}
                <section className="dv-section">

                    <div className="dv-section-header">

                        <div>
                            <span className="dv-section-label">
                                PROGRESS
                            </span>

                            <h2>Overall Progress</h2>

                            <p>
                                {dashboard.completedAlgorithms} of{" "}
                                {dashboard.totalAlgorithms} algorithms
                                completed
                            </p>
                        </div>

                        <strong className="dv-progress-percentage">
                            {formatPercentage(
                                dashboard.overallProgress
                            )}
                            %
                        </strong>

                    </div>

                    <div className="dv-progress-track">
                        <div
                            className="dv-progress-fill"
                            style={{
                                width: `${Math.min(
                                    Number(
                                        dashboard.overallProgress
                                    ),
                                    100
                                )}%`,
                            }}
                        />
                    </div>

                    <div className="dv-progress-actions">

                        <span>
                            Keep learning and complete more algorithms.
                        </span>

                        <button
                            className="dv-primary-button"
                            onClick={() =>
                                navigate("/progress")
                            }
                        >
                            View My Progress →
                        </button>

                    </div>

                </section>

                {/* Recent Attempts */}
                <section className="dv-section">

                    <div className="dv-section-header">

                        <div>
                            <span className="dv-section-label">
                                QUIZ ACTIVITY
                            </span>

                            <h2>Recent Quiz Attempts</h2>

                            <p>
                                Your latest quiz activity
                            </p>
                        </div>

                        <button
                            className="dv-secondary-button"
                            onClick={() =>
                                navigate("/quiz-history")
                            }
                        >
                            View Quiz History →
                        </button>

                    </div>

                    {dashboard.recentAttempts &&
                    dashboard.recentAttempts.length > 0 ? (

                        <div className="dv-attempt-list">

                            {dashboard.recentAttempts.map(
                                (attempt, index) => (
                                    <article
                                        className="dv-attempt-card"
                                        key={`${attempt.algorithm}-${index}`}
                                    >

                                        <div className="dv-attempt-info">

                                            <h3>
                                                {attempt.quizTitle}
                                            </h3>

                                            <span className="dv-algorithm-name">
                                                {attempt.algorithm}
                                            </span>

                                            <p>
                                                Completed{" "}
                                                {new Date(
                                                    attempt.completedAt
                                                ).toLocaleString()}
                                            </p>

                                        </div>

                                        <div className="dv-attempt-score">

                                            <strong>
                                                {attempt.score}/
                                                {
                                                    attempt.totalQuestions
                                                }
                                            </strong>

                                            <span>
                                                {formatPercentage(
                                                    attempt.percentage
                                                )}
                                                %
                                            </span>

                                        </div>

                                    </article>
                                )
                            )}

                        </div>

                    ) : (

                        <div className="dv-empty-state">

                            <div className="dv-empty-icon">
                                ✓
                            </div>

                            <h3>No quiz attempts yet</h3>

                            <p>
                                Start your first quiz to see your
                                activity here.
                            </p>

                            <button
                                className="dv-primary-button"
                                onClick={() =>
                                    navigate("/learn")
                                }
                            >
                                Start Learning
                            </button>

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default Dashboard;