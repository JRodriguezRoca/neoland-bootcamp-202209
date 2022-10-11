/**
 * Registers a user in DB
 * 
 * @param {string} name The user name.
 * @param {string} email The user email.
 * @param {string} password The user password.
 * 
 * @returns null | Error
 */
 function registerUser(name, email, password) {
   if (typeof name !== "string") return new Error("name is not string");
   if (name.length < 1) return new Error("name length is less than 1");
   if (!IS_ALPHABETICAL_REGEX.test(name)) return new Error("name is not alphabetical")

   if (typeof email !== "string") return new Error("email is not string");
   if (!IS_EMAIL_REGEX.test(email)) return new Error("email is not valid");

   if (typeof password !== "string") return new Error("password is not a string");
   if (password.length < 8) return new Error("password length is less than 8");
   if (HAS_SPACES_REGEX.test(password)) return new Error("password has spaces");

    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email)
            return new Error("User already exists")
    }

    var lastIndex = users.length - 1
    var lastUser = users[lastIndex]
    var lastUserId = lastUser.id

    var countString = lastUserId.substring(5)
    var count = parseInt(countString)

    var nextCount = count + 1
    var nextUserId = 'user-' + nextCount

    var user = {
        "id": nextUserId,
        "name": name,
        "email": email,
        "password": password,
    }

    users.push(user)

    return null
}