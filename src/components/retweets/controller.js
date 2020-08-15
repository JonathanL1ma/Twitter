const Store = require('./store')

const retweet = async (data, user) => {
    try {
        const [tweet_id, ...rest] = data
        const message = rest.toString().split(',').join(' ')
        if (tweet_id) {
            return await Store.retweet(tweet_id, user, message)
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = { retweet }