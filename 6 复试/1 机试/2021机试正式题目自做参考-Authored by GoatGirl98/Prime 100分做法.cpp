// 我这里用的是Miller-Rabin质数检测做法，其实暴力的试除法在这个数据范围下就可以过了
#include <iostream>
#include <string>
#include <sstream>
#include <stdlib.h>
using namespace std;
typedef long long ll;
typedef __int128_t lll;
string s, t, real;
ll x, cur, tmp;
lll qpow(lll a, lll b, lll m)
{
    a %= m;
    lll res = 1;
    while (b > 0)
    {
        if (b & 1)
            res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}

int millerRabin(lll n)
{
    if (n < 3 || n % 2 == 0)
        return n == 2;
    lll a = n - 1, b = 0;
    while (!(a & 1))
        a >>= 1, ++b;
    lll i, j;
    for (i = 1; i <= 12; ++i)
    {
        lll x = rand() % (n - 2) + 2;
        lll v = qpow(x, a, n);
        if (v == 1)
            continue;
        for (j = 0; j < b; ++j)
        {
            if (v == n - 1)
                break;
            v = v * v % n;
        }
        if (j >= b)
            return 0;
    }
    return 1;
}
int main()
{
    ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
    cin >> s;
    cur = 1;
    while (1)
    {
        t = to_string(cur);
        real = s + t;
        stringstream ss(real);
        ss >> tmp;
        if (millerRabin(tmp))
            printf("%lld", tmp), exit(0);
        ++cur;
    }
}