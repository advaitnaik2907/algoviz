package com.algorithmvisualizer.backend.config;

import com.algorithmvisualizer.backend.quiz.entity.Question;
import com.algorithmvisualizer.backend.quiz.entity.Quiz;
import com.algorithmvisualizer.backend.quiz.repository.QuestionRepository;
import com.algorithmvisualizer.backend.quiz.repository.QuizRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    public DataSeeder(
            QuizRepository quizRepository,
            QuestionRepository questionRepository) {

        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public void run(String... args) {

        seedQuiz(
                "linear-search",
                "Linear Search Quiz",
                List.of(
                        new String[]{"What is the main idea of Linear Search?", "Divide the array into halves", "Check elements one by one", "Build a heap", "Merge two arrays", "B"},
                        new String[]{"What is the best-case time complexity of Linear Search?", "O(1)", "O(log n)", "O(n)", "O(n log n)", "A"},
                        new String[]{"What is the worst-case time complexity of Linear Search?", "O(1)", "O(log n)", "O(n)", "O(n²)", "C"},
                        new String[]{"In which situation can Linear Search be used?", "Only on sorted arrays", "Only on trees", "On sorted or unsorted arrays", "Only on heaps", "C"},
                        new String[]{"What happens if the target is the first element?", "All elements are checked", "Only one element is checked", "The array is sorted", "The search fails", "B"},
                        new String[]{"What is the space complexity of the usual iterative Linear Search?", "O(1)", "O(n)", "O(log n)", "O(n²)", "A"},
                        new String[]{"If an array contains 10 elements and the target is the last element, how many elements may be checked?", "1", "5", "9", "10", "D"},
                        new String[]{"Does Linear Search require the array to be sorted?", "Yes, always", "No", "Only for strings", "Only for numbers", "B"},
                        new String[]{"Which loop is commonly suitable for Linear Search?", "Loop through each element", "Loop only through even elements", "Loop through halves only", "Loop through tree levels", "A"},
                        new String[]{"Linear Search is generally preferred when:", "The data is small or unsorted", "The data must always be sorted", "Only logarithmic time is allowed", "A heap is available", "A"}
                )
        );

        seedQuiz(
                "binary-search",
                "Binary Search Quiz",
                List.of(
                        new String[]{"What is the main idea of Binary Search?", "Check every element", "Repeatedly divide the search range", "Build a heap", "Merge arrays", "B"},
                        new String[]{"What condition is normally required for Binary Search?", "The array must be sorted", "The array must contain duplicates", "The array must be reversed", "The array must be empty", "A"},
                        new String[]{"What is the best-case time complexity of Binary Search?", "O(1)", "O(log n)", "O(n)", "O(n log n)", "A"},
                        new String[]{"What is the worst-case time complexity of Binary Search?", "O(1)", "O(log n)", "O(n)", "O(n²)", "B"},
                        new String[]{"Which element is normally checked first in Binary Search?", "First element", "Last element", "Middle element", "Random element", "C"},
                        new String[]{"What is the iterative space complexity of Binary Search?", "O(1)", "O(n)", "O(log n)", "O(n²)", "A"},
                        new String[]{"For an ascending sorted array, if target < middle element, which half is searched?", "Right half", "Left half", "Both halves", "Neither", "B"},
                        new String[]{"For an ascending sorted array, if target > middle element, which half is searched?", "Left half", "Right half", "Both halves", "Neither", "B"},
                        new String[]{"Which complexity makes Binary Search faster than Linear Search on large sorted arrays?", "O(1)", "O(log n)", "O(n)", "O(n²)", "B"},
                        new String[]{"If the search interval has one element and it is not the target, what happens?", "Search continues forever", "The interval becomes invalid and search stops", "The array is sorted", "The target is automatically found", "B"}
                )
        );

        seedQuiz(
                "bubble-sort",
                "Bubble Sort Quiz",
                List.of(
                        new String[]{"What does Bubble Sort repeatedly compare?", "Adjacent elements", "First and last elements only", "Random elements", "Tree nodes", "A"},
                        new String[]{"What happens when two adjacent elements are in the wrong order?", "They are swapped", "They are deleted", "They are merged", "They are ignored", "A"},
                        new String[]{"What is the worst-case time complexity of Bubble Sort?", "O(1)", "O(log n)", "O(n)", "O(n²)", "D"},
                        new String[]{"What is the best-case time complexity of optimized Bubble Sort?", "O(1)", "O(n)", "O(n log n)", "O(n²)", "B"},
                        new String[]{"Which property can Bubble Sort have when implemented with adjacent swaps?", "Stable", "Always unstable", "Non-comparable", "Recursive only", "A"},
                        new String[]{"After one complete pass of standard ascending Bubble Sort, which element reaches the end?", "Smallest element", "Largest element", "Middle element", "Random element", "B"},
                        new String[]{"What is the usual space complexity of Bubble Sort?", "O(1)", "O(n)", "O(log n)", "O(n²)", "A"},
                        new String[]{"Why can an optimized Bubble Sort stop early?", "No swaps occurred in a pass", "The first element is largest", "The array has duplicates", "The array is unsorted", "A"},
                        new String[]{"Bubble Sort is generally considered efficient for:", "Very large datasets", "Small or nearly sorted datasets", "Only graphs", "Only heaps", "B"},
                        new String[]{"How does Bubble Sort improve the position of large elements?", "Large elements move toward the end through swaps", "Large elements are deleted", "Large elements move to the front only", "Large elements become pivots", "A"}
                )
        );

        seedQuiz(
                "insertion-sort",
                "Insertion Sort Quiz",
                List.of(
                        new String[]{"What is the main idea of Insertion Sort?", "Insert each element into its correct position in a sorted portion", "Divide into heaps", "Select a pivot", "Merge two arrays", "A"},
                        new String[]{"At the beginning of Insertion Sort, how many elements are considered sorted?", "0", "1", "n", "n-1", "B"},
                        new String[]{"What is the worst-case time complexity of Insertion Sort?", "O(1)", "O(log n)", "O(n)", "O(n²)", "D"},
                        new String[]{"What is the best-case time complexity of Insertion Sort?", "O(1)", "O(n)", "O(n log n)", "O(n²)", "B"},
                        new String[]{"Insertion Sort works particularly well when the data is:", "Nearly sorted", "Always random and huge", "Only stored in a heap", "Only stored in a tree", "A"},
                        new String[]{"What is the usual space complexity of Insertion Sort?", "O(1)", "O(n)", "O(log n)", "O(n²)", "A"},
                        new String[]{"Is Insertion Sort stable in its standard implementation?", "Yes", "No", "Only for numbers", "Only for strings", "A"},
                        new String[]{"During insertion, elements larger than the current element are generally:", "Shifted to the right", "Deleted", "Moved to the left only", "Merged", "A"},
                        new String[]{"Which part of the array is maintained as sorted during Insertion Sort?", "The processed left portion", "Only the last element", "Only the right portion", "No portion", "A"},
                        new String[]{"Insertion Sort is commonly useful for:", "Small datasets", "Only graphs", "Only heaps", "Only databases", "A"}
                )
        );

        seedQuiz(
                "selection-sort",
                "Selection Sort Quiz",
                List.of(
                        new String[]{"What does Selection Sort select during each pass?", "The minimum element for ascending order", "A random element only", "The largest tree node", "A pivot always", "A"},
                        new String[]{"Where is the selected minimum placed in ascending Selection Sort?", "At the beginning of the unsorted portion", "At the end of the array", "In the middle", "It is deleted", "A"},
                        new String[]{"What is the worst-case time complexity of Selection Sort?", "O(1)", "O(log n)", "O(n)", "O(n²)", "D"},
                        new String[]{"What is the best-case time complexity of Selection Sort?", "O(1)", "O(n)", "O(n log n)", "O(n²)", "D"},
                        new String[]{"Does Selection Sort generally perform many swaps?", "Yes, about O(n) swaps", "No, it can use relatively few swaps", "It performs no swaps", "It performs n² swaps always", "B"},
                        new String[]{"What is the usual space complexity of Selection Sort?", "O(1)", "O(n)", "O(log n)", "O(n²)", "A"},
                        new String[]{"Is standard Selection Sort stable?", "Yes, always", "No, generally not", "Only for sorted data", "Only for strings", "B"},
                        new String[]{"After the first pass of ascending Selection Sort, what is placed at index 0?", "The maximum", "The minimum", "The median", "A random element", "B"},
                        new String[]{"Does Selection Sort require the input array to be sorted before starting?", "Yes", "No", "Only for strings", "Only for duplicates", "B"},
                        new String[]{"Selection Sort is useful when:", "Minimizing the number of swaps is important", "Only logarithmic time is acceptable", "The data is always a heap", "Recursion is mandatory", "A"}
                )
        );

        seedQuiz(
                "merge-sort",
                "Merge Sort Quiz",
                List.of(
                        new String[]{"Which technique is used by Merge Sort?", "Divide and conquer", "Greedy only", "Backtracking only", "Hashing", "A"},
                        new String[]{"What does Merge Sort do before merging?", "Divides the array into smaller parts", "Builds a heap", "Selects a pivot", "Deletes duplicates", "A"},
                        new String[]{"What is the worst-case time complexity of Merge Sort?", "O(1)", "O(log n)", "O(n)", "O(n log n)", "D"},
                        new String[]{"What is the best-case time complexity of Merge Sort?", "O(1)", "O(n)", "O(n log n)", "O(n²)", "C"},
                        new String[]{"What is the usual extra space complexity of array-based Merge Sort?", "O(1)", "O(log n)", "O(n)", "O(n²)", "C"},
                        new String[]{"What is the final major operation in Merge Sort?", "Merging sorted portions", "Building a heap", "Selecting a pivot", "Searching linearly", "A"},
                        new String[]{"Is Merge Sort stable when implemented appropriately?", "Yes", "No", "Only for integers", "Only for reversed arrays", "A"},
                        new String[]{"What happens when a subarray contains one element?", "It is considered sorted", "It is deleted", "It becomes a heap", "It must be reversed", "A"},
                        new String[]{"How many major halves are produced at each division step?", "One", "Two", "Three", "Four", "B"},
                        new String[]{"Merge Sort is particularly useful when:", "Predictable O(n log n) sorting is desired", "Only O(1) extra space is allowed", "Only one element exists", "No comparisons are allowed", "A"}
                )
        );

        seedQuiz(
                "quick-sort",
                "Quick Sort Quiz",
                List.of(
                        new String[]{"Which technique is used by Quick Sort?", "Divide and conquer", "Dynamic programming", "Hashing", "Breadth-first search", "A"},
                        new String[]{"What is the main purpose of a pivot in Quick Sort?", "Partition the array", "Merge two arrays", "Build a heap", "Find the array length", "A"},
                        new String[]{"What is the average-case time complexity of Quick Sort?", "O(1)", "O(log n)", "O(n)", "O(n log n)", "D"},
                        new String[]{"What is the worst-case time complexity of Quick Sort?", "O(1)", "O(log n)", "O(n)", "O(n²)", "D"},
                        new String[]{"A poor pivot choice can lead to:", "Highly unbalanced partitions", "Guaranteed O(1) time", "No comparisons", "Automatic merging", "A"},
                        new String[]{"What is the best-case time complexity of Quick Sort?", "O(1)", "O(n)", "O(n log n)", "O(n²)", "C"},
                        new String[]{"Does the standard in-place Quick Sort usually require an additional array of size n?", "Yes", "No", "Always two arrays", "Always three arrays", "B"},
                        new String[]{"After partitioning, where is the pivot positioned conceptually?", "Relative to elements smaller and larger than it", "Always at index 0", "Always at the last index", "It is deleted", "A"},
                        new String[]{"Which pivot strategy can help reduce the chance of consistently poor partitions?", "Randomized pivot selection", "Always choosing the first element", "Always choosing the last element", "Never choosing a pivot", "A"},
                        new String[]{"Quick Sort can be very fast in practice mainly because:", "It often has good cache behavior and low overhead", "It never compares elements", "It always uses O(n) memory", "It avoids partitioning", "A"}
                )
        );

        seedQuiz(
                "heap-sort",
                "Heap Sort Quiz",
                List.of(
                        new String[]{"Which data structure is the basis of Heap Sort?", "Heap", "Stack", "Queue", "Linked list", "A"},
                        new String[]{"Which heap is commonly used for ascending Heap Sort?", "Max heap", "Min heap only", "Binary search tree", "Hash table", "A"},
                        new String[]{"What is the time complexity of building a heap using the standard bottom-up method?", "O(1)", "O(log n)", "O(n)", "O(n²)", "C"},
                        new String[]{"What is the worst-case time complexity of Heap Sort?", "O(1)", "O(log n)", "O(n)", "O(n log n)", "D"},
                        new String[]{"What is the best-case time complexity of Heap Sort?", "O(1)", "O(n)", "O(n log n)", "O(n²)", "C"},
                        new String[]{"What is the usual auxiliary space complexity of in-place Heap Sort?", "O(1)", "O(n)", "O(log n)", "O(n²)", "A"},
                        new String[]{"In a max heap, the root contains:", "The smallest element", "The largest element", "The median", "A random element", "B"},
                        new String[]{"What operation restores the heap property after removing the root?", "Heapify", "Merge", "Partition", "Linear search", "A"},
                        new String[]{"Is standard Heap Sort stable?", "Yes", "No", "Only for sorted arrays", "Only for strings", "B"},
                        new String[]{"Why is Heap Sort useful when predictable worst-case performance is needed?", "It guarantees O(n log n) worst-case time", "It always runs in O(1)", "It uses no comparisons", "It requires sorted input", "A"}
                )
        );

        System.out.println("Quiz data seeding completed.");
    }

    private void seedQuiz(
            String algorithm,
            String title,
            List<String[]> questionData) {

        Quiz quiz = quizRepository.findByAlgorithm(algorithm)
                .orElseGet(() -> quizRepository.save(
                        new Quiz(algorithm, title)
                ));

        List<Question> existingQuestions =
                questionRepository.findByQuizId(quiz.getId());

        if (!existingQuestions.isEmpty()) {
            return;
        }

        for (String[] data : questionData) {

            Question question = new Question(
                    quiz,
                    data[0],
                    data[1],
                    data[2],
                    data[3],
                    data[4],
                    data[5]
            );

            questionRepository.save(question);
        }
    }
}
