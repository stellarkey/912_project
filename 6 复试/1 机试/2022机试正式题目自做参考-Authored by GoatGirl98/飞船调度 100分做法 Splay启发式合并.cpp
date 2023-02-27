// 启发式合并 就是把小的树的所有节点逐一插到大的树中
// 自带 Finger Search 的 Splay 会更快一些，另外需要按照中序遍历插入
#include <stdio.h>
#include <vector>
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
using namespace std;
template <typename T>
struct SplayNode
{
    T val;
    SplayNode *fa;
    SplayNode *lc, *rc;
    int _size;

    SplayNode(T v = T(), SplayNode *f = nullptr,
              SplayNode *l = nullptr, SplayNode *r = nullptr, int s = 1)
        : val(v), fa(f), lc(l), rc(r), _size(s) {}

    SplayNode *pred()
    {
        SplayNode *ret = this;
        if (!lc)
        {
            while (ret->fa && ret->fa->lc == ret)
                ret = ret->fa;
            ret = ret->fa;
        }
        else
        {
            ret = ret->lc;
            while (ret->rc)
                ret = ret->rc;
        }
        return ret;
    }
    SplayNode *succ()
    {
        SplayNode *ret = this;
        if (!rc)
        {
            while (ret->fa && ret->fa->rc == ret)
                ret = ret->fa;
            ret = ret->fa;
        }
        else
        {
            ret = ret->rc;
            while (ret->lc)
                ret = ret->lc;
        }
        return ret;
    }
    // void pushdown()
    void maintain()
    {
        // if (lc) pushdown();
        // if (rc) pushdown();
        _size = 1;
        if (lc)
            _size += lc->_size;
        if (rc)
            _size += rc->_size;
    }
};
template <typename T>
struct Splay
{

    SplayNode<T> *_root;
    SplayNode<T> *_hot;
    Splay() : _root(nullptr), _hot(nullptr) {}
    // destroy could be ignored when there's only one case.
    void destroy(SplayNode<T> *ptr)
    {
        if (ptr == nullptr)
            return;
        if (ptr->lc)
            destroy(ptr->lc);
        if (ptr->rc)
            destroy(ptr->rc);
        delete ptr;
    }
    ~Splay() { _hot = nullptr, destroy(_root); }

    SplayNode<T> *bro(SplayNode<T> *x) { return ((x->fa->lc == x) ? (x->fa->rc) : (x->fa->lc)); }
    bool islc(SplayNode<T> *x) { return (x != nullptr && x->fa->lc == x); }
    bool isrc(SplayNode<T> *x) { return (x != nullptr && x->fa->rc == x); }

    void connect_as_lc(SplayNode<T> *p, SplayNode<T> *lc)
    {
        p->lc = lc;
        if (lc)
            lc->fa = p;
        p->maintain();
    }
    void connect_as_rc(SplayNode<T> *p, SplayNode<T> *rc)
    {
        p->rc = rc;
        if (rc)
            rc->fa = p;
        p->maintain();
    }

    SplayNode<T> *insert_find(T v)
    {
        SplayNode<T> *ret = _root;
        _hot = nullptr;
        while (ret)
        {
            _hot = ret;
            if (ret->val > v)
                ret = ret->lc;
            else
                ret = ret->rc;
        }
        return ret;
    }
    SplayNode<T> *remove_find(T v)
    {
        SplayNode<T> *ret = _root;
        _hot = nullptr;
        while (ret && ret->val != v)
        {
            _hot = ret;
            if (ret->val > v)
                ret = ret->lc;
            else
                ret = ret->rc;
        }
        return ret;
    }

    /*
    void update(SplayNode* x)
    {
        if (x != _rooot)
            update(x->fa)
        pushdown(x);
    }
    */

