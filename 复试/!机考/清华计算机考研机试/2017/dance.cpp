# include<algorithm>
# include<vector>
# include<iostream>
using namespace std;
typedef struct{int id;int h;} student;
bool operator <(const student& a,const student & b){return (a.h)<(b.h);}

int n,m,k,tall=0;
vector<student> stu;
vector<int> highid;
void init(){
	student temp;
	cin >> n >> m >> k;
	for(int i=0;i<n;i++){
		temp.id = i;
		cin >> temp.h;
		stu.push_back(temp);
	}
}
void pick(){
	for(int i = 0;i<=n-m;i++){ //排序
		sort(stu.begin(),stu.begin()+m+i);
		for(int j = 0;j<=i;j++){//检查个头
			if(stu[j+m-1].h-stu[j].h<=k){
				for(int y=j;y<j+m;y++){//找最大id
					if(stu[y].id>tall) tall = stu[y].id;
				}
				cout<<tall+1<<endl;
				return;
			}
		}
	}
	cout<<"impossible"<<endl;
}
int main(){
	init();
	pick();
	return 0;
}