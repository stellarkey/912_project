// Authored by GoatGirl98
#include <stdio.h>
#include <string.h>
#include <assert.h>
#include <stdlib.h>
#include <math.h>
#include <vector>
#include <algorithm>
using namespace std;
typedef long long ll;
// FFT Solver : use for multiple case
namespace FFT_Solver
{
    struct complex
    {
        double a, b; // a : real number b : imaginary number
        double len() const { return a * a + b * b; }
        complex operator+(const complex &o) const { return {a + o.a, b + o.b}; }
        complex operator-(const complex &o) const { return {a - o.a, b - o.b}; }
        complex operator-() const { return {-a, -b}; }
        complex operator*(const complex &o) const { return {a * o.a - b * o.b, b * o.a + a * o.b}; }
        complex operator*(const double &o) const { return {a * o, b * o}; }
        complex operator/(const double &o) const { return {a / o, b / o}; }
        complex operator!() const { return {a, -b}; } // conjugate
        complex operator/(const complex &o) const { return ((*this) * (!o)) / o.len(); }
    };
    const int N = (1 << 19) | 3;
    const bool multiple_case = 1;
    const double PI = acos(-1.0);
    bool initialized;
    int L, brev[N]; // Butterfly operation
    complex com_a[N], com_b[N];
    complex w[N], v[N];
    void init(int _L)
    {
        L = _L, initialized = 1;
        for (int i = 0; i < (1 << L); ++i)
            brev[i] = (brev[i >> 1] >> 1) | ((i & 1) << (L - 1));
        for (int i = 0; i < (1 << L); ++i)
        {
            w[i] = {cos(i * PI * 2 / (1 << L)), sin(i * PI * 2 / (1 << L))};
            v[i] = {cos(i * PI * 2 / (1 << L)), -sin(i * PI * 2 / (1 << L))};
        }
    }

    struct initializer
    {
        // length is adjustable
        initializer() { init(19); }
    }; //fft_init;

