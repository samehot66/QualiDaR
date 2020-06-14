module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
    uid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
	  googleId: {
		  type: Sequelize.STRING,
		  allowNull: false
	  },
	  email: {
		  type: Sequelize.STRING,
		  allowNull: false
	  },
	  access_token: {
		  type: Sequelize.STRING,
		  allowNull: false
	  }
	});
	
	return User;
}