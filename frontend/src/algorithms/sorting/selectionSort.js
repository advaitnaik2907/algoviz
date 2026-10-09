function selectionSort(array) {
  const steps = [];
  const arr = [...array];

  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      // Compare current element with current minimum
      steps.push({
        type: "compare",
        indices: [minIndex, j],
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;

        // Highlight the new minimum
        steps.push({
          type: "minimum",
          index: minIndex,
        });
      }
    }

    // Swap minimum element into its correct position
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

      steps.push({
        type: "swap",
        indices: [i, minIndex],
        array: [...arr],
      });
    }

    // Mark current position as sorted
    steps.push({
      type: "sorted",
      index: i,
    });
  }

  // Last element is automatically sorted
  if (arr.length > 0) {
    steps.push({
      type: "sorted",
      index: arr.length - 1,
    });
  }

  return steps;
}

export default selectionSort;