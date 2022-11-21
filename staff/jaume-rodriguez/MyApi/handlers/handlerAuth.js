const authenticateUser = require('../logic/authenticateUser')

module.exports = (req, res) => {
    let { email, password } = req.body

    try {
        const indentifiedUser = (error, userId) => {
            if (error) {
                res.status(500)
                res.json({ error: error.message })

                return
            }
            res.json({ userId })
        }
        authenticateUser(email, password, indentifiedUser)

    } catch (error) {
        res.status(500)
        res.json({ error: error.message })
    }
}