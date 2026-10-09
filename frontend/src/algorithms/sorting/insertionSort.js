function insertionSort(array) {
  const steps = [];
  const arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    let j = i;

    while (j > 0) {
      // Compare current element with the element before it
      steps.push({
        type: "compare",
        indices: [j - 1, j],
      });

      if (arr[j - 1] <= arr[j]) {
        break;
      }

      // Swap the elements
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];

      steps.push({
        type: "swap",
        indices: [j - 1, j],
        array: [...arr],
      });

      j--;
    }

    // Everything from index 0 to i is sorted
    steps.push({
      type: "sortedRange",
      start: 0,
      end: i,
    });
  }

  // Mark the entire array as sorted
  for (let i = 0; i < arr.length; i++) {
    steps.push({
      type: "sorted",
      index: i,
    });
  }

  return steps;
}

export default insertionSort;