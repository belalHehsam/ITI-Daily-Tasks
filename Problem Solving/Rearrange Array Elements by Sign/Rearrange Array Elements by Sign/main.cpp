#include <iostream>
#include<vector>
using namespace std;

vector<int> rearrangeArray(vector<int>& nums) {
    vector<int> positiveArr;
    vector<int> negativeeArr;
    ///loop for seperate the positive and negative numbers
    for(int i=0;i<nums.size();i++){
         if(nums[i]>=0)
            positiveArr.push_back(nums[i]);
         else
            negativeeArr.push_back(nums[i]);
    }

    vector<int> newArr(positiveArr.size()+negativeeArr.size());

    ///loop to size for positive or negative array because in each iterator I push two position so i need half the size
    for(int i=0;i<positiveArr.size();i++){
            ///without the *2 i will override after i push the values because the i increment by 1
             newArr[i*2]=positiveArr[i];
             newArr[(i*2)+1]=negativeeArr[i];
    }

    nums=move(newArr);
return nums;
}

int main()
{

    return 0;
}
