# include <stdio.h>
# include <iostream>
# define  MAX 1000000007
# define ll long long

using namespace std;

ll n,m,a,*b;


long long mul(long long a,long long b,long long mod) {
    long long res = 0;
    while(b > 0){
        if( (b&1) != 0)  // 二进制最低位是1 --> 加上 a的 2^i 倍, 快速幂是乘上a的2^i ）
            res  = ( res + a) % mod;
        a = (a << 1) % mod;    // a = a * 2    a随着b中二进制位数而扩大 每次 扩大两倍。
        b >>= 1;               // b -> b/2     右移  去掉最后一位 因为当前最后一位我们用完了，
    }
    return res;
}



long long pow(long long a,long long n,long long mod) {
    long long res = 1;
    while(n > 0) {
        if(n & 1)
            res = mul(res,a,mod);
        a = mul(a,a,mod);
        n >>= 1;
    }
    return res;
}


void init(){
	cin>>n>>m>>a;
	b = new ll[m+1];
	for(ll i=0;i<=m;i++){
	cin>>b[i];
	}
}


ll f(ll x){
	ll result=0;
	for(ll i=0;i<=m;i++){
		result+=mul(b[i],pow(x,i,MAX),MAX);
		result%=MAX;
	}
	return result;
}

ll s(){
	ll result=0;
	for(ll i = 0;i<=n;i++){
		result+=mul(pow(a,i,MAX),f(i),MAX);
		result%=MAX;
	}
	return result;
}

int main(){
    init();
	cout<<s()<<endl;
    return 0;
}
