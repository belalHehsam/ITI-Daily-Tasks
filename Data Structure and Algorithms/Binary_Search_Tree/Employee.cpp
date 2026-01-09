#include"Empolyee.h"

Empolyee::Empolyee(int id,string name,int salary):id(id),name(name),salary(salary){}

int Empolyee::getId(){return id;}
string Empolyee::getName(){return name;}
int Empolyee::getSalary(){return salary;}

///setters
void Empolyee::setId(int value){id=id;}
void Empolyee::setName(string value){name=value;}
void Empolyee::setSalary(int value){salary = value;}
