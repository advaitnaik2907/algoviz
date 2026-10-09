import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
// import "./LandingPage.css";
function LandingPage() {
  const navigate = useNavigate();

  // =========================================================
  // GET STARTED
  // =========================================================

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="landing-page">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="landing-nav">

        <div className="landing-logo">

          <div className="landing-logo-icon">
            A
          </div>

          <div>
            <h2>Algorithm Visualizer</h2>
            <span>Learn • Visualize • Master</span>
          </div>

        </div>

        <div className="landing-nav-links">

          <a href="#features">
            Features
          </a>

          <a href="#algorithms">
            Algorithms
          </a>

          <button
            onClick={handleGetStarted}
            className="nav-start-button"
          >
            Get Started
          </button>

        </div>

      </nav>


      {/* =========================
          HERO
      ========================= */}

      <main>

        <section className="landing-hero">

          <div className="hero-content">

            <div className="hero-badge">

              <span className="hero-badge-dot"></span>

              Interactive Algorithm Learning Platform

            </div>

            <h1>
              Understand Algorithms.
              <br />
              <span>See Them in Action.</span>
            </h1>

            <p className="hero-description">
              Learn how algorithms work through interactive
              visualizations, step-by-step explanations,
              quizzes, and progress tracking.
            </p>

            <div className="hero-buttons">

              {/* MAIN CTA */}

              <button
                onClick={handleGetStarted}
                className="hero-primary-button"
              >
                Get Started
                <span>→</span>
              </button>

              {/* EXPLORE → LEARN */}

              <Link
                to="/learn"
                className="hero-secondary-button"
              >
                Explore Platform
              </Link>

            </div>

            <div className="hero-stats">

              <div className="hero-stat">

                <strong>2</strong>

                <span>
                  Algorithm Categories
                </span>

              </div>

              <div className="hero-stat-divider"></div>

              <div className="hero-stat">

                <strong>5+</strong>

                <span>
                  Algorithms
                </span>

              </div>

              <div className="hero-stat-divider"></div>

              <div className="hero-stat">

                <strong>Several</strong>

                <span>
                  Ways to Practice
                </span>

              </div>

            </div>

          </div>


          {/* =========================
              HERO VISUAL
          ========================= */}

          <div className="hero-visual">

            <div className="hero-window">

              <div className="hero-window-header">

                <div className="window-dots">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

                <span className="window-title">
                  Algorithm Visualization
                </span>

              </div>

              <div className="hero-window-body">

                <div className="hero-algorithm-title">

                  <div>

                    <strong>
                      Bubble Sort
                    </strong>

                    <small>
                      Sorting Algorithm
                    </small>

                  </div>

                  <span className="hero-running">
                    ● Running
                  </span>

                </div>


                <div className="hero-bars">

                  <div
                    className="hero-bar"
                    style={{ height: "42%" }}
                  >
                    <span>42</span>
                  </div>

                  <div
                    className="hero-bar hero-bar-active"
                    style={{ height: "76%" }}
                  >
                    <span>76</span>
                  </div>

                  <div
                    className="hero-bar"
                    style={{ height: "55%" }}
                  >
                    <span>55</span>
                  </div>

                  <div
                    className="hero-bar hero-bar-active"
                    style={{ height: "88%" }}
                  >
                    <span>88</span>
                  </div>

                  <div
                    className="hero-bar"
                    style={{ height: "35%" }}
                  >
                    <span>35</span>
                  </div>

                  <div
                    className="hero-bar"
                    style={{ height: "63%" }}
                  >
                    <span>63</span>
                  </div>

                  <div
                    className="hero-bar hero-bar-sorted"
                    style={{ height: "25%" }}
                  >
                    <span>25</span>
                  </div>

                  <div
                    className="hero-bar hero-bar-sorted"
                    style={{ height: "48%" }}
                  >
                    <span>48</span>
                  </div>

                </div>


                <div className="hero-visual-status">

                  <span className="status-dot"></span>

                  Comparing elements...

                  <span className="hero-step">
                    Step 12 / 38
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            FEATURES
        ========================= */}

        <section
          className="landing-section"
          id="features"
        >

          <div className="section-heading">

            <span className="section-label">
              LEARNING EXPERIENCE
            </span>

            <h2>
              More than just a visualizer.
            </h2>

            <p>
              Everything you need to understand algorithms
              instead of simply memorizing them.
            </p>

          </div>


          <div className="feature-grid">

            <div className="feature-card">

              <div className="feature-icon blue">
                📚
              </div>

              <h3>
                Learn
              </h3>

              <p>
                Understand the concept, working,
                complexity, and logic behind each algorithm.
              </p>

              <span className="feature-number">
                01
              </span>

            </div>


            <div className="feature-card">

              <div className="feature-icon purple">
                ▶
              </div>

              <h3>
                Visualize
              </h3>

              <p>
                Watch algorithms execute step-by-step
                with interactive animations.
              </p>

              <span className="feature-number">
                02
              </span>

            </div>


            <div className="feature-card">

              <div className="feature-icon orange">
                🧠
              </div>

              <h3>
                Quiz
              </h3>

              <p>
                Test your understanding with algorithm-specific
                questions after learning.
              </p>

              <span className="feature-number">
                03
              </span>

            </div>


            <div className="feature-card">

              <div className="feature-icon green">
                📈
              </div>

              <h3>
                Track Progress
              </h3>

              <p>
                Monitor completed algorithms, quiz scores,
                and your overall learning progress.
              </p>

              <span className="feature-number">
                04
              </span>

            </div>

          </div>

        </section>


        {/* =========================
            ALGORITHMS
        ========================= */}

        <section
          className="landing-section algorithms-section"
          id="algorithms"
        >

          <div className="section-heading">

            <span className="section-label">
              EXPLORE ALGORITHMS
            </span>

            <h2>
              Start with the fundamentals.
            </h2>

            <p>
              Build your understanding from the basics
              and gradually move toward more advanced concepts.
            </p>

          </div>


          <div className="algorithm-preview-grid">

            <div className="algorithm-preview-card">

              <div className="algorithm-preview-top">

                <div className="preview-icon sorting">
                  ↕
                </div>

                <span>
                  Sorting
                </span>

              </div>

              <h3>
                Sorting Algorithms
              </h3>

              <p>
                Learn how different algorithms arrange
                data efficiently.
              </p>

              <div className="preview-tags">

                <span>
                  Bubble Sort
                </span>

                <span>
                  Selection Sort
                </span>

                <span>
                  Insertion Sort
                </span>

                <span>
                  Quick Sort
                </span>

              </div>

            </div>


            <div className="algorithm-preview-card">

              <div className="algorithm-preview-top">

                <div className="preview-icon searching">
                  ⌕
                </div>

                <span>
                  Searching
                </span>

              </div>

              <h3>
                Searching Algorithms
              </h3>

              <p>
                Understand how algorithms locate
                specific elements in data.
              </p>

              <div className="preview-tags">

                <span>
                  Linear Search
                </span>

                <span>
                  Binary Search
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            LEARNING FLOW
        ========================= */}

        <section className="learning-flow-section">

          <div className="section-heading">

            <span className="section-label">
              YOUR LEARNING JOURNEY
            </span>

            <h2>
              Learn. Visualize. Test. Improve.
            </h2>

          </div>


          <div className="learning-flow">

            <div className="flow-item">

              <div className="flow-number">
                1
              </div>

              <h3>
                Learn
              </h3>

              <p>
                Understand the algorithm.
              </p>

            </div>

            <div className="flow-line"></div>

            <div className="flow-item">

              <div className="flow-number">
                2
              </div>

              <h3>
                Visualize
              </h3>

              <p>
                See every step in action.
              </p>

            </div>

            <div className="flow-line"></div>

            <div className="flow-item">

              <div className="flow-number">
                3
              </div>

              <h3>
                Quiz
              </h3>

              <p>
                Test what you learned.
              </p>

            </div>

            <div className="flow-line"></div>

            <div className="flow-item">

              <div className="flow-number">
                4
              </div>

              <h3>
                Progress
              </h3>

              <p>
                Track your improvement.
              </p>

            </div>

          </div>

        </section>


        {/* =========================
            CTA
        ========================= */}

        <section className="landing-cta">

          <div>

            <span className="section-label">
              READY TO START?
            </span>

            <h2>
              Stop memorizing.
              <br />
              Start understanding.
            </h2>

            <p>
              Explore algorithms interactively and
              build a stronger foundation in problem solving.
            </p>

          </div>

          {/* FINAL CTA */}

          <button
            onClick={handleGetStarted}
            className="cta-button"
          >
            Get Started
            <span>→</span>
          </button>

        </section>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <Footer />

    </div>
  );
}

export default LandingPage;

