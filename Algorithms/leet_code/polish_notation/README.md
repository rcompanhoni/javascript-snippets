# Polish Notation

Polish notation/expression is also known as 'prefix notation' where the numbers are preceded by its operator (placed in the front). For example, '3 * 5' transformed to polish notation will become '* 3 5'. The distinguishing feature of polish notation is that it eliminates the need of brackets, which are used to change to priority of the computation. For example, '5 − (6 * 7)' will be transformed to '− 5 * 6 7'. Polish notations/expressions are the fundamental in evaluation of mathematical expressions, which is a commonly used technique in most compilers/interpreters. 

Valid operators are +, -, *, /. Each operand may be an integer or another expression.

Some examples:

```
    − × ÷ 15 − 7 + 1 1 3 + 2 + 1 1 =
    − × ÷ 15 − 7 + 1 1 3 + 2 2     =
    − × ÷ 15 − 7 + 1 1 3 4         =
    − × ÷ 15 − 7 2     3 4         =
    − × ÷ 15 5         3 4         =
    − × 3              3 4         =
    − 9                  4         =
    5
```