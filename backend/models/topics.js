module.exports = (sequelize, Sequelize) => {
	const Topic = sequelize.define('topics', {
	  tid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
	  },
	  tname: {
          type: Sequelize.STRING,
          allowNull: false
      },
    done: {
      type: Sequelize.BOOLEAN
    }
	});
	
	return Topic;
}