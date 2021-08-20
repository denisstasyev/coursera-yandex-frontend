var assert = require('assert')
var parallel = require('./index')

// Вспомогательная функция для тестов
var tests = 3
function completeTest() {
	tests--

	if (tests === 0) {
		console.info('OK!')
	}

	if (tests < 0) {
		throw new Error('Одна из результирующих callback-функций вызывается больше одного раза')
	}
}

// Пример успешного выполнения операции
parallel(
	[
		// Операция, которая выполняется 500ms
		function (next) {
			setTimeout(function () {
				next(null, '500ms')
			}, 500)
		},

		// Операция, которая выполняется 50ms
		function (next) {
			setTimeout(function () {
				next(null, '50ms')
			}, 50)
		},

		// Операция, которая выполняется 200ms
		function (next) {
			setTimeout(function () {
				next(null, '200ms')
			}, 200)
		},
	],

	// Обработка результата выполнения операций (результирующий callback)
	function (errors, result) {
		assert.deepEqual(errors, null)
		assert.deepEqual(result, ['500ms', '50ms', '200ms'])

		completeTest()
	},
)

// Пример, когда одна из операций завершается ошибкой
parallel(
	[
		// Операция, которая выполняется 500ms
		function (next) {
			setTimeout(function () {
				next(null, '500ms')
			}, 500)
		},

		// Операция, которая завершается с ошибкой через 10ms
		function (next) {
			setTimeout(function () {
				next('ERROR')
			}, 10)
		},

		// Операция, которая выполняется 200ms
		function (next) {
			setTimeout(function () {
				next(null, '200ms')
			}, 200)
		},
	],
	function (error, results) {
		assert.deepEqual(error, 'ERROR')
		assert.equal(results, null)

		completeTest()
	},
)

// Пример передачи пустого массива для операций
parallel([], function (errors, result) {
	assert.deepEqual(errors, null)
	assert.deepEqual(result, [])

	completeTest()
})
