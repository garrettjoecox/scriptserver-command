scriptserver-command
====================

FYI: This package is an addon for ScriptServer and requires ScriptServer to be set up, please see [here](https://github.com/garrettjoecox/scriptserver) for more information.

## Installation
While in root directory of your server run:
```
npm install scriptserver-command
```
And in your `server` file:
```javascript
server.use('scriptserver-command');
```

## Usage
This module provides the following interface for adding custom server commands to be used in the ingame chat.

```javascript
// Registers the command ~spawn to the following function
server.command('spawn', opts => {

  // Person who sent command
  var commandSender = opts.sender;

  // Command used (in this case, spawn)
  var command = opts.command;

  // Array of arguments passed after command (in this case useless)
  var arguments = opts.args;

  // Timestamp of when the command was sent
  var timestamp = opts.timestamp;

  var spawnLocation = { x: 0, y: 70, z: 0 };

  server.send(`tp ${commandSender} ${spawnLocation.x} ${spawnLocation.y} ${spawnLocation.z}`);
});
```
