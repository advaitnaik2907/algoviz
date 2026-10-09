function Sidebar({ selectedAlgorithm, onSelectAlgorithm }) {
  const sortingAlgorithms = [
    { id: "bubbleSort", name: "Bubble Sort" },
    { id: "selectionSort", name: "Selection Sort" },
    { id: "insertionSort", name: "Insertion Sort" },
    { id: "mergeSort", name: "Merge Sort" },
    { id: "quickSort", name: "Quick Sort" },
    { id: "heapSort", name: "Heap Sort" },
  ];

  const searchingAlgorithms = [
    { id: "linearSearch", name: "Linear Search" },
    { id: "binarySearch", name: "Binary Search" },
  ];

  return (
    <aside className="sidebar">
      <h2>Algorithms</h2>

      <div className="algorithm-section">
        <h3>Sorting</h3>

        {sortingAlgorithms.map((algorithm) => (
          <button
            key={algorithm.id}
            className={`algorithm-button ${
              selectedAlgorithm === algorithm.id ? "selected" : ""
            }`}
            onClick={() => onSelectAlgorithm(algorithm.id)}
          >
            {algorithm.name}
          </button>
        ))}
      </div>

      <div className="algorithm-section">
        <h3>Searching</h3>

        {searchingAlgorithms.map((algorithm) => (
          <button
            key={algorithm.id}
            className={`algorithm-button ${
              selectedAlgorithm === algorithm.id ? "selected" : ""
            }`}
            onClick={() => onSelectAlgorithm(algorithm.id)}
          >
            {algorithm.name}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;