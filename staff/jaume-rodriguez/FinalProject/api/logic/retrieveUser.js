const { errors: { FormatError } } = require('com')
const { User } = require('../models')

function retrieveUser(userId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new FormatError('userId is empty')

    return User.findById(userId)
        .select('-password')
        .populate('questsPlayed')
        .populate('adventuresPlayed')
        .lean()
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            user.level = Math.floor(user.exp / 1000);
            user.remainingExp = user.exp % 1000

            // sanitize
            user.id = user._id.toString()

            delete user._id

            return user
        })
}

module.exports = retrieveUser