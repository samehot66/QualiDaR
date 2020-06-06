
module.exports = (sequelize, Sequelize) => {
	const Project = sequelize.define('projects', {
	  id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
	  },
	  name: {
		  type: Sequelize.STRING
      },
      num_subhead: {
          type: Sequelize.INTEGER
      },
      num_text_component: {
          type: Sequelize.INTEGER
      },
      description: {
          type: Sequelize.STRING
      }
	});
	
	return Project;
}