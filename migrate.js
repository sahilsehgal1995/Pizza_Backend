var fs = require('fs');
var mysql = require('mysql');
var path = require('path');
var basename = path.basename(module.filename);
var folder = ['create', 'alter', 'drop', 'stored', 'trigger'];
let bluebird = require('bluebird')
var parseArgs = require('minimist')(process.argv.slice(2))

let {
	env
} = parseArgs
if (!env) {
	console.log('Environment not Provided running in DEVELOPMENT mode')
	env = 'development'
}

let rootPath = (function () {
	return path.join(__dirname + '/models/sql/')
})()

console.log(' Running Migration in ' + env.toUpperCase() + ' environment.')

let allConfig = require(path.join(rootPath + 'sequalizeConfig.json'))
let config = allConfig[env];
config.user = config.username;

function runSQLQuery(folder, fileName) {
	return new Promise(function (resolve, reject) {
		fs.readFile(rootPath + folder + '/' + fileName, 'utf-8', function (err, sqlQuery) {
			if (sqlQuery) {
				let conn;
				config.user = config.username;
				config.multipleStatements = true;
				conn = mysql.createConnection(config);
				conn.connect();
				let query = conn.query(sqlQuery);
				query
					.on('error', err => {
						console.log(fileName, err)
						return reject(err);
					})
					.on('fields', function (fields, index) {
						console.log(fields, index)
					})
					.on('result', function (row, index) {})
					.on('end', res => {
						console.log('Done');
						conn.end();
						return resolve(res);
					})
			}
		});
	})
}

let promises = [];

folder.forEach((temp) => {
	fs.readdirSync(rootPath + temp)
		.filter(function (file) {
			return (file.indexOf('.') !== 0) && (file !== basename) && (path.extname(file) === '.sql');
		})
		.forEach(function (file) {
			if (temp !== 'drop' || env === 'production') {
				promises.push({
					"temp": temp,
					"file": file
				});
			}
		});
})

bluebird.map(promises, (obj) => {
		return runSQLQuery(obj.temp, obj.file);
	}, {
		concurrency: 1
	})
	.catch((err) => {
		console.log("SQLFailed");
		process.exit(1);
	})