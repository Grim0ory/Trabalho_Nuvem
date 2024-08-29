const Sequelize = require("sequelize");
const connection = require("../database/banco");

const Cliente = connection.define('clientes', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },

    data: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

Cliente.sync({force: false}).then(()=>{});

module.exports = Cliente;