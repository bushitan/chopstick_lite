
var dbFather = require('db_store.js')
class db extends dbFather {
    constructor() {
        super()
    }
}

module.exports = new db()