import {Sequelize} from 'sequelize';

const db = new Sequelize('nodejs_curso', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;