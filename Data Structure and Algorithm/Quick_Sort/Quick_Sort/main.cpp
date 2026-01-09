#include <iostream>

using namespace std;


int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int boundary = low - 1;

    for (int i = low; i < high; i++) {
        if (arr[i] < pivot) {
            boundary++;
            int temp = arr[boundary];
            arr[boundary] = arr[i];
            arr[i] = temp;
        }
    }

    boundary++;
    int temp = arr[boundary ];
    arr[boundary ] = arr[high];
    arr[high] = temp;

    return boundary ;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}


int main() {
    int numbers[5] = {10, 12, 5, 3, 1};

    quickSort(numbers, 0,4);

    for (int num : numbers)
        cout << num << " ";

    return 0;
}
