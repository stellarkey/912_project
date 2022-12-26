/*
把所有在同一位置的点放在一起就行
假设从[0,360)角度标注ABC三个点，那么必然有AC弧度差严格大于180度，而AB和BC的弧度差严格小于180度才能组成对应的圆
然后枚举计数即可，复杂度O(n^3) 足够卡过前面60分的部分了
100分的做法我不会= =
*/
#include <stdio.h>
#include <string.h>
#include <algorithm>
using namespace std;
typedef long long ll;
inline void write(ll x)
{
    if (x < 0)
        putchar('-'), x = -x;

    if (x > 9)
        write(x / 10);

    putchar(x % 10 + 48);
}
inline ll read()
{
    ll k = 0, f = 1;
    char c = getchar();

    while (c < '0' || c > '9')
    {
        if (c == '-')
            f = -1;

        c = getchar();
    }

    while (c >= '0' && c <= '9')
    {
        k = (k << 1) + (k << 3) + c - 48;
        c = getchar();
    }

    return k * f;
}
ll n, C;
ll a[114514];
ll cnt[114514];
ll real_state[114514], real_cnt[114514], real_sz;
ll ans;
ll gap_of_180;
// assume that i < j < k
bool judge(ll i, ll j, ll k)
{
    // if (i >= ((C + 1) >> 1))
        // return 0;
    if ((k - i > gap_of_180) && (j - i < ((C + 1) >> 1)) && (k - j < ((C + 1) >> 1)))
        return 1;
    else
        return 0;
}
int main()
{
    n = read(); C = read();
    gap_of_180 = C >> 1;
    for (int i= 1; i <= n; ++i)
        a[i] = read();
    sort(a + 1, a + n + 1);
    for (int i = 1; i <= n; ++i)
        cnt[a[i]]++;
    for (int i = 0; i < C; ++i)
        if (cnt[i])
            real_state[++real_sz] = i, real_cnt[real_sz] = cnt[i];
    for (int _i = 1; _i <= real_sz; ++_i)
        for (int _j = _i + 1; _j <= real_sz; ++_j)
            for (int _k = _j + 1; _k <= real_sz; ++_k)
            {
                ll i = real_state[_i], j = real_state[_j], k = real_state[_k];
                if (judge(i, j, k))
                    ans += real_cnt[_i] * real_cnt[_j] * real_cnt[_k];
                // printf("judge (%d, %d, %d) is true\n", i, j, k), 
            }
    write(ans);
}