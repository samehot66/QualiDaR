module.exports = (sequelize, Sequelize) => {
	const Project_role = sequelize.define('project_roles', {
	  role: {
		  type: Sequelize.ENUM('owner', 'guest'),
		  allowNull: false
      }
	});
	
	return Project_role;
}