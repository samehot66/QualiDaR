module.exports = (sequelize, Sequelize) => {
	const project_pdffile = sequelize.define('project_pdffiles', {
		  pdfid: {
			type: Sequelize.INTEGER,
			allowNull: false
		  },
		  pid: {
			type: Sequelize.INTEGER,
			allowNull: false
		  },
		  uid: {
			type: Sequelize.INTEGER,
			allowNull: false,
		  }
	});
	
	return project_pdffile;
}