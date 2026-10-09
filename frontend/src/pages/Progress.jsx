import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./Progress.css";


function Progress() {
    const navigate = useNavigate();

    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProgress = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_BASE_URL}/api/progress`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to load progress");
            }

            const data = await response.json();
            setProgress(data);
        } catch (err) {
            console.error("Progress error:", err);
            setError("Unable to load your progress.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProgress();
    }, []);

    const formatScore = (score) => {
        return Number(score).toFixed(1).replace(".0", "");
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return "Excellent";
        if (score >= 60) return "Good";
        if (score >= 40) return "Needs Practice";
        return "Keep Practicing";
    };

    if (loading) {
        return (
            <div className="pv-loading">
                <div className="pv-loading-box">
                    <div className="pv-spinner"></div>
                    <p>Loading your progress...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pv-error-page">
                <div className="pv-error-box">
                    <h2>Something went wrong</h2>
                    <p>{error}</p>

                    <button
                        className="pv-primary-button"
                        onClick={fetchProgress}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pv-page">
            <main className="pv-wrapper">

                {/* ================= HEADER ================= */}

                <header className="pv-header">
                    <div className="pv-heading">
                        <h1>My Progress</h1>

                        <p>
                            Track your learning progress across all algorithms.
                        </p>
                    </div>

                    <button
                        className="pv-secondary-button"
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to Dashboard
                    </button>
                </header>

                {/* ================= OVERALL PROGRESS ================= */}

                <section className="pv-overall-card">

                    <div className="pv-overall-top">

                        <div>
                            <h2>Overall Progress</h2>

                            <p>
                                {progress.completedAlgorithms} of{" "}
                                {progress.totalAlgorithms} algorithms completed
                            </p>
                        </div>

                        <strong className="pv-overall-percent">
                            {formatScore(progress.overallProgress)}%
                        </strong>
                    </div>

                    <div className="pv-main-progress-track">
                        <div
                            className="pv-main-progress-fill"
                            style={{
                                width: `${Math.min(
                                    progress.overallProgress,
                                    100
                                )}%`,
                            }}
                        />
                    </div>
                </section>

                {/* ================= SUMMARY ================= */}

                <section className="pv-summary-grid">

                    <div className="pv-summary-card">
                        <span>Total Algorithms</span>
                        <strong>{progress.totalAlgorithms}</strong>
                    </div>

                    <div className="pv-summary-card">
                        <span>Completed</span>
                        <strong>{progress.completedAlgorithms}</strong>
                    </div>

                    <div className="pv-summary-card">
                        <span>Total Attempts</span>
                        <strong>{progress.totalAttempts}</strong>
                    </div>

                    <div className="pv-summary-card">
                        <span>Average Score</span>
                        <strong>
                            {formatScore(progress.averageScore)}%
                        </strong>
                    </div>

                </section>

                {/* ================= ALGORITHM PROGRESS ================= */}

                <section className="pv-algorithms-section">

                    <div className="pv-section-heading">
                        <h2>Algorithm Progress</h2>

                        <p>
                            Your quiz performance for each algorithm.
                        </p>
                    </div>

                    <div className="pv-algorithm-list">

                        {progress.algorithms.map((algorithm) => (

                            <article
                                className="pv-algorithm-card"
                                key={algorithm.quizId}
                            >

                                <div className="pv-algorithm-header">

                                    <div className="pv-algorithm-info">

                                        <div className="pv-title-line">

                                            <h3>
                                                {algorithm.quizTitle}
                                            </h3>

                                            <span
                                                className={
                                                    algorithm.completed
                                                        ? "pv-badge pv-badge-completed"
                                                        : "pv-badge pv-badge-pending"
                                                }
                                            >
                                                {algorithm.completed
                                                    ? "Completed"
                                                    : "Not Started"}
                                            </span>

                                        </div>

                                        <p>
                                            {algorithm.algorithm}
                                        </p>

                                    </div>

                                    <button
                                        className="pv-primary-button"
                                        onClick={() =>
                                            navigate(
                                                `/quiz/${algorithm.algorithm}`
                                            )
                                        }
                                    >
                                        {algorithm.completed
                                            ? "Retake Quiz"
                                            : "Take Quiz"}
                                    </button>

                                </div>

                                {/* Algorithm statistics */}

                                <div className="pv-algorithm-stats">

                                    <div className="pv-algorithm-stat">
                                        <span>Attempts</span>
                                        <strong>
                                            {algorithm.attempts}
                                        </strong>
                                    </div>

                                    <div className="pv-algorithm-stat">
                                        <span>Best Score</span>
                                        <strong>
                                            {formatScore(
                                                algorithm.bestScore
                                            )}
                                            %
                                        </strong>
                                    </div>

                                    <div className="pv-algorithm-stat">
                                        <span>Latest Score</span>
                                        <strong>
                                            {formatScore(
                                                algorithm.latestScore
                                            )}
                                            %
                                        </strong>
                                    </div>

                                    <div className="pv-algorithm-stat">
                                        <span>Performance</span>
                                        <strong>
                                            {getScoreLabel(
                                                algorithm.latestScore
                                            )}
                                        </strong>
                                    </div>

                                </div>

                                {/* Algorithm progress */}

                                <div className="pv-algorithm-progress-track">
                                    <div
                                        className="pv-algorithm-progress-fill"
                                        style={{
                                            width: `${Math.min(
                                                algorithm.bestScore,
                                                100
                                            )}%`,
                                        }}
                                    />
                                </div>

                            </article>

                        ))}

                    </div>

                </section>

            </main>
        </div>
    );
}

export default Progress;