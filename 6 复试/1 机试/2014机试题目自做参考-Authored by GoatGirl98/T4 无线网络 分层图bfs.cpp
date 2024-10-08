#include <stdio.h>
#include <string.h>
#include <queue>
#include <vector>
#include <algorithm>
using namespace std;
const int INF = 0x3f3f3f3f;
const int N = 210, V = 25010;
void wr(int x)
{
    if (x < 0)
        putchar('-'), x = -x;
    if (x > 9)
        wr(x / 10);
    putchar(x % 10 + 48);
}
int rd()
{
    int k = 0, f = 1;
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
// input
int n, m, k, r;
int x[210], y[210];
bool judge(int a, int b)
{
    int _x = x[a] - x[b], _y = y[a] - y[b];
    return 1ll * _x * _x + 1ll * _y * _y <= 1ll * r * r;
}
int point(int level, int v) { return (n + m) * (level) + v; }
// graph
vector<int> g[V];
int dis[V];
int edge_cnt;
void add_edge(int u, int v)
{
    ++edge_cnt;
    g[u].push_back(v);
}

int main()
{
    n = rd(), m = rd(), k = rd(), r = rd();
    for (int i = 1; i <= n + m; ++i)
        x[i] = rd(), y[i] = rd();

    for (int i = 1; i <= n + m; ++i)
        for (int j = i + 1; j <= n + m; ++j)
            if (judge(i, j))
            {
                if (i <= n && j <= n)
                    for (int lev = 0; lev <= k; ++lev)
                        add_edge(point(lev, i), point(lev, j)), add_edge(point(lev, j), point(lev, i));
                else if (i > n && j <= n)
                {
                    for (int lev = 0; lev <= k; ++lev)
                        add_edge(point(lev, i), point(lev, j));
                    for (int lev = 0; lev < k; ++lev)
                        add_edge(point(lev, j), point(lev + 1, i));
                }
                else if (i <= n && j > n)
                {
                    for (int lev = 0; lev < k; ++lev)
                        add_edge(point(lev, i), point(lev + 1, j));
                    for (int lev = 0; lev <= k; ++lev)
                        add_edge(point(lev, j), point(lev, i));                    
                }
                else
                    for (int lev = 0; lev < k; ++lev)
                        add_edge(point(lev, i), point(lev + 1, j)), add_edge(point(lev, j), point(lev + 1, i));
            }
    memset(dis, 0x3f, sizeof(dis));
    // bfs
    queue<int> q;
    q.push(point(0, 1)), dis[point(0, 1)] = 0;
    while (q.size())
    {
        int u = q.front();
        q.pop();
        for (size_t i = 0; i < g[u].size(); ++i)
        {
            int v = g[u][i];
            if (dis[v] >= INF)
                dis[v] = dis[u] + 1, q.push(v);
        }
    }
    int ans = INF;
    for (int lev = 0; lev <= k; ++lev)
        ans = min(ans, dis[point(lev, 2)]);
    wr(ans - 1);
}
