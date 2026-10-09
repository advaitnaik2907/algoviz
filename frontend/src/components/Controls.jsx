function Controls({
  arraySize,
  onArraySizeChange,
  onGenerate,
  onStart,
  onReset,
  isRunning,
}) {
  return (
    <div className="controls-container">
      <div className="array-size-control">
        <label htmlFor="array-size">
          Array Size: <strong>{arraySize}</strong>
        </label>

        <input
          id="array-size"
          type="range"
          min="10"
          max="100"
          step="1"
          value={arraySize}
          onChange={(event) =>
            onArraySizeChange(Number(event.target.value))
          }
          disabled={isRunning}
        />
      </div>

      <div className="controls">
        <button onClick={onGenerate} disabled={isRunning}>
          Generate Array
        </button>

        <button onClick={onStart} disabled={isRunning}>
          ▶ Start
        </button>

        <button onClick={onReset}>
          ↻ Reset
        </button>
      </div>
    </div>
  );
}

export default Controls;