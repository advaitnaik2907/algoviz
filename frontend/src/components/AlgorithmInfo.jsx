function AlgorithmInfo({ algorithm }) {
  if (!algorithm) {
    return null;
  }

  return (
    <div className="algorithm-info">
      <h2>{algorithm.name}</h2>

      <p className="algorithm-category">
        {algorithm.category}
      </p>

      <div className="complexity-container">
        <div className="complexity-box">
          <span>Time Complexity</span>
          <strong>{algorithm.timeComplexity}</strong>
        </div>

        <div className="complexity-box">
          <span>Space Complexity</span>
          <strong>{algorithm.spaceComplexity}</strong>
        </div>
      </div>

      <p className="algorithm-description">
        {algorithm.description}
      </p>
    </div>
  );
}

export default AlgorithmInfo;