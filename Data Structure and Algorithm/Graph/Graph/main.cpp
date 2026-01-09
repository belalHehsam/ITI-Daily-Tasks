#include <iostream>
#include <queue>
#include <vector>
#include <climits>
#include <functional>
using namespace std;

template<typename VertexType>
class Graph{
    int numVertices;
    VertexType vertices[50];
    int edges[50][50];
    bool marks[50];

    public:
        Graph(){
            numVertices=0;
            ///Make all edges in the beginning = 0
            for(int i=0;i<50;i++)
                for(int j=0;j<50;j++)
                    edges[i][j]=0;
        }

        bool IsEmpty(){return numVertices==0;}
        bool IsFull(){return numVertices==50;}

        void MakeEmpty(){numVertices=0;}

        void AddVertex (const VertexType& vertex){

            if(IsFull()) return;

            vertices[numVertices++]=vertex;
        }

        ///return Index of the vertex from vertices Array and return -1 if not Found
        int GetIndex (const VertexType& vertex){
               for(int i=0;i<numVertices;i++){
                    if(vertices[i]==vertex)
                         return i;
               }
               cout<<"Not Found"<<endl;
               return -1;
        }

        ///No return just add Edge from to vertecs
        void AddEdge(VertexType fromVertex ,VertexType toVertex , int Weight ){
                    if(IsEmpty()){
                      cout<<"The Graph is Empty No Vertices" <<endl;
                      return;
                    }

                    int fromVertexIndex=GetIndex(fromVertex);
                    int toVertexIndex=GetIndex(toVertex);

                    if(fromVertexIndex>-1 && toVertexIndex>-1){
                            edges[fromVertexIndex][toVertexIndex]=Weight;
                            cout<<"Edge Added Successfully"<<endl;
                    }

                    else{
                        cout<<"one of these Vertices Not Found in the Graph"<<endl;
                    }
        }


        ///Return the Weigh Between Two Verteces and return -1 if one of them not Found
        int GetDiricitPathWeight (VertexType fromVertex ,VertexType toVertex){

                int fromVertexIndex=GetIndex(fromVertex);
                int toVertexIndex=GetIndex(toVertex);

                if(fromVertexIndex>-1&&toVertexIndex>-1)
                    return edges[fromVertexIndex][toVertexIndex];

                return -1;
            }

        ///for get all AdjVertices for specific vertex
        /// the queue contain all Vertices that connected directly to this vertex
        void GetAdjVertices (VertexType vertex , queue<VertexType> & VertexQ){
                ///Get Index for this vertex
                int vertexIndex=GetIndex(vertex);
                ///if the vertex exists
                if(vertexIndex>-1)
                    ///go in the array for this vertex
                    for(int i=0;i<numVertices;i++){
                        ///if found a weight between this vertex and another any vertex ,push the name of this vertex from the vertices array by the same index
                           if(edges[vertexIndex][i]>0)
                                VertexQ.push(vertices[i]);
                    }
                }


        ///make all nodes not marked and we will use it before traversal
        void ClearMarks (){
            for(int i=0;i<numVertices;i++)
                marks[i]=false;
        }

        ///make the Vertex visited when we traversal to avoid the infinite loop
        void MarkVertex(VertexType vertex){

            int vertexIndex=GetIndex(vertex);
                if(vertexIndex>-1)
                    marks[vertexIndex]=true;
        }

        ///this vertex visited before or not
        bool IsMarked (VertexType vertex){
            int vertexIndex=GetIndex(vertex);
                if(vertexIndex>-1)
                    return marks[vertexIndex];

        return false;
        }

        ///this function help me know if is path or not
        ///print the path between vertex A and B
        void BreadthFirstSearch (const VertexType& startVertex , const VertexType& endVertex){
            ///sure that all nodes false
            ClearMarks();
            queue<VertexType> Queue;
            ///use tempQueue to push adjacent and check each one of them is marked or not before pushed main queue
            queue<VertexType> TempQueue;
            ///push first vertex in the queue
            Queue.push(startVertex);
            ///mark this vertex
            MarkVertex(startVertex);
            ///loop until the queue is empty
            while(!Queue.empty()){
                    ///get the first vertex
                   VertexType current=Queue.front();
                   ///pop this vertex
                   Queue.pop();
                    ///print this vertex
                    cout<<current<<endl;
                    if(current==endVertex)
                        break;
                    ///after print and pop the vertex ,get the adj for this vertex
                    GetAdjVertices(current,TempQueue);

                    while(!TempQueue.empty()){
                        VertexType currentTempValue=TempQueue.front();
                        TempQueue.pop();
                         if(!IsMarked(currentTempValue)){
                                Queue.push(currentTempValue);
                                MarkVertex(currentTempValue);
                         }
                    }
            }

        }


        void Dijkstra(const VertexType& startVertex)
        {
            const int INF = INT_MAX;

            int dist[50];
            bool visited[50];

            for (int i = 0; i < numVertices; i++) {
                dist[i] = INF;
                visited[i] = false;
            }

            int startIndex = GetIndex(startVertex);
            dist[startIndex] = 0;

            priority_queue<
                pair<int,int>,
                vector<pair<int,int>>,
                greater<pair<int,int>>
            > pq;

            pq.push({0, startIndex});

            while (!pq.empty())
            {
                int currentDist = pq.top().first;
                int u = pq.top().second;
                pq.pop();

                if (visited[u])
                    continue;

                visited[u] = true;

                for (int v = 0; v < numVertices; v++) {
                    if (edges[u][v] > 0 && !visited[v]) {

                        int newDist = dist[u] + edges[u][v];

                        if (newDist < dist[v]) {
                            dist[v] = newDist;
                            pq.push({dist[v], v});
                        }
                    }
                }
            }


            cout << "Shortest distances from " << startVertex << ":\n";
            for (int i = 0; i < numVertices; i++) {
                cout << startVertex << " -> "
                     << vertices[i]
                     << " = " << dist[i] << endl;
            }
        }


};


int main()
{
    Graph<char> g;

    // ===== Add Vertices =====
    g.AddVertex('A');
    g.AddVertex('B');
    g.AddVertex('C');
    g.AddVertex('D');

    // ===== Add Edges (Directed & Weighted) =====
    g.AddEdge('A', 'B', 1);
    g.AddEdge('A', 'C', 4);
    g.AddEdge('B', 'C', 2);
    g.AddEdge('B', 'D', 5);
    g.AddEdge('C', 'D', 1);

    cout << "\n===== BFS from A to D =====\n";
    g.BreadthFirstSearch('A', 'D');

    cout << "\n===== Dijkstra from A =====\n";
    g.Dijkstra('A');
}
