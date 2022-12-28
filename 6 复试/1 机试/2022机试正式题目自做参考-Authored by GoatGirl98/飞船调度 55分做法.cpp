/*
具体得分点如下:
20分 : 纯暴力
55分 : 动态开点平衡树，需要对单次按照排名查询操作 单次插入和删除操作有时间复杂度O(logn) 没棵平衡树的全局加法是O(1)
100分: 平衡树启发式合并 需要对两颗平衡树的合并操作有复杂度O(logn) (暴力插入删除的话显然没分)
我本人的话因为考试之前没有一个好的启发式合并板子，所以拿55分直接走人了= = 
另外就是，我这个看着码量大，主要是因为我用的红黑树用着玩的，一般来说码量小的AVL Splay Treap就足够用了，但是需要注意必须写动态开点版本
*/

#include <stdio.h>
typedef long long ll;
// #define getchar getchar_unlocked
// #define putchar putchar_unlocked
//template : Red-Black Tree by Myself
#define bro(x) (((x)->ftr->lc == (x)) ? ((x)->ftr->rc):((x)->ftr->lc))
#define islc(x) ((x)!=NULL && (x)->ftr->lc == (x))
#define isrc(x) ((x)!=NULL && (x)->ftr->rc == (x))
#define BLACK 0
#define RED 1
inline void write(ll x) {
    if (x < 0)
        putchar('-'), x = -x;

    if (x > 9)
        write(x / 10);

    putchar(x % 10 + 48);
}
inline ll read() {
    ll k = 0, f = 1;
    char c = getchar();

    while (c < '0' || c > '9') {
        if (c == '-')
            f = -1;

        c = getchar();
    }

    while (c >= '0' && c <= '9') {
        k = (k << 1) + (k << 3) + c - 48;
        c = getchar();
    }

    return k * f;
}
template <typename T>
struct RedBlackTree {
    struct RBNode {
        T val;
        bool color;
        RBNode *ftr;
        RBNode *lc, * rc;
        int _size;

        RBNode(T v = T(), bool RB = RED, RBNode *f = NULL,
               RBNode *l = NULL, RBNode *r = NULL, int s = 1)
            : val(v), color(RB), ftr(f), lc(l), rc(r), _size(s) {}

        RBNode *single_succ() {
            RBNode *ret = rc;

            while (ret->lc) {
                --(ret->_size);
                ret = ret->lc;
            }

            return ret;
        }
        RBNode *pred() {
            RBNode *ret = this;

            if (!lc) {
                while (ret->ftr && ret->ftr->lc == ret)
                    ret = ret->ftr;

                ret = ret->ftr;
            } else {
                ret = ret->lc;

                while (ret->rc)
                    ret = ret->rc;
            }

            return ret;
        }
        RBNode *succ() {
            RBNode *ret = this;

            if (!rc) {
                while (ret->ftr && ret->ftr->rc == ret)
                    ret = ret->ftr;

                ret = ret->ftr;
            } else {
                ret = ret->rc;

                while (ret->lc)
                    ret = ret->lc;
            }

            return ret;
        }
        void maintain() {
            _size = 1;

            if (lc)
                _size += lc->_size;

            if (rc)
                _size += rc->_size;
        }
    };


    RBNode *_root;
    RBNode *_hot;

    void init(T v) {
        _root = new RBNode(v, BLACK, NULL, NULL, NULL, 1);
    }


    void connect34(RBNode *nroot, RBNode *nlc, RBNode *nrc,
                   RBNode *ntree1, RBNode *ntree2, RBNode *ntree3, RBNode *ntree4) {
        nlc->lc = ntree1;

        if (ntree1)
            ntree1->ftr = nlc;

        nlc->rc = ntree2;

        if (ntree2)
            ntree2->ftr = nlc;

        nrc->lc = ntree3;

        if (ntree3)
            ntree3->ftr = nrc;

        nrc->rc = ntree4;

        if (ntree4)
            ntree4->ftr = nrc;

        nroot->lc = nlc, nlc->ftr = nroot;
        nroot->rc = nrc, nrc->ftr = nroot;
        nlc->maintain(), nrc->maintain();
        nroot->maintain();
    }

