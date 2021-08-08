/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */
module.exports = function (hours, minutes) {
	// Гарантируется, что в функцию передаются два целых числа.
	// Часы мы считаем правильными, если они находятся в диапазоне [0, 23].
	// Минуты мы считаем правильными, если они находятся в диапазоне [0, 59]. Если часы и минуты правильные, то возвращаем 'true', иначе — 'false'.
	return 0 <= hours && hours <= 23 && 0 <= minutes && minutes <= 59
}
