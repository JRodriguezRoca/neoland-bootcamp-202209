const { User } = require('../models')

module.exports = function (userId, targetUserId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new Error('userId is empty')
    if (typeof targetUserId !== 'string') throw new TypeError('targetUserId is not a string')
    if (!targetUserId.length) throw new Error('targetUserId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)

            return User.findById(targetUserId).select('-password').lean()
        })
        .then(targetUser => {
            if (!targetUser)
                throw new Error(`target user with id ${userId} does not exist`)

            delete targetUser._id
            delete targetUser.password

            return targetUser
        })
}