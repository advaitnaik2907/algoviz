import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-content">

        <div className="site-footer-brand">
          <div className="site-footer-logo">
            Algo<span>Viz</span>
          </div>

          <p>
            Learn algorithms. Understand the logic.
            Visualize every step.
          </p>
        </div>

        <div className="site-footer-links">
          <div>
            <span>EXPLORE</span>

            <a href="/learn">
              Learn
            </a>

            <a href="/visualizer">
              Visualizer
            </a>
          </div>

          <div>
            <span>TOPICS</span>

            <a href="/learn">
              Sorting
            </a>

            <a href="/learn">
              Searching
            </a>
          </div>
        </div>

      </div>

      <div className="site-footer-bottom">
        <p>
          © 2026 AlgoViz. Built for learning algorithms.
        </p>

        <p>
          Learn • Visualize • Practice
        </p>
      </div>
    </footer>
  );
}

export default Footer;