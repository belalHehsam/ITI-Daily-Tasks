#include <iostream>
#include"Empolyee.h"
#include"Node.h"
#include"vector"
using namespace std;

class BST{
public:
    Node*pTree;
    BST(){pTree=nullptr;}

/// Calculate height of a node
int height(Node* pRoot)
{
    if (pRoot == nullptr)
        return 0;

    int leftHeight  = height(pRoot->pLeft);
    int rightHeight = height(pRoot->pRight);

    return 1 + max(leftHeight, rightHeight);
}

///Check if tree is balanced (height difference > 1)
bool isBalanced(Node* pRoot) {
        if (pRoot == nullptr)
            return true;

        int leftHeight = height(pRoot->pLeft);
        int rightHeight = height(pRoot->pRight);

        // If difference is more than 1, tree is unbalanced
        if (abs(leftHeight - rightHeight) > 1)
            return false;

        return true;
    }

/// Store all nodes in vector using  traversal
void storeInOrder(Node* pRoot, vector<Node*>& nodes) {
        if (pRoot != nullptr){
            storeInOrder(pRoot->pLeft, nodes);
            nodes.push_back(pRoot);
            storeInOrder(pRoot->pRight, nodes);
        }
    }


/// Build balanced tree from sorted vector
Node* buildBalancedTree(vector<Node*>& nodes, int start, int end) {
        if (start > end)
            return nullptr;

        int mid = start + (end - start) / 2;
        Node* root = nodes[mid];

        // Reset the pointers
        root->pLeft = nullptr;
        root->pRight = nullptr;

        root->pLeft = buildBalancedTree(nodes, start, mid - 1);
        root->pRight = buildBalancedTree(nodes, mid + 1, end);

        return root;
    }

/// Balance the tree using vector approach
void balanceTree(Node*& pRoot) {
        if (pRoot == nullptr)
            return;
        // Check if balancing is needed using height
        if (!isBalanced(pRoot)) {
            cout << "Tree is unbalanced. Rebalancing..." << endl;

            vector<Node*> nodes;
            storeInOrder(pRoot, nodes);

            if (nodes.empty())
                return;

            pRoot = buildBalancedTree(nodes, 0, nodes.size() - 1);
            cout << "Tree rebalanced!" << endl;
        }
    }


void insertNode(Node*&pRoot,Node*newNode){
            if(pRoot==nullptr)
            {
                 pRoot=newNode;
                 cout<<"Node inserted"<<endl;
            }
            else if(newNode->data.getId() < pRoot->data.getId())
            {
                insertNode(pRoot->pLeft,newNode);
            }
            else if(newNode->data.getId() > pRoot->data.getId()){
                 insertNode(pRoot->pRight,newNode);
            }

            else{
                cout<<"duplicate"<<endl;
                return;
            }
        /// Check height and balance if needed
        balanceTree(pRoot);
    }


void insertNode(Node* root, Node* parent, Node* newNode){
    if(pTree==nullptr)
    {
          pTree=newNode;
          return;
    }
    if (root == nullptr) {
            ///check again because the root==null but the parent don't know I am now in the pLeft or right
        if (newNode->data.getId() < parent->data.getId()) {
            parent->pLeft = newNode;
            cout << "Node inserted in left" << endl;
        }
        else if(newNode->data.getId() > parent->data.getId()){
            parent->pRight = newNode;
            cout << "Node inserted in right" << endl;
        }
        else
            cout<<"Duplicated"<<endl;

        balanceTree(pTree);
        return;
    }

    ///Duplicated Check during traverse
     if (newNode->data.getId() == root->data.getId()) {
        cout << "Duplicated" << endl;
        return;
    }
    ///Move to empty location that i will add by the parent pointer
    if (newNode->data.getId() < root->data.getId())
        insertNode(root->pLeft, root, newNode);
    else
        insertNode(root->pRight, root, newNode);

}


///print all nodes Asc
void TreeTraverse(Node*pRoot){
    if(pRoot!=nullptr){
         TreeTraverse(pRoot->pLeft);///Go Left
         cout<<pRoot->data.getId()<<endl;///Print Node data
         TreeTraverse(pRoot->pRight);///Go Right
    }
}

/// Search for node by ID
Node*searchNode(Node*pRoot,int key){

    if(pRoot!=nullptr)
    {
          if(pRoot->data.getId()==key)///found
                return pRoot;
          else if(key < pRoot->data.getId())///Go left
               return searchNode(pRoot->pLeft,key);
          else
               return searchNode(pRoot->pRight,key);///Go Right
    }
   return nullptr;
}


/// Count total nodes
int CountNodes(Node* pRoot) {
    if (pRoot == nullptr)
        return 0;
    return CountNodes(pRoot->pLeft) + 1 + CountNodes(pRoot->pRight);
}


/// Find maximum node in left subtree
Node*findMax(Node* pRoot) {
    if (pRoot == nullptr)
        return nullptr;

    if (pRoot->pRight == nullptr)
        return pRoot;

    return findMax(pRoot->pRight);
}


///Movement to find the Node and send it to Remove Function
Node* Delete(Node* pRoot, int key)
{
    if (pRoot == nullptr)
        return nullptr;

    if (key < pRoot->data.getId())
        pRoot->pLeft = Delete(pRoot->pLeft,key);

    else if (key > pRoot->data.getId())
        pRoot->pRight = Delete(pRoot->pRight, key);

    else
        pRoot = DeleteNode(pRoot);

    /// Check height and balance if needed after deletion
    balanceTree(pRoot);
    return pRoot;
}


Node*DeleteNode(Node*pRoot){
        ///Leaf
        if(pRoot->pLeft==nullptr&&pRoot->pRight==nullptr)
        {       delete pRoot;
             return nullptr;
        }

        ///one child in the left
        else if(pRoot->pLeft!=nullptr&&pRoot->pRight==nullptr)
        {
            Node*child=pRoot->pLeft;
            delete pRoot;
            return child;

        }
        ///one child in the Right
        else if(pRoot->pLeft==nullptr&&pRoot->pRight!=nullptr)
        {
            Node*child=pRoot->pRight;
            delete pRoot;
            return child;
        }
        ///Two Child
        else{
            ///find the max value in the left branch
             Node* temp = findMax(pRoot->pLeft);   // 1. Choose replacement
             pRoot->data = temp->data;            // 2. Copy data
             pRoot->pLeft = Delete(pRoot->pLeft, temp->data.getId());
             return pRoot;
        }
}


};


