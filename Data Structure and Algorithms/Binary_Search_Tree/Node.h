#ifndef NODE_H_INCLUDED
#define NODE_H_INCLUDED
#include"Empolyee.h"
class Node{
public:
    Empolyee data;
    Node*pLeft;
    Node*pRight;

    Node(Empolyee e);
};

#endif // NODE_H_INCLUDED
