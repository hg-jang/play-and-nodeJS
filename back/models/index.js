const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config); // sequelize가 node와 mySQL 연결

db.User = require('./user')(sequelize, Sequelize)
db.Post = require('./post')(sequelize, Sequelize)
db.Image = require('./image')(sequelize, Sequelize)
db.Comment = require('./comment')(sequelize, Sequelize)
db.Hashtag = require('./hashtag')(sequelize, Sequelize)

// 각 모델에서 정의한 관계들에 따라 테이블 생성됨.
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;