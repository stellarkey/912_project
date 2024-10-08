#include <stdio.h>
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
int n, m;
struct window 
{
    int x_1, y_1, x_2, y_2, idx;
    window& operator=(const window& o) { return x_1 = o.x_1, y_1 = o.y_1, x_2 = o.x_2, y_2 = o.y_2, idx = o.idx, (*this); }
    bool inside(int x, int y) { return x_1 <= x && x <= x_2 && y_1 <= y && y <= y_2; }
} windows[15];
int find_windows(int x, int y)
{
    int ret = n;
    while (ret)
        if (windows[ret].inside(x, y))
            return ret;
        else
            --ret;
    return 0;
}
void make_top(int i)
{
    windows[n + 1] = windows[i];
    for (int x = i + 1; x <= n; ++x)
        windows[x - 1] = windows[x];
    windows[n] = windows[n + 1], windows[n + 1] = windows[0];
}
signed main()
{
    n = rd(), m = rd();
    for (int i = 1; i <= n; ++i)
        windows[i].x_1 = rd(), windows[i].y_1 = rd(), windows[i].x_2 = rd(), windows[i].y_2 = rd(), windows[i].idx = i;
    while (m--)
    {
        int x = rd(), y = rd();
        int level = find_windows(x, y);
        if (level)
            wr(windows[level].idx), putchar('\n'), make_top(level);
        else
            puts("IGNORED");
    }
}