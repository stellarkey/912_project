#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const int N = 100010;
int n, a[N], b[N];
LL ans = 0;
void merge(int L, int R)
{
	if (L == R) return;
	int mid = (L + R) / 2;
	merge(L, mid);
	merge(mid + 1, R); 
	int i = L, k = L, j = mid + 1;
	while (i <= mid && j <= R)
	{
		if (a[i] <= a[j]) b[k++] = a[i++];   
			else b[k++] = a[j++], ans += (LL)(mid - i + 1);    //Í³¼ÆÄæÐò¶Ô 
	}
	while (i <= mid) b[k++] = a[i++]; 
	while (j <= R) b[k++] = a[j++];
	for (int i = L; i <= R; i ++) a[i] = b[i];
}
int main()
{
	freopen("train.in", "r", stdin);
	freopen("train.out", "w", stdout);
	scanf("%d", &n);
	for(int i = 1; i <= n; i ++) scanf("%d", &a[i]);
	merge(1, n);
	printf("%lld", ans);
	return 0;
}
