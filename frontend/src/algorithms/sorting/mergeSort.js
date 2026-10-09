function mergeSort(array) {
  const steps = [];
  const arr = [...array];

  function mergeSortHelper(left, right) {
    if (left >= right) {
      return;
    }

    const mid = Math.floor((left + right) / 2);

    // Divide the left half
    mergeSortHelper(left, mid);

    // Divide the right half
    mergeSortHelper(mid + 1, right);

    // Merge both halves
    merge(left, mid, right);
  }

  function merge(left, mid, right) {
    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftPart.length && j < rightPart.length) {
      // Compare elements
      steps.push({
        type: "compare",
        indices: [left + i, mid + 1 + j],
      });

      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i];
        i++;
      } else {
        arr[k] = rightPart[j];
        j++;
      }

      steps.push({
        type: "overwrite",
        index: k,
        array: [...arr],
      });

      k++;
    }

    // Copy remaining left elements
    while (i < leftPart.length) {
      arr[k] = leftPart[i];

      steps.push({
        type: "overwrite",
        index: k,
        array: [...arr],
      });

      i++;
      k++;
    }

    // Copy remaining right elements
    while (j < rightPart.length) {
      arr[k] = rightPart[j];

      steps.push({
        type: "overwrite",
        index: k,
        array: [...arr],
      });

      j++;
      k++;
    }

    // Mark this merged section as sorted
    steps.push({
      type: "sortedRange",
      start: left,
      end: right,
    });
  }

  if (arr.length > 0) {
    mergeSortHelper(0, arr.length - 1);
  }

  // Mark complete array as sorted
  for (let i = 0; i < arr.length; i++) {
    steps.push({
      type: "sorted",
      index: i,
    });
  }

  return steps;
}

export default mergeSort;