#include <bits/stdc++.h>
using namespace std;
string s;
int a, b, ans = 1;
int trans()
{
	if (s == "Monday") return 1;
	if (s == "Tuesday") return 2;
	if (s == "Wednesday") return 3;
	if (s == "Thursday") return 4;
	if (s == "Friday") return 5;
	if (s == "Saturday") return 6;
	if (s == "Sunday") return 7;
}
void print()
{
	if (ans == 1) printf("Monday");
	if (ans == 2) printf("Tuesday");
	if (ans == 3) printf("Wednesday");
	if (ans == 4) printf("Thursday");
	if (ans == 5) printf("Friday");
	if (ans == 6) printf("Saturday");
	if (ans == 0) printf("Sunday");
}
int main()
{
	freopen("date.in","r",stdin);
	freopen("date.out","w",stdout);
	cin >> s >> a >> b;
	for(int i = 1; i <= b; i ++) ans = ans * a % 7;
	ans = (ans + trans()) % 7;
	print();
	return 0;
}
