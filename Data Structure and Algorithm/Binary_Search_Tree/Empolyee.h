#ifndef EMPOLYEE_H_INCLUDED
#define EMPOLYEE_H_INCLUDED
#include <iostream>
using namespace std;

class Empolyee{
private:
     int id;
     string name;
     int salary;
public:
    Empolyee(int id,string name,int salary);

    ///getters
    int getId();
    string getName();
    int getSalary();

    ///setters
    void setId(int value);
    void setName(string value);
    void setSalary(int value);
};
#endif // EMPOLYEE_H_INCLUDED
