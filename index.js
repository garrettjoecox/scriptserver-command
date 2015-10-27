
var ScriptServer = require('scriptserver');

module.exports = function(server) {
    
    server.commands = server.commands || {};
    
    server.parseLoop.parseCommand = {
        regexp: /<([\S]+)>\s~([\S]+)\s?(.*)/,
        id: 'parseCommand',
        method: function(stripped) {
            if (stripped && server.commands[stripped[2]]) {
                server.commands[stripped[2]]({
                    sender: stripped[1],
                    command: stripped[2],
                    args: stripped[3].split(' '),
                    timestamp: Date.now()
                });
            }
        }
    };
};

ScriptServer.prototype.command = function(name, callback) {
    var self = this;

    self.commands[name] = callback;
    return self;
};