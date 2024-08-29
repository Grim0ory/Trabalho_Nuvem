const Sequelize = require("sequelize");

const connection = new Sequelize('trabalho', 'admin', 'logaai123147', {
    host: 'database-2.cn4m6isiicfx.us-east-1.rds.amazonaws.com',
    dialect: 'mariadb',
    timezone: '-03:00'
});

module.exports = connection;