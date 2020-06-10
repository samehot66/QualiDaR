module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
    uid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
	  googleId: {
		  type: Sequelize.STRING
	  },
	  email: {
		  type: Sequelize.STRING
	  },
	  access_token: {
		  type: Sequelize.STRING
	  }
	});
	
	return User;
}