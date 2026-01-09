#include <iostream>
using namespace std;

class Employee{
private:
    int id;
    string name;
    double salary;
public:
    Employee(){};
    Employee(int id,string name,double salary):id(id),name(name),salary(salary){};

    ///seteers
        void setId(int value){id=value;};
        void setName(string value){name=value;};
        void setSalary(double value){salary=value;};
    ///getters
        int getId(){return id;}
        string getName(){return name;}
        double getSalary(){return salary;}
};

class Node{
public:
    Employee data;
    Node*pNext;
    Node*pPrev;

    Node(Employee value):data(value),pNext(nullptr),pPrev(nullptr){};

    ~Node(){}
};

class DoublyLinkedList{
protected:
    Node*pStart;
    Node*pLast;
public:
    DoublyLinkedList():pStart(nullptr),pLast(nullptr){};

void AddNode(Node*newNode){//Append in the last
        ///Empty
        if(pStart==nullptr)
            pStart=pLast=newNode;
        else {///Add After pLast , 1 or More Already Existing
            newNode->pPrev=pLast;
            pLast->pNext=newNode;
            pLast=newNode;
        }

   }


Node*searchNode(int id){
        Node*pSearch=pStart;
        while(pSearch!=nullptr){

            ///if found it
            if(pSearch->data.getId()== id) break;
            pSearch=pSearch->pNext;
        }

        return pSearch;
  }


bool deleteNode(){

    if (pLast == nullptr) {
        cout << "Stack is empty\n";
        return false;
    }

    Node* pDelete = pLast;

    ///if only one node
    if (pStart == pLast) {
        pStart = pLast = nullptr;
    }
    else {
        pLast = pLast->pPrev;
        pLast->pNext = nullptr;
    }

    delete pDelete;
    return true;
  }

bool displayNode(int id){
    Node*pDisplay=searchNode(id);

    if(pDisplay==nullptr)
        cout<<"Not Found \n";
    else
    {
         ///Display ALL Date
        cout<<"the ID :"<<pDisplay->data.getId()<<endl;
        cout<<"the Name :"<<pDisplay->data.getName()<<endl;
        cout<<"the Salary :"<<pDisplay->data.getSalary()<<endl;
        return true;
   }
     return false;

}


void displayAll(){
   Node* pSearch = pStart;

    cout<<"------------------------------- \n";
    while (pSearch != nullptr){
        cout<<"the ID :"<<pSearch->data.getId()<<endl;
        cout<<"the Name :"<<pSearch->data.getName()<<endl;
        cout<<"the Salary :"<<pSearch->data.getSalary()<<endl;
        cout<<"------------------------------- \n";
        pSearch=pSearch->pNext;
    }
}


int nodeNumber(){
    Node*pSerach=pStart;
    int count=0;
    if(pSerach==nullptr) cout << "the list is Empty\n";

    else{
        while(pSerach!=nullptr)
        {
            count++;
            pSerach=pSerach->pNext;
        }
    }
    return count;
}


///Copy Constructor
DoublyLinkedList(DoublyLinkedList& other)
{
   this->pStart = this->pLast=nullptr;

   Node*pCurrent=other.pStart;

   while(pCurrent!=nullptr){
        ///copy  employee's data
        Employee e = pCurrent->data;

        ///add new node in new list and send the employee's data
        Node* newNode = new Node(e);
         if(this->pStart == nullptr)
            this->pStart = this->pLast = newNode;
        else {
            newNode->pPrev = this->pLast;
            this->pLast->pNext = newNode;
            this->pLast = newNode;
        }
        pCurrent = pCurrent->pNext;
    }
   }


///Assignment Operator =
DoublyLinkedList& operator=(DoublyLinkedList& other){

     if (this == &other)
            return *this;  // self assignment
        ///delete all nodes from the
        Node* current = this->pStart;
        while (current != nullptr) {
                this->pStart=this->pStart->pNext;
                delete current;
                current=this->pStart;
        }

        this->pStart = this->pLast = nullptr;

        ///deep copy
        current=other.pStart;
        while(current!=nullptr){
        ///copy  employee's data
        Employee e = current->data;

        ///add new node in new list and send the employee's data
        Node* newNode = new Node(e);
         if(this->pStart == nullptr)
            this->pStart = this->pLast = newNode;
        else {
            newNode->pPrev = this->pLast;
            this->pLast->pNext = newNode;
            this->pLast = newNode;
        }
        current = current->pNext;
    }
    return *this;
}

// operator[]
Employee& operator[](int index)
    {
        if (index < 0)
            throw out_of_range("Index cannot be negative.");

        Node* current = pStart;
        int counter = 0;

        while (current != nullptr)
        {
            if (counter == index)
                return current->data;

            current = current->pNext;
            counter++;
        }

        throw out_of_range("Index out of range.");
    }

///Destructor
~DoublyLinkedList()
    {
        Node* current = pStart;

        while (current != nullptr)
        {
            pStart=pStart->pNext;
            delete current;
            current=pStart;
            }

        pStart = pLast = nullptr;
    }


};


class StackDLL : public DoublyLinkedList{
public:
    void Push (Node*newNode){
        AddNode(newNode);
        cout<<"Employee pushed"<<endl;
    }

void pop() {
    if(deleteNode())
        cout << "Node deleted\n";
    else{
        cout<<"problem"<<endl;
    }
}


Node* peek() {
    if (pLast == nullptr) {
        cout << "Stack is empty\n";
        return nullptr;
    }

    return pLast;
}

};

int main()
{
    // Create a Stack
    StackDLL s;
    Employee e1(1, "Ali", 5000);
    Employee e2(2, "Mona", 6000);
    Employee e3(3, "Kareem", 7000);

    // Create nodes for the stack
    Node* n1 = new Node(e1);
    Node* n2 = new Node(e2);
    Node* n3 = new Node(e3);

    // Push
    s.Push(n1);
    s.Push(n2);
    s.Push(n3);

    // Peek (show top)
    Node* top = s.peek();
    if (top != nullptr)
    {
        cout << "\nTop Employee:\n";
        cout << "ID: " << top->data.getId() << endl;
        cout << "Name: " << top->data.getName() << endl;
        cout << "Salary: " << top->data.getSalary() << endl;
    }

    // Pop
    cout << "\nPopping...\n";
    s.pop();

    // Display all employees in the stack
    cout << "\nDisplaying All Employees:\n";
    s.displayAll();

    return 0;
}
