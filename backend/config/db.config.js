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
 
db.project.belongsToMany(db.user, { through: 'project_roles', foreignKey: 'pId', otherKey: 'userId'});
db.user.belongsToMany(db.project, { through: 'project_roles', foreignKey: 'userId', otherKey: 'pId'});

module.exports = db;