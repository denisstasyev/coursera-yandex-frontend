/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
	// Обрабатываем случай, когда не передано никаких операций
	if (operations.length === 0) {
		callback(null, [])
	}

	var result = []
	var doneOperations = 0
	var hasError = false

	// Запускаем все операции и каждой передаём функцию next
	operations.forEach(function (operation, index) {
		operation(function next(err, data) {
			// Если была ошибка, то больше не нужно обрабатывать результат и вызывать callback
			if (hasError) {
				return
			}

			// Обрабатываем возникновение ошибки
			// Вызываем результирующий callback и сохраняем флаг с ошибкой
			if (err) {
				callback(err)
				hasError = true

				return
			}

			// Сохраняем результат операции
			result[index] = data
			doneOperations++

			// Если все операции закончились, вызываем результирующий callback
			if (doneOperations === operations.length) {
				callback(null, result)
			}
		})
	})
}
