#include <iostream>

using namespace std;
//must the array be sorted
int binary_search(int *arr ,int first,int last ,int value){
   if(first > last)
        return -1;

        int middle=(first+last)/2;
        if(value ==arr[middle])
            return middle;

        else if(value< arr[middle])
           return binary_search(arr,first,middle-1,value);

        else
           return binary_search(arr,middle+1,last,value);
}

int Iterative_binary_search(int arr[],int first,int last,int value){

    while(first <=last){

        int middle=(first+last)/2;

        if(value == arr[middle])
            return middle;

        else if(value<arr[middle])
            last=middle-1;
        else
            first=middle+1;
    }

    return -1 ;

}
int main()
{


    return 0;
}
