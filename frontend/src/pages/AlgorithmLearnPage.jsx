import { Link, useParams } from "react-router-dom";

import { algorithms } from "../data/algorithms";
import { learningData } from "../data/learningData";

import "./AlgorithmLearnPage.css";

function AlgorithmLearnPage() {
  const { algorithmId } = useParams();

  const algorithm = algorithms[algorithmId];
  const lesson = learningData[algorithmId];

  // If algorithm does not exist
  if (!algorithm || !lesson) {
    return (
      <div className="algorithm-learn-page">
        <main className="lesson-not-found">
          <h1>Algorithm Not Found</h1>

          <p>
            The algorithm you are looking for does not exist.
          </p>

          <Link to="/learn">
            ← Back to Learning
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="algorithm-learn-page">
      <main className="algorithm-learn-content">

        {/* BREADCRUMB */}
        <div className="lesson-breadcrumb">
          <Link to="/learn">Learn</Link>
          <span>→</span>
          <span>{algorithm.name}</span>
        </div>

        {/* HERO */}
        <section className="lesson-hero">
          <span className="lesson-category">
            {algorithm.category}
          </span>

          <h1>{lesson.title}</h1>

          <p className="lesson-overview">
            {lesson.overview}
          </p>
        </section>

        {/* COMPLEXITY */}
        <section className="lesson-complexity">
          <div className="complexity-card">
            <span>TIME COMPLEXITY</span>
            <strong>{algorithm.timeComplexity}</strong>
          </div>

          <div className="complexity-card">
            <span>SPACE COMPLEXITY</span>
            <strong>{algorithm.spaceComplexity}</strong>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="lesson-section">
          <div className="lesson-section-heading">
            <span>01</span>
            <h2>How Does It Work?</h2>
          </div>

          <div className="lesson-steps">
            {lesson.howItWorks.map((step, index) => (
              <div className="lesson-step" key={index}>
                <div className="lesson-step-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EXAMPLE */}
        <section className="lesson-section">
          <div className="lesson-section-heading">
            <span>02</span>
            <h2>Example</h2>
          </div>

          <div className="lesson-example">
            <div className="example-block">
              <span>INPUT</span>
              <code>{lesson.example.input}</code>
            </div>

            <div className="example-arrow">→</div>

            <div className="example-block">
              <span>OUTPUT</span>
              <code>{lesson.example.output}</code>
            </div>
          </div>
        </section>

        {/* KEY POINTS */}
        <section className="lesson-section">
          <div className="lesson-section-heading">
            <span>03</span>
            <h2>Key Points</h2>
          </div>

          <div className="lesson-key-points">
            {lesson.keyPoints.map((point, index) => (
              <div className="key-point" key={index}>
                <span>✓</span>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VISUALIZER CTA */}
        <section className="lesson-cta">
          <div className="lesson-cta-content">
            <span>READY TO SEE IT?</span>

            <h2>
              Visualize {algorithm.name}
            </h2>

            <p>
              Now that you understand the logic,
              see every step of the algorithm in action.
            </p>
          </div>

          <Link
            to={`/visualizer?algorithm=${algorithmId}`}
            className="lesson-visualize-button"
          >
            <span>Visualize {algorithm.name}</span>
            <span>→</span>
          </Link>
        </section>

      </main>
    </div>
  );
}

export default AlgorithmLearnPage;
