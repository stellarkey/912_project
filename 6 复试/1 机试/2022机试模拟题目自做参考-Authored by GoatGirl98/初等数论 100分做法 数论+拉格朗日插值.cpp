#include <stdio.h>
#include <assert.h>
#include <stdlib.h>
#include <algorithm>
#include <vector>
#define getchar getchar_unlocked
#define putchar putchar_unlocked
using namespace std;
typedef long long i64;
i64 rd()
{
    i64 k = 0, f = 1;
    char c = getchar();
    while (c < '0' || c > '9')
    {
        if (c == '-')
            f = 0;
        c = getchar();
    }
    while (c >= '0' && c <= '9')
    {
        k = (k << 1) + (k << 3) + (c ^ 48);
        c = getchar();
    }
    return f ? k : -k;
}
void wr(int x)
{
    if (x < 0)
        putchar('-'), x = -x;
    if (x > 9)
        wr(x / 10);
    putchar((x % 10) ^ '0');
}
const int mod = 998244353;
// ax \equiv 1(mod m)
int inv(int a)
{
    int _a = a, _b = mod, u = 1, v = 0;
    while (_b)
    {
        const int t = _a / _b;
        _a -= t * _b;
        swap(_a, _b);
        u -= t * v;
        swap(u, v);
    }
    u += mod, u %= mod;
    return u;
}
int trim(i64 x) { return (x >= 0) ? (x % mod) : (mod - (((-x) % mod) ? ((-x) % mod) : mod)); }
int trim_pow(i64 x) { return x % (mod - 1); } // assume x > 0, phi(mod) = mod - 1
int add(int a, int b) { return (a + b >= mod) ? (a + b - mod) : (a + b); }
int sub(int a, int b) { return (a < b) ? (a - b + mod) : (a - b); }
int neg(int a) { return sub(0, a); }
int mul(int a, int b) { return 1ll * a * b % mod; }
int divi(int a, int b) { return 1ll * a * inv(b) % mod; }
int quick_pow(int x, i64 p)
{
    p = trim_pow(p), x = trim(x);
    int ans = 1;
    while (p)
    {
        if (p & 1)
            ans = mul(ans, x);
        x = mul(x, x);
        p >>= 1;
    }
    return ans;
}
// ifac[i] = inv(i!)
vector<int> inv_of_fac(int n)
{
    vector<int> ifac(n + 1);
    ifac[0] = 1;
    for (int i = 1; i <= n; ++i)
        ifac[i] = mul(ifac[i - 1], i);
    ifac[n] = inv(ifac[n]);
    for (int i = n - 1; i > 0; i--)
        ifac[i] = mul(ifac[i + 1], i + 1);
    return ifac;
}
const vector<int> ifac = inv_of_fac(100010);
// given f(0), f(1), ..., f(n), return f(x)
// deg(f) <= n, module p
int lagrange_interpolation_mod_p(const vector<int> &f, i64 x)
{
    int n = f.size() - 1;
    if (x <= n)
        return f[x];
    // diviend[i] = \prod_{j \ne i} (x - j)
    vector<int> divend(n + 1, 1);
    int a = trim(x);
    for (int i = 0; i < n; i++)
        divend[i + 1] = mul(divend[i], a), a = sub(a, 1);
    int tmp = a;
    for (int i = n; i > 0; i--)
        divend[i - 1] = mul(divend[i - 1], tmp), a = add(a, 1), tmp = mul(tmp, a);
    // f(x) = \sum_{i=0}^{n}(-1)^{n-i}f[i]\dfrac{diviend[i]}{i!*(n-i)!}
    int ret = 0;
    for (int i = 0; i <= n; ++i)
    {
        int tmp = mul(mul(f[i], divend[i]), mul(ifac[i], ifac[n - i]));
        ret = ((n - i) & 1) ? sub(ret, tmp) : add(ret, tmp);
    }
    return ret;
}
vector<int> get_prime(int n)
{
    vector<bool> vis(n + 1, false);
    vector<int> ret(n + 1);
    int cnt = 0;
    for (int i = 2; i <= n; ++i)
    {
        if (!vis[i])
            ret[cnt++] = i;
        for (int j = 0; j < cnt && i * ret[j] <= n; ++j)
        {
            vis[i * ret[j]] = 1;
            if (!(i % ret[j]))
                break;
        }
    }
    ret.resize(cnt);
    return ret;
}
const vector<int> primes = get_prime(100010);
// multiplicative function
// using euler sieve
// return [0^p, 1^p, ..., n^p]
vector<int> exp_enamurate(int n, int p)
{
    vector<int> ret(n + 1, 1);
    ret[0] = quick_pow(0, p), ret[1] = 1;
    for (size_t i = 0; i < primes.size() && primes[i] <= n; ++i)
        ret[primes[i]] = quick_pow(primes[i], p);
    for (int i = 2; i <= n; ++i)
        for (size_t j = 0; j < primes.size() && i * primes[j] <= n; ++j)
        {
            ret[i * primes[j]] = mul(ret[i], ret[primes[j]]);
            if (!(i % primes[j]))
                break;
        }
    return ret;
}
// \sum_{i=0}^n i^k
int sum_of_k_power(i64 n, int k)
{
    if (k == 0)
        return trim(n + 1);
    if (n == 0)
        return (k == 0);
    // deg(f) = k + 1
    vector<int> f = exp_enamurate(k + 1, k);
    // prefix sum
    for (size_t i = 1; i < f.size(); ++i)
        f[i] = add(f[i], f[i - 1]);
    // return f(n)
    return lagrange_interpolation_mod_p(f, n);
}
// \sum_{i=1}^n i^k
int sum_of_k_power_positive(i64 n, int k) { return sub(sum_of_k_power(n, k), sum_of_k_power(0, k)); }

