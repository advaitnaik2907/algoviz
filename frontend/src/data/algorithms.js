import bubbleSort from "../algorithms/sorting/bubbleSort";
import selectionSort from "../algorithms/sorting/selectionSort";
import insertionSort from "../algorithms/sorting/insertionSort";
import mergeSort from "../algorithms/sorting/mergeSort";
import quickSort from "../algorithms/sorting/quickSort";
import heapSort from "../algorithms/sorting/heapSort";
import linearSearch from "../algorithms/searching/linearSearch";
import binarySearch from "../algorithms/searching/binarySearch";

const algorithms = {
  bubbleSort: {
    name: "Bubble Sort",
    category: "Sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description:
      "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order.",
    run: bubbleSort,
  },

  selectionSort: {
    name: "Selection Sort",
    category: "Sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description:
      "Selection Sort repeatedly finds the smallest element and places it at the correct position.",
    run: selectionSort,
  },

  insertionSort: {
    name: "Insertion Sort",
    category: "Sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description:
      "Insertion Sort builds the sorted array one element at a time by inserting each element into its correct position.",
    run: insertionSort,
  },

  mergeSort: {
    name: "Merge Sort",
    category: "Sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description:
      "Merge Sort divides the array into smaller parts, sorts them, and then merges them together.",
    run: mergeSort,
  },

  quickSort: {
    name: "Quick Sort",
    category: "Sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    description:
      "Quick Sort selects a pivot and partitions the array around the pivot.",
    run: quickSort,
  },

  heapSort: {
    name: "Heap Sort",
    category: "Sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    description:
      "Heap Sort uses a binary heap to repeatedly extract the largest element and place it at the end.",
    run: heapSort,
  },

  linearSearch: {
    name: "Linear Search",
    category: "Searching",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description:
      "Linear Search checks each element one by one until the target element is found.",
    run: linearSearch,
  },

  binarySearch: {
    name: "Binary Search",
    category: "Searching",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    description:
      "Binary Search repeatedly divides a sorted array into halves to find the target element.",
    run: binarySearch,
  },
};

export { algorithms };