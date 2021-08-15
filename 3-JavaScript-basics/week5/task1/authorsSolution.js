// В этом массиве будем хранить все подписки
var subscriptions = []

module.exports = {
	/**
	 * @param {String} event
	 * @param {Object} subscriber
	 * @param {Function} handler
	 */
	on: function (event, subscriber, handler) {
		// Сохраняем полную информацию
		subscriptions.push({
			event: event,
			subscriber: subscriber,
			handler: handler,
		})

		return this
	},

	/**
	 * @param {String} event
	 * @param {Object} subscriber
	 */
	off: function (event, subscriber) {
		// Удаляем всю информацию, связанную с событием и подписчиком
		subscriptions = subscriptions.filter(function (subscription) {
			return subscription.event !== event || subscription.subscriber !== subscriber
		})

		return this
	},

	/**
	 * @param {String} event
	 */
	emit: function (event) {
		subscriptions.forEach(function (subscription) {
			if (event === subscription.event) {
				// Вызываем обработчик в контексте объект-подписчика
				subscription.handler.call(subscription.subscriber)
			}
		})

		return this
	},
}
