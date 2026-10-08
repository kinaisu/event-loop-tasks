const delay = (ms, label) =>
    new Promise(resolve =>
        setTimeout(() => {
            console.log('resolved', label);
            resolve(label);
        }, ms)
    );

async function seq() {
    console.time('seq');
    for (const [ms, label] of [[300, 'a'], [200, 'b'], [100, 'c']]) {
        await delay(ms, label);
    }
    console.timeEnd('seq');
}

async function par() {
    console.time('par');
    const r = await Promise.all([delay(300, 'x'), delay(200, 'y'), delay(100, 'z')]);
    console.log(r);
    console.timeEnd('par');
}

seq().then(par);

/* Моє передбачення:
1. Спочатку в консоль буде виведено рядки з функції seq() у наступному порядку: resolved a, resolved b, resolved c.
2. Після виконання функції seq() в консоль буде виведено seq: 600.
3. Потім в консоль буде виведено рядки з функції par() у наступному порядку: resolved z, resolved y, resolved x.
4. Потім в консоль буде виведено масив рядків : x, y, z.
5. Після виконання функції par() в консоль буде виведено par: 300.

Порядок виводу передбачення:
resolved a
resolved b
resolved c
seq: 600
resolved z
resolved y
resolved x
[x, y, z]
par: 300
 */

/* Результат:
resolved a
resolved b
resolved c
seq: 621.634ms
resolved z
resolved y
resolved x
[ 'x', 'y', 'z' ]
par: 305.144ms

 */
