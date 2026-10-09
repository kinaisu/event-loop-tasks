async function f() {
    try {
        await Promise.reject(new Error('boom'));
    } catch (e) {
        console.log('caught 1:', e.message);
        throw new Error('rethrow');
    } finally {
        console.log('finally');
    }
}

try {
    f();
    console.log('after call');
} catch (e) {
    console.log('caught 2:', e.message);
}

f().catch(e => console.log('caught 3:', e.message));

/* Моє передбачення:
1. Першим починаэ виконуватись блок try який викликаэ асинхронну функцію f().
2. У функції першим викликається Promise.reject(new Error('boom')) який потрапляє в Microtasks Queue.
3. Далі продовжується синхронне виконання коду і перше що виводиться в консоль це after call, тому що проміс ще не встиг
зареєструвати помилку.
4. Через те що фукція f() в блоці try викликається без await console.log('caught 2:', e.message) не буде викликано, тому що
функція повертає порожній проміс і помилка ще не виникла.
5. Далі синхронно знову викликається функція f() разом з catch, вона також потрапляє до Microtasks Queue.
6. Після закінчення синхронного коду починається виконання коду з Microtasks Queue і двічі в консоль виводиться:
caught 1: boom
finally
7. Після цього в консоль буде виведено "caught 3: rethrow".
8. І вкінці буде виведено повідомлення про помилку

Порядок виводу передбачення:
after call
caught 1: boom
finally
caught 1: boom
finally
caught 3: rethrow
повідомлення про помилку
 */

/* Результат:

 */
