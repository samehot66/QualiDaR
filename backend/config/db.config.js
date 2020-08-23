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
db.project_pdffile = require('../models/project_pdffiles.js')(sequelize, Sequelize);
db.subscribe = require('../models/subscribe')(sequelize, Sequelize);
db.topic_pdffiles = require('../models/topic_pdffiles.js')(sequelize, Sequelize);
db.keywordgroup_topics = require('../models/keywordgroup_topics.js')(sequelize, Sequelize);
//db.project_role = User_Profile = sequelize.define('project_roles', { role: Sequelize.ENUM("owner", "guest") }, { timestamps: false });

//-------------------
//|| keywordgroup_topics ||
//-------------------
db.topic.hasMany(db.keywordgroup_topics, {as: 'topic_group',foreignKey: 'tid', sourceKey: 'tid'})
db.keywordgroup_topics.belongsTo(db.topic, {as: 'topic_group',foreignKey: 'tid', sourceKey: 'tid'})
db.keyword_group.hasMany(db.keywordgroup_topics, {as: 'keywordgroup',foreignKey: 'keywordgroupsid', sourceKey: 'keywordgroupsid'})
db.keywordgroup_topics.belongsTo(db.keyword_group, {as: 'keywordgroup',foreignKey: 'keywordgroupsid', sourceKey: 'keywordgroupsid'})
db.topic.belongsToMany(db.keyword_group, {through: db.keywordgroup_topics});
db.keyword_group.belongsToMany(db.topic, {through: db.keywordgroup_topics});

//-------------------
//|| topic_pdffiles ||
//-------------------
db.topic.hasMany(db.topic_pdffiles, {as: 'topic_role',foreignKey: 'tid', sourceKey: 'tid'})
db.topic_pdffiles.belongsTo(db.topic, {as: 'topic_role',foreignKey: 'tid', sourceKey: 'tid'})
db.pdf_file.hasMany(db.topic_pdffiles, {as: 'pdf',foreignKey: 'pdfid', sourceKey: 'pdfid'})
db.topic_pdffiles.belongsTo(db.pdf_file, {as: 'pdf',foreignKey: 'pdfid', sourceKey: 'pdfid'})
db.topic.belongsToMany(db.pdf_file, {through: db.topic_pdffiles});
db.pdf_file.belongsToMany(db.topic, {through: db.topic_pdffiles});

//-------------------
//|| project_roles ||
//-------------------
db.user.hasMany(db.project_role, {as: 'user',foreignKey: 'uid', sourceKey: 'uid'})
db.project_role.belongsTo(db.user, {as: 'user',foreignKey: 'uid', sourceKey: 'uid'})
db.project.hasMany(db.project_role, {as: 'project',foreignKey: 'pid', sourceKey: 'pid'})
db.project_role.belongsTo(db.project, {as: 'project',foreignKey: 'pid', sourceKey: 'pid'})
db.project.belongsToMany(db.user, {through: db.project_role});
db.user.belongsToMany(db.project, {through: db.project_role});

//----------------------
//|| project_pdffiles || 
//----------------------
db.user.hasMany(db.project_pdffile, {foreignKey: 'uid', sourceKey: 'uid'})
db.project_pdffile.belongsTo(db.user, {foreignKey: 'uid', sourceKey: 'uid'})
db.project.hasMany(db.project_pdffile, {foreignKey: 'pid', sourceKey: 'pid'})
db.project_pdffile.belongsTo(db.project, {foreignKey: 'pid', sourceKey: 'pid'})
db.pdf_file.hasMany(db.project_pdffile, {foreignKey: 'pdfid', sourceKey: 'pdfid'})
db.project_pdffile.belongsTo(db.pdf_file, {foreignKey: 'pdfid', sourceKey: 'pdfid'})
/*db.pdf_file.belongsToMany(db.user, { through: db.project_pdffile, foreignKey: 'pdfid', otherKey: 'uid'});
db.user.belongsToMany(db.pdf_file, { through: db.project_pdffile, foreignKey: 'uid', otherKey: 'pdfid'});
db.pdf_file.belongsToMany(db.project, { through: db.project_pdffile, foreignKey: 'pdfid', otherKey: 'pid'});
db.project.belongsToMany(db.pdf_file, { through: db.project_pdffile, foreignKey: 'pid', otherKey: 'pdfid'});*/

