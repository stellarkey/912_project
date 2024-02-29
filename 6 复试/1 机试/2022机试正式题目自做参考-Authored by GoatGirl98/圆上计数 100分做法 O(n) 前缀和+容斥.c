// $n \le 10^6$ 时可过
#include <stdio.h>
#define getchar getchar_unlocked
#define putchar putchar_unlocked
#define N 1000010
typedef long long i64;
void wr(i64 x)
{
    if (x < 0)
        putchar('-'), x = -x;
    if (x > 9)
        wr(x / 10);
    putchar(x % 10 + 48);
}
i64 rd()
{
    i64 k = 0, f = 1;
    char c = getchar();
    while (c < '0' || c > '9')
    {
        if (c == '-')
            f = -1;
        c = getchar();
    }
    while (c >= '0' && c <= '9')
    {
        k = (k << 1) + (k << 3) + (c ^ '0');
        c = getchar();
    }
    return f > 0 ? k : -k;
}

i64 n, C;
i64 cnt[N], s[N]; // prefix sum of count

i64 point_cnt(i64 a, i64 b)
{
    if (a <= b)
        return s[b] - (a ? s[a - 1] : 0);
    else
        return s[b] + (s[C - 1] - s[a - 1]);
}

int main()
{
    n = rd(), C = rd();
    for (int i = 0; i < n; ++i)
        ++cnt[rd()];
    s[0] = cnt[0];
    for (int i = 1; i < C; ++i)
        s[i] = s[i - 1] + cnt[i];
    i64 ans = n * (n - 1) * (n - 2) / 6; // all solution : C(n, 3)
    
    for (int i = 0; i < C; ++i)
    {
        i64 illegal_state = (i + (C >> 1)) % C; // (i, k) <= 180 degree
        i64 tot = point_cnt(i + 1, illegal_state);
        
        ans -= cnt[i] * (tot * (tot - 1) >> 1); // one i and two illegal
        ans -= (cnt[i] * (cnt[i] - 1) >> 1) * tot; // two i and one illegal
        ans -= cnt[i] * (cnt[i] - 1) * (cnt[i] - 2) / 6; // three i
    }
    // duplicate (i, k) = 180 when C is even
    if (C % 2 == 0)
        for (int i = 0; i < (C >> 1); ++i)
        {
            ans += (cnt[i] * (cnt[i] - 1) >> 1) * cnt[i + (C >> 1)]; // one i two oppo
            ans += cnt[i] * (cnt[i + (C >> 1)] * (cnt[i + (C >> 1)] - 1) >> 1); // two i one oppo
        }
    wr(ans);
}
