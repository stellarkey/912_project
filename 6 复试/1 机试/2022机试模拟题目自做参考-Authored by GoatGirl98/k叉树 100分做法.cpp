#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <algorithm>
#include <vector>
#include <queue>
using namespace std;
namespace FastIO
{
    char buf[1 << 21], *p1 = buf, *p2 = buf;
    inline char nc() { return p1 == p2 && (p2 = (p1 = buf) + fread(buf, 1, 1 << 21, stdin), p1 == p2) ? EOF : *p1++; }
    int rd()
    {
        int ret = 0, f = 1;
        char ch = nc();

        while (ch < '0' || ch > '9')
        {
            if (ch == '-')
                f = -1;
            ch = nc();
        }
        while (ch >= '0' && ch <= '9')
        {
            ret = (ret << 1) + (ret << 3) + (ch ^ 48);
            ch = nc();
        }

        return f == 1 ? ret : -ret;
    }
    void input(char *s)
    {
        int len = 0;
        char ch = nc();
        while (isspace(ch))
            ch = nc();
        while (!isspace(ch))
            s[len++] = ch, ch = nc();
        s[len] = '\0';
    }
    char Buf[1 << 21], out[20];
    int P, out_size;
    void flush() { fwrite(Buf, 1, out_size, stdout), out_size = 0; }
    void _putc(char ch) { Buf[out_size++] = ch; }
    void _puts(const char *s)
    {
        if (out_size >= 1 << 20)
            flush();
        int len = strlen(s);
        for (int i = 0; i < len; ++i)
            Buf[out_size++] = s[i];
    }
    void wt(int x, char ch)
    {
        if (out_size >= 1 << 20)
            flush();

        if (x < 0)
            Buf[out_size++] = 45, x = -x;

        do
            out[++P] = (x % 10) ^ 48;
        while (x /= 10);

        do
            Buf[out_size++] = out[P];
        while (--P);
        Buf[out_size++] = ch;
    }
    struct IOFlush
    {
        ~IOFlush() { flush(); }
    } tail;
}
using namespace FastIO;
#define maxn 100010
int u[100010], v[100010];
int f[maxn], sz[maxn];
int degree[maxn];
inline void initFather(int n)
{
    for (int i = 1; i <= n; ++i)
        f[i] = i, sz[i] = 1;
}
inline int getFather(int x)
{
    return f[x] == x ? x : f[x] = getFather(f[x]);
}
inline bool check(int x, int y)
{
    int a = getFather(x);
    int b = getFather(y);
    if (a != b)
        return false;
    else
        return true;
}
inline void merge(int x, int y)
{
    int a = getFather(x);
    int b = getFather(y);
    if (a == b)
        return;
    if (sz[a] > sz[b])
        f[b] = a, sz[a] += sz[b], sz[b] = 0;
    else
        f[a] = b, sz[b] += sz[a], sz[a] = 0;
}
bool is_tree(int m)
{
    initFather(m);
    for (int i = 1; i < m; ++i)
    {
        if (check(u[i], v[i]))
            return 0;
        else
            merge(u[i], v[i]);
    }
    return 1;
}
int m, k;
vector<int> g[maxn];
bool judge(int u)
{
    queue<int> q;
    vector<int> cnt(m + 3);
    vector<bool> vis(m + 3);
    q.push(u);
    while (!q.empty())
    {
        int st = q.front();
        q.pop();
        vis[st] = 1;
        for (int i = 0; i < g[st].size(); ++i)
        {
            int ed = g[st][i];
            if (vis[ed])
                continue;
            q.push(ed), cnt[st]++;
            if (cnt[st] > k)
                return 0;
        }
    }
    return 1;
}


int ans;
int main()
{
    m = rd() + 1, k = rd();
    for (int i = 1; i < m; ++i)
        u[i] = rd() + 1, v[i] = rd() + 1, ++degree[u[i]], ++degree[v[i]], g[u[i]].push_back(v[i]), g[v[i]].push_back(u[i]);
    if (!is_tree(m))
        return  _puts("It's not a tree!"), 0;
    for (int i = 1; i <= m; ++i)
        if (degree[i] > (k + 1))
            return _puts("No such a node!"), 0;
    for (int i = 1; i <= m && (!ans); ++i)
    {
        if (degree[i] == k + 1)
            continue;
        else
            ans = i;
    }
    if (!ans)
        _puts("No such a node!");
    else
        wt(ans - 1, '\n');
}