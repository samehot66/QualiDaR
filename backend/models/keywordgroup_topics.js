module.exports = (sequelize, Sequelize) => {
	const keywordgroup_topics = sequelize.define('project_pdffiles', {
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