    RBNode *find(T v, const int op) {
        RBNode *ptn = _root;
        _hot = NULL;

        while (ptn) {
            _hot = ptn;
            ptn->_size += op;

            if (ptn->val > v)
                ptn = ptn->lc;
            else
                ptn = ptn->rc;
        }

        return ptn;
    }

    RBNode *rfind(T v, const int op) {
        RBNode *ptn = _root;
        _hot = NULL;

        while (ptn && ptn->val != v) {
            _hot = ptn;
            ptn->_size += op;

            if (ptn->val > v)
                ptn = ptn->lc;
            else
                ptn = ptn->rc;
        }

        return ptn;
    }

    void SolveDoubleRed(RBNode *nn) {
        while ((!(nn->ftr)) || nn->ftr->color == RED) {
            if (nn == _root) {
                _root->color = BLACK;
                return;
            }

            RBNode *p = nn->ftr;

            if (p->color == BLACK)
                return;//case 1:

            RBNode *u = bro(p);
            RBNode *g = p->ftr;

            //case 2:RR-2
            if (u != NULL && u->color == RED) {
                g->color = RED;
                p->color = u->color = BLACK;
                nn = g;
            }
            //case 3:RR-1
            else {
                if (islc(p)) {
                    if (islc(nn)) {//zig
                        p->ftr = g->ftr;

                        if (g == _root)
                            _root = p;
                        else if (g->ftr->lc == g)
                            g->ftr->lc = p;
                        else
                            g->ftr->rc = p;

                        connect34(p, nn, g, nn->lc, nn->rc, p->rc, u);
                        p->color = BLACK;
                        g->color = RED;
                    } else { //zag-zig
                        nn->ftr = g->ftr;

                        if (g == _root)
                            _root = nn;
                        else if (g->ftr->lc == g)
                            g->ftr->lc = nn;
                        else
                            g->ftr->rc = nn;

                        connect34(nn, p, g, p->lc, nn->lc, nn->rc, u);
                        nn->color = BLACK;
                        g->color = RED;
                    }
                } else {
                    if (islc(nn)) {//zig-zag
                        nn->ftr = g->ftr;

                        if (g == _root)
                            _root = nn;
                        else if (g->ftr->lc == g)
                            g->ftr->lc = nn;
                        else
                            g->ftr->rc = nn;

                        connect34(nn, g, p, u, nn->lc, nn->rc, p->rc);
                        nn->color = BLACK;
                        g->color = RED;
                    } else { //zag
                        p->ftr = g->ftr;

                        if (g == _root)
                            _root = p;
                        else if (g->ftr->lc == g)
                            g->ftr->lc = p;
                        else
                            g->ftr->rc = p;

                        connect34(p, g, nn, u, p->lc, nn->lc, nn->rc);
                        p->color = BLACK;
                        g->color = RED;
                    }
                }

                return;
            }
        }
    }

