#include <iostream>

using namespace std;


void mergee(int *arr,int LFirst ,int LLast,int RFirst,int RLast){
    int size=(RLast - LFirst)+1;
    int temp[size];
    int index=0;
    int saveFristIndex=LFirst;

    while(LFirst <=LLast && RFirst <= RLast){
        if(arr[LFirst]<arr[RFirst])
            temp[index++]=arr[LFirst++];
        else
            temp[index++]=arr[RFirst++];
    }

    while(LFirst <=LLast)
         temp[index++]=arr[LFirst++];

    while(RFirst <=RLast)
     temp[index++]=arr[RFirst++];

  for(int i=0;i<size;i++){
    arr[saveFristIndex+i]=temp[i];
  }

}

void mergeSort(int *arr,int first, int last){

    if(first <last){
        int middle=(first+last)/2;
        mergeSort(arr,first,middle);
        mergeSort(arr,middle+1,last);
        mergee(arr,first,middle,middle+1,last);
    }
}

int main()
{
    int arr[10]={9,4,3,10,5,6,2,1,0,12};
    mergeSort(arr,0,9);

    for(int i=0;i<10;i++)
        cout<<arr[i];

    return 0;
}

























