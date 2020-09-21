
module.exports = (sequelize, Sequelize) => {
	const Project = sequelize.define('projects', {
	  pid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
	  },
	  pname: {
      type: Sequelize.STRING,
      allowNull: false
      },
      description: {
          type: Sequelize.STRING
      }
	});
	
	return Project;
}