    SplayNode<T> *splay(SplayNode<T> *v)
    {
        if (!v)
            return nullptr;
        SplayNode<T> *p, *g; // parent & grandparent
        // double level
        while ((p = v->fa) && (g = p->fa))
        {
            SplayNode<T> *gg = g->fa; // g's parent
            if (islc(v))
            {
                if (islc(p)) // zig-zig (unique with AVL)
                {
                    connect_as_lc(g, p->rc), connect_as_lc(p, v->rc);
                    connect_as_rc(p, g), connect_as_rc(v, p);
                }
                else // zig-zag (unique with AVL)
                {
                    connect_as_lc(p, v->rc), connect_as_rc(g, v->lc);
                    connect_as_lc(v, g), connect_as_rc(v, p);
                }
            }
            else
            {
                if (isrc(p)) // zag-zag (unique with AVL)
                {
                    connect_as_rc(g, p->lc), connect_as_rc(p, v->lc);
                    connect_as_lc(p, g), connect_as_lc(v, p);
                }
                else // zag-zig (unique with AVL)
                {
                    connect_as_rc(p, v->lc), connect_as_lc(g, v->rc);
                    connect_as_lc(v, p), connect_as_rc(v, g);
                }
            }

            if (!gg) // v is root now
                v->fa = nullptr;
            else if (gg->lc == g) // gg hasn't update yet.
                connect_as_lc(gg, v);
            else
                connect_as_rc(gg, v);
        }
        // single level
        if (p = v->fa)
        {
            if (islc(v)) // zig
                connect_as_lc(p, v->rc), connect_as_rc(v, p);
            else // zag
                connect_as_rc(p, v->lc), connect_as_lc(v, p);
        }
        // v is root now
        v->fa = nullptr;
        return v;
    }

    SplayNode<T> *insert(T val)
    {
        SplayNode<T> *u = insert_find(val);
        if (_hot == nullptr) // root is v
        {
            _root = new SplayNode<T>(val, nullptr, nullptr, nullptr, 1);
            return _root;
        }
        u = new SplayNode<T>(val, _hot, nullptr, nullptr, 1);
        if (_hot->val <= val)
            _hot->rc = u;
        else
            _hot->lc = u;
        _root = splay(u);
        return u;
    }

