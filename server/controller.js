require('dotenv').config();
const Sequelize = require('sequelize');

const {CONNECTION_STRING} = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

const userID = 4;
const clientId = 3;

module.exports = {
    getUserInfo: (req, res) => {
        sequelize.query(`SELECT * FROM cc_clients AS c
            JOIN cc_users AS u ON c.user_id = u.user_id
            WHERE u.user_id = ${userID};`
        )
        .then((dbRes) => {
            res.status(200).send(dbRes[0]);
        })
    }
}