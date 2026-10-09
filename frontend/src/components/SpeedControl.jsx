function SpeedControl({ speed, onSpeedChange }) {
  return (
    <div className="speed-control">
      <label htmlFor="speed">
        Animation Speed
      </label>

      <input
        id="speed"
        type="range"
        min="100"
        max="1000"
        step="100"
        value={speed}
        onChange={(event) => onSpeedChange(Number(event.target.value))}
      />

      <span>{speed} ms</span>
    </div>
  );
}

export default SpeedControl;