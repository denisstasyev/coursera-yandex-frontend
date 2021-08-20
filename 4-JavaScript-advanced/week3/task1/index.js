/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
	if (!operations.length) {
		callback(null, [])
	}

	const operationsData = []
	let hasError = false

	operations.forEach((operation, index) => {
		const next = (error, data) => {
			if (error) {
				!hasError && callback(error)
				hasError = true
			} else {
				// operationsData.push(data) - для сохранения порядка НЕ вызовов, а ответов
				operationsData[index] = data

				if (operationsData.filter(Boolean).length === operations.length) {
					callback(null, operationsData)
				}
			}
		}

		operation(next)
	})
}
