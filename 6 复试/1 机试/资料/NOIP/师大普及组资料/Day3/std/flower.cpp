#include<bits/stdc++.h>
using namespace std;
int n, k, x, t;
int gcd(int x, int y)
{
	if (y == 0) return x;
	return gcd(y, x % y);
}
int main()
{
	freopen("flower.in", "r", stdin);
	freopen("flower.out", "w", stdout);
	scanf("%d%d%d%d", &n, &k, &x, &t);
	int d = gcd(n, k);
	if ((x + n - t) % d == 0) printf("Yes");
		else printf("No");
	return 0;
}
