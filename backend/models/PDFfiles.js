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
    },
    done: {
      type: Sequelize.BOOLEAN
    },
    numpages: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    }
	});
	
	return pdffile;
}