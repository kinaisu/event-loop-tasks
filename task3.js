setTimeout(() => {
    console.log('t1');
    Promise.resolve().then(() => console.log('m1'));
}, 0);

setTimeout(() => {
    console.log('t2');
    Promise.resolve().then(() => console.log('m2'));
}, 0);

Promise.resolve().then(() => {
    console.log('m0');
    setTimeout(() => console.log('t0'), 0);
});

queueMicrotask(() => console.log('qm'));

/* Моє передбачення:
1. Перший setTimeout потрапляє до Callback Queue тому ми поки що його пропускаємо.
2. Другий setTimeout також потрапляє до Callback Queue тому ми також його пропускаємо.
3. Далі йде Promise який потрапляє до Microtasks Queue тому ми також його пропускаємо.
4. Потім queueMicrotask поміщає console.log('qm') до Microtasks Queue.
5. Після виконання синхронного коду ми повертаємося до списку Microtasks Queue і в консоль виводиться 'm0', і додаємо
в Callback Queue console.log('t0'), а потім виводимо в консоль qm.
6. Потім починається проходження коду якій знаходиться в Callback Queue і в консоль виводиться t1, m1, t2, m2, t0.

Порядок виводу передбачення:
m0
qm
t1
m1
t2
m2
t0
 */

/* Результат:
m0
qm
t1
m1
t2
m2
t0

 */
