let Message = require('./Message');
let getEnvironment = require('./env');

let newMessage = new Message();
newMessage.initialize();

global.message = newMessage;
global.environment = getEnvironment();