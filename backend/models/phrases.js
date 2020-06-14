module.exports = (sequelize, Sequelize) => {
	const Phrase = sequelize.define('phrases', {
	  pharseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
	  },
	  position: {
		  type: Sequelize.JSON
      },
      text: {
        type: Sequelize.TEXT
      }
	});
	
	return Phrase;
}