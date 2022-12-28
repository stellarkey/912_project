// 大水题 需要注意用 long long (也就是int64)
#include <stdio.h>
#include <string.h>
typedef long long ll;
ll ans, target;
int len, cur;
char s[1919810];
int main()
{
    scanf("%d%lld%s", &len, &target, s);
    for (int i = 0; i < len; ++i)
    {
        if (s[i] == '1')
            cur++;
        else if (cur >= target)
        {
            // printf("cur is %d, ans + %lld\n", cur, (1ll * (cur - target + 1) * (cur - target + 2)) >> 1);
            ans += (1ll * (cur - target + 1) * (cur - target + 2)) >> 1;
            cur = 0;
        }
        else
            cur = 0;
    }
    if (cur >= target)
    {
        ans += (1ll * (cur - target + 1) * (cur - target + 2)) >> 1;
        cur = 0;
    }
    printf("%lld", ans);
}