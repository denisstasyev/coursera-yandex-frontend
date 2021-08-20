/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
	const operationsData = []

	if (!operations.length) {
		callback(null, [])
	}

	operations.forEach((operation, index) => {
		const next = (error, data) => {
			if (error) {
				callback(error)
				return
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
