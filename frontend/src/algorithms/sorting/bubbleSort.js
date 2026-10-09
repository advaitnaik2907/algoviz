function bubbleSort(array) {
  const steps = [];
  const arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Highlight the two elements being compared
      steps.push({
        type: "compare",
        indices: [j, j + 1],
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        steps.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...arr],
        });
      }
    }

    // The last element of this pass is sorted
    steps.push({
      type: "sorted",
      index: arr.length - i - 1,
    });
  }

  return steps;
}

export default bubbleSort;