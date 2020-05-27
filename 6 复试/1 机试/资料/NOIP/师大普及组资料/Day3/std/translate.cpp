#include<bits/stdc++.h>
using namespace std;
int n, m, x, L, R, ans, memory[1010], word[1010];
int main()
{
	freopen("translate.in", "r", stdin);
	freopen("translate.out", "w", stdout); 
	scanf("%d%d", &m, &n);
	for (int i = 1; i <= n; i ++)
	{
		scanf("%d", &x);
		if (!memory[x])  //单词 x不在内存中 
		{
			ans ++; R ++; 
			word[R] = x;   //按读入顺序记录单词 x
			memory[x] = 1;   //桶排思想，记录单词 x已出现在内存中
			if (R > m)   //内存已满 
				L ++, memory[word[L]] = 0;  //删除首部的单词
		}
	}
	printf("%d", ans);
	return 0;
 } 
