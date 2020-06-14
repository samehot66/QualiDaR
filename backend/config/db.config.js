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
db.pdf_file = require('../models/PDFfiles')(sequelize, Sequelize);
db.pdf_text = require('../models/PDFtexts')(sequelize, Sequelize);
db.keyword = require('../models/keyword')(sequelize, Sequelize);
db.keyword_group = require('../models/keywordgroups')(sequelize, Sequelize);
//db.project_role = User_Profile = sequelize.define('project_roles', { role: Sequelize.ENUM("owner", "guest") }, { timestamps: false });

//-------------------
//|| project_roles ||
//-------------------
db.project.belongsToMany(db.user, { through: db.project_role, foreignKey: 'pid', otherKey: 'uid'});
db.user.belongsToMany(db.project, { through: db.project_role, foreignKey: 'uid', otherKey: 'pid'});

//----------------------
//|| project_pdffiles ||
//----------------------
db.pdf_file.belongsToMany(db.project, { through: 'project_pdffiles', foreignKey: 'pdfid', otherKey: 'pid'});
db.project.belongsToMany(db.pdf_file, { through: 'project_pdffiles', foreignKey: 'pid', otherKey: 'pdfid'});

//---------------
//|| subscribe ||
//---------------
db.user.belongsToMany(db.keyword_group, { through: 'subscribe', foreignKey: 'uid', otherKey: 'keywordgroupsid'})
db.keyword_group.belongsToMany(db.user, { through: 'subscribe', foreignKey: 'keywordgroupsid', otherKey: 'uid'})

//projects |-------|| topics
db.project.hasMany(db.topic, {foreignKey: 'pid', sourceKey: 'pid'});
db.topic.belongsTo(db.project, {foreignKey: 'pid', targetKey: 'pid'});

//topic |-------|| phrases
db.topic.hasMany(db.phrase, {foreignKey: 'tid', sourceKey: 'tid'});
db.phrase.belongsTo(db.topic, {foreignKey: 'tid', targetKey: 'tid'});

//pdffiles |-------|| pdftexts 
db.pdf_file.hasMany(db.pdf_text, {foreignKey: 'pdfid', sourceKey: 'pdfid'})
db.pdf_text.belongsTo(db.pdf_file, {foreignKey: 'pdfid', sourceKey: 'pdfid'})

//users |-------|| pdffiles
db.user.hasMany(db.pdf_file, {foreignKey: 'uid', sourceKey: 'uid'})
db.pdf_file.belongsTo(db.pdf_file, {foreignKey: 'uid', sourceKey: 'uid'})

//users |-------|| keywordgroups
db.user.hasMany(db.keyword_group, {foreignKey: 'uid', sourceKey: 'uid'})
db.keyword_group.belongsTo(db.user, {foreignKey: 'uid', sourceKey: 'uid'})

//users |-------|| keywords
db.user.hasMany(db.keyword, {foreignKey: 'uid', sourceKey: 'uid'});
db.keyword.belongsTo(db.user, {foreignKey: 'uid', sourceKey: 'uid'})

//keywords |-------|| pharses
db.keyword.hasMany(db.phrase, {foreignKey: 'kid', sourceKey: 'kid'});
db.phrase.belongsTo(db.keyword, {foreignKey: 'kid', sourceKey: 'kid'})


module.exports = db;