module.exports = (sequelize, Sequelize) => {
	const Keyword = sequelize.define('keywords', {
	  kid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
	  },
	  keywordtext: {
		  type: Sequelize.STRING,
          allowNull: false
    }
	});
	
	return Keyword;
}