oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g prjfinder
$ prjfinder COMMAND
running command...
$ prjfinder (--version)
prjfinder/0.0.1 linux-x64 node-v18.7.0
$ prjfinder --help [COMMAND]
USAGE
  $ prjfinder COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`prjfinder hello PERSON`](#prjfinder-hello-person)
* [`prjfinder hello world`](#prjfinder-hello-world)
* [`prjfinder help [COMMAND]`](#prjfinder-help-command)
* [`prjfinder plugins`](#prjfinder-plugins)
* [`prjfinder plugins:install PLUGIN...`](#prjfinder-pluginsinstall-plugin)
* [`prjfinder plugins:inspect PLUGIN...`](#prjfinder-pluginsinspect-plugin)
* [`prjfinder plugins:install PLUGIN...`](#prjfinder-pluginsinstall-plugin-1)
* [`prjfinder plugins:link PLUGIN`](#prjfinder-pluginslink-plugin)
* [`prjfinder plugins:uninstall PLUGIN...`](#prjfinder-pluginsuninstall-plugin)
* [`prjfinder plugins:uninstall PLUGIN...`](#prjfinder-pluginsuninstall-plugin-1)
* [`prjfinder plugins:uninstall PLUGIN...`](#prjfinder-pluginsuninstall-plugin-2)
* [`prjfinder plugins update`](#prjfinder-plugins-update)

## `prjfinder hello PERSON`

Say hello

```
USAGE
  $ prjfinder hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/Ellomend/prjfinder/blob/v0.0.1/dist/commands/hello/index.ts)_

## `prjfinder hello world`

Say hello world

```
USAGE
  $ prjfinder hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ prjfinder hello world
  hello world! (./src/commands/hello/world.ts)
```

## `prjfinder help [COMMAND]`

Display help for prjfinder.

```
USAGE
  $ prjfinder help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for prjfinder.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.14/src/commands/help.ts)_

## `prjfinder plugins`

List installed plugins.

```
USAGE
  $ prjfinder plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ prjfinder plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.1/src/commands/plugins/index.ts)_

## `prjfinder plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ prjfinder plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ prjfinder plugins add

EXAMPLES
  $ prjfinder plugins:install myplugin 

  $ prjfinder plugins:install https://github.com/someuser/someplugin

  $ prjfinder plugins:install someuser/someplugin
```

## `prjfinder plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ prjfinder plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ prjfinder plugins:inspect myplugin
```

## `prjfinder plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ prjfinder plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ prjfinder plugins add

EXAMPLES
  $ prjfinder plugins:install myplugin 

  $ prjfinder plugins:install https://github.com/someuser/someplugin

  $ prjfinder plugins:install someuser/someplugin
```

## `prjfinder plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ prjfinder plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ prjfinder plugins:link myplugin
```

## `prjfinder plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ prjfinder plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ prjfinder plugins unlink
  $ prjfinder plugins remove
```

## `prjfinder plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ prjfinder plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ prjfinder plugins unlink
  $ prjfinder plugins remove
```

## `prjfinder plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ prjfinder plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ prjfinder plugins unlink
  $ prjfinder plugins remove
```

## `prjfinder plugins update`

Update installed plugins.

```
USAGE
  $ prjfinder plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
