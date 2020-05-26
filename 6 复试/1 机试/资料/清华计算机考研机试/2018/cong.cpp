# include<iostream>
# include<map>
# include<vector>
using namespace std;
typedef struct{int x,y;} position;
typedef struct{int id,f;} idfight;
typedef struct{int id;position p;int d;int f;bool live;} cong;
typedef vector<cong> conglist;
conglist all_cong;
map<int,vector<idfight> >war_map;
int n,m,k,times;
void init(){
	cin>>n>>m>>k;
	for(int i=0;i<n;i++){
		int x,y,d,f;
		cin >> x >>y>>d>>f;
		cong c1 ={i,{x,y},d,f,1};
		all_cong.push_back(c1);
	}
	cin >> times;
}
void action(cong &c){
	if(c.live){
	switch(c.d){
	case 0: if(c.p.y==m) c.d=1;else c.p.y++;break;
	case 1: if(c.p.y==1) c.d=0;else c.p.y--;break;
	case 2: if(c.p.x==1) c.d=3;else c.p.x--;break;
	case 3: if(c.p.y==n) c.d=2;else c.p.x++;break;
	default:;break;
	}
	int pi = c.p.x*1000+c.p.y;
	idfight idf = {c.id,c.f};
	war_map[pi].push_back(idf);
	}
}
void printans(){
		for(vector<cong>::iterator i = all_cong.begin();i!=all_cong.end();i++)	
		cout<<(*i).p.y<<" "<<(*i).p.x<<endl;
}
void fight(){
	map<int,vector<idfight> >::iterator it;
	it = war_map.begin();
	while(it!=war_map.end()){
		if((*it).second.size()>1){
			int max = 0;
			for(vector<idfight>::iterator i = (*it).second.begin();i!=(*it).second.end();i++){		
				if((*i).f>max)max = (*i).f;
			}
			for(vector<idfight>::iterator i = (*it).second.begin();i!=(*it).second.end();i++){		
				if((*i).f<max) all_cong[(*i).id].live=0;
			}
		}
	it++;
	}
}
int main() {
	init();
	while(times--){
	for(vector<cong>::iterator i = all_cong.begin();i!=all_cong.end();i++){		
		action(*i);
	}
	fight();
	war_map.clear();
	}
	printans();
	return 0;
}