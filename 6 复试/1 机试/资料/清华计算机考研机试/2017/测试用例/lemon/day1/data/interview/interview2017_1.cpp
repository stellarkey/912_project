#include<iostream>
#include<map>
#include<list>
#include<vector>
#include<algorithm>
using namespace std;

int n,m,k;
int h;
vector<int> max_nums;
map<int,vector<int> > mp;
int main()
{
    //input
    cin>>n>>m>>k;
    for(int i = 1;i<=n;++i){
        cin>>h;
        mp[h].push_back(i);
    }

    /*operation:
    (1)统一遍历一遍面试名单：从小到大，以遇到的每个身高h为区间起点，检测在[h,h+k)这个cell中，是否能找够m：
        是:则记录下他们最大的面试者编号；放入一个记录每个小区间max_num的vector中
        否:则跳过当前，进行下一个节点循环。
    (2)扫描一遍后，输出max_num的向量中，值最小的，是他们最少需要面试的人数。
    （3）复杂度：应该是O(m*n);
    */
    map<int,vector<int> >::iterator it1 = mp.begin();//用了两个指针，构造数轴上的一个小区间
    map<int,vector<int> >::iterator it2 = it1;

    for(;it1!=mp.end();++it1){
        int counts = 0;
        int max_num = -1;
        bool enough_flag = false;
        int min_high = it1->first;//记录检测小cell中的最小身高（即基准身高），与其他身高之差，应不大于k
        for(it2 = it1;it2!=mp.end();++it2){
            if(it2->first - min_high <= k && counts <= m){
                counts += it2->second.size();
                if(it2->second[it2->second.size()-1] > max_num ){
                    max_num = it2->second[it2->second.size()-1];
                }
            }else if(counts == m) {
                enough_flag = true;
                break;
            }else  break;
        }
        if(max_num !=-1 && enough_flag ==true ) max_nums.push_back(max_num);
     }

     //搜索结束，找到所有小区间上的最小的编号
     int i= max_nums.size();
     vector<int>::iterator it3 = max_nums.begin();
     sort(it3,it3+i);

     if(!max_nums.empty()){
        cout<<max_nums.front()<<endl;
     }else
        cout<<"impossible"<<endl;

    return 0;
}
