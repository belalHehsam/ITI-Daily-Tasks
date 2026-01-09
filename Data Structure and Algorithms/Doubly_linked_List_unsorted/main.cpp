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

    ///setters
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
private:
    Node*pStart;
    Node*pLast;
public:
    DoublyLinkedList():pStart(nullptr),pLast(nullptr){};

void AddNode(){//Append in the last
    int id;
    string name;
    double salary;
        Employee e;

        cout << "Enter Name:\n";
        cin.ignore();
        getline(cin, name);
        e.setName(name);

        cout<<"Enter id:"<<endl;
        cin>>id;
        e.setId(id);

        cout<<"Enter Salary:"<<endl;
        cin>>salary;
        e.setSalary(salary);

        Node*newNode= new Node(e);
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


bool deleteNode(int id){
    Node*pDelete=searchNode(id);

    if(pDelete==nullptr){
          cout <<"id Not Found \n";
           return false;
    }

    else{///Found , At Least One Node in List

          ///Only One Node in List
        if(pStart==pLast)
            pStart=pLast=nullptr;

        else if(pDelete==pStart)///Delete the first node
        {
                pStart=pStart->pNext;
                pStart->pPrev=nullptr;
                cout<<"the first node Deleted\n";

        }
        else if(pDelete==pLast){///Delete last node
                pLast=pLast->pPrev;
                pLast->pNext=nullptr;
                cout<<"the last node Deleted\n";

        }
        else{
            pDelete->pNext->pPrev=pDelete->pPrev;
            pDelete->pPrev->pNext=pDelete->pNext;
            cout<<"the node Deleted\n";
        }
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
   this->pStart=this->pLast=nullptr;

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


int main()
{
    DoublyLinkedList list1;

    cout << "=== Adding Employees to list1 ===\n";

    list1.AddNode();
    list1.AddNode();
    list1.AddNode();

    cout << "\n=== Display All (list1) ===\n";
    list1.displayAll();

    cout << "\n=== Search for ID ===\n";
    int id;
    cout << "Enter ID to search: ";
    cin >> id;
    list1.displayNode(id);

    cout << "\n=== Delete Node ===\n";
    cout << "Enter ID to delete: ";
    cin >> id;
    list1.deleteNode(id);


    cout << "\n=== Display All After Delete ===\n";
    list1.displayAll();

    cout << "\n=== Testing Copy Constructor (list2 = list1) ===\n";
    DoublyLinkedList list2 = list1;   // Copy Constructor
    list2.displayAll();

    cout << "\n=== Testing Assignment Operator ===\n";
    DoublyLinkedList list3;
    list3 = list1;   // operator=
    list3.displayAll();

    return 0;
}
