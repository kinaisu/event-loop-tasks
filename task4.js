const p = Promise.resolve();

p.then(() => console.log(1))
    .then(() => console.log(2))
    .then(() => console.log(3));

p.then(() => console.log('a'))
    .then(() => console.log('b'));

p.then(() => {
    console.log('x');
    return '!';
}).then(v => console.log('y', v));

/* Моє передбачення:
1. В першій строці ми отримуємо вже вирішений проміс p.
2. Потім в консоль виводиться перший степ кожного промісу: 1, a, x.
3. Далі виводиться другий степ перших двох промісів та вирішується Promise.resolve('!'): 2, b.
4. І в кінці виконується 3-й степ першого промісу і виводиться другий степ 3-го промісу: 3, y, !.
5. Як що в третьому промісі замість return "Promise.resolve('!')" було б "return '!'" тоді б не додався зайвий степ
в другому промісі і "y, !" булоб виведено перед "3"

Порядок виводу передбачення:
"return Promise.resolve('!')"
1
a
x
2
b
3
y !

"return '!'"
1
a
x
2
b
y !
3

 */

/* Результат:
"return Promise.resolve('!')"
1
a
x
2
b
3
y !

"return '!'"
1
a
x
2
b
y !
3

 */
