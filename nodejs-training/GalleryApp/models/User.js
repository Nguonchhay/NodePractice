const dbService = require('./../services/MySqlService');

class User {
    constructor(email, password = null, fullName, sex = null, profile = null) {
        this._email = email;
        this._password = password;
        this._fullName = fullName;
        this._sex = sex;
        this._profile = profile;
    }

    static list() {
        return dbService.execute('SELECT * FROM users');
    }
}

module.exports = User;

