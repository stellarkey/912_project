// 72分做法 复杂度O(nm)，最后一个subtask过不去（大概每组数据要跑150s左右）
// 100分做法是三元环+容斥 O(m\sqrt m)，bitset 的 O(nm/w) 大概也能极限卡过去
#include <stdio.h>
#include <string.h>
#include <time.h>
#include <vector>
#include <bitset>
using namespace std;
typedef long long ll;
int n, m;
bitset<30010> g[30010];
int u[300010], v[300010];
ll ans[30010][7];
ll gcd(ll a, ll b) {
    //特判
    if (a < 0)
        a = -a;

    if (b < 0)
        b = -a;

    if (a == 0)
        return b;

    if (b == 0)
        return a;

    int r = 0; // a和b的2^r形式的公因子

    while (!((a & 1) || (b & 1))) {
        // a和b都是偶数的时候
        a >>= 1;
        b >>= 1;
        r++;
    }

    ll ret = 0;

    while (1) {
        //首次到这里时，至少一奇
        while (!(a & 1))
            a >>= 1; //剔除a中的因子2

        while (!(b & 1))
            b >>= 1; //剔除b中的因子2

        if (a > b)
            a = a - b;
        else
            b = b - a; //简化为gcd(max(a,b)-min(a,b),min(a,b)) 可以证明这步的正确性

        if (0 == a) {
            ret = b << r;
            break;
        } //最后这步倒是和欧几里得做法类似

        if (0 == b) {
            ret = a << r;
            break;
        }
    }

    return ret;
}
int main() {
    scanf("%d%d", &n, &m);

    for (int i = 1; i <= m; ++i)
        scanf("%d%d", &u[i], &v[i]), g[u[i]].set(v[i]), g[v[i]].set(u[i]);

    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (j == u[i] || j == v[i])
                continue;

            int k = ((g[j].test(u[i]) != 0) << 1) | (g[j].test(v[i]) != 0);

            switch (k) {
            case 0:
                ++ans[j][2], ++ans[u[i]][3], ++ans[v[i]][3];
                break;

            case 1:
                ++ans[v[i]][4], ++ans[j][5], ++ans[u[i]][5];
                break;

            case 2:
                ++ans[u[i]][4], ++ans[j][5], ++ans[v[i]][5];
                break;

            case 3:
                ++ans[j][6], ++ans[u[i]][6], ++ans[v[i]][6];

            default:
                break;
            }
        }
    }

    ll all = ((1ll * n - 1) * (1ll * n - 2)) >> 1;

    for (int i = 1; i <= n; ++i) {
        ans[i][4] >>= 1, ans[i][5] >>= 1, ans[i][6] /= 3;
        ans[i][1] = all;

        for (int j = 2; j <= 6; ++j)
            ans[i][1] -= ans[i][j];

        for (int j = 1; j <= 6; ++j) {
            ll p = ans[i][j], q = all, g = gcd(p, q);
            printf("%lld/%lld%c", p / g, q / g, j == 6 ? '\n' : ' ');
        }
    }
}
