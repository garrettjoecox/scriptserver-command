'use strict';

module.exports = function() {
  const server = this;
  const commands = {};

  server.use(require('scriptserver-event'));

  server.command = function(cmd, callback) {
    commands[cmd] = commands[cmd] || [];
    commands[cmd].push(callback);
  }

  server.on('chat', event => {
    const stripped = event.message.match(/^~([\w]+)\s?(.*)/);
    if (stripped && commands.hasOwnProperty(stripped[1])) {
      server.emit('command', {
        player: event.player,
        command: stripped[1],
        args: stripped[2].split(' '),
        timestamp: Date.now()
      });
    }
  });

  server.on('command', event => {
    if (commands.hasOwnProperty(event.command)) {
      commands[event.command].forEach(callback => callback(event));
    }
  });
}