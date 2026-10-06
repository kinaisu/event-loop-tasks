console.log('script start');

async function a1() {
    console.log('a1 start');
    await a2();
    console.log('a1 end');
}

async function a2() {
    console.log('a2');
}

setTimeout(() => console.log('setTimeout'), 0);

a1();

new Promise(resolve => {
    console.log('promise executor');
    resolve();
})
    .then(() => console.log('then 1'))
    .then(() => console.log('then 2'));

console.log('script end');

/* Моє передбачення:
1. 'script start' - тому що це синхронний код і він виконується першим.
2. Далі йдуть функції (a1 та a2) ми їх пропускаємо і чекаємо на виклик далі в коді.
3. Далі по коду йде виклик setTimeout, але він не виводиться, а поміщається в Callback Queue.
4. Потім йде виклик функції a1() і виводиться 'a1 start'.
5. Далі йде виклик await a2() виводить 'a2', а решту поміщає в Microtasks Queue.
6. Далі продовжується виконання синхронного коду і виводиться 'promise executor' і проміс потрапляє в Microtasks Queue.
7. Продовжується виконання синхронного коду і виводиться 'script end'.
8. Далі починається виконання коду з Microtasks Queue і виводиться послідовно 'a1 end', 'then 1', 'then 2'.
9. І в кінці виконується те що знаходиться в Callback Queue і виводиться 'setTimeout'

Порядок виводу передбачення:
'script start'
'a1 start'
'a2'
'promise executor'
'script end'
'a1 end'
'then 1'
'then 2'
'setTimeout'
 */

/* Результат:
script start
a1 start
a2
promise executor
script end
a1 end
then 1
then 2
setTimeout
 */
