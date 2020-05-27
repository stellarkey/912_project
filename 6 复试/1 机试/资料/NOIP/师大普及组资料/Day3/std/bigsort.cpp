#include<bits/stdc++.h>
using namespace std;
const int N = 100010;
int n, a[N][25], b[10], c[N][25];
void bigsort(int x)
{
	memset(b, 0, sizeof(b));
	for(int i = 1; i <= n; i ++) b[a[i][x]] ++;
	for(int i = 1; i <= 10; i ++) b[i] += b[i-1];
	for(int i = n; i; i --){
		for(int j = 1; j <= 20; j ++) c[b[a[i][x]]][j] = a[i][j];
		b[a[i][x]] --;
	}
	for(int i = 1; i <= n; i ++)
		for(int j = 1; j <= 20; j ++)
			a[i][j] = c[i][j];
}

int main()
{
	freopen("bigsort.in", "r", stdin);
	freopen("bigsort.out", "w", stdout);
	scanf("%d", &n);
	for(int i = 1; i <= n; i ++)
		for(int j = 20; j; j --) scanf("%d", &a[i][j]);
	for(int i = 1; i <= 20; i ++) bigsort(i);
	for(int i = 1; i <= n; i ++){
		for(int j = 20; j; j --) printf("%d ", a[i][j]);
		printf("\n");
	}
	return 0;
}
