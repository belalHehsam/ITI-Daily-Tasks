#include <iostream>
#include <vector>
using namespace std;

int main()
{
    int lines;
    int votes = 0;
    int count = 0;

    cin >> lines;

    vector<vector<int>> matrix(lines, vector<int>(3));

    for (int i = 0; i < lines; i++) {
        for (int j = 0; j < 3; j++) {
            cin >> matrix[i][j];
        }
    }

    for (int i = 0; i < lines; i++) {
        for (int j = 0; j < 3; j++) {
            votes += matrix[i][j];
        }
        if (votes >= 2)
            count++;

        votes = 0;

    }

    cout << count;
}
