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

// table
const List = sequelize.define('list', {
  id: {
      type: Sequelize.STRING(50),
      primaryKey: true
  },
  song: Sequelize.STRING(20),
  singer: Sequelize.STRING(20),
  image: Sequelize.STRING(100),
  file: Sequelize.STRING(100),
  lyric: Sequelize.STRING(100),
}, {
  timestamps: false
});