    void SolveDoubleBlack(RBNode *nn) {
        while (nn != _root) {
            RBNode *p = nn->ftr;
            RBNode *b = bro(nn);

            if (b->color == RED) { //Case 1:BB-3
                b->color = BLACK;
                p->color = RED;

                if (_root == p)
                    _root = b;

                if (p->ftr) {
                    if (p->ftr->lc == p)
                        p->ftr->lc = b;
                    else
                        p->ftr->rc = b;
                }

                b->ftr = p->ftr;

                if (islc(nn))//zag
                    connect34(b, p, b->rc, nn, b->lc, b->rc->lc, b->rc->rc);
                else//zig
                    connect34(b, b->lc, p, b->lc->lc, b->lc->rc, b->rc, nn);

                b = bro(nn), p = nn->ftr;

            }

            if (b->lc && b->lc->color == RED) { //Case 2-1:BB-1
                bool old_p_color = p->color;
                p->color = BLACK;

                if (p->lc == nn) {//zig-zag
                    if (p->ftr) {
                        if (p->ftr->lc == p)
                            p->ftr->lc = b->lc;
                        else
                            p->ftr->rc = b->lc;
                    }

                    b->lc->ftr = p->ftr;

                    if (_root == p)
                        _root = b->lc;

                    connect34(b->lc, p, b, nn, b->lc->lc, b->lc->rc, b->rc);
                } else { //zig
                    b->lc->color = BLACK;

                    if (p->ftr) {
                        if (p->ftr->lc == p)
                            p->ftr->lc = b;
                        else
                            p->ftr->rc = b;
                    }

                    b->ftr = p->ftr;

                    if (_root == p)
                        _root = b;

                    connect34(b, b->lc, p, b->lc->lc, b->lc->rc, b->rc, nn);
                }

                p->ftr->color = old_p_color;
                return;
            } else if (b->rc && b->rc->color == RED) { //Case 2-2:BB-1
                bool old_p_color = p->color;
                p->color = BLACK;

                if (p->lc == nn) {//zag
                    b->rc->color = BLACK;

                    if (p->ftr) {
                        if (p->ftr->lc == p)
                            p->ftr->lc = b;
                        else
                            p->ftr->rc = b;
                    }

                    b->ftr = p->ftr;

                    if (_root == p)
                        _root = b;

                    connect34(b, p, b->rc, nn, b->lc, b->rc->lc, b->rc->rc);
                } else { //zag-zig
                    if (p->ftr) {
                        if (p->ftr->lc == p)
                            p->ftr->lc = b->rc;
                        else
                            p->ftr->rc = b->rc;
                    }

                    b->rc->ftr = p->ftr;

                    if (_root == p)
                        _root = b->rc;

                    connect34(b->rc, b, p, b->lc, b->rc->lc, b->rc->rc, nn);
                }

                p->ftr->color = old_p_color;
                return;
            }

            if (p->color == RED) {//case 3:BB-2R
                p->color = BLACK;
                b->color = RED;
                return;
            } else { //case 4:BB-2B
                b->color = RED;
                nn = p;
            }
        }
    }

    RBNode *findKth(int Rank, RBNode *ptn) {
        if (ptn->lc == NULL) {
            if (Rank == 1)
                return ptn;
            else
                return findKth(Rank - 1, ptn->rc);
        } else {
            if (ptn->lc->_size == Rank - 1)
                return ptn;
            else if (ptn->lc->_size >= Rank)
                return findKth(Rank, ptn->lc);
            else
                return findKth(Rank - (ptn->lc->_size) - 1, ptn->rc);
        }
    }

    int find_rank(T v, RBNode *ptn) {
        if (!ptn)
            return 1;
        else if (ptn->val >= v)
            return find_rank(v, ptn->lc);
        else
            return (1 + ((ptn->lc) ? (ptn->lc->_size) : 0) + find_rank(v, ptn->rc));
    }


    void previs(RBNode *ptn) {
        printf("current node value is %d, color is %s, _size is %d\n", ptn->val, ptn->color ? "Red" : "Black",
               ptn->_size);
        printf("Lchild value is ");

        if (ptn->lc)
            printf("%d _size is %d\n", ptn->lc->val, ptn->lc->_size);
        else
            puts("NULL");

        printf("Rchild value is ");

        if (ptn->rc)
            printf("%d _size is %d\n", ptn->rc->val, ptn->lc->_size);
        else
            puts("NULL");

        if (ptn->lc)
            previs(ptn->lc);

        if (ptn->rc)
            previs(ptn->rc);
    }

