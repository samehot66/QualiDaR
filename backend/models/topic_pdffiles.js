module.exports = (sequelize, Sequelize) => {
	const topic_pdffiles = sequelize.define('topic_pdffiles', {
		  tid: {
			type: Sequelize.INTEGER,
			allowNull: false
		  }
	});
	
	return topic_pdffiles;
}