#include<stdio.h>
int n, a[510];
int ans;
int main() {
    scanf("%d",&n);
    for(int i = 1; i <= n; ++i) scanf("%d",&a[i]);
    for(int i = 1; i <= n; ++i)
        for(int j = i + 1; j <= n; ++j)
            if(a[i] + a[j] == 0) ++ans;
    printf("%d",ans);
}
