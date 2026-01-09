#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {

   int sizee;
   cin>>sizee;
   vector<pair<int ,int >>arr(sizee);

   for(int i=0;i<sizee;i++)
   {
       cin>>arr[i].first;
       arr[i].second=i+1;
   }

   sort(arr.begin(),arr.end());

   for(int i=2;i<sizee;i++){
        int right=i-1;
        int left=0;
        while(left<right){
            int sum=arr[left].first+arr[right].first;
            if(sum==arr[i].first){
                   cout << arr[i].second << " "
                     << arr[left].second << " "
                     << arr[right].second;
                return 0;
            }
            else if(sum>arr[i].first)
                right--;
            else
                left++;
        }
   }
   cout<<-1;
   return 0;
}











/*
 int n;
    cin >> n;

    vector<pair<int,int>> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i].first;
        a[i].second = i + 1; // 1-based index
    }

    // sort by value
    sort(a.begin(), a.end());

    for (int i = n - 1; i >= 0; i--) {   // target
        int l = 0;
        int r = i - 1;

        while (l < r) {
            int sum = a[l].first + a[r].first;

            if (sum == a[i].first) {
                cout << a[i].second << " "
                     << a[l].second << " "
                     << a[r].second;
                return 0;
            }
            else if (sum < a[i].first) {
                l++;
            }
            else {
                r--;
            }
        }
    }

    cout << -1;
    */
