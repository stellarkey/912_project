// 我这里就是测试一下int128数据类型是否可以在oj上直接使用，事实证明是可以的
#include <stdio.h>
void wr(__int128 x)
{
    if (x == ((__int128)0x8000000000000000 << 64))
        return (void)puts("-170141183460469231731687303715884105728");
    if (x < 0)
        putchar('-'), x = -x;
    if (x > 9)
        wr(x / 10);
    putchar(x % 10 + '0');
}
__int128 rd()
{
    __int128 k = 0, f = 1;
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
__int128 a, b, c, d, ans;
int main()
{
    a = rd(), b = rd(), wr(a + b);
}