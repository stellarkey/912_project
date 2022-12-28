// 老老实实按照题意做暴力加法，但是我不知道为什么能一分都没有的...不过反正是模拟机试，也无所谓了QAQ
#include <stdio.h>
#include <ctype.h>
#include <string.h>
typedef long long ll;
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
    int _P, out_size;
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
            out[++_P] = (x % 10) ^ 48;
        while (x /= 10);

        do
            Buf[out_size++] = out[_P];
        while (--_P);
        Buf[out_size++] = ch;
    }
    struct IOFlush
    {
        ~IOFlush() { flush(); }
    } tail;
}
using namespace FastIO;
const int mod = 998244353;
int q;
int R, P, N, K;
int qpow(int a, int b, int p)
{
    int ret = 1;
    while (b)
    {
        if (b & 1)
            ret = (1ll * ret * a) % p;
        b >>= 1;
        a = (1ll * a * a) % p;
    }
    return ret;
}
inline int f(int i, int R, int P)
{
    ll ret = 0;
    for (int a = 0; a < P; ++a)
        for (int b = 0; b < P; ++b)
            ret += ((1ll * qpow(a, R, P) * qpow(1ll * b * (b + 1) % P, i, P)) % P == qpow(b, i, P));
    return ret % mod;
}
inline int solve(int R, int P, int N, int K)
{
    int ret = 0;
    for (int i = 1; i <= N; ++i)
        ret = (1ll * ret + 1ll * qpow(i, K, mod) * f(i, R, P) % mod) % mod;
    return ret;
}
int main()
{
    q = rd();
    while (q--)
    {
        R = rd(), P = rd(), N = rd(), K = rd();
        wt(solve(R, P, N, K), '\n');
    }
}