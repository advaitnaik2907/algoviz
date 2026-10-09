function heapSort(array) {
  const steps = [];
  const arr = [...array];

  function heapify(n, i) {
    let largest = i;

    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Compare with left child
    if (left < n) {
      steps.push({
        type: "compare",
        indices: [largest, left],
      });

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    // Compare with right child
    if (right < n) {
      steps.push({
        type: "compare",
        indices: [largest, right],
      });

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    // If largest is not the root
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      steps.push({
        type: "swap",
        indices: [i, largest],
        array: [...arr],
      });

      // Heapify the affected subtree
      heapify(n, largest);
    }
  }

  // Build the max heap
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr.length, i);
  }

  // Extract elements from the heap
  for (let end = arr.length - 1; end > 0; end--) {
    // Move the largest element to the end
    [arr[0], arr[end]] = [arr[end], arr[0]];

    steps.push({
      type: "swap",
      indices: [0, end],
      array: [...arr],
    });

    // Mark the largest element as sorted
    steps.push({
      type: "sorted",
      index: end,
    });

    // Restore heap
    heapify(end, 0);
  }

  // Mark first element as sorted
  if (arr.length > 0) {
    steps.push({
      type: "sorted",
      index: 0,
    });
  }

  return steps;
}

export default heapSort;