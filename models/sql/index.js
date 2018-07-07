let path = require('path');

let fs = require('fs');
let Sequelize = require('sequelize');
let basename = path.basename(__filename);
let env = process.env.NODE_ENV || 'development';
let config = require(__dirname + '/sequalizeConfig.json')[env];
let db = {};

if (config.use_env_variable) {
	var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
	var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
	.filter(function (file) {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(function (file) {
		var model = sequelize['import'](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function (modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

process.on('SIGINT', function () {
	console.log('Killing Sequalize Connection')
	sequelize.close()
	console.log('killed Sequelize Connection')
})
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;