    void fft(complex a[], int lgn, int flag)
    {
        int n = 1 << lgn;
        for (int i = 0; i < n; ++i)
        {
            int rv = brev[i] >> (L - lgn);
            if (rv < i)
                swap(a[rv], a[i]);
        }

        int fa = L;
        complex *q = (flag == 1) ? w : v;

        for (int t = 1; t < n; t <<= 1)
        {
            --fa;

            for (int i = 0; i < n; i += t << 1)
            {
                complex *p = a + i;

                for (int j = 0; j < t; ++j)
                {
                    complex x = p[j + t] * q[j << fa];
                    p[j + t] = p[j] - x, p[j] = p[j] + x;
                }
            }
        }

        if (flag == -1)
            for (int i = 0; i < n; ++i)
                a[i] = {a[i].a / n, a[i].b / n};
    }
    vector<ll> mul(const vector<int> &a, const vector<int> &b)
    {
        int n = a.size() - 1, m = b.size() - 1;
        vector<ll> res;
        res.resize((n + m + 1) + 15);
        // brute force
        if (n < 100 / (m + 1) || n < 3 || m < 3)
            for (int i = 0; i <= n; ++i)
                for (int j = 0; j <= m; ++j)
                    res[i + j] = ((1ll * res[i + j]) + (1ll * a[i] * b[j]));
        // FFT
        else
        {
            init(19);
            assert(initialized);
            int lgk = 0, k = 1, len = n + m;
            while ((1 << lgk) <= len)
                ++lgk, k <<= 1;
            for (int i = 0; i <= n; ++i)
                com_a[i].a = a[i], com_a[i].b = 0.0;
            for (int i = 0; i <= m; ++i)
                com_b[i].a = b[i], com_b[i].b = 0.0;
            // multiple_case
            memset(com_a + (n + 1), 0, sizeof(complex) * (k - n - 1));
            memset(com_b + (m + 1), 0, sizeof(complex) * (k - m - 1));

            fft(com_a, lgk, 1), fft(com_b, lgk, 1);
            for (int i = 0; i < k; ++i)
                com_a[i] = com_a[i] * com_b[i];
            fft(com_a, lgk, -1);
            for (int i = 0; i <= n + m; ++i)
                res[i] = (ll)(com_a[i].a + 0.5);
        }
        return res;
    }
    void solve_1(const vector<int> &a, const vector<int> &b, int n)
    {
        vector<ll> ans = mul(a, b);
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[i]);
        exit(0);
    }
    void solve_2(const vector<int> &a, const vector<int> &b, int n)
    {
        vector<int> c;
        c.resize(n + 1);
        for (int i = 1; i <= n; ++i)
            c[i] = b[n + 1 - i];
        vector<ll> ans = mul(a, c);
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[n + i + 1]);
        exit(0);
    }
}
// Modified Fast Walsh Transform : notice that module could be overflow.
// 262144 * 262144 * 100 <= 7 * 10^12
namespace FWT_Solver
{
    const int M = (1 << 19) | 3;
    const int OR = 0, AND = 1, XOR = 2;
    ll P1[M], P2[M];
    void wt(ll *a, int n, int flag = XOR)
    {
        if (n == 0)
            return;
        int m = n / 2;
        wt(a, m, flag);
        wt(a + m, m, flag);
        for (int i = 0; i < m; i++)
        {
            ll x = a[i], y = a[i + m];
            if (flag == OR)
                a[i] = x, a[i + m] = x + y;
            if (flag == AND)
                a[i] = x + y, a[i + m] = y;
            if (flag == XOR)
                a[i] = x + y, a[i + m] = x - y;
        }
    }
    void iwt(ll *a, int n, int flag = XOR)
    {
        if (n == 0)
            return;
        int m = n / 2;
        iwt(a, m, flag);
        iwt(a + m, m, flag);
        for (int i = 0; i < m; i++)
        {
            ll x = a[i], y = a[i + m];
            if (flag == OR)
                a[i] = x, a[i + m] = y - x;
            if (flag == AND)
                a[i] = x - y, a[i + m] = y;
            if (flag == XOR)
                a[i] = (x + y) >> 1,
                a[i + m] = (x - y) >> 1;
        }
    }
    vector<ll> multiply(int n, vector<int> A, vector<int> B, int flag = XOR)
    {
        assert(__builtin_popcount(n) == 1);
        A.resize(n);
        B.resize(n);
        for (int i = 0; i < n; i++)
            P1[i] = A[i];
        for (int i = 0; i < n; i++)
            P2[i] = B[i];
        wt(P1, n, flag);
        wt(P2, n, flag);
        for (int i = 0; i < n; i++)
            P1[i] = P1[i] * P2[i];
        iwt(P1, n, flag);
        return vector<ll>(P1, P1 + n);
    }
    void solve_6(const vector<int> &a, const vector<int> &b, int n)
    {
        int lim = 1;
        while (lim <= n)
            lim <<= 1;
        vector<ll> ans = multiply(lim, a, b, AND);
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[i]);
        exit(0);
    }
    void solve_7(const vector<int> &a, const vector<int> &b, int n)
    {
        int lim = 1;
        while (lim <= n)
            lim <<= 1;
        vector<ll> ans = multiply(lim, a, b, OR);
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[i]);
        exit(0);
    }
    void solve_8(const vector<int> &a, const vector<int> &b, int n)
    {
        int lim = 1;
        while (lim <= n)
            lim <<= 1;
        vector<ll> ans = multiply(lim, a, b, XOR);
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[i]);
        exit(0);
    }
}
namespace PreSuffixSum_Solver
{
    vector<ll> sa, sb;
    void solve_9(const vector<int> &a, const vector<int> &b, int n)
    {
        sa.resize(n + 1), sb.resize(n + 1);
        sa[n] = a[n], sb[n] = b[n];
        for (int i = n - 1; i; --i)
            sa[i] = sa[i + 1] + a[i], sb[i] = sb[i + 1] + b[i];
        for (int i = 1; i <= n; ++i)
            printf("%lld ", 1ll * a[i] * sb[i] + 1ll * b[i] * sa[i] - 1ll * a[i] * b[i]);
        exit(0);
    }
    void solve_10(const vector<int> &a, const vector<int> &b, int n)
    {
        sa.resize(n + 1), sb.resize(n + 1);
        sa[1] = a[1], sb[1] = b[1];
        for (int i = 2; i <= n; ++i)
            sa[i] = sa[i - 1] + a[i], sb[i] = sb[i - 1] + b[i];
        for (int i = 1; i <= n; ++i)
            printf("%lld ", 1ll * a[i] * sb[i] + 1ll * b[i] * sa[i] - 1ll * a[i] * b[i]);
        exit(0);
    }
    void solve_5(const vector<int> &a, const vector<int> &b, int n)
    {
        sa.resize((n + 1) << 1);
        sa[1] = a[1];
        vector<ll> ans;
        ans.resize((n + 1) << 1);
        for (int i = 2; i <= n; ++i)
            sa[i] = sa[i - 1] + a[i];
        for (size_t i = n + 1; i < ans.size(); ++i)
            sa[i] = sa[i - 1];
        for (int j = 1; j <= n; ++j)
        {
            int i = j;
            while (i <= n)
            {
                ans[i / j] += 1ll * (sa[i + j - 1] - sa[i - 1]) * b[j];
                i += j;
            }
        }
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[i]);
        exit(0);
    }
}
namespace Euler_Sqrt_Solver
{
    const int N = (1 << 19) | 3;
    void solve_3(const vector<int> &a, const vector<int> &b, int n)
    {
        vector<ll> ans;
        vector<vector<int> > divisor(n + 1);
        ans.resize(n + 1);
        for (int i = 1; i <= n; ++i)
            for (int j = 1; j <= n / i; ++j)
                divisor[i * j].push_back(i);
        for (ll i = 1; i <= n; ++i)
        {
            for (size_t j = 0; j < (divisor[i].size() >> 1); ++j)
                ans[i] += 1ll * a[divisor[i][j]] * b[divisor[i][divisor[i].size() - 1 - j]] + 1ll * a[divisor[i][divisor[i].size() - 1 - j]] * b[divisor[i][j]];
            if (divisor[i].size() & 1)
                ans[i] += 1ll * a[divisor[i][divisor[i].size() >> 1]] * b[divisor[i][divisor[i].size() >> 1]];
        }
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[i]);
        exit(0);
    }
    void solve_4(const vector<int> &a, const vector<int> &b, int n)
    {
        vector<ll> ans;
        ans.resize(n + 1);
        for (int i = 1; i <= n; ++i)
        {
            int j = i, k = 1;
            while (j <= n)
                ans[i] += a[j] * b[k], ++k, j += i;
        }
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[i]);
        exit(0);
    }
}
int n, p;
vector<int> a, b;
int main()
{
    scanf("%d%d", &n, &p);
    a.resize(n + 1), b.resize(n + 1);
    for (int i = 1; i <= n; ++i)
        scanf("%d", &a[i]);
    for (int i = 1; i <= n; ++i)
        scanf("%d", &b[i]);
    switch (p)
    {
    case 1:
        FFT_Solver::solve_1(a, b, n);
        break;
    case 2:
        FFT_Solver::solve_2(a, b, n);
        break;
    case 3:
        Euler_Sqrt_Solver::solve_3(a, b, n);
        break;
    case 4:
        Euler_Sqrt_Solver::solve_4(a, b, n);
        break;
    case 5:
        PreSuffixSum_Solver::solve_5(a, b, n);
        break;
    case 6:
        FWT_Solver::solve_6(a, b, n);
        break;
    case 7:
        FWT_Solver::solve_7(a, b, n);
        break;
    case 8:
        FWT_Solver::solve_8(a, b, n);
        break;
    case 9:
        PreSuffixSum_Solver::solve_9(a, b, n);
        break;
    case 10:
        PreSuffixSum_Solver::solve_10(a, b, n);
        break;
    default:
        assert(0);
        break;
    }
}