    void invis(RBNode *ptn) {
        if (ptn->lc)
            invis(ptn->lc);

        printf("current node value is %d, color is %s, _size is %d\n", ptn->val, ptn->color ? "Red" : "Black",
               ptn->_size);
        printf("Lchild value is ");

        if (ptn->lc)
            printf("%d _size is %d\n", ptn->lc->val, ptn->lc->_size);
        else
            puts("NULL");

        printf("Rchild value is ");

        if (ptn->rc)
            printf("%d _size is %d\n", ptn->rc->val, ptn->lc->_size);
        else
            puts("NULL");

        if (ptn->rc)
            invis(ptn->rc);
    }

    void postvis(RBNode *ptn) {
        if (ptn->lc)
            postvis(ptn->lc);

        if (ptn->rc)
            postvis(ptn->rc);

        printf("current node value is %d, color is %s, _size is %d\n", ptn->val, ptn->color ? "Red" : "Black",
               ptn->_size);
        printf("Lchild value is ");

        if (ptn->lc)
            printf("%d _size is %d\n", ptn->lc->val, ptn->lc->_size);
        else
            puts("NULL");

        printf("Rchild value is ");

        if (ptn->rc)
            printf("%d _size is %d\n", ptn->rc->val, ptn->lc->_size);
        else
            puts("NULL");
    }

    void checkconnect(RBNode *ptn) {
        if (!ptn)
            return;

        if (ptn->lc && ptn->lc->ftr != ptn) {
            printf("Oops! %d has a lc %d, but it failed to point its ftr!\n", ptn->val, ptn->lc->val);
        }

        if (ptn->rc && ptn->rc->ftr != ptn) {
            printf("Oops! %d has a rc %d, but it failed to point its ftr!\n", ptn->val, ptn->rc->val);
        }

        int sss = ptn->_size;

        if (ptn->lc)
            sss -= ptn->lc->_size;

        if (ptn->rc)
            sss -= ptn->rc->_size;

        if (sss - 1) {
            printf("Damn it! %d's size is %d, but the sum of its children's size is %d!\n", ptn->val, ptn->_size,
                   ptn->_size - sss);
        }

        checkconnect(ptn->lc);
        checkconnect(ptn->rc);
    }

    void correctlyconnected() {
        checkconnect(_root);
    }

    struct iterator {
        RBNode *_real__node;

        iterator &operator++() {
            _real__node = _real__node->succ();
            return *this;
        }
        iterator &operator--() {
            _real__node = _real__node->pred();
            return *this;
        }
        T operator*() {
            return _real__node->val;
        }

        iterator(RBNode *node_nn = NULL) : _real__node(node_nn) {}
        iterator(T const &val_vv) : _real__node(rfind(val_vv, 0)) {}
        iterator(iterator const &iter) : _real__node(iter._real__node) {}

    };


    RedBlackTree(): _root(NULL), _hot(NULL) {}

    iterator insert(T v) {
        RBNode *ptn = find(v, 1);

        if (_hot == NULL) {
            init(v);
            return iterator(_root);
        }

        ptn = new RBNode(v, RED, _hot, NULL, NULL, 1);

        if (_hot->val <= v)
            _hot->rc = ptn;
        else
            _hot->lc = ptn;

        SolveDoubleRed(ptn);
        return iterator(ptn);
    }

    bool remove(T v) {
        RBNode *ptn = rfind(v, -1);

        if (!ptn)
            return false;

        RBNode *node_suc;

        while (ptn->lc || ptn->rc) {
            if (ptn->lc == NULL)
                node_suc = ptn->rc;
            else if (ptn->rc == NULL)
                node_suc = ptn->lc;
            else
                node_suc = ptn->single_succ();

            --(ptn->_size);
            ptn->val = node_suc->val;
            ptn = node_suc;
        }

        if (ptn->color == BLACK) {
            --(ptn->_size);
            SolveDoubleBlack(ptn);
        }

        if (ptn == _root) {
            _root = NULL;
            delete ptn;
            return true;
        }

        if (ptn->ftr->lc == ptn)
            ptn->ftr->lc = NULL;
        else
            ptn->ftr->rc = NULL;

        delete ptn;
        return true;
    }

