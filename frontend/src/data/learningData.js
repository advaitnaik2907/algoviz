const learningData = {
  bubbleSort: {
    title: "Bubble Sort",
    overview:
      "Bubble Sort is a simple sorting algorithm that repeatedly compares adjacent elements and swaps them when they are in the wrong order.",

    howItWorks: [
      "Start from the first element of the array.",
      "Compare the current element with the next element.",
      "If the current element is greater than the next element, swap them.",
      "Continue comparing adjacent elements until the end of the array.",
      "After one complete pass, the largest unsorted element reaches its correct position.",
      "Repeat the process until the entire array is sorted.",
    ],

    example: {
      input: "[5, 3, 8, 4, 2]",
      explanation:
        "Bubble Sort repeatedly compares neighboring values and moves larger values toward the end of the array.",
      output: "[2, 3, 4, 5, 8]",
    },

    keyPoints: [
      "Easy to understand and implement.",
      "Works by comparing adjacent elements.",
      "Large elements gradually move toward the end.",
      "Efficient for very small or nearly sorted arrays.",
      "Usually not suitable for large datasets.",
    ],
  },

  selectionSort: {
    title: "Selection Sort",
    overview:
      "Selection Sort repeatedly finds the smallest element from the unsorted portion and places it at the beginning of that portion.",

    howItWorks: [
      "Start from the first position.",
      "Assume the first unsorted element is the minimum.",
      "Compare it with the remaining unsorted elements.",
      "Find the smallest element.",
      "Swap the smallest element with the first unsorted element.",
      "Move to the next position and repeat the process.",
    ],

    example: {
      input: "[64, 25, 12, 22, 11]",
      explanation:
        "The algorithm finds the smallest element and places it at the beginning of the unsorted portion during every pass.",
      output: "[11, 12, 22, 25, 64]",
    },

    keyPoints: [
      "Simple comparison-based sorting algorithm.",
      "Finds the minimum element in each pass.",
      "Performs fewer swaps than Bubble Sort.",
      "Works in-place.",
      "Not efficient for large datasets.",
    ],
  },

  insertionSort: {
    title: "Insertion Sort",
    overview:
      "Insertion Sort builds the sorted array one element at a time by inserting each new element into its correct position.",

    howItWorks: [
      "Consider the first element as already sorted.",
      "Take the next element as the current element.",
      "Compare it with elements in the sorted portion.",
      "Move larger elements one position to the right.",
      "Insert the current element into its correct position.",
      "Repeat until all elements are processed.",
    ],

    example: {
      input: "[5, 2, 4, 6, 1, 3]",
      explanation:
        "Each new element is inserted into the correct position within the already sorted portion of the array.",
      output: "[1, 2, 3, 4, 5, 6]",
    },

    keyPoints: [
      "Builds the sorted array gradually.",
      "Works very well for small arrays.",
      "Efficient for nearly sorted data.",
      "Simple and easy to implement.",
      "Works in-place.",
    ],
  },

  mergeSort: {
    title: "Merge Sort",
    overview:
      "Merge Sort is a divide-and-conquer algorithm that divides an array into smaller parts, sorts them, and then merges them together.",

    howItWorks: [
      "Divide the array into two halves.",
      "Continue dividing each half until individual elements remain.",
      "Treat individual elements as sorted arrays.",
      "Merge the smaller sorted arrays together.",
      "During merging, compare elements and place them in sorted order.",
      "Continue merging until the complete array is sorted.",
    ],

    example: {
      input: "[38, 27, 43, 3, 9, 82, 10]",
      explanation:
        "The array is repeatedly divided into smaller arrays and then merged back together in sorted order.",
      output: "[3, 9, 10, 27, 38, 43, 82]",
    },

    keyPoints: [
      "Uses the divide-and-conquer technique.",
      "Has predictable O(n log n) time complexity.",
      "Works efficiently on large datasets.",
      "Requires additional memory.",
      "Useful when stable sorting is required.",
    ],
  },

  quickSort: {
    title: "Quick Sort",
    overview:
      "Quick Sort is a divide-and-conquer sorting algorithm that selects a pivot and partitions the array around it.",

    howItWorks: [
      "Choose an element as the pivot.",
      "Partition the array around the pivot.",
      "Elements smaller than the pivot are placed on one side.",
      "Elements larger than the pivot are placed on the other side.",
      "The pivot reaches its correct position.",
      "Apply the same process recursively to the left and right portions.",
    ],

    example: {
      input: "[10, 7, 8, 9, 1, 5]",
      explanation:
        "A pivot is selected and the array is partitioned around it. The same process is then applied to the smaller portions.",
      output: "[1, 5, 7, 8, 9, 10]",
    },

    keyPoints: [
      "Uses the divide-and-conquer technique.",
      "Uses a pivot for partitioning.",
      "Usually very fast in practice.",
      "Does not require a separate array for merging.",
      "Performance depends on pivot selection.",
    ],
  },

  heapSort: {
    title: "Heap Sort",
    overview:
      "Heap Sort uses a binary heap data structure to repeatedly select the largest element and place it at the end of the array.",

    howItWorks: [
      "Build a max heap from the input array.",
      "The largest element becomes the root of the heap.",
      "Swap the root with the last element.",
      "Reduce the heap size.",
      "Restore the heap property.",
      "Repeat until all elements are sorted.",
    ],

    example: {
      input: "[4, 10, 3, 5, 1]",
      explanation:
        "The array is converted into a max heap. The largest element is repeatedly moved to the end.",
      output: "[1, 3, 4, 5, 10]",
    },

    keyPoints: [
      "Uses a binary heap.",
      "Has O(n log n) time complexity.",
      "Works in-place.",
      "Does not require large additional memory.",
      "Useful when consistent performance is important.",
    ],
  },

  linearSearch: {
    title: "Linear Search",
    overview:
      "Linear Search checks each element one by one until the target element is found or the entire array has been checked.",

    howItWorks: [
      "Start from the first element.",
      "Compare the current element with the target.",
      "If they are equal, the target has been found.",
      "If they are different, move to the next element.",
      "Continue until the target is found.",
      "If the end of the array is reached, the target is not present.",
    ],

    example: {
      input: "[10, 25, 30, 45, 50]",
      explanation:
        "To find 45, Linear Search checks 10, then 25, then 30, and finally 45.",
      output: "Target 45 found at index 3",
    },

    keyPoints: [
      "Very simple searching algorithm.",
      "Works on sorted and unsorted arrays.",
      "Checks elements sequentially.",
      "Does not require the array to be sorted.",
      "Can be slow for large datasets.",
    ],
  },

  binarySearch: {
    title: "Binary Search",
    overview:
      "Binary Search efficiently searches a sorted array by repeatedly dividing the search range into two halves.",

    howItWorks: [
      "Start with the complete sorted array.",
      "Find the middle element.",
      "Compare the middle element with the target.",
      "If they are equal, the target is found.",
      "If the target is smaller, search the left half.",
      "If the target is larger, search the right half.",
      "Repeat until the target is found or the search range becomes empty.",
    ],

    example: {
      input: "[10, 20, 30, 40, 50, 60, 70]",
      explanation:
        "To find 60, Binary Search checks the middle and eliminates half of the remaining elements after each comparison.",
      output: "Target 60 found at index 5",
    },

    keyPoints: [
      "Requires a sorted array.",
      "Uses the divide-and-conquer approach.",
      "Eliminates half of the search space at every step.",
      "Much faster than Linear Search for large sorted arrays.",
      "Has O(log n) time complexity.",
    ],
  },
};

export { learningData };