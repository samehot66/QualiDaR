module.exports = (sequelize, Sequelize) => {
	const Project_role = sequelize.define('project_roles', {
	  id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
	  },
	  role: {
		  type: Sequelize.ENUM('owner', 'guest')
      }
	});
	
	return Project_role;
}