#include <iostream>
#include<vector>
using namespace std;

int maxProfit(vector<int>& prices) {
        int min=prices[0];
        int profit=0;
        int BuyDay=0;
        int candidateBuyDay = 1;

        for(int i=1;i<prices.size();i++){
            if(min>prices[i]){
                min=prices[i];
                candidateBuyDay=i+1;
        }
        else if(profit<prices[i]-min){
            profit=prices[i]-min;
            BuyDay=candidateBuyDay;
        }
    }
    return profit;
}
///another solution by max and min built in functions
/*
  int minPrice = prices[0];
    int maxProfit = 0;

    for (int i = 1; i < prices.size(); i++) {

        maxProfit = max(maxProfit, prices[i] - minPrice);

        minPrice = min(minPrice, prices[i]);
    }
    return maxProfit;

    */
int main()
{




    return 0;
}