//---------------
//|| subscribe ||
//---------------
db.user.hasMany(db.subscribe, {foreignKey: 'uid', sourceKey: 'uid'})
db.subscribe.belongsTo(db.user, {foreignKey: 'uid', sourceKey: 'uid'})
db.keyword_group.hasMany(db.subscribe, {foreignKey: 'keywordgroupsid', sourceKey: 'keywordgroupsid'})
db.subscribe.belongsTo(db.keyword_group, {foreignKey: 'keywordgroupsid', sourceKey: 'keywordgroupsid'})
//db.user.belongsToMany(db.keyword_group, { through: db.subscribe, foreignKey: 'uid', otherKey: 'keywordgroupsid'})
//db.keyword_group.belongsToMany(db.user, { through: db.subscribe, foreignKey: 'keywordgroupsid', otherKey: 'uid'})

//projects |-------|| topics
db.project.hasMany(db.topic, {foreignKey: 'pid', sourceKey: 'pid'});
db.topic.belongsTo(db.project, {foreignKey: 'pid', targetKey: 'pid'});

//users |-------|| topics
db.user.hasMany(db.topic, {foreignKey: 'uid', sourceKey: 'uid'});
db.topic.belongsTo(db.user, {foreignKey: 'uid', targetKey: 'uid'});

//pdffiles |-------|| topics
//db.pdf_file.hasMany(db.topic, {foreignKey: 'pdfid', sourceKey: 'pdfid'});
//db.topic.belongsTo(db.pdf_file, {foreignKey: 'pdfid', targetKey: 'pdfid'});

//topic |-------|| phrases
db.topic.hasMany(db.phrase, {foreignKey: 'tid', sourceKey: 'tid'});
db.phrase.belongsTo(db.topic, {foreignKey: 'tid', targetKey: 'tid'});

//projects |-------||  pdffiles
//db.project.hasMany(db.pdf_file, {foreignKey: 'pid', sourceKey: 'pid'})
//db.pdf_file.belongsTo(db.project, {foreignKey: 'pid', targetKey: 'pid'})

//pdffiles |-------|| pdftexts 
db.pdf_file.hasMany(db.pdf_text, {foreignKey: 'pdfid', sourceKey: 'pdfid'})
db.pdf_text.belongsTo(db.pdf_file, {foreignKey: 'pdfid', targetKey: 'pdfid'})

//phrases |-------|| pdftexts 
db.pdf_text.hasMany(db.phrase, {foreignKey: 'pdftextid', sourceKey: 'pdftextid'})
db.phrase.belongsTo(db.pdf_text, {foreignKey: 'pdftextid', targetKey: 'pdftextid'})

//users |-------|| pdffiles
//db.user.hasMany(db.pdf_file, {foreignKey: 'uid', sourceKey: 'uid'})
//db.pdf_file.belongsTo(db.user, {foreignKey: 'uid', targetKey: 'uid'})

//users |-------|| keywordgroups
db.user.hasMany(db.keyword_group, {foreignKey: 'uid', sourceKey: 'uid'})
db.keyword_group.belongsTo(db.user, {foreignKey: 'uid', targetKey: 'uid'})

//users |-------|| keywords
db.user.hasMany(db.keyword, {foreignKey: 'uid', sourceKey: 'uid'});
db.keyword.belongsTo(db.user, {foreignKey: 'uid', targetKey: 'uid'})

//keywords |-------|| pharses
db.keyword.hasMany(db.phrase, {foreignKey: 'kid', sourceKey: 'kid'});
db.phrase.belongsTo(db.keyword, {foreignKey: 'kid', targetKey: 'kid'})

//keywordgroups |-------|| keywords
db.keyword_group.hasMany(db.keyword, {foreignKey: 'keywordgroupsid', sourceKey: 'keywordgroupsid'});
db.keyword.belongsTo(db.keyword_group, {foreignKey: 'keywordgroupsid', targetKey: 'keywordgroupsid'})


module.exports = db;