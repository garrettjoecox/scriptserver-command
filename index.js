
var ScriptServer = require('scriptserver');

module.exports = function(self) {
    
    self.commands = {};
    
    self.parseLoop.parseCommand = {
        regexp: /<([\S]+)>\s~([\S]+)\s?(.*)/,
        id: 'parseCommand',
        method: function(stripped) {
            if (stripped && self.commands[stripped[2]]) {
                self.commands[stripped[2]]({
                    sender: stripped[1],
                    command: stripped[2],
                    args: stripped[3],
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