/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
	const words = tweet.split(' ')

	const hashtags = words.reduce((resultHashtags, word) => {
		if (word.startsWith('#')) {
			resultHashtags.push(word)
		}

		return resultHashtags
	}, [])

	const hashtagsWithoutHashes = hashtags.map(hashtag => hashtag.substring(1))

	return hashtagsWithoutHashes
}
