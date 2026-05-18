// ============================================================================
// QUICKSORT IMPLEMENTATION
// ============================================================================

/**
 * Quicksort: Efficient divide-and-conquer sorting algorithm
 *
 * Algorithm Overview:
 * 1. Select a pivot element from the array
 * 2. Partition the array: elements < pivot go left, elements >= pivot go right
 * 3. Recursively sort the left and right sub-arrays
 * 4. The pivot is now in its final sorted position; sub-arrays sort themselves
 *
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) for recursion call stack (in-place sorting)
 *

 */
function quickSort(arr, low = 0, high = arr.length - 1) {
    // Base case: arrays with 0 or 1 element are already sorted
    if (low < high) {
        // Partition the array around a pivot and get its final position
        // After this, all elements < pivot are to the left, all >= pivot are to the right
        const pivotIndex = partition(arr, low, high);

        // Recursively sort the left sub-array (elements smaller than pivot)
        // Range: [low, pivotIndex - 1]
        quickSort(arr, low, pivotIndex - 1);

        // Recursively sort the right sub-array (elements larger than pivot)
        // Range: [pivotIndex + 1, high]
        quickSort(arr, pivotIndex + 1, high);
    }

    // Return the sorted array (same object reference, modified in-place)
    return arr;
}

/**
 * Partition using Lomuto Partition Scheme
 *
 * Strategy:
 * - Designate the rightmost element (arr[high]) as the pivot
 * - Maintain index 'i' as the boundary between elements < pivot and >= pivot
 * - Iterate through all elements from low to high-1:
 *   * If element < pivot, expand the "sorted region" and swap it into position
 * - Finally, place the pivot in its correct position at i+1
 *
 * Why Lomuto? Simple to understand and implement; slightly slower than Hoare
 * but adequate for most use cases.
 */
function partition(arr, low, high) {
    // Choose the rightmost element as the pivot
    const pivot = arr[high];

    // Initialize 'i' to track the boundary of elements smaller than pivot
    // All elements from low to i are known to be < pivot
    // Elements from i+1 to j-1 are known to be >= pivot
    let i = low - 1;

    // Iterate through all elements in the current range, excluding the pivot
    for (let j = low; j < high; j++) {
        // If current element is smaller than pivot, move it to the left side
        if (arr[j] < pivot) {
            // Expand the boundary of "smaller elements"
            i++;

            // Swap arr[i] (first element >= pivot) with arr[j] (smaller element)
            // This uses JavaScript destructuring; equivalent to:
            // const temp = arr[i];
            // arr[i] = arr[j];
            // arr[j] = temp;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    // Place the pivot in its final sorted position
    // i+1 is where the pivot belongs: all smaller elements are to the left,
    // all larger elements are to the right
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    // Return the pivot's final index for recursive calls
    return i + 1;
}

// ============================================================================
// DOM INTERACTION AND USER INPUT HANDLING
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input');
    const sortButton = document.getElementById('sortBtn');
    const resultDiv = document.getElementById('result');

    sortButton.addEventListener('click', () => {
        const inputValue = inputField.value.trim();

        if (!inputValue) {
            resultDiv.textContent = 'Please enter some numbers.';
            return;
        }

        // Parse input: split by comma, trim spaces, convert to numbers
        const numbers = inputValue.split(',')
            .map(item => item.trim())
            .map(item => parseFloat(item))
            .filter(item => !isNaN(item));

        if (numbers.length === 0) {
            resultDiv.textContent = 'Please enter valid numbers separated by commas.';
            return;
        }

        // Sort a copy of the array to avoid modifying the original
        const sortedNumbers = quickSort([...numbers]);

        // Display the result
        resultDiv.textContent = `Sorted: [${sortedNumbers.join(', ')}]`;
    });
});
