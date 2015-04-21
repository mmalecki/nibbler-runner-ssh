var assert = require('assert')
var child_process = require('child_process')
var shellQuote = require('shell-quote')

module.exports = function(context) {
  var target = context.args.ssh || context.env.SSH
  assert(target || typeof target !== 'string', '--ssh [<user>]@<host> is required')

  function exec(cmd, options, cb) {
    assert(!'implement me!')
  }

  function spawn(cmd, args, options) {
    if (args && !Array.isArray(args) && !options) {
      options = args
      args = []
    }

    if (!args) args = []

    var sshArgs = []

    if (!context.args.strictHostKeyChecking && !context.env.STRICT_HOST_KEY_CHECKING)
      sshArgs.push('-o', 'StrictHostKeyChecking=no')

    sshArgs.push(target, shellQuote.quote([cmd].concat(args)))

    var ssh = child_process.spawn('ssh', sshArgs, options)
    return ssh
  }

  return {
    exec: exec,
    spawn: spawn,
  }
}
