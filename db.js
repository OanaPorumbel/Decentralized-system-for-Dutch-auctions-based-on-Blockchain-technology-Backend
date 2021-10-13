
const {sequelize} = require("./models/index")

const db = async () => {
    sequelize.sync( { force: true });
}

db();

module.exports = db;