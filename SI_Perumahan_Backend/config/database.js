const Sequelize = require('sequelize')

const db = new Sequelize('r_perumahan', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db;