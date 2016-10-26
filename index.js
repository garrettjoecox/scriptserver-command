'use strict';

const _ = require('lodash');

module.exports = function() {
  const server = this;
  const commands = {};

  const config = server.config.command = _.defaultsDeep({}, server.config.command, {
    prefix: '~'
  });

  const regex = new RegExp(`^${config.prefix}([\\w]+)\\s?(.*)`, 'i');

  server.use(require('scriptserver-event'));

  server.command = function(cmd, callback) {
    cmd = cmd.toLowerCase();
    commands[cmd] = commands[cmd] || [];
    commands[cmd].push(callback);
  }

  server.on('chat', event => {
    const stripped = event.message.match(regex);
    if (stripped) {
      const command = stripped[1].toLowerCase();
      server.emit('command', {
        player: event.player,
        command: command,
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