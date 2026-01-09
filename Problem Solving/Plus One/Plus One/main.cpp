#include <iostream>
#include<vector>
using namespace std;

vector<int> plusOne(vector<int>& digits) {
    ///start with the last number in the array
    for(int i=digits.size()-1;i>=0;i--){
            ///if number < 9 like (124,299) and 4 is less than 9 so increase 4 by 1 and return
        if(digits[i]<9){
            digits[i]+=1;
            return digits;
        }
    ///if the digit == 9 override the number and put it 0 and move left
        else{
            digits[i]=0;
        }
    }
    ///if the all digits array =9 and don't return from the first if so i will add 1 at the begin of vector
    digits.insert(digits.begin(), 1);
    return digits;
}

int main()
{
    return 0;
}
