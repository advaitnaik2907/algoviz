
function CodePanel({ algorithmId, step }) {
  const codeByAlgorithm = {
    bubbleSort: {
      fileName: "bubbleSort.js",
      lines: [
        "function bubbleSort(array) {",
        "  const steps = [];",
        "  const arr = [...array];",
        "  for (let i = 0; i < arr.length; i++) {",
        "    for (let j = 0; j < arr.length - i - 1; j++) {",
        '      steps.push({ type: "compare", indices: [j, j + 1] });',
        "      if (arr[j] > arr[j + 1]) {",
        "        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];",
        '        steps.push({ type: "swap", indices: [j, j + 1] });',
        "      }",
        "    }",
        '    steps.push({ type: "sorted", index: arr.length - i - 1 });',
        "  }",
        "  return steps;",
        "}",
      ],
      activeLines: { compare: 6, swap: 9, sorted: 12 },
    },

    selectionSort: {
      fileName: "selectionSort.js",
      lines: [
        "function selectionSort(array) {",
        "  const steps = [];",
        "  const arr = [...array];",
        "  for (let i = 0; i < arr.length - 1; i++) {",
        "    let minIndex = i;",
        "    for (let j = i + 1; j < arr.length; j++) {",
        '      steps.push({ type: "compare", indices: [minIndex, j] });',
        "      if (arr[j] < arr[minIndex]) {",
        "        minIndex = j;",
        '        steps.push({ type: "minimum", index: minIndex });',
        "      }",
        "    }",
        "    if (minIndex !== i) {",
        "      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];",
        '      steps.push({ type: "swap", indices: [i, minIndex] });',
        "    }",
        '    steps.push({ type: "sorted", index: i });',
        "  }",
        "  return steps;",
        "}",
      ],
      activeLines: { compare: 7, minimum: 10, swap: 15, sorted: 17 },
    },

    insertionSort: {
      fileName: "insertionSort.js",
      lines: [
        "function insertionSort(array) {",
        "  const steps = [];",
        "  const arr = [...array];",
        "  for (let i = 1; i < arr.length; i++) {",
        "    let j = i;",
        "    while (j > 0) {",
        '      steps.push({ type: "compare", indices: [j - 1, j] });',
        "      if (arr[j - 1] <= arr[j]) break;",
        "      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];",
        '      steps.push({ type: "swap", indices: [j - 1, j] });',
        "      j--;",
        "    }",
        '    steps.push({ type: "sortedRange", start: 0, end: i });',
        "  }",
        '  steps.push({ type: "sorted", index: i });',
        "  return steps;",
        "}",
      ],
      activeLines: { compare: 7, swap: 10, sortedRange: 13, sorted: 15 },
    },

    mergeSort: {
      fileName: "mergeSort.js",
      lines: [
        "function mergeSort(array) {",
        "  const arr = [...array];",
        "  const steps = [];",
        "  function divide(left, right) {",
        "    if (left >= right) return;",
        "    const mid = Math.floor((left + right) / 2);",
        "    divide(left, mid);",
        "    divide(mid + 1, right);",
        "    merge(left, mid, right);",
        "  }",
        "  function merge(left, mid, right) {",
        "    // Compare values from both halves",
        '    steps.push({ type: "compare" });',
        "    // Write the selected value",
        '    steps.push({ type: "overwrite", index: k, array: [...arr] });',
        "    // Mark the merged section",
        '    steps.push({ type: "sortedRange", start: left, end: right });',
        "  }",
        "  if (arr.length) divide(0, arr.length - 1);",
        '  steps.push({ type: "sorted", index: i });',
        "  return steps;",
        "}",
      ],
      activeLines: {
        compare: 13,
        overwrite: 15,
        sortedRange: 17,
        sorted: 20,
      },
    },

    quickSort: {
      fileName: "quickSort.js",
      lines: [
        "function quickSort(array) {",
        "  const arr = [...array];",
        "  const steps = [];",
        "  function partition(low, high) {",
        "    const pivot = arr[high];",
        '    steps.push({ type: "pivot", index: high });',
        "    let i = low - 1;",
        "    for (let j = low; j < high; j++) {",
        '      steps.push({ type: "compare", indices: [j, high] });',
        "      if (arr[j] < pivot) {",
        "        i++;",
        "        [arr[i], arr[j]] = [arr[j], arr[i]];",
        '        steps.push({ type: "swap", indices: [i, j] });',
        "      }",
        "    }",
        "    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];",
        '    steps.push({ type: "swap", indices: [i + 1, high] });',
        '    steps.push({ type: "sorted", index: i + 1 });',
        "    return i + 1;",
        "  }",
        "  // Partition and recursively sort both sides",
        "  return steps;",
        "}",
      ],
      activeLines: { pivot: 6, compare: 9, swap: 13, sorted: 18 },
    },

    heapSort: {
      fileName: "heapSort.js",
      lines: [
        "function heapSort(array) {",
        "  const arr = [...array];",
        "  const steps = [];",
        "  function heapify(n, i) {",
        "    let largest = i;",
        "    const left = 2 * i + 1;",
        "    const right = 2 * i + 2;",
        '    steps.push({ type: "compare", indices: [largest, left] });',
        "    if (left < n && arr[left] > arr[largest]) largest = left;",
        '    steps.push({ type: "compare", indices: [largest, right] });',
        "    if (right < n && arr[right] > arr[largest]) largest = right;",
        "    if (largest !== i) {",
        "      [arr[i], arr[largest]] = [arr[largest], arr[i]];",
        '      steps.push({ type: "swap", indices: [i, largest] });',
        "      heapify(n, largest);",
        "    }",
        "  }",
        "  // Build the max heap",
        "  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--)",
        "    heapify(arr.length, i);",
        "  // Move maximum values to the end",
        "  for (let end = arr.length - 1; end > 0; end--) {",
        "    [arr[0], arr[end]] = [arr[end], arr[0]];",
        '    steps.push({ type: "swap", indices: [0, end] });',
        '    steps.push({ type: "sorted", index: end });',
        "    heapify(end, 0);",
        "  }",
        '  steps.push({ type: "sorted", index: 0 });',
        "  return steps;",
        "}",
      ],
      activeLines: { compare: 8, swap: 14, sorted: 25 },
    },

    linearSearch: {
      fileName: "linearSearch.js",
      lines: [
        "function linearSearch(array, target) {",
        "  const steps = [];",
        "  for (let i = 0; i < array.length; i++) {",
        '    steps.push({ type: "compare", indices: [i], target });',
        "    if (array[i] === target) {",
        '      steps.push({ type: "found", index: i, target });',
        "      return steps;",
        "    }",
        "  }",
        '  steps.push({ type: "notFound", target });',
        "  return steps;",
        "}",
      ],
      activeLines: { compare: 4, found: 6, notFound: 10 },
    },

    binarySearch: {
      fileName: "binarySearch.js",
      lines: [
        "function binarySearch(array, target) {",
        "  const steps = [];",
        "  let left = 0;",
        "  let right = array.length - 1;",
        "  while (left <= right) {",
        "    const mid = Math.floor((left + right) / 2);",
        '    steps.push({ type: "range", left, right, middle: mid });',
        '    steps.push({ type: "compare", indices: [mid], target });',
        "    if (array[mid] === target) {",
        '      steps.push({ type: "found", index: mid, target });',
        "      return steps;",
        "    }",
        "    if (array[mid] < target) {",
        "      left = mid + 1;",
        '      steps.push({ type: "searchRight", left, right });',
        "    } else {",
        "      right = mid - 1;",
        '      steps.push({ type: "searchLeft", left, right });',
        "    }",
        "  }",
        '  steps.push({ type: "notFound", target });',
        "  return steps;",
        "}",
      ],
      activeLines: {
        range: 7,
        compare: 8,
        found: 10,
        searchRight: 15,
        searchLeft: 18,
        notFound: 21,
      },
    },
  };

  const selectedCode = codeByAlgorithm[algorithmId];

  function colorCode(line) {
    return line.split(
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:function|const|for|while|let|if|else|return|export|default|break)\b|\b\d+\b)/g
    ).map((part, index) => {
      let className = "";

      if (/^["']/.test(part)) {
        className = "syntax-string";
      } else if (
        /^(function|const|for|while|let|if|else|return|export|default|break)$/.test(part)
      ) {
        className = "syntax-keyword";
      } else if (/^\d+$/.test(part)) {
        className = "syntax-number";
      }

      return (
        <span className={className} key={index}>
          {part}
        </span>
      );
    });
  }

  if (!selectedCode) {
    return (
      <section className="code-panel">
        <div className="editor-titlebar">
          <span className="editor-title">Algorithm Visualizer</span>
        </div>
        <div className="editor-message">
          Code view for this algorithm is coming soon.
        </div>
      </section>
    );
  }

  const { lines, fileName, activeLines } = selectedCode;
  const activeLine = activeLines[step?.type];

  return (
    <section className="code-panel">
      <div className="editor-titlebar">
        <span className="editor-title">Algorithm Visualizer</span>
      </div>

      <div className="editor-tab">
        <span className="javascript-icon">JS</span>
        <span>{fileName}</span>
      </div>

      <pre className="code-content">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`code-line ${
              activeLine === index + 1 ? "active-code-line" : ""
            }`}
          >
            <span className="line-number">{index + 1}</span>
            <code>{colorCode(line)}</code>
          </div>
        ))}
      </pre>

      <div className="editor-statusbar">
        <span>JavaScript</span>
        <span>UTF-8</span>
        <span>Ln {activeLine || 1}</span>
      </div>
    </section>
  );
}

export default CodePanel;