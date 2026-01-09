#include <iostream>

using namespace std;

int main()
{
    int Limak_W;
    int Bob_W;
    int years=0;
    cin>>Limak_W>>Bob_W;
   while(Limak_W <= Bob_W){
        Limak_W=Limak_W*3;
        Bob_W=Bob_W*2;
        years++;
    }

    cout<<years;
    return 0;
}
