import Sequelize from 'sequelize';
import config from './sqlConfig';

const { database, username, password, host } = config;
const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

// test
sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});


export default sequelize;
