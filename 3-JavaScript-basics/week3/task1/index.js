const DATE_TYPES = ['years', 'months', 'days', 'hours', 'minutes']

/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (dateString) {
	const date = new Date(dateString)

	return {
		get value() {
			// prettier-ignore
			return `${date.getFullYear()}-${getFormattedString(date.getMonth() + 1)}-${getFormattedString(date.getDate())} ${
                        getFormattedString(date.getHours())}:${getFormattedString(date.getMinutes())}`
		},
		add(value, type) {
			validateArgs(value, type)
			modifyDate(date, value, type)

			return this
		},
		subtract(value, type) {
			validateArgs(value, type)
			modifyDate(date, -value, type)

			return this
		},
	}
}

function getFormattedString(value) {
	return value > 9 ? String(value) : `0${value}`
}

function validateArgs(value, type) {
	if (value < 0) {
		throw new TypeError('Первый аргумент отрицательный')
	}

	if (!DATE_TYPES.includes(type)) {
		throw new TypeError('Второй аргумент содержит неизвестную единицу измерения')
	}
}

function modifyDate(date, value, type) {
	switch (type) {
		case 'years':
			date.setFullYear(date.getFullYear() + value)
			break
		case 'months':
			date.setMonth(date.getMonth() + value)
			break
		case 'days':
			date.setDate(date.getDate() + value)
			break
		case 'hours':
			date.setHours(date.getHours() + value)
			break
		case 'minutes':
			date.setMinutes(date.getMinutes() + value)
			break
	}
}
