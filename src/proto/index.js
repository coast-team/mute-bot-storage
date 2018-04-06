"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.Keys = exports.BotResponse = exports.BotProtocol = exports.Message = undefined;

var _minimal = require("protobufjs/minimal");

var $protobuf = _interopRequireWildcard(_minimal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Common aliases
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;

// Exported root namespace
/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

var Message = exports.Message = $root.Message = function () {

    /**
     * Properties of a Message.
     * @exports IMessage
     * @interface IMessage
     * @property {string|null} [service] Message service
     * @property {Uint8Array|null} [content] Message content
     */

    /**
     * Constructs a new Message.
     * @exports Message
     * @classdesc Represents a Message.
     * @implements IMessage
     * @constructor
     * @param {IMessage=} [properties] Properties to set
     */
    function Message(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * Message service.
     * @member {string} service
     * @memberof Message
     * @instance
     */
    Message.prototype.service = "";

    /**
     * Message content.
     * @member {Uint8Array} content
     * @memberof Message
     * @instance
     */
    Message.prototype.content = $util.newBuffer([]);

    /**
     * Creates a new Message instance using the specified properties.
     * @function create
     * @memberof Message
     * @static
     * @param {IMessage=} [properties] Properties to set
     * @returns {Message} Message instance
     */
    Message.create = function create(properties) {
        return new Message(properties);
    };

    /**
     * Encodes the specified Message message. Does not implicitly {@link Message.verify|verify} messages.
     * @function encode
     * @memberof Message
     * @static
     * @param {IMessage} message Message message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Message.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.service != null && message.hasOwnProperty("service")) writer.uint32( /* id 1, wireType 2 =*/10).string(message.service);
        if (message.content != null && message.hasOwnProperty("content")) writer.uint32( /* id 2, wireType 2 =*/18).bytes(message.content);
        return writer;
    };

    /**
     * Decodes a Message message from the specified reader or buffer.
     * @function decode
     * @memberof Message
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Message} Message
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Message.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.Message();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.service = reader.string();
                    break;
                case 2:
                    message.content = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    return Message;
}();

var BotProtocol = exports.BotProtocol = $root.BotProtocol = function () {

    /**
     * Properties of a BotProtocol.
     * @exports IBotProtocol
     * @interface IBotProtocol
     * @property {string|null} [key] BotProtocol key
     */

    /**
     * Constructs a new BotProtocol.
     * @exports BotProtocol
     * @classdesc Represents a BotProtocol.
     * @implements IBotProtocol
     * @constructor
     * @param {IBotProtocol=} [properties] Properties to set
     */
    function BotProtocol(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * BotProtocol key.
     * @member {string} key
     * @memberof BotProtocol
     * @instance
     */
    BotProtocol.prototype.key = "";

    /**
     * Creates a new BotProtocol instance using the specified properties.
     * @function create
     * @memberof BotProtocol
     * @static
     * @param {IBotProtocol=} [properties] Properties to set
     * @returns {BotProtocol} BotProtocol instance
     */
    BotProtocol.create = function create(properties) {
        return new BotProtocol(properties);
    };

    /**
     * Encodes the specified BotProtocol message. Does not implicitly {@link BotProtocol.verify|verify} messages.
     * @function encode
     * @memberof BotProtocol
     * @static
     * @param {IBotProtocol} message BotProtocol message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BotProtocol.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.key != null && message.hasOwnProperty("key")) writer.uint32( /* id 1, wireType 2 =*/10).string(message.key);
        return writer;
    };

    /**
     * Decodes a BotProtocol message from the specified reader or buffer.
     * @function decode
     * @memberof BotProtocol
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {BotProtocol} BotProtocol
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BotProtocol.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.BotProtocol();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    return BotProtocol;
}();

var BotResponse = exports.BotResponse = $root.BotResponse = function () {

    /**
     * Properties of a BotResponse.
     * @exports IBotResponse
     * @interface IBotResponse
     * @property {string|null} [url] BotResponse url
     */

    /**
     * Constructs a new BotResponse.
     * @exports BotResponse
     * @classdesc Represents a BotResponse.
     * @implements IBotResponse
     * @constructor
     * @param {IBotResponse=} [properties] Properties to set
     */
    function BotResponse(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * BotResponse url.
     * @member {string} url
     * @memberof BotResponse
     * @instance
     */
    BotResponse.prototype.url = "";

    /**
     * Creates a new BotResponse instance using the specified properties.
     * @function create
     * @memberof BotResponse
     * @static
     * @param {IBotResponse=} [properties] Properties to set
     * @returns {BotResponse} BotResponse instance
     */
    BotResponse.create = function create(properties) {
        return new BotResponse(properties);
    };

    /**
     * Encodes the specified BotResponse message. Does not implicitly {@link BotResponse.verify|verify} messages.
     * @function encode
     * @memberof BotResponse
     * @static
     * @param {IBotResponse} message BotResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BotResponse.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.url != null && message.hasOwnProperty("url")) writer.uint32( /* id 1, wireType 2 =*/10).string(message.url);
        return writer;
    };

    /**
     * Decodes a BotResponse message from the specified reader or buffer.
     * @function decode
     * @memberof BotResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {BotResponse} BotResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BotResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.BotResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.url = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    return BotResponse;
}();

var Keys = exports.Keys = $root.Keys = function () {

    /**
     * Properties of a Keys.
     * @exports IKeys
     * @interface IKeys
     * @property {Array.<string>|null} [keys] Keys keys
     */

    /**
     * Constructs a new Keys.
     * @exports Keys
     * @classdesc Represents a Keys.
     * @implements IKeys
     * @constructor
     * @param {IKeys=} [properties] Properties to set
     */
    function Keys(properties) {
        this.keys = [];
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * Keys keys.
     * @member {Array.<string>} keys
     * @memberof Keys
     * @instance
     */
    Keys.prototype.keys = $util.emptyArray;

    /**
     * Creates a new Keys instance using the specified properties.
     * @function create
     * @memberof Keys
     * @static
     * @param {IKeys=} [properties] Properties to set
     * @returns {Keys} Keys instance
     */
    Keys.create = function create(properties) {
        return new Keys(properties);
    };

    /**
     * Encodes the specified Keys message. Does not implicitly {@link Keys.verify|verify} messages.
     * @function encode
     * @memberof Keys
     * @static
     * @param {IKeys} message Keys message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Keys.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.keys != null && message.keys.length) for (var i = 0; i < message.keys.length; ++i) {
            writer.uint32( /* id 1, wireType 2 =*/10).string(message.keys[i]);
        }return writer;
    };

    /**
     * Decodes a Keys message from the specified reader or buffer.
     * @function decode
     * @memberof Keys
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Keys} Keys
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Keys.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.Keys();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (!(message.keys && message.keys.length)) message.keys = [];
                    message.keys.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    return Keys;
}();

exports.default = $root;
