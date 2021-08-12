/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
	if (!hashtags.length) {
		return ''
	}

	const lowerCaseHashtags = hashtags.map(hashtag => hashtag.toLowerCase())

	const uniqueHashtags = [...new Set(lowerCaseHashtags)]

	return uniqueHashtags.join(', ')
}
