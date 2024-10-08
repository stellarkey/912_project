#include <iostream>
#include <cctype>
#include <cstring>
#include <string>
#include <vector>
#include <sstream>
using namespace std;
string arg, t, s;
int T;
bool grep[26], have_instr[26];
bool is_args(const string& s) { return s.length() == 2 && s[0] == '-' && islower(s[1]); }

int main()
{
    ios::sync_with_stdio(false), cin.tie(nullptr), cout.tie(nullptr);
    getline(cin, arg);
    while (arg.back() == '\r')
        arg.pop_back();
    for (int i = 0; i < arg.length(); ++i)
    {
        if (islower(arg[i]))
        {
            grep[arg[i] - 'a'] = true;
            if (arg[i + 1] == ':')
                have_instr[arg[i] - 'a'] = true, ++i;
        }
    }
    getline(cin, t);
    while (t.back() == '\r')
        t.pop_back();
    stringstream tt(t);
    tt >> T;
    for (int i = 1; i <= T; ++i)
    {
        getline(cin, s);
        while (s.back() == '\r')
            s.pop_back();
        stringstream ss(s);
        vector<string> cmds;
        vector<string> grep_args(26);
        vector<bool> greped(26);

        string tmp;
        while (ss >> tmp)
            cmds.push_back(tmp);
        printf("Case %d: ", i);
    
        for (int idx = 1; idx < cmds.size(); ++idx)
        {
            if (!is_args(cmds[idx]))
                break;
            int ar = cmds[idx][1] - 'a';
            if (!grep[ar])
                break;
            if (have_instr[ar])
                if (idx + 1 < cmds.size())
                    grep_args[ar] = cmds[idx + 1], ++idx;
                else
                    break;
            greped[ar] = true;
        }
        for (int idx = 0; idx < 26; ++idx)
        {
            if (greped[idx])
            {
                putchar('-'), putchar(idx + 'a'), putchar(' ');
                if (have_instr[idx])
                    printf("%s ", grep_args[idx].c_str());
            }
        }
        putchar('\n');
    }
}
