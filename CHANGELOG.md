# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.3.0"></a>
# [2.3.0](https://github.com/coast-team/mute-bot-storage/compare/v2.1.1...v2.3.0) (2018-12-10)


### Bug Fixes

* **botstorage:** fix bug when serializing dependencies as Map ([2093956](https://github.com/coast-team/mute-bot-storage/commit/2093956))
* **crypto:** fix bug with metadata crypto on the first document opened ([38a1b7e](https://github.com/coast-team/mute-bot-storage/commit/38a1b7e))


### Features

* **botstorage:** update BotStorage with the new MuteCore architecture ([ae8f6d7](https://github.com/coast-team/mute-bot-storage/commit/ae8f6d7))
* **log:** add cryptography type in the log when successfully started ([6404de7](https://github.com/coast-team/mute-bot-storage/commit/6404de7))
* **mutecore:** update bot for the next version of mutecore with logs ([e3827c7](https://github.com/coast-team/mute-bot-storage/commit/e3827c7))



<a name="2.2.1"></a>
## [2.2.1](https://github.com/coast-team/mute-bot-storage/compare/v2.2.0...v2.2.1) (2018-10-08)


### Bug Fixes

* **crypto:** fix bug with metadata crypto on the first document opened ([38a1b7e](https://github.com/coast-team/mute-bot-storage/commit/38a1b7e))



<a name="2.2.0"></a>

# [2.2.0](https://github.com/coast-team/mute-bot-storage/compare/v2.1.1...v2.2.0) (2018-10-08)

### Features

- **log:** add cryptography type in the log when successfully started ([6404de7](https://github.com/coast-team/mute-bot-storage/commit/6404de7))
- **mutecore:** update bot for the next version of mutecore with logs ([e3827c7](https://github.com/coast-team/mute-bot-storage/commit/e3827c7))

<a name="2.1.1"></a>

## [2.1.1](https://github.com/coast-team/mute-bot-storage/compare/v2.1.0...v2.1.1) (2018-09-07)

### Bug Fixes

- **cryptography:** set keyagreement as default crypto type ([4a5f20b](https://github.com/coast-team/mute-bot-storage/commit/4a5f20b))

<a name="2.1.0"></a>

# [2.1.0](https://github.com/coast-team/mute-bot-storage/compare/v2.0.2...v2.1.0) (2018-09-07)

### Features

- **crypto:** add keyagreement option for cryptography ([90a97c7](https://github.com/coast-team/mute-bot-storage/commit/90a97c7))
- **crypto:** add metadata option for cryptography ([4e5aea4](https://github.com/coast-team/mute-bot-storage/commit/4e5aea4))

<a name="2.0.2"></a>

## [2.0.2](https://github.com/coast-team/mute-bot-storage/compare/v2.0.1...v2.0.2) (2018-07-17)

### Bug Fixes

- **mongoose:** remove depricated call of connect() function ([b5e3e6d](https://github.com/coast-team/mute-bot-storage/commit/b5e3e6d))

<a name="2.0.1"></a>

## [2.0.1](https://github.com/coast-team/mute-bot-storage/compare/v2.0.0...v2.0.1) (2018-07-17)

### Bug Fixes

- **logins:** do not add same login twice to the doc metadata ([be788d0](https://github.com/coast-team/mute-bot-storage/commit/be788d0))

<a name="2.0.0"></a>

# [2.0.0](https://github.com/coast-team/mute-bot-storage/compare/v1.2.2...v2.0.0) (2018-07-13)

### Code Refactoring

- update mute-core to v6.0.0, change REST API ([66589e3](https://github.com/coast-team/mute-bot-storage/commit/66589e3))

### BREAKING CHANGES

- HTTP request ".../name" becomes ".../info"

<a name="1.2.2"></a>

## [1.2.2](https://github.com/coast-team/mute-bot-storage/compare/v1.2.1...v1.2.2) (2018-06-18)

### Bug Fixes

- **mongo:** resolve remained unhandled prosise rejection ([1aa39fd](https://github.com/coast-team/mute-bot-storage/commit/1aa39fd))
- **mongo:** unhandled promise rejection on save and login update ([fdc75d9](https://github.com/coast-team/mute-bot-storage/commit/fdc75d9))
- **netflux:** update netflux to v4.1.2 which solves an issue ([ba93298](https://github.com/coast-team/mute-bot-storage/commit/ba93298))

<a name="1.2.1"></a>

## [1.2.1](https://github.com/coast-team/mute-bot-storage/compare/v1.2.0...v1.2.1) (2018-06-15)

### Bug Fixes

- update to latest Netflux ([5683c8e](https://github.com/coast-team/mute-bot-storage/commit/5683c8e))

<a name="1.2.0"></a>

# [1.2.0](https://github.com/coast-team/mute-bot-storage/compare/v1.1.2...v1.2.0) (2018-06-13)

### Bug Fixes

- save document when all members left ([98aa468](https://github.com/coast-team/mute-bot-storage/commit/98aa468))

### Features

- **login:** add version number into login ([3b8c12d](https://github.com/coast-team/mute-bot-storage/commit/3b8c12d))

<a name="1.1.2"></a>

## <small>1.1.2 (2018-06-01)</small>

- chore(changelog): disable markdown linter for CHANGELOG.md ([3057c81](https://github.com/coast-team/mute-bot-storage/commit/3057c81))
- chore(package): update dependencies ([42da099](https://github.com/coast-team/mute-bot-storage/commit/42da099))
- fix(avatar): add bot avatar ([741bc60](https://github.com/coast-team/mute-bot-storage/commit/741bc60))

<a name="1.1.1"></a>

## <small>1.1.1 (2018-05-28)</small>

- chore: replace semantic-release by standard-version ([96b7fde](https://github.com/coast-team/mute-bot-storage/commit/96b7fde))
- chore: update dependencies ([7e211c5](https://github.com/coast-team/mute-bot-storage/commit/7e211c5))
- chore(markdown): add markdown linter ([5651c95](https://github.com/coast-team/mute-bot-storage/commit/5651c95))
- chore(prettier): update to v1.13.0 ([5ad7c99](https://github.com/coast-team/mute-bot-storage/commit/5ad7c99))
