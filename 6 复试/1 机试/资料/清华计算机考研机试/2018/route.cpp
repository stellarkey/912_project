# include<iostream>
# include<bitset>
# include<vector>
# define MAX_BIT 32
using namespace std;
vector<int> power; 
int n;
void init(){
	cin>>n;
	for(int i=0;i<n;i++){
		int temp;
		cin>>temp;
		power.push_back(temp);
	}
}
int countones(int a,int b){
	int c = a&b;
	bitset<MAX_BIT> bt(c);
	return bt.count();
}
int calc(int n){
	return n==1?
	countones(power[0],power[1]):
	countones(power[0],power[n])+
	calc(n-1)*countones(power[n],power[n-1])%991127;
}
int main(){
	init();
	cout<<calc(n-1)%991127<<endl;
	return 0;
}