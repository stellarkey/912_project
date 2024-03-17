// 来自网研院的Yizhi Li 我当时模拟测试没做这题= =
#include <iostream>
#include <algorithm>
using namespace std;
const int N = 1e5 + 5, M = 1e6 + 5;
// --------------------------------------------------------
struct Query
{
    bool tag; // 0 为读，1 为写
    int t, x;
    bool operator<(const Query &a) const
    {
        if (t != a.t)
            return t < a.t;
        return tag > a.tag;
    }
} query[M];
// --------------------------------------------------------
int lim[N], max_lim, cnt, end_time;
int n, m, k, d;
int main()
{
    // freopen("3.in", "r", stdin);
    scanf("%d%d%d%d", &n, &m, &k, &d);
    char op[2];
    for (int i = 0, t, x; i < m; i++)
    {
        scanf("%s%d%d", op, &t, &x);
        query[i] = {op[0] == 'W', t + 1, x};
    }
    stable_sort(query, query + m);

    for (int i = 0; i < m; i++)
    {
        bool tag = query[i].tag;
        int t = query[i].t, x = query[i].x;
        if (end_time && t >= end_time)
            cnt = end_time = 0;
        if (!tag) // 读
        {
            if (t <= lim[x])
                printf("B\n");
            else if (cnt)
            {
                if (t > max_lim)
                    printf("RB\n");
                else
                    lim[x] = max_lim, printf("RWB\n");
            }
            else
                lim[x] = max_lim = t + k, printf("RWB\n");
        }
        else
        {
            cnt++;
            if (!end_time)
                end_time = t >= max_lim ? t : max_lim + 1;
            end_time += d;
        }
    }
}
