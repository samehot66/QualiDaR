module.exports = (sequelize, Sequelize) => {
	const Phrase = sequelize.define('phrases', {
	  phraseid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
	  },
	  kindex: {
		  type: Sequelize.JSON
    },
    text: {
      type: Sequelize.TEXT
    },
    status: {
      type: Sequelize.ENUM("seen", "unseen"),
      defaultValue: "unseen"
    }
	});
	
	return Phrase;
}