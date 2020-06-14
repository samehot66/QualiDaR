const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../models/users.js')(sequelize, Sequelize);
db.project = require('../models/projects.js')(sequelize, Sequelize);
db.project_role = require('../models/project_roles.js')(sequelize, Sequelize);
db.topic = require('../models/topics.js')(sequelize, Sequelize);
db.phrase = require('../models/phrases.js')(sequelize, Sequelize);
//db.project_role = User_Profile = sequelize.define('project_roles', { role: Sequelize.ENUM("owner", "guest") }, { timestamps: false });
 
db.project.belongsToMany(db.user, { through: db.project_role, foreignKey: 'pid', otherKey: 'uid'});
db.user.belongsToMany(db.project, { through: db.project_role, foreignKey: 'uid', otherKey: 'pid'});

db.project.hasMany(db.topic, {foreignKey: 'pid', sourceKey: 'pid'});
db.topic.belongsTo(db.project, {foreignKey: 'pid', targetKey: 'pid'});

db.topic.hasMany(db.phrase, {foreignKey: 'tid', sourceKey: 'tid'});
db.phrase.belongsTo(db.topic, {foreignKey: 'tid', targetKey: 'tid'});

module.exports = db;