#include <iostream>
#include"vector"
#include"algorithm"
using namespace std;

class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
       int k=0;
       for(int i=0;i<nums.size();i++){
            if(nums[i]!=val)
            {
                  nums[k++]=nums[i];
            }
       }
    return k;
    }
};

int main()
{
    Solution s;
    vector<int> nums={5,4,1,12,3,4,4,4};
    int k = s.removeElement(nums, 4); // Calls your implementation
    sort(nums.begin(),nums.begin()+k);
    cout<<"The size of values!= val "<<k<<endl;
    for(int i = 0; i < k; i++)
        cout << nums[i] << endl;
    return 0;
}
