function AnimationStatus({
  step,
  currentStep,
  totalSteps,
  isRunning,
  array,
}) {
  if (!step) {
    return (
      <div className="animation-status idle">
        <span className="status-message">
          Ready to visualize
        </span>

        <span className="step-counter">
          Step 0 / 0
        </span>
      </div>
    );
  }

  let message = "Processing...";
  let statusClass = "processing";

  // =========================
  // COMPARE
  // =========================

  if (step.type === "compare") {
    statusClass = "compare";

    if (step.indices?.length >= 2) {
      const firstValue = array[step.indices[0]];
      const secondValue = array[step.indices[1]];

      message = `Comparing ${firstValue} and ${secondValue}`;
    } else if (step.indices?.length === 1) {
      const value = array[step.indices[0]];

      message = `Checking value ${value}`;
    }
  }

  // =========================
  // SWAP
  // =========================

  if (step.type === "swap") {
    statusClass = "swap";

    if (step.indices?.length >= 2) {
      const firstValue = step.array
        ? step.array[step.indices[1]]
        : array[step.indices[0]];

      const secondValue = step.array
        ? step.array[step.indices[0]]
        : array[step.indices[1]];

      message = `Swapping ${firstValue} ↔ ${secondValue}`;
    } else {
      message = "Swapping elements";
    }
  }

  // =========================
  // OVERWRITE
  // =========================

  if (step.type === "overwrite") {
    statusClass = "swap";

    const value = step.array?.[step.index];

    if (value !== undefined) {
      message = `Placing ${value} at position ${step.index + 1}`;
    } else {
      message = "Updating element";
    }
  }

  // =========================
  // MINIMUM
  // =========================

  if (step.type === "minimum") {
    statusClass = "minimum";

    const value = array[step.index];

    if (value !== undefined) {
      message = `New minimum: ${value}`;
    } else {
      message = "New minimum found";
    }
  }

  // =========================
  // PIVOT
  // =========================

  if (step.type === "pivot") {
    statusClass = "pivot";

    const value = array[step.index];

    if (value !== undefined) {
      message = `Pivot selected: ${value}`;
    } else {
      message = "Pivot selected";
    }
  }

  // =========================
  // SORTED
  // =========================

  if (step.type === "sorted") {
    statusClass = "sorted";

    const value = array[step.index];

    if (value !== undefined) {
      message = `${value} placed in sorted position`;
    } else {
      message = "Element placed in sorted position";
    }
  }

  // =========================
  // SORTED RANGE
  // =========================

  if (step.type === "sortedRange") {
    statusClass = "sorted";

    const startValue = array[step.start];
    const endValue = array[step.end];

    if (
      startValue !== undefined &&
      endValue !== undefined
    ) {
      message = `Sorted section: ${startValue} → ${endValue}`;
    } else {
      message = "Sorted section completed";
    }
  }

  // =========================
  // FOUND
  // =========================

  if (step.type === "found") {
    statusClass = "found";

    const value = array[step.index];

    if (value !== undefined) {
      message = `Target ${value} found at position ${
        step.index + 1
      }`;
    } else {
      message = "Target found!";
    }
  }

  // =========================
  // NOT FOUND
  // =========================

  if (step.type === "notFound") {
    statusClass = "not-found";

    message = `Target ${step.target} was not found`;
  }

  // =========================
  // BINARY SEARCH RANGE
  // =========================

  if (step.type === "range") {
    statusClass = "search";

    const middleValue = array[step.middle];

    if (middleValue !== undefined) {
      message = `Checking middle value: ${middleValue}`;
    } else {
      message = "Searching within current range";
    }
  }

  // =========================
  // SEARCH LEFT
  // =========================

  if (step.type === "searchLeft") {
    statusClass = "search";

    message = "Target is in the left half";
  }

  // =========================
  // SEARCH RIGHT
  // =========================

  if (step.type === "searchRight") {
    statusClass = "search";

    message = "Target is in the right half";
  }

  return (
    <div className={`animation-status ${statusClass}`}>
      <div className="status-left">
        <span className="status-indicator"></span>

        <span className="status-message">
          {message}
        </span>
      </div>

      <span className="step-counter">
        Step {Math.min(currentStep + 1, totalSteps)} /{" "}
        {totalSteps}
      </span>
    </div>
  );
}

export default AnimationStatus;