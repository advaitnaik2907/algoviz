function linearSearch(array, target) {
  const steps = [];

  for (let i = 0; i < array.length; i++) {
    // Check the current element
    steps.push({
      type: "compare",
      indices: [i],
      target,
    });

    if (array[i] === target) {
      // Target found
      steps.push({
        type: "found",
        index: i,
        target,
      });

      return steps;
    }
  }

  // Target was not found
  steps.push({
    type: "notFound",
    target,
  });

  return steps;
}

export default linearSearch;