#include <stdio.h>
#define N 45
#define M 225
template <class T>
T max(T head) { return head; }
template<class T, typename... Args>
T max(T head, Args... args) 
{
    T t = max<T>(args...);
    return (head > t) ? head : t;
}
template <class T>
T min(T head) { return head; }
template<class T, typename... Args>
T min(T head, Args... args) 
{
    T t = min<T>(args...);
    return (head < t) ? head : t;
}
int n, m; // n 任务数 m 傻瓜调度方案时间的最小值
//vector<vector<vector<int>>> f;
int f[M][M][M];

int A, B, C, D; // 输入的方案
int a[N], b[N], c[N]; // 实际转化的方案，把b和d取最小值
int main()
{
    scanf("%d", &n);
    for (int i = 1; i <= n; ++i)
        scanf("%d%d%d%d", &A, &B, &C, &D), a[i] = A, b[i] = min(B, D), c[i] = C;

    for (int i = 1; i <= n; ++i)
        m += a[i];
    m = ((m + 1) >> 1) + 10; // 根据背包各物品的重量，一定不会超过这个数值

    // f(0, x, y, z) = max(x, y, z)
    for (int i = 0; i < m + 15; ++i)
        for (int j = 0; j < m + 15; ++j)
            for (int k = 0; k < m + 15; ++k)
                f[i][j][k] = max(i, max(j, k));
    // f(n, x, y, z) = min(f(n - 1, x + a_i, y, z), f(n - 1, x, y + a_i, z), 
    //                     f(n - 1, x + c_i, y, z + c_i), f(n - 1, x, y + c_i, z + c_i), f(n - 1, x + b_i, y + b_i, z + b_i))
    for (int t = 1; t <= n; ++t)
        for (int i = 0; i <= m; ++i)
            for (int j = 0; j <= m; ++j)
                for (int k = 0; k <= m; ++k)
                    f[i][j][k] = min(f[i + a[t]][j][k], f[i][j + a[t]][k], f[i + c[t]][j][k + c[t]], f[i][j + c[t]][k + c[t]], f[i + b[t]][j + b[t]][k + b[t]]);

    printf("%d", f[0][0][0]);
}
