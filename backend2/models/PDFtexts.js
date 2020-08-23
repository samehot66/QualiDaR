module.exports = (sequelize, Sequelize) => {
	const pdf_text = sequelize.define('pdf_texts', {
	  pdftextid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
	  },
	  page_number: {
		  type: Sequelize.INTEGER,
          allowNull: false
    },
    text: {
      type: Sequelize.STRING(5000)
    }
	});
	
	return pdf_text;
}