int main()
{
   BST b;

    // Test insert using simple insertNode
    cout << "=== Insertion Test ===" << endl;
    vector <Node*>nodes;
    for (int i=0;i<5;i++) {
        int id,salary;
        string name;
        cout<<"Enter id"<<endl;
        cin>>id;
        cout<<"Enter name"<<endl;
        cin>>name;
        cout<<"Enter salary"<<endl;
        cin>>salary;
        Empolyee e(id,name,salary);
        Node* n = new Node(e);
        b.insertNode(b.pTree, n);
    }

    cout << "BST (In-Order Traversal):" << endl;
    b.TreeTraverse(b.pTree);


    // Test Search
    cout << "=== Search Test ===" << endl;
    int searchKey;
    cout<<"Enter the Key for Search"<<endl;
    cin>>searchKey;
    Node* found = b.searchNode(b.pTree, searchKey);
    if (found)
    cout << "Found: " << found->data.getName() << endl;
    else
    cout << "Not Found" << endl;


    // Test Count
    cout << "=== Count Nodes ===" << endl;
    cout << "Total nodes: " << b.CountNodes(b.pTree) << endl;


    // Test Delete
    cout << "=== Delete Test ===" << endl;
    int deleteKey  ;
    cout << "Enter the Deleting key: " << endl;
    cin>>deleteKey;
    b.pTree = b.Delete(b.pTree, deleteKey);


    cout << "BST After Deletion:" << endl;
    b.TreeTraverse(b.pTree);

    cout << "total nodes after deletion: " << b.CountNodes(b.pTree) << endl;

return 0;
}









