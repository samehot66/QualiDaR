module.exports = (sequelize, Sequelize) => {
	const keywordgroup_topics = sequelize.define('keywordgroup_topics', {
		  keywordgroupsid: {
			type: Sequelize.INTEGER,
			allowNull: false
		  },
		  tid: {
			type: Sequelize.INTEGER,
			allowNull: false
		  }
	});
	
	return keywordgroup_topics;
}