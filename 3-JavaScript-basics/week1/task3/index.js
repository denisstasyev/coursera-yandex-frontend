const HOURS_PER_DAY = 24
const MINUTES_PER_HOUR = 60

/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
	minutes += interval

	hours += Math.floor(minutes / MINUTES_PER_HOUR)

	minutes %= MINUTES_PER_HOUR
	hours %= HOURS_PER_DAY

	if (hours < 10) {
		hours = '0' + hours
	}

	if (minutes < 10) {
		minutes = '0' + minutes
	}

	return hours + ':' + minutes
}
