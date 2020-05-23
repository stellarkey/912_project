# include <iostream>
# include <vector>
# include <cmath>
# include <algorithm>
using namespace std;
vector<int> datain;
vector< vector<int> > datalist;
int n,m;
void init(){
	cin>>n>>m;
	for(int i=0;i<n;i++){
		int temp;
		cin>> temp;
		datain.push_back(temp);
	}
	datalist.resize(m+1);
}
int countnum(vector<int> vc){
	int max=-1;
	int id=-1;
	for(int i=0;i<10;i++){
		int t = count(vc.begin(), vc.end(),i);
		if(t>max){
			max=t;
			id=i;
		}
	}
	return id;
}
void check(){
	for(int i=0;i<n;i++){
		for(int j=1;j<=m;j++){
			int k = (datain[i]%(int)pow(10.0,j))/pow(10.0,j-1);
			datalist[j].push_back(k);
		}
	}
}
int main(){
	init();
	check();
	for(int i=1;i<=m;i++)cout<<countnum(datalist[i])<<endl;
	return 0;
}