    bool remove(T val)
    {
        SplayNode<T> *u = remove_find(val);
        if (!u)
            return _root = splay(_hot), false;
        _root = splay(u);
        u = _root;

        if (_root->lc == nullptr)
        {
            _root = _root->rc;
            if (_root)
                _root->fa = nullptr;
        }
        else if (_root->rc == nullptr)
        {
            _root = _root->lc;
            if (_root)
                _root->fa = nullptr;
        }
        else
        {
            // cut ltree temporarily
            SplayNode<T> *ltree = _root->lc;
            ltree->fa = nullptr, _root->lc = nullptr;
            SplayNode<T> *node_suc = _root->rc;
            while (node_suc->lc)
                node_suc = node_suc->lc;
            _root = splay(node_suc);
            _root->lc = ltree, ltree->fa = _root;
        }
        if (_root)
            _root->maintain();
        delete u;
        return true;
    }
    bool empty() { return !_root; }
    int size() { return empty() ? 0 : _root->_size; }
    bool exist(T val)
    {
        SplayNode<T> *u = remove_find(val);
        if (!u)
            return _root = splay(_hot), false;
        _root = splay(u);
        return true;
    }
    int find_rank(SplayNode<T> *v, T val)
    {
        if (!v)
            return 1;
        _hot = v;
        if (v->val >= val)
            return find_rank(v->lc, val);
        else
            return 1 + (v->lc ? v->lc->_size : 0) + find_rank(v->rc, val);
    }
    int get_rank(T val)
    {
        int ret = find_rank(_root, val);
        _root = splay(_hot);
        return ret;
    }
    SplayNode<T> *find_kth(SplayNode<T> *v, int rk)
    {
        if (v->lc == nullptr)
            return (rk == 1) ? v : find_kth(v->rc, rk - 1);
        else if (v->lc->_size == rk - 1)
            return v;
        else if (v->lc->_size >= rk)
            return find_kth(v->lc, rk);
        else
            return find_kth(v->rc, rk - (v->lc->_size + 1));
    }
    T kth(int rk)
    {
        SplayNode<T> *ret = find_kth(_root, rk);
        _root = splay(ret);
        return _root->val;
    }
    T min_element() { return kth(1); }
    T max_element() { return kth(size()); }
    T lower_bound(T val) // assmue exist, find max_element < val
    {
        SplayNode<T> *u = _root;
        while (u)
        {
            _hot = u;
            if (u->val < val)
                u = u->rc;
            else
                u = u->lc;
        }
        if (_hot->val < val)
            u = _hot;
        else // _hot->val == val
            u = _hot->pred();
        _root = splay(u);
        return _root->val;
    }
    T upper_bound(T val) // assmue exist, find min_element > val
    {
        SplayNode<T> *u = _root;
        while (u)
        {
            _hot = u;
            if (u->val > val)
                u = u->lc;
            else
                u = u->rc;
        }
        if (_hot->val > val)
            u = _hot;
        else // _hot->val == val
            u = _hot->succ();
        _root = splay(u);
        return _root->val;
    }
};
// 1-indexed
template <typename T>
struct SplayForest
{
    vector<Splay<T>*> a;
    vector<T> tree_tag;
    SplayForest(int n = 0)
    {
        a.resize(n + 1);
        for (int i = 0; i <= n; ++i)
            a[i] = new Splay<T>();
        tree_tag.resize(n + 1);
    }
    // insert with inorder
    void dfs_insert(Splay<T> *tree_ptr, SplayNode<T> *x, T delta)
    {
        if (x == nullptr)
            return;
        if (x->lc)
            dfs_insert(tree_ptr, x->lc, delta);
        tree_ptr->insert(x->val + delta); // insert
        if (x->rc)
            dfs_insert(tree_ptr, x->rc, delta);
        delete x; // destroy origin node
    }
    Splay<T>* merge_splay(Splay<T>* a, Splay<T>* b, T delta)
    {
        if (a->size() >= b->size())
            return dfs_insert(a, b->_root, delta), a;
        else
            return dfs_insert(b, a->_root, -delta), b;
    }
    void insert(int x, T v) { a[x]->insert(v - tree_tag[x]); }
    void tree_add(int x, T v) { tree_tag[x] += v; }
    void transfer(int x, int y)
    {
        if (a[x]->empty())
            return;
        T target = a[x]->kth((a[x]->size() + 1) >> 1);
        a[x]->remove(target);
        a[y]->insert(target + tree_tag[x] - tree_tag[y]);
    }
    T query(int x) { return a[x]->empty() ? 0 : a[x]->kth((a[x]->size() + 1) >> 1) + tree_tag[x]; }
    // a[x] move to a[y], a[x] becomes empty
    void merge(int x, int y)
    {
        a[y] = merge_splay(a[x], a[y], tree_tag[y] - tree_tag[x]);
        if (a[x] == a[y])
            tree_tag[y] = tree_tag[x];
        tree_tag[x] = 0;
        a[x] = new Splay<T>(); 
    }
    void remove_underneath(int x, T v)
    {
        while (!(a[x]->empty()))
        {
            T target = a[x]->min_element();
            if (target + tree_tag[x] > v)
                break;
            a[x]->remove(target);
        }
    }
};

int main()
{
    int n = rd(), q = rd();
    SplayForest<i64> a(n);
    while (q--)
    {
        int op = rd(), x = 0, y = 0;
        i64 v = 0;
        switch (op)
        {
        case 1:
            x = rd(), v = rd();
            a.insert(x, v);
            break;
        case 2:
            x = rd(), v = rd();
            a.tree_add(x, v);
            break;
        case 3:
            x = rd(), y = rd();
            a.transfer(x, y);
            break;
        case 4:
            x = rd();
            wr(a.query(x)), putchar('\n');
            break;
        case 5:
            x = rd(), y = rd();
            a.merge(x, y);
            break;
        case 6:
            x = rd(), v = rd();
            a.remove_underneath(x, v);
            break;
        default:
            break;
        }
    }
}