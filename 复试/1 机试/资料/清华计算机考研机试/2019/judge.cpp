#include <algorithm>
#include <iostream>
#include <vector>
#include <queue>
#define MAX(a, b) ((a) > (b) ? (a) : (b) )
using namespace std;
int n,m;
vector<int> inDegreelist,outDegreelist;
 
//定义图的定点
typedef struct Vertex {
    int id,inDegree,outDegree;
    vector<int> connectors;    //存储节点的后续连接顶点编号
    Vertex() : id(-1),inDegree(0),outDegree(0) {}
    Vertex(int nid) : id(nid),inDegree(0),outDegree(0) {}
} Vertex;
 
//定义Graph的邻接表表示
typedef struct Graph {
    vector<Vertex> vertexs;   //存储定点信息
    int nVertexs;		      //计数：邻接数
    bool isDAG;               //标志：是有向图吗
 
    Graph(int n, bool isDAG) : nVertexs(n), isDAG(isDAG) { vertexs.resize(n); }
	Graph() : nVertexs(1), isDAG(1) { vertexs.resize(1); }
	//向图中添加边
    bool addEdge(int id1, int id2) {
        if (!(MAX(id1, id2) < vertexs.size())) return false;
 
        if (isDAG) {
            vertexs[id1].connectors.push_back(id2);
            vertexs[id1].outDegree++;
            vertexs[id2].inDegree++;
        }
        else {
            vertexs[id1].connectors.push_back(id2);
            vertexs[id2].connectors.push_back(id1);

            vertexs[id1].outDegree++;
            vertexs[id1].inDegree++;

            vertexs[id2].outDegree++;
            vertexs[id2].inDegree++;

        }
        return true;
    }
} Graph;

Graph g;

void init(){
	cin>>n>>m;
	g=Graph(n, true);
	int src,dst;
	while(m--){
		cin>>src>>dst;
		g.addEdge(src,dst);
	}
	vector<Vertex>::iterator it = g.vertexs.begin();
	while(it!=g.vertexs.end()){
		inDegreelist.push_back(it->inDegree);
		outDegreelist.push_back(it->outDegree);
		it++;
	}
}
int countin(int n){
	return count(inDegreelist.begin(),inDegreelist.end(),n);
}
int countout(int n){
	return count(outDegreelist.begin(),outDegreelist.end(),n);
}

bool Is_List(){
	//有一个inDegree为0的头和一个outDegree为0的尾，且其余节点入度与出度都为1;
	return (countin(0)==1)&&(countout(0)==1)&&(countin(1)==n-1)&&(countout(1)==n-1);
}

bool Is_Tree(){
	//有一个inDegree为0的头且其余节点inDegree均为1，且不是链表;
	return (countin(0)==1)&&(countin(1)==n-1);
}



bool topologicalSort(){//拓扑排序判断有环无环
	int num=0;//记录加入拓扑排序的顶点数
	queue<int> q;
	for(int i=0;i<n;i++){
		if(inDegreelist[i]==0){
			q.push(i);//将所有入度为0的顶点入队
		}
	}

	while(!q.empty()){
		int u=q.front();//取队首顶点u
		q.pop();
		for(int i=0;i<g.vertexs[u].connectors.size();i++){
			int v=g.vertexs[u].connectors[i];//u的后继节点v
			inDegreelist[v]--;//v的入度减1
			if(inDegreelist[v]==0){//顶点v的入度减为0则入队
				q.push(v);
			}
		}
		g.vertexs[u].connectors.clear();//清空u的所有出边
		num++;//加入拓扑排序的顶点数加1
	}
	if(num==n) return true;//加入拓扑排序的顶点为n，则拓扑排序成功，图无环
	else return false;//否则拓扑排序失败，图有环
}


int main(){
	init();
	if(n==0||m==0){
		cout<<"error"<<endl;
	}
	if(Is_List()){
		cout<<"list"<<endl;
	}
	
	else if(Is_Tree()){
		cout<<"tree"<<endl;
	}
	else if(topologicalSort()){
		cout<<"no ring"<<endl;
	}
	else{
	cout<<"have ring"<<endl;
	}
	return 0;
}