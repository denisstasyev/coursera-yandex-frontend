module.exports = {
	subscribers: {}, // { eventName: handler[] }

	/**
	 * @param {String} event
	 * @param {Object} subscriber
	 * @param {Function} handler
	 */
	on(event, subscriber, handler) {
		if (!this.subscribers.hasOwnProperty(event)) {
			this.subscribers[event] = []
		}
		this.subscribers[event].push({
			subscriber: subscriber,
			handler: handler.bind(subscriber),
		})

		return this
	},

	/**
	 * @param {String} event
	 * @param {Object} subscriber
	 */
	off(event, subscriber) {
		if (this.subscribers.hasOwnProperty(event)) {
			// prettier-ignore
			this.subscribers[event] = this.subscribers[event].filter(
				item => item.subscriber !== subscriber
			)
		}

		return this
	},

	/**
	 * @param {String} event
	 */
	emit(event) {
		if (this.subscribers.hasOwnProperty(event) && this.subscribers[event].length) {
			this.subscribers[event].forEach(item => item.handler())
		}
		return this
	},
}
