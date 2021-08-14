// Для выполнения операций в определённом порядке назначим им приоритет
var PRIORITY = {
	operationFilter: 0,
	operationSelect: 1,
}

/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
	// Получаем операции
	var operations = [].slice.call(arguments, 1)

	// Сортируем операции по приоритету
	operations.sort(function (operationOne, operationTwo) {
		// Для определения операции будем использовать название соответствующей функции
		return PRIORITY[operationOne.name] - PRIORITY[operationTwo.name]
	})

	// Копируем коллекцию, чтобы не менять исходную
	var clonedCollection = cloneCollection(collection)

	// Применяем операции над скопированной коллекцией
	return operations.reduce(function (resultCollection, operation) {
		// Запускаем следующую операцию с коллекцией, получившейся после предыдущей операции
		return operation(resultCollection)
	}, clonedCollection)
}

/**
 * @params {String[]}
 */
function select() {
	// Получаем список свойств, которые будем выбирать
	var properties = [].slice.call(arguments)

	// Возвращаем функцию, которая позже будет применена к коллекции.
	return function operationSelect(collection) {
		return collection.map(function (item) {
			// Клонируем объект с переданными свойствами
			return cloneItem(item, properties)
		})
	}
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
	// Возвращаем функцию, которая позже будет применена к коллекции.
	return function operationFilter(collection) {
		// Фильтруем коллекцию по значению поля
		return collection.filter(function (item) {
			var value = item[property]

			return values.indexOf(value) > -1
		})
	}
}

function cloneCollection(collection) {
	return collection.map(function (item) {
		var properties = Object.keys(item)

		// Клонируем элемент со всеми его свойствами
		return cloneItem(item, properties)
	})
}

// Функция для клонирования объекта с заданными свойствами
function cloneItem(item, properties) {
	var newItem = {}

	// Копируем каждый ключ элемента в новый элемент
	for (var i = 0; i < properties.length; i++) {
		var property = properties[i]

		// Присваивание происходит по значению
		// так как по условию тип поля строка либо число
		// Проверяем, что свойство существует у исходного элемента
		if (item.hasOwnProperty(property)) {
			newItem[property] = item[property]
		}
	}

	return newItem
}

// Экспортируем наши методы
module.exports = {
	query: query,
	select: select,
	filterIn: filterIn,
}
