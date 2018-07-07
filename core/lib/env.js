let getEnvironment = () => {
	let environment;
	environment = process.env.NODE_ENV;
	if (!process.env.NODE_ENV) environment = 'development';
	return environment;
}

module.exports = getEnvironment;