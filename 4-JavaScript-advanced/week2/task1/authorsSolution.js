module.exports = Collection

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
	this._values = []
}

// Методы коллекции
Collection.prototype.values = function () {
	return this._values
}

Collection.prototype.count = function () {
	return this._values.length
}

Collection.prototype.at = function (position) {
	return this._validPosition(position) ? this._values[position - 1] : null
}

Collection.prototype.removeAt = function (position) {
	var valid = this._validPosition(position)

	if (valid) {
		this._values.splice(position - 1, 1)
	}

	return valid
}

Collection.prototype.append = function (item) {
	if (item instanceof Collection) {
		this._values = this._values.concat(item.values())
	} else {
		this._values.push(item)
	}
}

Collection.prototype._validPosition = function (position) {
	return position > 0 && position <= this.count()
}

/**
 * Создание коллекции из массива значений
 */
Collection.from = function (items) {
	return items.reduce(function (collection, item) {
		collection.append(item)

		return collection
	}, new Collection())
}
