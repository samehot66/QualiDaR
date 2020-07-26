module.exports = (sequelize, Sequelize) => {
	const pdffile = sequelize.define('pdffiles', {
	  pdfid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
	  },
	  pdfname: {
		  type: Sequelize.STRING,
          allowNull: false
    },
    uri: {
      type: Sequelize.STRING,
      allowNull: false
    },
    size: {
      type: Sequelize.FLOAT
    }
	});
	
	return pdffile;
}