# include<iostream>
# include<map>
# include<vector>
# include<algorithm>
using namespace std;

typedef struct {int x,y,z;} comm;
vector<int> numlist;
vector<comm> commlist;
int n,q;

void init(){
	int temp;
	cin>>n;
	while(n--){
		cin>>temp;
		numlist.push_back(temp);
	}
	cin>>q;
	int x,y,z;
	while(q--){
		cin>>x>>y>>z;
		comm command = {x,y,z};
		commlist.push_back(command);
	}

}

void printdata(){
	vector<int>::iterator it;
	it = numlist.begin();
	while(it!=numlist.end()){
	cout<<(*it)<<" ";
	it++;
	}
	cout<<endl;
}

void action_1(int i,int x){
	numlist[i-1]=x;
}

void action_2(int i ,int j){
	i--;j--;
	for(;i<=j;i++){
		numlist[i]=(numlist[i]+1)%3;
	}

}

void action_3(int i ,int j){
	i--;
	reverse(numlist.begin()+i,numlist.begin()+j);

}

void action_4(int i , int j){
	i--;
	int a,b,c;
	a =  count(numlist.begin()+i,numlist.begin()+j,0);
	b =  count(numlist.begin()+i,numlist.begin()+j,1);
	c =  count(numlist.begin()+i,numlist.begin()+j,2);

	if((a>2)||(b>2)||(c>2))cout<<"yes"<<endl;
	else cout<<"no"<<endl;

}


int main(){
	init();
	vector<comm>::iterator i;
	i = commlist.begin();
	while(i!=commlist.end()){
		switch((*i).x){
		case 1:action_1((*i).y,(*i).z);break;
		case 2:action_2((*i).y,(*i).z);break;
		case 3:action_3((*i).y,(*i).z);break;
		case 4:action_4((*i).y,(*i).z);break;
		default:;
		}
	i++;
	}
	printdata();
	return 0;

}