int solve(int R, int P, int N, int K)
{
    // R = 1 : f(i, R, P) = 2P - 2
    if (R == 1)
        return mul(sub(mul(2, trim(P)), 2), sum_of_k_power_positive(N, K));
    // R = 2; P = 2 : f(i, R, P) = 2
    else if (R == 2 && P == 2)
        return mul(2, sum_of_k_power_positive(N, K));
    // R = 2; P > 2 : f(i, R, P) = (i is odd) ? (2P - 3) : (3P - 4)
    else if (R == 2 && P > 2)
    {

        int sum = sum_of_k_power_positive(N, K);
        int term_even = mul(quick_pow(2, K), sum_of_k_power_positive(N / 2, K));
        int term_odd = sub(sum, term_even);
        int f_odd = sub(mul(2, trim(P)), 3), f_even = sub(mul(3, trim(P)), 4);
        return add(mul(f_odd, term_odd), mul(f_even, term_even));
    }
    // R = 3; P = 3 or P \equiv 2\pmod 3 : f(i, R, P) = 2P - 2
    else if (R == 3 && ((P % 3 == 2) || (P == 3)))
        return mul(sub(mul(2, trim(P)), 2), sum_of_k_power_positive(N, K));
    // R = 3; P \equiv 1\pmod 3 : f(i, R, P) = (i \equiv 0 \pmod 3) ? (4P - 6) : (2P - 4)
    else
    {
        int sum = sum_of_k_power_positive(N, K);
        int term_divide = mul(quick_pow(3, K), sum_of_k_power_positive(N / 3, K));
        int term_undivide = sub(sum, term_divide);
        int f_undivide = sub(mul(2, trim(P)), 4), f_divide = sub(mul(4, trim(P)), 6);
        return add(mul(f_undivide, term_undivide), mul(f_divide, term_divide));
    }
}

int main()
{
    int Q = rd();
    while (Q--)
    {
        int R = rd(), P = rd(), N = rd(), K = rd();
        assert(1 <= R && R <= 3), assert(2 <= P && P <= 998244353);
        assert(1 <= N && N < P), assert(0 <= K && K < 100000);
        wr(solve(R, P, N, K)), putchar('\n');
    }
}
