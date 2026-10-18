
function AnimationStatus({
  algorithmId,
  step,
  currentStep,
  totalSteps,
  isRunning,
  array,
}) {
  const isSearching =
    algorithmId === "linearSearch" ||
    algorithmId === "binarySearch";

  // Initial idle state
  if (totalSteps === 0) {
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

  // Animation completed
  if (
    !isRunning &&
    totalSteps > 0 &&
    currentStep >= totalSteps
  ) {
    const lastStep = step;

    let completionMessage = "Sorting completed!";
    let completionClass = "sorted";

    if (isSearching) {
      if (lastStep?.type === "found") {
        completionMessage = `Target ${lastStep.target} found at index ${lastStep.index}!`;
        completionClass = "found";
      } else if (lastStep?.type === "notFound") {
        completionMessage = `Target ${lastStep.target} not found!`;
        completionClass = "not-found";
      } else {
        completionMessage = "Search completed!";
        completionClass = "processing";
      }
    }

    return (
      <div className={`animation-status ${completionClass}`}>
        <div className="status-left">
          <span className="status-indicator"></span>

          <span className="status-message">
            {completionMessage}
          </span>
        </div>

        <span className="step-counter">
          Step {totalSteps} / {totalSteps}
        </span>
      </div>
    );
  }

  // Prevent errors when no step is available
  if (!step) {
    return (
      <div className="animation-status idle">
        <span className="status-message">
          Ready to visualize
        </span>

        <span className="step-counter">
          Step 0 / {totalSteps}
        </span>
      </div>
    );
  }

  let message = "Processing...";
  let statusClass = "processing";

  // Compare operation
  if (step.type === "compare") {
    message = isSearching
      ? `Checking element at index ${step.indices?.[0]} for target ${step.target}`
      : `Comparing elements at indices ${step.indices?.join(" and ")}`;

    statusClass = "compare";
  }

  // Swap operation
  else if (step.type === "swap") {
    message = `Swapping elements at indices ${step.indices?.join(" and ")}`;
    statusClass = "swap";
  }

  // Overwrite operation
  else if (step.type === "overwrite") {
    message = `Updating element at index ${step.index}`;
    statusClass = "overwrite";
  }

  // Minimum operation
  else if (step.type === "minimum") {
    message = `New minimum found at index ${step.index}`;
    statusClass = "minimum";
  }

  // Pivot operation
  else if (step.type === "pivot") {
    message = `Pivot selected at index ${step.index}`;
    statusClass = "pivot";
  }

  // Sorted element
  else if (step.type === "sorted") {
    message = `Element at index ${step.index} is sorted`;
    statusClass = "sorted";
  }

  // Sorted range
  else if (step.type === "sortedRange") {
    message = "A range of elements is sorted";
    statusClass = "sorted";
  }

  // Search found
  else if (step.type === "found") {
    message = `Target ${step.target} found at index ${step.index}!`;
    statusClass = "found";
  }

  // Search not found
  else if (step.type === "notFound") {
    message = `Target ${step.target} not found`;
    statusClass = "not-found";
  }

  // Binary search: current range
  else if (step.type === "range") {
    message = `Searching indices ${step.left} to ${step.right}; checking middle index ${step.middle}`;
    statusClass = "processing";
  }

  // Binary search: search left
  else if (step.type === "searchLeft") {
    message = "Target is smaller; searching the left half";
    statusClass = "compare";
  }

  // Binary search: search right
  else if (step.type === "searchRight") {
    message = "Target is larger; searching the right half";
    statusClass = "compare";
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
        Step {Math.min(currentStep + 1, totalSteps)} / {totalSteps}
      </span>
    </div>
  );
}

export default AnimationStatus;