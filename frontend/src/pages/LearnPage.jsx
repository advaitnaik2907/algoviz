import { Link } from "react-router-dom";
import { algorithms } from "../data/algorithms";
import "./LearnPage.css";

function LearnPage() {
  const sortingAlgorithms = Object.entries(algorithms).filter(
    ([, algorithm]) => algorithm.category === "Sorting"
  );

  const searchingAlgorithms = Object.entries(algorithms).filter(
    ([, algorithm]) => algorithm.category === "Searching"
  );

  return (
    <div className="learn-page">

      {/* =========================
          HERO
      ========================= */}

      <main className="learn-content">

        <section className="learn-hero">

          <span className="learn-eyebrow">
            LEARNING HUB
          </span>

          <h1>
            Learn Algorithms.
            <br />
            <span>Build Strong Foundations.</span>
          </h1>

          <p>
            Understand how algorithms work, learn their logic,
            and then see them come alive through visualization.
          </p>

        </section>


        {/* =========================
            SORTING
        ========================= */}

        <section className="learn-algorithm-section">

          <div className="algorithm-section-header">

            <div className="algorithm-section-title">

              <span className="section-number">
                01
              </span>

              <h2>
                Sorting Algorithms
              </h2>

            </div>

            <p>
              Learn how different algorithms arrange data
              efficiently.
            </p>

          </div>


          <div className="learning-algorithm-grid">

            {sortingAlgorithms.map(
              ([id, algorithm]) => (

                <Link
                  to={`/learn/${id}`}
                  className="learning-algorithm-card"
                  key={id}
                >

                  <div className="algorithm-card-top">

                    <span className="algorithm-category">
                      {algorithm.category}
                    </span>

                    <span className="algorithm-arrow">
                      →
                    </span>

                  </div>


                  <h3>
                    {algorithm.name}
                  </h3>


                  <p className="algorithm-description">
                    {algorithm.description}
                  </p>


                  <div className="algorithm-complexity">

                    <div>

                      <span>
                        TIME
                      </span>

                      <strong>
                        {algorithm.timeComplexity}
                      </strong>

                    </div>


                    <div>

                      <span>
                        SPACE
                      </span>

                      <strong>
                        {algorithm.spaceComplexity}
                      </strong>

                    </div>

                  </div>

                </Link>

              )
            )}

          </div>

        </section>


        {/* =========================
            SEARCHING
        ========================= */}

        <section className="learn-algorithm-section">

          <div className="algorithm-section-header">

            <div className="algorithm-section-title">

              <span className="section-number">
                02
              </span>

              <h2>
                Searching Algorithms
              </h2>

            </div>

            <p>
              Learn how algorithms efficiently find data
              inside a collection.
            </p>

          </div>


          <div className="learning-algorithm-grid">

            {searchingAlgorithms.map(
              ([id, algorithm]) => (

                <Link
                  to={`/learn/${id}`}
                  className="learning-algorithm-card"
                  key={id}
                >

                  <div className="algorithm-card-top">

                    <span className="algorithm-category">
                      {algorithm.category}
                    </span>

                    <span className="algorithm-arrow">
                      →
                    </span>

                  </div>


                  <h3>
                    {algorithm.name}
                  </h3>


                  <p className="algorithm-description">
                    {algorithm.description}
                  </p>


                  <div className="algorithm-complexity">

                    <div>

                      <span>
                        TIME
                      </span>

                      <strong>
                        {algorithm.timeComplexity}
                      </strong>

                    </div>


                    <div>

                      <span>
                        SPACE
                      </span>

                      <strong>
                        {algorithm.spaceComplexity}
                      </strong>

                    </div>

                  </div>

                </Link>

              )
            )}

          </div>

        </section>


        {/* =========================
            CTA
        ========================= */}

        <section className="learning-bottom-cta">

          <div className="learning-cta-content">

            <span>
              READY TO EXPLORE?
            </span>

            <h2>
              See algorithms in action.
            </h2>

            <p>
              Choose an algorithm, understand its logic,
              and visualize every step.
            </p>

          </div>


          <Link
            to="/visualizer"
            className="lesson-visualize-button"
          >
            Open Visualizer
            <span>→</span>
          </Link>

        </section>

      </main>

    </div>
  );
}

export default LearnPage;

