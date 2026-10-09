function binarySearch(array, target) {
  const steps = [];

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Highlight the current search range
    steps.push({
      type: "range",
      left,
      right,
      middle: mid,
    });

    // Compare middle element with target
    steps.push({
      type: "compare",
      indices: [mid],
      target,
    });

    if (array[mid] === target) {
      // Target found
      steps.push({
        type: "found",
        index: mid,
        target,
      });

      return steps;
    }

    if (array[mid] < target) {
      // Target is in the right half
      left = mid + 1;

      steps.push({
        type: "searchRight",
        left,
        right,
      });
    } else {
      // Target is in the left half
      right = mid - 1;

      steps.push({
        type: "searchLeft",
        left,
        right,
      });
    }
  }

  // Target was not found
  steps.push({
    type: "notFound",
    target,
  });

  return steps;
}

export default binarySearch;