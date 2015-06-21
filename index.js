var assert = require('assert')
var child_process = require('child_process')
var sshSpawner = require('ssh-spawner')

module.exports = function(context) {
  var target = context.args.ssh || context.env.SSH
  assert(target || typeof target !== 'string', '--ssh [<user>]@<host> is required')

  // ssh-spawner accepts seperate `user` and `server`, but just passing
  // --ssh <something-you-usually-pass-to-ssh> is cognitively easier.
  var targetSplit = target.split('@')
  var user, server

  if (targetSplit.length === 2) {
    user = targetSplit[0]
    server = targetSplit[1]
  }
  else server = targetSplit[0]

  function exec(cmd, options, cb) {
    assert(!'implement me!')
  }

  return {
    exec: exec,
    spawn: sshSpawner.createSpawner({
      user: user,
      server: server
    })
  }
}
