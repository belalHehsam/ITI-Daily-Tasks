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


int sequ_Search(int *arr,int size,int value){

    for(int i=0; i<size;i++){
        if(value <= arr[i]){
             cout<<"Stooped at i :" <<i<<endl;
                return -1;
         }
        if(value==arr[i])
            return i;
    }
}

int main()
{

     int arr[10]={9,5,14,13,12,8,6,7,14,15};
     BSort(arr,10);
      for(int i=0;i<9;i++)
        cout<<arr[i]<<endl;

    sequ_Search(arr,10,11);

    return 0;
}
