/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection, ...operations) {
	let result = [...collection]

	const filterInOperations = operations.filter(operation => operation.type === 'filterIn')
	const selectOperations = operations.filter(operation => operation.type === 'select')

	filterInOperations.forEach(operation => {
		result = result.filter(operation.fn)
	})
	selectOperations.forEach(operation => {
		result = result.map(operation.fn)
	})

	return result
}

/**
 * @params {String[]}
 */
function select(...args) {
	return {
		type: 'select',
		fn(item) {
			const selectItem = {}

			args.forEach(key => {
				const value = item[key]

				if (value) {
					selectItem[key] = value
				}
			})

			return selectItem
		},
	}
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
	return {
		type: 'filterIn',
		fn(item) {
			return values.includes(item[property])
		},
	}
}

module.exports = {
	query: query,
	select: select,
	filterIn: filterIn,
}
