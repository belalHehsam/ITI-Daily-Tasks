#include <iostream>

using namespace std;

void Swap(int&num1,int&num2){
    int temp =num1;
    num1=num2;
    num2=temp;
}

void BSort(int *arr,int size){
    //test for best case that the arr already sorted
    bool isSorted=false;
    for(int i=0;(i<size-1 &&!isSorted);i++)
    {
        isSorted=true;
        for(int j=0;j<size-i-1;j++){
            if(arr[j]>arr[j+1])
            {
                Swap(arr[j],arr[j+1]);
                isSorted=false;
            }
        }
    }
}
int main()
{
    int arr[4]={9,5,4,0};
    BSort(arr,4);
    //for Print the array after sorting
    for(int i=0;i<4;i++)
        cout<<arr[i];
    return 0;
}
