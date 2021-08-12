// Телефонная книга
const phoneBook = {}

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
	const args = command.split(' ')
	const commandName = args[0]

	switch (commandName) {
		case 'ADD':
			const contact = args[1]
			const phones = args[2].split(',')

			return addContact(contact, phones)
		case 'REMOVE_PHONE':
			const phone = args[1]

			return removePhone(phone)
		case 'SHOW':
			return showPhoneBook()
	}
}

function addContact(contact, phones) {
	phoneBook[contact] = [...new Set((phoneBook[contact] || []).concat(phones))]
}

function removePhone(phone) {
	let removed = false

	Object.keys(phoneBook).forEach(contact => {
		if (phoneBook[contact].includes(phone)) {
			phoneBook[contact] = phoneBook[contact].filter(contactPhone => phone !== contactPhone)

			if (phoneBook[contact].length === 0) {
				delete phoneBook[contact]
			}

			removed = true
		}
	})

	return removed
}

function showPhoneBook() {
	const sortedContacts = Object.keys(phoneBook).sort()

	return (
		sortedContacts
			// .filter(contact => phoneBook[contact].length)
			.map(contact => `${contact}: ${phoneBook[contact].join(', ')}`)
	)
}
