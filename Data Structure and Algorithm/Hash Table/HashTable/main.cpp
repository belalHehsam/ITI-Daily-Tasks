#include <iostream>
#include <vector>
#include <list>
#include <stdexcept>

using namespace std;

template<class KeyType , class ValueType>
class MapEntry
{
    KeyType Key ;  /// int
    ValueType Value ; ///Employee

public :

    MapEntry(const KeyType& _Key, const ValueType& _Value): Key(_Key), Value(_Value) {}
   const KeyType &GetKey ()const { return Key;}
   const ValueType &GetValue() const{ return Value;}
};

template<class KeyType , class ValueType>
class HashTable{
    ///vector with 10 lists but every list is empty when i insert ,i insert inside list but here i inialize empty 10 lists;
    vector<list< MapEntry<KeyType,ValueType>> >thelists;
    int currentSize;
public:

    HashTable(int Size=10):thelists(Size){currentSize=0;}


    double loadFactor() const
    {
        return (double)currentSize / thelists.size();
    }


    bool contains (const KeyType &x) {
        int whichList=MyHashTable(x);

        list<MapEntry<KeyType, ValueType>>&Bucket=thelists[whichList];

        typename list<MapEntry<KeyType, ValueType>>::iterator itr=Bucket.begin();

        while(itr!=Bucket.end()){
            if(itr->GetKey()==x)
                return true;
            itr++;
        }
    return false;
}


    bool Insert(const KeyType& x , const ValueType& y){
    ///check for Duplication
    if(contains(x)) return false;

     int whichList=MyHashTable(x);

     list<MapEntry<KeyType, ValueType>>&Bucket=thelists[whichList];

     Bucket.push_back( MapEntry<KeyType,ValueType>(x,y) );
     currentSize++;

       if (loadFactor() > 0.75)
            Rehash();

     return true;
}


    bool Remove(const KeyType&x){

    int whichList=MyHashTable(x);
    list<MapEntry<KeyType, ValueType>>&Bucket=thelists[whichList];

      typename list<MapEntry<KeyType, ValueType>>::iterator itr=Bucket.begin();

        while(itr!=Bucket.end()){
            if(itr->GetKey()==x)
            {
                Bucket.erase(itr);
                currentSize--;
                return true;
            }
            itr++;
        }

    cout << "The element not exists" << endl;

    return false;
}

    ///Destroy all lists
    void MakeEmpty ()
    {
        for (auto&lst : thelists)  lst.clear();
        currentSize = 0;
    }


  int MyHashTable (const KeyType& x)const{

    std::hash<KeyType> hashFunction ;

    int hashValue=hashFunction(x);

    return hashValue % thelists.size();
  }



 ValueType LookUP (const KeyType& Key)const {

    /*Basic Function of Hash Table*/

        ///1. Compute Hash Value for Key : Index
        ///2. Access Bucket
        ///3. Search Linearly for Key
        ///4. if Found return Value

        int whichList=MyHashTable(Key);

        const list<MapEntry<KeyType, ValueType>>&Bucket=thelists[whichList];

        for(auto &entry: Bucket){
            if(entry.GetKey()==Key){
                return entry.GetValue();
            }
        }
    throw std::out_of_range("Key not found in HashTable");
 }



protected:
    void Rehash ()
    {

    vector<list< MapEntry<KeyType,ValueType>> >temp(thelists.size()*2);

    ///this is that happen inside Range-based for loop
    /*
    auto __begin = bucket.begin();
    auto __end   = bucket.end();

    for ( ; __begin != __end; ++__begin)
    {
        auto& entry = *__begin;   //alias
        // جسم اللوب
    }
*/

    for(auto &bucket:thelists){
        for(auto&entry:bucket)
        {
            int newIndex=MyHashTable(entry.GetKey());
            temp[newIndex].push_back(entry);
        }
        }

    thelists = move(temp);
    }


};


int main(){
HashTable<int, string> table(5);

    cout << "Insert elements:\n";
    table.Insert(1, "Ahmed");
    table.Insert(2, "Ali");
    table.Insert(3, "Mona");
    table.Insert(4, "Sara");
    table.Insert(5, "Omar");


    cout << "\nCheck contains:\n";
    cout << "Contains key 3? " << table.contains(3) << endl;
    cout << "Contains key 10? " << table.contains(10) << endl;

    cout << "\nLookup:\n";
    try {
        cout << "Key 2 => " << table.LookUP(2) << endl;
        cout << "Key 5 => " << table.LookUP(5) << endl;
        cout << "Key 10 => " << table.LookUP(10) << endl; // will throw
    }
    catch (const std::out_of_range& e) {
        cout << e.what() << endl;
    }

    cout << "\nRemove elements:\n";
    table.Remove(3);
    table.Remove(10); // not exists

    cout << "\nAfter remove, contains key 3? "
         << table.contains(3) << endl;

    cout << "\nMake table empty\n";
    table.MakeEmpty();

    cout << "Contains key 1 after MakeEmpty?"<< table.contains(1) << endl;

    return 0;
}
