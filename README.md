projectsfinder (WIP PoC)
=================

Find your js projects. Youll be surprised.

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
$ npm install -g projectsfinder
$ projectsfinder COMMAND
running command...
$ projectsfinder (--version)
projectsfinder/0.0.0 linux-x64 node-v18.7.0
$ projectsfinder --help [COMMAND]
USAGE
  $ projectsfinder COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`projectsfinder find [PATH]`](#projectsfinder-find-path)
* [`projectsfinder help [COMMAND]`](#projectsfinder-help-command)
## `projectsfinder find [PATH]`

Recursively find folders containing a package.json file

```
USAGE
  $ projectsfinder find [PATH] [-h] [-d <value>]

ARGUMENTS
  PATH  path to search

FLAGS
  -d, --depth=<value>  depth of the search
  -h, --help           Show CLI help.

DESCRIPTION
  Recursively find folders containing a package.json file

EXAMPLES
  $ projectsfinder find
```



## `projectsfinder help [COMMAND]`

Display help for projectsfinder.

```
USAGE
  $ projectsfinder help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for projectsfinder.
```


