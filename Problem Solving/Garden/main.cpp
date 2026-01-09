#include <iostream>
#include <vector>
using namespace std;

int main()
{
    int n, k;
    cin >> n >> k;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    int minHours = 1e9;

    for (int i = 0; i < n; i++) {
        if (k % a[i] == 0) {
            int hours = k / a[i];
            if (hours < minHours) {
                minHours = hours;
            }
        }
    }

    cout << minHours;
}
