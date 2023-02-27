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
vector<int> exist;
int main()
{
    n = rd(), C = rd();
    i64 ceil_180 = (C + 1) >> 1, floor_180 = C >> 1;
    for (int i = 0; i < n; ++i)
        ++cnt[rd()];
    s_cnt[0] = cnt[0];
    for (int i = 1; i < C; ++i)
        s_cnt[i] = s_cnt[i - 1] + cnt[i];
    for (int i = 0; i < C; ++i)
        if (cnt[i])
            exist.push_back(i);
    if (n == exist.size()) // O(n) subtask 04 80pts
    {
        // i < j < k, first enamurate j, with <i, j> < 180° and <j, k> < 180°.
        for (int j = 0; j < exist.size(); ++j)
            ans += 1ll * cnt[exist[j]] * cnt_between(exist[j] - ceil_180 + 1, exist[j] - 1) * cnt_between(exist[j] + 1, exist[j] + ceil_180 - 1);
        // enamurate k, <i, k> <= 180°
        for (int k = 0; k < C; ++k)
        {
            i64 optional_i_and_j = cnt_between(k - floor_180, k - 1);
            ans -= cnt[k] * (optional_i_and_j * (optional_i_and_j - 1) >> 1);
        }
    }
    else // O(n^2) subtask 01 - 03 60pts
    {
        for (int i = 0; i < exist.size(); ++i)
            for (int j = i + 1; j < exist.size() && (exist[j] - exist[i] < ceil_180); ++j)
                ans += 1ll * cnt[exist[i]] * cnt[exist[j]] * cnt_between(exist[i] + floor_180 + 1, exist[j] + ceil_180 - 1);
    }
    wr(ans);
}