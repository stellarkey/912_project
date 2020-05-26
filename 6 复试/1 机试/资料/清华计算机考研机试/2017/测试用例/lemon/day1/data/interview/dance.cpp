# include<algorithm>
# include<vector>
# include<iostream>
using namespace std;
typedef struct{int id;int h;} student;
bool operator <(const student& a,const student & b){return (a.h)<(b.h);}


//显示给外界的接口
template <typename Iterator>
void insertionSort(const Iterator & begin, const Iterator & end)
{
    if( begin != end )
        insertionSortHelp(begin, end, *begin);
}

//调用Comparator
template <typename Iterator, typename Obj>
void insertionSortHelp(const Iterator & begin, const Iterator & end, const Obj & obj)
{
    insertionSort( begin, end, less<Obj>() );
}

//可以从第一个函数调用到此，也可以直接用此接口自己选择Comparator
template <typename Iterartor, typename Comparator>
void insertionSort(const Iterartor & begin, const Iterartor & end, Comparator cmp)
{
    insertionSort( begin, end, cmp, *begin);
}

//具体的实现
template <typename Iterator, typename Comparator, typename Obj>
void insertionSort(const Iterator & begin, const Iterator & end, Comparator lessThan,const Obj & obj)
{
    Iterator j;

    for(Iterator p = begin + 1; p!= end; ++p)
    {
        Obj tmp = *p;
        for( j = p; j != begin && lessThan(tmp, *(j - 1)); --j)
            *j = *(j -1);
        *j = tmp;
    }
}




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
		insertionSort(stu.begin(),stu.begin()+m+i);
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