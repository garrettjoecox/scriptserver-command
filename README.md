scriptserver-command
====================

[![](http://i.imgur.com/zhptNme.png)](https://github.com/garrettjoecox/scriptserver)

FYI: This package is an addon for ScriptServer and requires ScriptServer to be set up, please see [here](https://github.com/garrettjoecox/scriptserver) for more information.

## Installation
While in root directory of your server run:
```
npm install scriptserver-command
```
And in your `server` file:
```javascript
server.use(require('scriptserver-command'));
```

## Usage
This module provides the following interface for adding custom server commands to be used in the ingame chat. The provided callback will be invoked when a player types the specified command into chat prefixed with the `~` key. (ie: `~spawn`) The prefix key soon will be configurable but for now it's hardcoded to `~`.

```javascript
// Registers the command ~spawn to the following function
server.command('spawn', event => {

  // Person who sent command
  var commandSender = event.player;

  // Command used (in this case, spawn)
  var command = event.command;

  // Array of arguments passed after command (in this case useless)
  var arguments = event.args;

  // Timestamp of when the command was sent
  var timestamp = event.timestamp;

  var spawnLocation = { x: 0, y: 70, z: 0 };

  server.send(`tp ${commandSender} ${spawnLocation.x} ${spawnLocation.y} ${spawnLocation.z}`);
});
```

## This ScriptServer module uses:
  - [scriptserver-event](https://github.com/garrettjoecox/scriptserver-event)
