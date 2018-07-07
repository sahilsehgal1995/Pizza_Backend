let fs = require('fs');

class Message {
	constructor() {
		this.message = {};
	}

	initialize() {
		let message = JSON.parse(fs.readFileSync(__dirname + '/defaultMessage.json', 'utf-8'));
		this.message = message;
	}

	generateMessage(statusCode, message = "", objects) {
		let {
			initialize
		} = this.message;
		if (!initialize) return console.log('Run initialize before calling this function');
		let _message = {}
		let _arguments = Array.prototype.slice.call(arguments);
		if (!_arguments.length)
			return _message;
		_message["status"] = _arguments[0];
		this.message.messages.map(Message => {
			if (Message.status === statusCode) {
				_message["message"] = (message === "") ? Message.message : message;
				_message[Message.key] = true;
			}
			return true;
		})
		if (objects && typeof objects === "object")
			Object.keys(objects).forEach(key => _message[key] = objects[key]);
		return _message;
	}
	availableStatusCodes() {
		return this.message.messages.map(Message => Message.status.toString())
	}
	generateErrorMessage(err) {
		let _error = {};
		if (!(err instanceof Error) && typeof err === "object") _error = err;
		if (typeof err === "object" && err instanceof Error) {
			let statusCodesArray = this.availableStatusCodes();
			if (statusCodesArray.indexOf(err.message) > -1) {
				_error = this.message.messages[statusCodesArray.indexOf(err.message)];
			} else if (err.errors && err.errors.length > 0 && err.errors[0].message) {
				_error.message = err.errors[0].message;
			} else {
				_error.message = err.message;
			}
			_error.status = _error.status ? _error.status : 422;
			if (!(_error && _error.error && _error.error.message))
				_error.error = {
					message: _error.message
				}
			_error.stack = err.stack;
			//if (getEnvironment() === "production") delete _error.stack;
		}
		delete _error.key;
		return _error;
	}
	methodNotAllowed(req, res, next) {
		res.status(405);
		next(new Error(405))
	}
}
Message.initialize = () => {
	if (this instanceof Message)
		return this.initialize();
	let _message = new Message();
	_message.initialize();
}

module.exports = Message;