#include <iostream>
#include<string>
using namespace std;

int main()
{
    string name;
    cin>>name;
    string temp="";
    int countt=0;
    for(int i=0;i<name.size();i++)
    {
        if(temp.find(name[i])==std::string::npos)
        {
            temp+=name[i];
            countt++;
        }
    }

    if(countt%2==0)
        cout<<"CHAT WITH HER!";
    else
        cout<<"IGNORE HIM!";
    return 0;
}
