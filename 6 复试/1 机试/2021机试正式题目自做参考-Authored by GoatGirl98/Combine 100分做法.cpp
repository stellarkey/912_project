// Authored by GoatGirl98
// 说是100分，但是FWT的部分（也就是 Case 6 7 8）可能会出现模数溢出的情况，这个时候把模数改成我写的long long质数，并将整个数据类型改成long long就行了
#include <stdio.h>
#include <string.h>
#include <assert.h>
#include <stdlib.h>
#include <math.h>
#include <vector>
#include <algorithm>
#define int long long
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
    }fft_init;

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
    vector<int> mul(const vector<int>& a, const vector<int>& b)
    {
        int n = a.size() - 1, m = b.size() - 1;
        vector<int> res;
        res.resize((n + m + 1) + 15);
        // brute force
        if (n < 100 / (m + 1) || n < 3 || m < 3)
            for (int i = 0; i <= n; ++i)
                for (int j = 0; j <= m; ++j)
                    res[i + j] = ((1ll * res[i + j]) + (1ll * a[i] * b[j]));
        // FFT
        else
        {
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
    void solve_1(const vector<int>& a, const vector<int>& b, int n)
    {
        vector<int> ans = mul(a, b);
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[i]);
        exit(0);
    }
    void solve_2(const vector<int>& a, const vector<int>& b, int n)
    {
        vector<int> c;
        c.resize(n + 1);
        for (int i = 1; i <= n; ++i)
            c[i] = b[n + 1 - i];
        vector<int> ans = mul(a, c);
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[n + i + 1]);
        exit(0);
    }
}

namespace FWT_Solver
{
    const int mod = 998244353;//206158430209ll;
    const int inv2 = (mod + 1) >> 1;
    const int M = (1 << 19) | 3;
    const int OR = 0, AND = 1, XOR = 2;
    int P1[M], P2[M];
    void wt(int *a, int n, int flag = XOR)
    {
        if (n == 0)
            return;
        int m = n / 2;
        wt(a, m, flag);
        wt(a + m, m, flag);
        for (int i = 0; i < m; i++)
        {
            int x = a[i], y = a[i + m];
            if (flag == OR)
                a[i] = x, a[i + m] = (x + y) % mod;
            if (flag == AND)
                a[i] = (x + y) % mod, a[i + m] = y;
            if (flag == XOR)
                a[i] = (x + y) % mod, a[i + m] = (x - y + mod) % mod;
        }
    }
    void iwt(int *a, int n, int flag = XOR)
    {
        if (n == 0)
            return;
        int m = n / 2;
        iwt(a, m, flag);
        iwt(a + m, m, flag);
        for (int i = 0; i < m; i++)
        {
            int x = a[i], y = a[i + m];
            if (flag == OR)
                a[i] = x, a[i + m] = (y - x + mod) % mod;
            if (flag == AND)
                a[i] = (x - y + mod) % mod, a[i + m] = y;
            if (flag == XOR)
                a[i] = 1LL * (x + y) * inv2 % mod, a[i + m] = 1ll * (x - y + mod) * inv2 % mod; // replace inv2 by >>1 if not required
        }
    }
    vector<int> multiply(int n, vector<int> A, vector<int> B, int flag = XOR)
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
            P1[i] = 1LL * P1[i] * P2[i] % mod;
        iwt(P1, n, flag);
        return vector<int>(P1, P1 + n);
    }
    void solve_6(const vector<int>& a, const vector<int>& b, int n)
    {
        int lim = 1;
        while (lim <= n)
            lim <<= 1;
        vector<int> ans = multiply(lim, a, b, AND);
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[i]);
        exit(0);
    }
    void solve_7(const vector<int>& a, const vector<int>& b, int n)
    {
        int lim = 1;
        while (lim <= n)
            lim <<= 1;
        vector<int> ans = multiply(lim, a, b, OR);
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[i]);
        exit(0);
    }
    void solve_8(const vector<int>& a, const vector<int>& b, int n)
    {
        int lim = 1;
        while (lim <= n)
            lim <<= 1;
        vector<int> ans = multiply(lim, a, b, XOR);
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[i]);
        exit(0);
    }
}
namespace PreSuffixSum_Solver
{
    vector<int> sa, sb;
    void solve_9(const vector<int>& a, const vector<int>& b, int n)
    {
        sa.resize(n + 1), sb.resize(n + 1);
        sa[n] = a[n], sb[n] = b[n];
        for (int i = n - 1; i; --i)
            sa[i] = sa[i + 1] + a[i], sb[i] = sb[i + 1] + b[i];
        for (int i = 1; i <= n; ++i)
            printf("%lld ", a[i] * sb[i] + b[i] * sa[i] - a[i] * b[i]);
        exit(0);
    }
    void solve_10(const vector<int>& a, const vector<int>& b, int n)
    {
        sa.resize(n + 1), sb.resize(n + 1);
        sa[1] = a[1], sb[1] = b[1];
        for (int i = 2; i <= n; ++i)
            sa[i] = sa[i - 1] + a[i], sb[i] = sb[i - 1] + b[i];
        for (int i = 1; i <= n; ++i)
            printf("%lld ", a[i] * sb[i] + b[i] * sa[i] - a[i] * b[i]);
        exit(0);
    }
    void solve_5(const vector<int>& a, const vector<int>& b, int n)
    {
        sa.resize((n + 1) << 1);
        sa[1] = a[1];
        vector<int> ans;
        ans.resize((n + 1) << 1);
        for (int i = 2; i <= n; ++i)
            sa[i] = sa[i - 1] + a[i];
        for (int i = n + 1; i < ans.size(); ++i)
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
    void solve_5_BF(const vector<int>& a, const vector<int>& b, int n)
    {
        vector<int> ans;
        ans.resize(n + 1);
        for (int i = 1; i <= n; ++i)
            for (int j = 1; j <= n; ++j)
                ans[i / j] += a[i] * b[j];
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[i]);
        exit(0);
    }
}
namespace Euler_Sqrt_Solver
{
    const int N = (1 << 19) | 3;
    void solve_3(const vector<int>& a, const vector<int>& b, int n)
    {
        // get_prime(n);
        vector<int> ans;
        ans.resize(n + 1);
        ans[1] = a[1] * b[1];
        for (ll i = 2; i <= n; ++i)
        {
            for (ll j = 1; j * j <= i; ++j)
            {
                if (!(i % j))
                {
                    if (j * j == i)
                        ans[i] += a[j] * b[j];
                    else
                        ans[i] += a[j] * b[i / j] + b[j] * a[i / j];
                }
            }
        }
        for (int i = 1; i <= n; ++i)
            printf("%lld ", ans[i]);
        exit(0);
    }
    void solve_4(const vector<int>& a, const vector<int>& b, int n)
    {
        vector<int> ans;
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
signed main()
{
    scanf("%lld%lld", &n, &p);
    a.resize(n + 1), b.resize(n + 1);
    for (int i = 1; i <= n; ++i)
        scanf("%lld", &a[i]);
    for (int i = 1; i <= n; ++i)
        scanf("%lld", &b[i]);
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
        // PreSuffixSum_Solver::solve_5_BF(a, b, n);
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
