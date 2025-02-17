module.exports = (sequelize, Sequelize) => {
	const Keywordgroup = sequelize.define('keywordgroups', {
    keywordgroupsid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
	},
	shared: {
		type: Sequelize.BOOLEAN,
        allowNull: false
    },
    groupname:{
        type: Sequelize.STRING,
        allowNull: false
    }
	});
	
	return Keywordgroup;
}