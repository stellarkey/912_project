// 计数容斥之后，利用线段树维护区间生成函数乘法
#include <stdio.h>
#include <string.h>
#include <vector>
#include <algorithm>
const int N = 100010;
using namespace std;
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
i64 n, C, ans;
i64 a[N], cnt[N], s_cnt[N];
i64 cnt_between(i64 l, i64 r)
{
    if (r < l || r < 0 || l >= C)
        return 0;
    if (r >= C)
        r = C - 1;
    if (l < 0)
        l = 0;
    if (l == 0)
        return s_cnt[r];
    else
        return s_cnt[r] - s_cnt[l - 1];
}
// polynomial (\bmod x^3)
struct poly
{
    vector<i64> a;
    // init : poly = (cnt * x + 1)
    poly(i64 cnt = 0)
    {
        a.resize(3);
        a[1] = cnt, a[0] = 1;
    }
    i64 at(size_t x) const { return x >= a.size() ? 0 : a[x]; }
    poly operator* (const poly& o) const
    {
        poly ret;
        ret.a.resize(3);
        // fix a[0]
        ret.a[0] = 0;
        for (int i = 0; i < a.size(); ++i)
            for (int j = 0; j < o.a.size(); ++j)
                if (i + j < 3)
                    ret.a[i + j] += a[i] * o.a[j];                
        return ret;
    }
};
// segment tree maintaining polynomial production
inline int lc(int x) { return x << 1; }
inline int rc(int x) { return (x << 1) | 1; }
poly origin[N]; // 1-indexed
poly nodes[N << 2];
void pushup(int rt) { nodes[rt] = nodes[lc(rt)] * nodes[rc(rt)]; }
void build(int l = 1, int r = C, int rt = 1)
{
    if (l == r)
        nodes[rt] = origin[l];
    else
    {
        int m = (l + r) >> 1;
        build(l, m, lc(rt)), build(m + 1, r, rc(rt));
        pushup(rt);
    }
}
poly query(int L, int R, int l = 1, int r = C, int rt = 1)
{
    if (R < l || r < L)
        return poly();
    if (L <= l && r <= R)
        return nodes[rt];
    int m = (l + r) >> 1;
    return query(L, R, l, m, lc(rt)) * query(L, R, m + 1, r, rc(rt));
}
i64 optional_i_and_j(i64 l, i64 r)
{
    if (r < l || r < 0 || l >= C)
        return 0;
    if (r >= C)
        r = C - 1;
    if (l < 0)
        l = 0;
    return query(l + 1, r + 1).at(2);
}

// O(C\log C) subtask 01-05 100 pts
int main()
{
    n = rd(), C = rd();
    i64 ceil_180 = (C + 1) >> 1, floor_180 = C >> 1;
    for (int i = 0; i < n; ++i)
        ++cnt[rd()];
    // prefix sum
    s_cnt[0] = cnt[0];
    for (int i = 1; i < C; ++i)
        s_cnt[i] = s_cnt[i - 1] + cnt[i];
    // Poly
    for (int i = 0; i < C; ++i)
        origin[i + 1] = poly(cnt[i]);
    build(); // build segment tree  
    
    // add
    for (int j = 0; j < C; ++j)
        ans += cnt[j] * cnt_between(j - ceil_180 + 1, j - 1) * cnt_between(j + 1, j + ceil_180 - 1);
    // sub
    for (int k = 0; k < C; ++k)
        ans -= cnt[k] * optional_i_and_j(k - floor_180, k - 1);
    wr(ans);
    
}
