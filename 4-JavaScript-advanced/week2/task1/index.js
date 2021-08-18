module.exports = Collection

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection(collection) {
	this.storage = collection || []
}

// Методы коллекции
Collection.prototype.count = function () {
	return this.storage.length
}
Collection.prototype.values = function () {
	return this.storage
}
Collection.prototype.at = function (index) {
	if (index - 1 < 0 || index - 1 >= this.storage.length) {
		return null
	}

	return this.storage[index - 1]
}
Collection.prototype.append = function (item) {
	if (item instanceof Collection) {
		this.storage.push(...item.storage)
	} else {
		this.storage.push(item)
	}
}
Collection.prototype.removeAt = function (index) {
	if (index - 1 < 0 || index - 1 >= this.storage.length) {
		return false
	}

	this.storage.splice(index - 1, 1)
	return true
}

/**
 * Создание коллекции из массива значений
 */
Collection.from = function (collection) {
	return new Collection(collection)
}
