#include <iostream>

using namespace std;

template<typename T>

class DynamicArray
{
private:
    T* objects;     ///pointer that hold array in the heap
    int theSize;      /// the numbers of elements in the array
    int theCapacity;  /// the size of array
    static const int initialCapacity=10;

public:
    explicit DynamicArray(int _capacity=0)
    {
        if(_capacity<initialCapacity)
            _capacity=initialCapacity;

        theSize=0;
        theCapacity=_capacity;
        objects=new T[theCapacity];
    }

///copy constructor
DynamicArray(const DynamicArray& other){
    this->theSize=other.theSize;
    this->theCapacity=other.theCapacity;
    this->objects=new T[theCapacity];
    for(int i=0;i<other.theSize;i++)
        this->objects[i]=other.objects[i];
}

///Copy Assignment Operator (=)
DynamicArray& operator =(const DynamicArray& other){
    ///Self-assignment check
    if(this==&other)
        return *this;

    ///Free old memory
    delete[] objects;

    ///free all data from the object
    this->theCapacity=0;
    this->theSize=0;

    ///Copy data
    this->theSize=other.theSize;
    this->theCapacity=other.theCapacity;
    this->objects=new T[other.theCapacity];
    for(int i=0;i<other.theSize;i++)
        this->objects[i]=other.objects[i];

    return *this;
}

///Move constructor
DynamicArray(DynamicArray&& other) noexcept{

    this->theSize=other.theSize;
    this->theCapacity=other.theCapacity;
    this->objects=other.objects;

    ///free
    other.objects=nullptr;
    other.theCapacity=0;
    other.theSize=0;
}
///Move Assignment
DynamicArray& operator=(DynamicArray&& other){

    if(this==&other)
        return *this;

    delete []this->objects;


    ///Copy data
    this->theSize=other.theSize;
    this->theCapacity=other.theCapacity;
    this->objects=other.objects;

    other.objects=nullptr;
    other.theCapacity=0;
    other.theSize=0;

    return *this;

}

///get Size
int getSize()const {return theSize;}
///get Capacity
int getCapacity() const {return theCapacity;}

void Push_Back(const T&newValue){
    if(theSize==theCapacity)
        Resize(2*theCapacity);

    objects[theSize++]=newValue;
}


void Remove(T x){
    for(int i=0;i<theSize;i++)
        if(x==objects[i]){
            RemoveAt(i);
            break;
    }
}

void Trim(){///Remove Extra Memory
    if(theSize<theCapacity)
        Resize(theSize);
}

void Show(){
    if(theSize==0)
        cout<<"The Array is Empty"<<endl;
    else{
        for(int i=0;i<theSize;i++)
            cout<<objects[i]<<endl;
        }
}

~DynamicArray(){delete []objects;}

protected:

    void Resize(int newCapacity){

        T *temp=new T[newCapacity];
        for(int i =0; i<theSize;i++)
            temp[i]=objects[i];

        theCapacity=newCapacity;
        delete [] objects;
        objects=temp;
}


    void RemoveAt(int index){

    if(index >= 0 && index < theSize){
        for(int i=index;i<theSize-1;i++)
                objects[i]=objects[i+1];

        theSize--;

    }
}



};

int main()
{
    DynamicArray <int>d(3);
    d.Show();
    d.Push_Back(1);
    d.Push_Back(2);
    d.Push_Back(3);
    d.Push_Back(4);
    d.Push_Back(5);
    d.Push_Back(6);
    d.Show();

    cout<<"======== copy Constructor======="<<endl;
    DynamicArray <int> d2=d;
    cout<<"the new Array"<<endl;
    d2.Show();

     cout<<"======== copy operator======="<<endl;
    DynamicArray <int> d3(5);
    d3=d2;
    cout<<"Array d3"<<endl;
    d3.Show();

    cout<<"=======delete element========"<<endl;
    d.Remove(4);
    d.Show();
    cout<<"=======test Trim========"<<endl;
    d.Trim();
    int sizee=d.getCapacity();
    int cap=d.getSize();
    cout<<"the size is "<<sizee<<" the capacity is :" <<cap;


    return 0;
}
