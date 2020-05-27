#include<bits/stdc++.h>
using namespace std;
int main()
{
	freopen("poly.in", "r", stdin);
	freopen("poly.out", "w", stdout);
    int n, a;
    cin >> n;
    for(int i = n; i >= 0; i --)
	{
        cin >> a;
        if (a)   //判 0系数
		{    
            if (i != n && a > 0) cout << "+";    //根据正负、是否为最高此项决定加号
            if (abs(a) > 1 || i == 0) cout << a;    //输出系数（系数不为正负1或指数为0）
            if (a == -1 && i) cout << "-";    //-1系数特判，常数项已特判
            if (i > 1) cout << "x^" << i;    //二次及以上输出指数
            if (i == 1) cout << "x";    //一次项
        }
    }
    return 0;
}
