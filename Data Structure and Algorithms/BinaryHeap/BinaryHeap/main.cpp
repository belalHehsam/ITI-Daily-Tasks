#include <iostream>
#include"vector"
#include <limits>

using namespace std;

template<typename T>
class BinaryHeap{
private:
    int current_Size;
    vector<T> arr;
public:
    explicit BinaryHeap(int capacity=100):arr(capacity+1) ///initlaize  vectore by 101 position
    {
        current_Size=0;
        ///numeric_limits ---> return limits for Type T and i choose the min or max
        arr[0]=std::numeric_limits<T>::min();///Min value for type T
    }

/// check for vector empty or not
bool isEmpty(){return current_Size==0;}

///return root
T &findMin(){return arr[1];}

///Insert
void Insert(T &x){
        if(current_Size==arr.size()-1)///if vector is full resize the vector by double of old size
            arr.resize(arr.size()*2);

        ///current_Size --> the number of elements so increment the current size to locate new value
        int hole=++current_Size;

        for(;x<arr[hole/2];hole/=2)
            arr[hole]=arr[hole/2];                                     ///loop w bnqarn kol mara x bta3ty bel parent bta3tha w nseb el x lsa m7tnah4 lw kant as8ar n5ly a5er mkan b el parent dah nnzlo ta7t w b3den ntl3 el hole fo2 w nqan x b parent bta3tha tany w hakza

        arr[hole]=x;

    }


///return Root min value with High Pirority and send the root with wrong value to percolateDown
T Delete(){
    if(isEmpty())
        throw runtime_error("Heap is empty");

    T minValue=arr[1];
    arr[1]=arr[current_Size--];

    heapifyDown(1);

    return minValue;
}


int LeftChild(int i){return i*2;}

///receive the hole and recreate the vector with valid values
void heapifyDown(int hole)
{
    int child;
    T temp = arr[hole];   ///the value the will down

    while (hole * 2 <= current_Size) ///While i have a child
    {
        child = LeftChild(hole); ///The left child

        ///Compare between the left and right child for the hole
        if (child != current_Size && arr[child + 1] < arr[child])
            child++;

        ///if the child smaller than parent or temp---> fit this position by child value
        if (arr[child] < temp)
            arr[hole] = arr[child];  ///the child will go up
        else
            break; ///correct position

        hole = child;  ///hole go down
    }

    arr[hole] = temp;
}

    ///update OR return value
T& operator[](int index) {
    if (index <= 0 || index > current_Size)
        throw out_of_range("Invalid index");

    return arr[index];
}

void view(){
      if(current_Size==0)
        cout<<"Empty";
    cout<<"Heap :" <<endl;
    for(int i=1;i<=current_Size;i++)
        cout<<arr[i]<<endl;
  }

  ~BinaryHeap(){};
};
int main()
{
    BinaryHeap<int> heap;

    cout << "Is heap empty? " << heap.isEmpty() << endl;
    cout << "--------------------" << endl;

    // Insert elements
    cout << "Insert elements: 10, 5, 20, 3, 8" << endl;
    int a = 10, b = 5, c = 20, d = 3, e = 8;

    heap.Insert(a);
    heap.Insert(b);
    heap.Insert(c);
    heap.Insert(d);
    heap.Insert(e);

    cout << "After insertions:" << endl;
    heap.view();
    cout << "--------------------" << endl;

    // Find min
    cout << "Minimum element (root): " << heap.findMin() << endl;
    cout << "--------------------" << endl;

    // Access using operator []
    cout << "Access elements using operator[]:" << endl;
    for(int i = 1; i <= 5; i++)
        cout << "heap[" << i << "] = " << heap[i] << endl;

    cout << "--------------------" << endl;

    // Delete elements
    cout << "Delete min element: " << heap.Delete() << endl;
    cout << "Heap after delete:" << endl;
    heap.view();

    cout << "--------------------" << endl;

    cout << "Delete min element again: " << heap.Delete() << endl;
    cout << "Heap after delete:" << endl;
    heap.view();

    cout << "--------------------" << endl;

    // Delete all elements
    cout << "Delete all elements:" << endl;
    while (!heap.isEmpty())
    {
        cout << "Deleted: " << heap.Delete() << endl;
    }

    cout << "Heap empty? " << heap.isEmpty() << endl;

    return 0;
}
