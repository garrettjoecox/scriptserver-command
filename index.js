
const defaultsDeep = require('lodash.defaultsdeep');

module.exports = function () {
  const server = this;
  const commands = {};

  const config = server.config.command = defaultsDeep({}, server.config.command, {
    prefix: '~',
  });

  const regex = new RegExp(`^${config.prefix}([\\w]+)\\s?(.*)`, 'i');

  server
    .use(require('scriptserver-util'))
    .use(require('scriptserver-event'));

  server.command = (cmd, callback) => {
    cmd = cmd.toLowerCase();
    commands[cmd] = commands[cmd] || [];
    commands[cmd].push(callback);
  };

  server.on('chat', (event) => {
    const stripped = event.message.match(regex);
    if (stripped) {
      const command = stripped[1].toLowerCase();
      server.emit('command', {
        player: event.player,
        command,
        args: stripped[2].split(' '),
        timestamp: Date.now(),
      });
    }
  });

  server.on('command', (event) => {
    if (commands.hasOwnProperty(event.command)) {
      commands[event.command].forEach((callback) => {
        Promise.resolve()
          .then(() => callback(event))
          .catch(e => server.util.tellRaw(e.message, event.player, { color: 'red' }));
      });
    }
  });
};
