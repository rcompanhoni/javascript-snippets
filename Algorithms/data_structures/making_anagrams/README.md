# Strings: Making Anagrams

Given two strings, *a* and *b* , that may or may not be of the same length, determine the minimum number of character deletions required to make  *a* and *b* anagrams. Any characters can be deleted from either of the strings.

## Input Format

The first line contains a single string, *a*. 
The second line contains a single string, *b*.

## Constraints

* a.length >= 1 and b.length <= 10^4
* It is guaranteed that *a* and *b* consist of lowercase English alphabetic letters (i.e., *a* through *z*).

Print a single integer denoting the number of characters you must delete to make the two strings anagrams of each other.

**Sample Input**
```
cde
abc
```

## Sample Output

```
4
```

## Explanation

We delete the following characters from our two strings to turn them into anagrams of each other:

Remove d and e from cde to get c.
Remove a and b from abc to get c.

We must delete  characters to make both strings anagrams, so we print  on a new line.