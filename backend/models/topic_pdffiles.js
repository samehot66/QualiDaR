module.exports = (sequelize, Sequelize) => {
	const topic_pdffiles = sequelize.define('topic_pdffiles', {
		  pdfid: {
			type: Sequelize.INTEGER,
			allowNull: false
		  },
		  tid: {
			type: Sequelize.INTEGER,
			allowNull: false
		  }
	});
	
	return topic_pdffiles;
}