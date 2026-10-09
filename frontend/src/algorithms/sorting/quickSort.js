function quickSort(array) {
  const steps = [];
  const arr = [...array];

  function quickSortHelper(low, high) {
    if (low >= high) {
      return;
    }

    const pivotIndex = partition(low, high);

    // Sort left side
    quickSortHelper(low, pivotIndex - 1);

    // Sort right side
    quickSortHelper(pivotIndex + 1, high);
  }

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;

    // Mark pivot
    steps.push({
      type: "pivot",
      index: high,
    });

    for (let j = low; j < high; j++) {
      // Compare current element with pivot
      steps.push({
        type: "compare",
        indices: [j, high],
      });

      if (arr[j] < pivot) {
        i++;

        // Swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];

        steps.push({
          type: "swap",
          indices: [i, j],
          array: [...arr],
        });
      }
    }

    // Place pivot in its correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    steps.push({
      type: "swap",
      indices: [i + 1, high],
      array: [...arr],
    });

    // Pivot is now in its final position
    steps.push({
      type: "sorted",
      index: i + 1,
    });

    return i + 1;
  }

  if (arr.length > 0) {
    quickSortHelper(0, arr.length - 1);
  }

  // Mark the complete array as sorted
  for (let i = 0; i < arr.length; i++) {
    steps.push({
      type: "sorted",
      index: i,
    });
  }

  return steps;
}

export default quickSort;