var assert = require('assert')

var Collection = require('./index')

// Создаем коллекцию чисел
var numbers = new Collection()
numbers.append(10)
numbers.append(20)

assert.equal(numbers.count(), 2)
assert.deepEqual(numbers.values(), [10, 20])

// Создаем коллекцию букв
var letters = Collection.from(['a', 'b', 'c'])
letters.append('d')

assert.equal(letters.count(), 4)
assert.deepEqual(letters.values(), ['a', 'b', 'c', 'd'])

// Смешиваем обе коллекции
var items = new Collection()
items.append(numbers)
items.append(letters)

assert.equal(items.count(), 6)
assert.deepEqual(items.values(), [10, 20, 'a', 'b', 'c', 'd'])

// Проверяем получение элемента
assert.equal(items.at(0), null)
assert.equal(items.at(1), 10)
assert.equal(items.at(3), 'a')
assert.equal(items.at(6), 'd')

// Проверяем удаление
assert.equal(items.removeAt(0), false)
assert.equal(items.removeAt(2), true)
assert.equal(items.removeAt(5), true)

assert.deepEqual(items.values(), [10, 'a', 'b', 'c'])

console.info('OK!')
