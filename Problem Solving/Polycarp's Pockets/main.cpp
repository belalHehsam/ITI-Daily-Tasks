#include <iostream>
#include<vector>
#include<string>
using namespace std;

int main()
{
    int number_of_Coins;
    cin>>number_of_Coins;
    int arr[number_of_Coins];
    for(int i=0;i < number_of_Coins;i++){
            cin>>arr[i];
    }

    int maxx=0;
    int countt=0;
    for(int i=0;i<number_of_Coins;i++){
        for(int j=0;j<number_of_Coins-1;j++){
            if(arr[i]==arr[j]){
                countt++;
            }
        }
        if(countt > maxx)
        {
            maxx=countt;
        }
        countt=0;
    }

    cout<<maxx;
    return 0;
}