    int get_rank(T v) {
        return find_rank(v, _root);
    }
    int size() {
        return _root->_size;
    }
    bool empty() {
        return !_root;
    }
    iterator Kth(int Rank) {
        return iterator(findKth(Rank, _root));
    }
    iterator lower_bound(T v) {
        RBNode *ptn = _root;

        while (ptn) {
            _hot = ptn;

            if (ptn->val < v)
                ptn = ptn->rc;
            else
                ptn = ptn->lc;
        }

        if (_hot->val < v)
            ptn = _hot;
        else
            ptn = _hot->pred();

        return iterator(ptn);
    }
    iterator upper_bound(T v) {
        RBNode *ptn = _root;

        while (ptn) {
            _hot = ptn;

            if (ptn->val > v)
                ptn = ptn->lc;
            else
                ptn = ptn->rc;
        }

        if (_hot->val > v)
            ptn = _hot;
        else
            ptn = _hot->succ();

        return iterator(ptn);
    }

};
/*
RedBlackTree<int> Tree;
int n;
int op, x;
RedBlackTree<int>::iterator it;
void test() {
    n = read();

    while (n--) {
        op = read(), x = read();

        switch (op) {
        case 1:
            Tree.insert(x);
            break;

        case 2:
            Tree.remove(x);
            break;

        case 3:
            write(Tree.get_rank(x)), putchar('\n');
            break;

        case 4:
            // kth smallest
            write(*(Tree.Kth(x))), putchar('\n');
            break;

        case 5:
            write(*(Tree.lower_bound(x))), putchar('\n');
            break;

        case 6:
            write(*(Tree.upper_bound(x))), putchar('\n');
            break;

        default:
            puts("Invalid Instruction."), n++;
            break;
        }
    }
}
*/
RedBlackTree<ll> ship[400010];
ll all_rank_up[400010];
ll n, q, op;
ll x, y, v;
void build(ll x, ll v)
{
    ship[x].insert(v - all_rank_up[x]);
}
void train(ll x, ll v)
{
    all_rank_up[x] += v;
}
void transform(ll x, ll y)
{
    if (ship[x].empty())
        return;
    ll tmp_target = (*ship[x].Kth((ship[x].size() + 1) >> 1));
    ll target = tmp_target + all_rank_up[x];
    build(y, target);
    ship[x].remove(tmp_target);
}
ll query(ll x)
{
    if (ship[x].empty())
        return 0ll;
    else
        return (*ship[x].Kth((ship[x].size() + 1) >> 1)) + all_rank_up[x];
}
void merge(ll x, ll y)
{
    while (!ship[x].empty())
    {
        ll tmp = (*ship[x].Kth(1));
        ship[x].remove(tmp);
        build(y, tmp + all_rank_up[x]);
    }
}
void remove_underneath(ll x, ll v)
{
    while (!ship[x].empty())
    {
        ll tmp = (*ship[x].Kth(1));
        if (tmp + all_rank_up[x] > v)
            break;
        ship[x].remove(tmp);
    }
}

int main()
{
    n = read(), q = read();
    while (q--)
    {
        op = read();
        switch (op)
        {
        case 1:
            x = read(), v = read();
            build(x, v);
            break;
        case 2:
            x = read(), v = read();
            train(x, v);
            break;
        case 3:
            x = read(), y = read();
            transform(x, y);
            break;
        case 4:
            x = read();
            write(query(x)), putchar('\n');
            break;
        case 5:
            x = read(), y = read();
            merge(x, y);
            break;
        case 6:
            x = read(), v = read();
            remove_underneath(x, v);
            break;
        default:
            break;
        }
    }
    // ship[0].insert(4), ship[0].insert(6), ship[0].insert(7), ship[0].insert(10);
    // write(*(ship[0].Kth(1)));
}