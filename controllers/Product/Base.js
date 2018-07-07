const get => ((req, res, next) => {
	return Promise.resolve().then(() => {
		return [{"base":asd}];
	});
});


const Base = {
	get
}

module.exports = Base;