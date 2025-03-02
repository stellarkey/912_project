#include <stdio.h>
#include <array>
#include <chrono>
#include <random>
typedef long long i64;
// Fast IO
inline i64 rd()
{
    i64 k = 0, f = 1;
    char c = getchar();
    while (c < '0' || c > '9') f = (c == '-') ? 0 : f, c = getchar();
    while (c >= '0' && c <= '9') k = (k << 1) + (k << 3) + (c ^ '0'), c = getchar();
    return f ? k : -k;
}
inline void wr(i64 x)
{
    if (x < 0) x = -x, putchar('-');
    if (x > 9) wr(x / 10);
    putchar((x % 10) ^ '0');
}
// rand
std::mt19937_64 rng(std::chrono::steady_clock::now().time_since_epoch().count());
std::uniform_int_distribution<int> gen_pri(1, 1145141919);

// treap
const int N = 400010;
struct node
{
    i64 val, tag;
    int lc, rc, cnt, sz, pri;
    inline void modify(i64 add) { val += add, tag += add; }
} tr[N];
int cnt, top, rec[N]; // node count & recycle
int rt[N];

// standard function
inline void recycle(int u) { rec[++top] = u; }
inline int newnode(int v)
{
    int ret = top ? rec[top--] : ++cnt;
    return tr[ret] = {v, 0, 0, 0, 1, 1, gen_pri(rng)}, ret;
}
inline void pushup(int u) { tr[u].sz = tr[tr[u].lc].sz + tr[tr[u].rc].sz + tr[u].cnt; }
inline void pushdown(int u)
{
    if (!tr[u].tag) return;
    if (tr[u].lc) tr[tr[u].lc].modify(tr[u].tag);
    if (tr[u].rc) tr[tr[u].rc].modify(tr[u].tag);
    tr[u].tag = 0;
}
// after split : val or ret[1] > v
std::array<int, 2> split_val(int u, i64 v)
{
    std::array<int, 2> tmp = {0, 0};
    if (!u) return tmp;
    pushdown(u);
    if (tr[u].val <= v) 
    {
        tmp = split_val(tr[u].rc, v), tr[u].rc = tmp[0], pushup(u);
        return {u, tmp[1]};
    }
    else
    {
        tmp = split_val(tr[u].lc, v), tr[u].lc = tmp[1], pushup(u);
        return {tmp[0], u};
    }
}
// after split : rank of ret[1] > rk
std::array<int, 2> split_rk(int u, int rk)
{
    std::array<int, 2> tmp = {0, 0};
    if (!u) return tmp;
    pushdown(u);
    if (tr[tr[u].lc].sz + tr[u].cnt <= rk)
    {
        tmp = split_rk(tr[u].rc, rk - tr[tr[u].lc].sz - tr[u].cnt), tr[u].rc = tmp[0], pushup(u);
        return {u, tmp[1]};
    }
    else
    {
        tmp = split_rk(tr[u].lc, rk), tr[u].lc = tmp[1], pushup(u);
        return {tmp[0], u};
    }
}
// merge subtree
int merge(int u, int v)
{
    if (!u || !v) return u | v;
    if (tr[u].pri <= tr[v].pri) return pushdown(u), tr[u].rc = merge(tr[u].rc, v), pushup(u), u;
    else return pushdown(v), tr[v].lc = merge(u, tr[v].lc), pushup(v), v;
}
// insert single v to root(id)
inline void insert(int id, i64 v) // oper 1
{
    std::array<int, 2> tmp = split_val(rt[id], v), l = split_val(tmp[0], v - 1);
    if (l[1] == 0) l[1] = newnode(v);
    else tr[l[1]].cnt += 1, pushup(l[1]);
    rt[id] = merge(merge(l[0], l[1]), tmp[1]);
}
// remove single v from root(id)
inline void remove(int id, i64 v)
{
    std::array<int, 2> tmp = split_val(rt[id], v), l = split_val(tmp[0], v - 1);
    if (tr[l[1]].cnt > 1) --tr[l[1]].cnt, pushup(l[1]), l[0] = merge(l[0], l[1]);
    else
    {
        if (tmp[0] == l[1]) tmp[0] = 0;
        recycle(l[1]), l[1] = 0;
    }
    rt[id] = merge(l[0], tmp[1]);
}
// recycle whole tree
void dfs_rec(int u)
{
    if (!u) return;
    pushdown(u);
    dfs_rec(tr[u].lc), dfs_rec(tr[u].rc), recycle(u);
}
// remove below v
void remove_below(int id, i64 v) // oper 6
{
    std::array<int, 2> tmp = split_val(rt[id], v);
    dfs_rec(tmp[0]), rt[id] = tmp[1];
}
// find kth in root(id)
inline i64 kth(int id, int rk)
{
    std::array<int, 2> tmp = split_rk(rt[id], rk - 1);
    int p = tmp[1];
    pushdown(p);
    while (tr[p].lc) p = tr[p].lc, pushdown(p);
    return rt[id] = merge(tmp[0], tmp[1]), p ? tr[p].val : -1;
}
inline i64 find_median(int id) { return (tr[rt[id]].sz ? kth(id, (tr[rt[id]].sz + 1) >> 1) : 0); } // oper 4
inline void train(int id, i64 v) { if (rt[id]) tr[rt[id]].modify(v); } // oper 2
inline void move(int x, int y) // oper 3
{
    if (!tr[rt[x]].sz) return;
    i64 v = find_median(x);
    remove(x, v), insert(y, v);
}
// merge full treap
int merge_full(int u, int v)
{
    if (!u || !v) return u | v;
    if (tr[u].pri <= tr[v].pri)
    {
        std::array<int, 2> tmp = split_val(v, tr[u].val);
        pushdown(u);
        tr[u].lc = merge_full(tr[u].lc, tmp[0]), tr[u].rc = merge_full(tr[u].rc, tmp[1]);
        return pushup(u), u;
    }
    else
    {
        std::array<int, 2> tmp = split_val(u, tr[v].val);
        pushdown(v);
        tr[v].lc = merge_full(tmp[0], tr[v].lc), tr[v].rc = merge_full(tmp[1], tr[v].rc);
        return pushup(v), v;
    }
}
void merge_ship(int x, int y) { rt[y] = merge_full(rt[x], rt[y]), rt[x] = 0; } // oper 5

int n, q, op, x, y, v;
int main()
{
    n = rd(), q = rd();
    while (q--)
    {
        op = rd(), x = rd();
        switch (op)
        {
            case 1: v = rd(), insert(x, v); break;
            case 2: v = rd(), train(x, v); break;
            case 3: y = rd(), move(x, y); break;
            case 4: wr(find_median(x)), putchar('\n'); break;
            case 5: y = rd(), merge_ship(x, y); break;
            case 6: v = rd(), remove_below(x, v); break;
            default: break;
        }
    }
}