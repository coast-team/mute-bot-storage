# Mute-bot-storage

Very simple bot storage NodeJS server written in Typescript to use with [MUTE](https://github.com/coast-team/mute). It may be invited into MUTE collaboration session, like any other collaborator, but it never modifies the document content or title. Its role is to store the document into MongoDB.

## Features

- Can participate in several MUTE sessions independently
- Has REST API to get bot name and the list of all documents in database

## Usage

```shell
Usage: node server [options]

  Options:

    -h, --help                                               output usage information
    -n, --name <bot name>                                    Specify a name for the bot, DEFAULT: "Repono"
    -h, --host <ip or host name>                             Specify host address to bind to, DEFAULT: "0.0.0.0"
    -p, --port <n>                                           Specify port to use for the server (REST API), DEFAULT: 8080
    -b, --portBot <n>                                        Specify port to use for the peer to peer bot, DEFAULT: 9000
    -s, --signalingURL <url>                                 Specify Signaling server url for the peer to peer bot, DEFAULT: http://signal2.loria.fr

    -t, --https                                              If present, the REST API server is listening on HTTPS instead of HTTP
    -l, --logLevel <none|trace|debug|info|warn|error|fatal>  Specify level for logging. DEFAULT: "info".
    -f, --logFile                                            If specified, writes logs into file
```
