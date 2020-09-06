#include<bits/stdc++.h>
using namespace std;

struct node
{
    int number, score;
} a[5010];

int cmp (node x, node y)
{
    if (x.score == y.score)
        return x.number < y.number;
    else return x.score > y.score;
}

int main()
{
	freopen("score.in", "r", stdin);
	freopen("score.out", "w", stdout); 
    int n, m;
    scanf("%d%d", &n, &m);
    for (int i = 0; i < n; i ++)
        scanf("%d%d", &a[i].number, &a[i].score);
    m = floor(m * 1.2);  //向上取整
    sort(a, a + n, cmp);
    int line = a[m-1].score;   //分数线
    for (int i = m; i < n; i ++)
        if (a[i].score == line) m ++;
            else break;   //处理分数并列的情况 
    printf("%d %d\n", line, m);  //分数线和人数
    for (int i = 0; i < m; i ++)
        printf("%d %d\n", a[i].number, a[i].score);
    return 0;
 } 
