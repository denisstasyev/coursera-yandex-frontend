/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
	let correctHours = hours
	let correctMinutes = minutes + interval

	while (correctMinutes >= 60) {
		correctMinutes -= 60
		correctHours += 1
	}

	while (correctHours >= 24) {
		correctHours -= 24
	}

	let outputHours = correctHours > 9 ? correctHours : '0' + correctHours
	let outputMinutes = correctMinutes > 9 ? correctMinutes : '0' + correctMinutes

	return outputHours + ':' + outputMinutes
}
