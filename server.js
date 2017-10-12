/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AbstractMessage = /** @class */ (function () {
    function AbstractMessage(service, content) {
        this.service = service;
        this.content = content;
    }
    return AbstractMessage;
}());
exports.AbstractMessage = AbstractMessage;
//# sourceMappingURL=AbstractMessage.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
  * Holds the minimum value an integer can have.
  */
exports.INT_32_MIN_VALUE = -0x80000000;
/**
 * Holds the maximum value an integer can have.
 */
exports.INT_32_MAX_VALUE = 0x7fffffff;
var Identifier = /** @class */ (function () {
    // Creation
    function Identifier(base, u) {
        console.assert(base instanceof Array, "base = ", base);
        console.assert(base.every(function (a) { return Number.isInteger(a); }), "Every item is an integer. base = ", base);
        console.assert(base.every(function (a) { return a >= exports.INT_32_MIN_VALUE && a <= exports.INT_32_MAX_VALUE; }), "Every item ∈ [INT_32_MIN_VALUE, INT_32_MAX_VALUE]");
        console.assert(Number.isInteger(u), "u = ", u);
        console.assert(u > exports.INT_32_MIN_VALUE && u <= exports.INT_32_MAX_VALUE, "u ∈ ]INT_32_MIN_VALUE, INT_32_MAX_VALUE]");
        this.base = base;
        this.last = u;
    }
    Identifier.fromPlain = function (o) {
        if (typeof o === "object" && o !== null) {
            var base = o.base;
            var last = o.last;
            if (base instanceof Array &&
                base.every(function (n) { return typeof n === "number" && Number.isInteger(n); }) &&
                typeof last === "number" && Number.isInteger(last)) {
                return new Identifier(base, last);
            }
        }
        return null;
    };
    Identifier.prototype.compareTo = function (aOther) {
        console.assert(aOther instanceof Identifier, "aOther = ", aOther);
        var extended = this.base.concat(this.last);
        var otherExtended = aOther.base.concat(aOther.last);
        var minLength = Math.min(extended.length, otherExtended.length);
        var i = 0;
        while (i < minLength && extended[i] === otherExtended[i]) {
            i++;
        }
        if (i === minLength) {
            if (extended.length > minLength) {
                return 1 /* Greater */;
            }
            else if (otherExtended.length > minLength) {
                return -1 /* Less */;
            }
            else {
                return 0 /* Equal */;
            }
        }
        else {
            if (extended[i] < otherExtended[i]) {
                return -1 /* Less */;
            }
            else {
                return 1 /* Greater */;
            }
        }
    };
    Identifier.prototype.equals = function (aOther) {
        return this.equalsBase(aOther) && this.last === aOther.last;
    };
    /**
     * Check if the identifier's {@link Identifier#base} is equals to another identifier's one
     *
     * @param {Identifier} aOther The other identifier
     * @returns {boolean} Are the bases equals
     */
    Identifier.prototype.equalsBase = function (aOther) {
        return this.base.length === aOther.base.length
            && this.base.every(function (value, index) { return aOther.base[index] === value; });
    };
    Identifier.prototype.toString = function () {
        return "Id[" + this.base.concat(this.last).join(", ") + ']';
    };
    Identifier.prototype.hasPlaceAfter = function (next, length) {
        console.assert(next instanceof Identifier, "next = ", next);
        console.assert(typeof length === "number", "length = ", length);
        var base = this.base;
        if (this.last > exports.INT_32_MAX_VALUE - length) {
            // last should never be greater than INT_32_MAX_VALUE because of its constraints
            return false;
        }
        else if (base.length > next.base.length) {
            return true;
        }
        else {
            var nextExtended = next.base.concat(next.last);
            var minLength = Math.min(base.length, nextExtended.length);
            var i = 0;
            while (i < minLength && base[i] === nextExtended[i]) {
                i++;
            }
            if (i !== minLength) {
                // Bases differ
                return true;
            }
            else {
                var max = length + this.last;
                return nextExtended[i] >= max;
            }
        }
    };
    Identifier.prototype.hasPlaceBefore = function (prev, length) {
        console.assert(prev instanceof Identifier, "prv = ", prev);
        console.assert(typeof length === "number" && Number.isInteger(length), "length = ", length);
        var base = this.base;
        if (this.last <= exports.INT_32_MIN_VALUE + length) {
            // last should never be less than or equal to INT_32_MIN_VALUE because of its constraints
            return false;
        }
        else if (base.length > prev.base.length) {
            return true;
        }
        else {
            var prevExtended = prev.base.concat(prev.last);
            var minLength = Math.min(base.length, prevExtended.length);
            var i = 0;
            while (i < minLength && base[i] === prevExtended[i]) {
                i++;
            }
            if (i !== minLength) {
                // Bases differ
                return true;
            }
            else {
                var min = this.last - length;
                return prevExtended[i] < min;
            }
        }
    };
    Identifier.prototype.minOffsetAfterPrev = function (prev, min) {
        console.assert(prev instanceof Identifier, "prev = ", prev);
        console.assert(typeof min === "number" && Number.isInteger(min), "min = ", min);
        var base = this.base;
        var prevExtended = prev.base.concat(prev.last);
        var minLength = Math.min(base.length, prevExtended.length);
        var i = 0;
        while (i < minLength && base[i] === prevExtended[i]) {
            i++;
        }
        if (i === minLength && i < prevExtended.length) {
            // base is a prefix of prevBase
            return Math.max(prevExtended[i] + 1, min);
        }
        else {
            return min;
        }
    };
    Identifier.prototype.maxOffsetBeforeNext = function (next, max) {
        console.assert(next instanceof Identifier, "next = ", next);
        console.assert(typeof max === "number" && Number.isInteger(max), "max = ", max);
        var base = this.base;
        var nextExtended = next.base.concat(next.last);
        var minLength = Math.min(base.length, nextExtended.length);
        var i = 0;
        while (i < minLength && base[i] === nextExtended[i]) {
            i++;
        }
        if (i === minLength && i < nextExtended.length) {
            // base is a prefix of nextBase
            if (base.length < next.base.length) {
                // length of base is less than length of nextBase
                return Math.min(nextExtended[i], max);
            }
            return Math.min(nextExtended[i] - 1, max);
        }
        else {
            return max;
        }
    };
    return Identifier;
}());
exports.Identifier = Identifier;
//# sourceMappingURL=identifier.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2014 Matthieu Nicolas, Victorien Elvinger
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var identifier_1 = __webpack_require__(2);
var IdentifierInterval = /** @class */ (function () {
    // Creation
    function IdentifierInterval(base, begin, end) {
        console.assert(base instanceof Array, "base = ", base);
        console.assert(typeof begin === "number" && Number.isInteger(begin), "begin = ", begin);
        console.assert(typeof end === "number" && Number.isInteger(end), "end = ", end);
        console.assert(begin <= end, "begin <= end: " + begin + " <= ", end);
        this.base = base;
        this.begin = begin;
        this.end = end;
    }
    IdentifierInterval.fromPlain = function (o) {
        if (typeof o === "object" && o !== null) {
            var base = o.base;
            var begin = o.begin;
            var end = o.end;
            if (base instanceof Array && base.every(function (n) {
                return typeof n === "number" && Number.isInteger(n);
            }) &&
                typeof begin === "number" && typeof end === "number" &&
                Number.isInteger(begin) && Number.isInteger(end) &&
                begin <= end) {
                return new IdentifierInterval(base, begin, end);
            }
        }
        return null;
    };
    IdentifierInterval.prototype.equals = function (aOther) {
        return this.base.length === aOther.base.length &&
            this.base.every(function (value, index) {
                return value === aOther.base[index];
            }) &&
            this.begin === aOther.begin && this.end === aOther.end;
    };
    IdentifierInterval.prototype.union = function (aBegin, aEnd) {
        var minBegin = Math.min(this.begin, aBegin);
        var maxEnd = Math.max(this.end, aEnd);
        return new IdentifierInterval(this.base, minBegin, maxEnd);
    };
    IdentifierInterval.prototype.getBaseId = function (u) {
        console.assert(typeof u === "number" && Number.isInteger(u), "u = ", u);
        return new identifier_1.Identifier(this.base, u);
    };
    IdentifierInterval.prototype.getBeginId = function () {
        return this.getBaseId(this.begin);
    };
    IdentifierInterval.prototype.getEndId = function () {
        return this.getBaseId(this.end);
    };
    IdentifierInterval.prototype.digest = function () {
        // '| 0' converts to 32bits integer
        var baseDigest = this.base.reduce(function (prev, v) { return (prev * 17 + v) | 0; }, 0);
        return ((this.begin * 17 + this.end) * 17 + baseDigest) | 0;
    };
    IdentifierInterval.prototype.toString = function () {
        return 'Id[' + this.base.join(",") + ', ' +
            this.begin + ' .. ' + this.end + ']';
    };
    return IdentifierInterval;
}());
exports.IdentifierInterval = IdentifierInterval;
//# sourceMappingURL=identifierinterval.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var identifier_1 = __webpack_require__(2);
var identifierinterval_1 = __webpack_require__(3);
var IDFactory = __webpack_require__(47);
var iteratorhelperidentifier_1 = __webpack_require__(49);
var logootsadd_1 = __webpack_require__(19);
var logootsblock_1 = __webpack_require__(8);
var logootsdel_1 = __webpack_require__(20);
var ropesnodes_1 = __webpack_require__(21);
var textdelete_1 = __webpack_require__(22);
var textinsert_1 = __webpack_require__(23);
var TextUtils = __webpack_require__(24);
function leftChildOf(aNode) {
    console.assert(aNode instanceof ropesnodes_1.RopesNodes, "aNode = ", aNode);
    return aNode.left;
}
function rightChildOf(aNode) {
    console.assert(aNode instanceof ropesnodes_1.RopesNodes, "aNode = ", aNode);
    return aNode.right;
}
var LogootSRopes = /** @class */ (function () {
    function LogootSRopes(replica, clock, root, str) {
        if (replica === void 0) { replica = 0; }
        if (clock === void 0) { clock = 0; }
        if (root === void 0) { root = null; }
        if (str === void 0) { str = ""; }
        console.assert(typeof replica === "number", "replicaNumber = " + replica);
        this.replicaNumber = replica;
        this.clock = clock;
        this.root = root;
        this.str = str;
        var baseToBlock = {};
        if (root !== null) {
            var blocks = root.getBlocks();
            for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
                var b = blocks_1[_i];
                var key = b.idInterval.base.join(",");
                baseToBlock[key] = b;
            }
        }
        this.mapBaseToBlock = baseToBlock;
    }
    LogootSRopes.empty = function () {
        return new LogootSRopes(0, 0);
    };
    LogootSRopes.fromPlain = function (replica, clock, o) {
        if (typeof o === "object" && o !== null) {
            var str = o.str;
            var plainRoot = o.root;
            if (typeof str === "string") {
                var root = ropesnodes_1.RopesNodes.fromPlain(plainRoot);
                if (str.length !== 0 && root !== null) {
                    // FIXME: Need more checking (str's length compared to tree length?)
                    return new LogootSRopes(replica, clock, root, str);
                }
            }
        }
        return null;
    };
    LogootSRopes.prototype.getBlock = function (id) {
        console.assert(id instanceof identifierinterval_1.IdentifierInterval, "id = ", id);
        var mapBaseToBlock = this.mapBaseToBlock;
        var key = id.base.join(",");
        var result;
        if (mapBaseToBlock.hasOwnProperty(key)) {
            result = mapBaseToBlock[key];
        }
        else {
            result = new logootsblock_1.LogootSBlock(id, 0);
            this.mapBaseToBlock[key] = result;
        }
        return result;
    };
    /**
     * Add a interval of identifiers and its corresponding string to the model
     *
     * @param {string} str The inserted string
     * @param {IdentifierInterval} idi The corresponding interval of identifiers
     * @param {RopesNodes} from The starting point of the search
     * @param {number} startOffset ???
     **/
    LogootSRopes.prototype.addBlockFrom = function (str, idi, from, startOffset) {
        var _this = this;
        var result = this.addBlockFromRec(str, idi, from, startOffset);
        result.forEach(function (textInsert) {
            _this.applyTextInsert(textInsert);
        });
        return result;
    };
    LogootSRopes.prototype.addBlockFromRec = function (str, idi, from, startOffset) {
        var path = [];
        var result = [];
        var con = true;
        var i = startOffset;
        while (con) {
            path.push(from);
            // B1 is the block we are adding
            // B2 is the block to which we are comparing
            switch (iteratorhelperidentifier_1.compareBase(idi, from.getIdentifierInterval())) {
                case 0 /* B1_AFTER_B2 */: {
                    if (from.right === null) {
                        from.right = ropesnodes_1.RopesNodes.leaf(this.getBlock(idi), idi.begin, str.length);
                        i = i + from.leftSubtreeSize() + from.length;
                        result.push(new textinsert_1.TextInsert(i, str));
                        con = false;
                    }
                    else {
                        i = i + from.leftSubtreeSize() + from.length;
                        from = from.right;
                    }
                    break;
                }
                case 1 /* B1_BEFORE_B2 */: {
                    if (from.left === null) {
                        from.left = ropesnodes_1.RopesNodes.leaf(this.getBlock(idi), idi.begin, str.length);
                        result.push(new textinsert_1.TextInsert(i, str));
                        con = false;
                    }
                    else {
                        from = from.left;
                    }
                    break;
                }
                case 2 /* B1_INSIDE_B2 */: {
                    // split b2 the object node
                    var indexOffset = from.getIdBegin().base.length;
                    var offsetToSplit = idi.base[indexOffset];
                    var rp = ropesnodes_1.RopesNodes.leaf(this.getBlock(idi), idi.begin, str.length);
                    path.push(from.split(offsetToSplit - from.actualBegin + 1, rp));
                    i = i + from.leftSubtreeSize();
                    result.push(new textinsert_1.TextInsert(i + offsetToSplit - from.actualBegin + 1, str));
                    con = false;
                    break;
                }
                case 3 /* B2_INSIDE_B1 */: {
                    // split b1 the node to insert
                    var indexOffset = idi.base.length;
                    var offsetToSplit = from.getIdBegin().base[indexOffset];
                    var ls = str.substr(0, offsetToSplit + 1 - idi.begin);
                    var idi1 = new identifierinterval_1.IdentifierInterval(idi.base, idi.begin, offsetToSplit);
                    if (from.left === null) {
                        from.left = ropesnodes_1.RopesNodes.leaf(this.getBlock(idi1), idi1.begin, ls.length);
                        result.push(new textinsert_1.TextInsert(i, ls));
                    }
                    else {
                        Array.prototype.push.apply(result, this.addBlockFromRec(ls, idi1, from.left, i));
                    }
                    // i=i+ls.size()
                    ls = str.substr(offsetToSplit + 1 - idi.begin, str.length);
                    idi1 = new identifierinterval_1.IdentifierInterval(idi.base, offsetToSplit + 1, idi.end);
                    i = i + from.leftSubtreeSize() + from.length;
                    if (from.right === null) {
                        from.right = ropesnodes_1.RopesNodes.leaf(this.getBlock(idi1), idi1.begin, ls.length);
                        result.push(new textinsert_1.TextInsert(i, ls));
                    }
                    else {
                        Array.prototype.push.apply(result, this.addBlockFromRec(ls, idi1, from.right, i));
                    }
                    con = false;
                    break;
                }
                case 4 /* B1_CONCAT_B2 */: {
                    // node to insert concat the node
                    if (from.left !== null) {
                        var split = from.getIdBegin().minOffsetAfterPrev(from.left.getIdEnd(), idi.begin);
                        var l = str.substr(split - idi.begin, str.length);
                        from.appendBegin(l.length);
                        result.push(new textinsert_1.TextInsert(i + from.leftSubtreeSize(), l));
                        this.ascendentUpdate(path, l.length);
                        // check if previous is smaller or not
                        if ((split - 1) >= idi.begin) {
                            str = str.substr(0, split - idi.begin);
                            idi = new identifierinterval_1.IdentifierInterval(idi.base, idi.begin, split - 1);
                            from = from.left;
                        }
                        else {
                            con = false;
                        }
                    }
                    else {
                        result.push(new textinsert_1.TextInsert(i, str));
                        from.appendBegin(str.length);
                        this.ascendentUpdate(path, str.length);
                        con = false;
                    }
                    break;
                }
                case 5 /* B2_CONCAT_B1 */: {
                    // concat at end
                    if (from.right !== null) {
                        var split = from.getIdEnd().maxOffsetBeforeNext(from.right.getIdBegin(), idi.end);
                        var l = str.substr(0, split + 1 - idi.begin);
                        i = i + from.leftSubtreeSize() + from.length;
                        from.appendEnd(l.length);
                        result.push(new textinsert_1.TextInsert(i, l));
                        this.ascendentUpdate(path, l.length);
                        if (idi.end >= (split + 1)) {
                            str = str.substr(split + 1 - idi.begin, str.length);
                            idi = new identifierinterval_1.IdentifierInterval(idi.base, split + 1, idi.end);
                            from = from.right;
                            i = i + l.length;
                        }
                        else {
                            con = false;
                        }
                    }
                    else {
                        i = i + from.leftSubtreeSize() + from.length;
                        result.push(new textinsert_1.TextInsert(i, str));
                        from.appendEnd(str.length);
                        this.ascendentUpdate(path, str.length);
                        con = false;
                    }
                    break;
                }
                case 6 /* B1_EQUALS_B2 */: {
                    con = false;
                    break;
                }
            }
        }
        this.balance(path);
        return result;
    };
    // FIXME: Put this function elsewhere?
    LogootSRopes.prototype.applyTextInsert = function (textInsert) {
        this.str = TextUtils.insert(this.str, textInsert.offset, textInsert.content);
    };
    // FIXME: Put this function elsewhere?
    LogootSRopes.prototype.applyTextDelete = function (textDelete) {
        var end = textDelete.offset + textDelete.length - 1;
        this.str = TextUtils.del(this.str, textDelete.offset, end);
    };
    LogootSRopes.prototype.addBlock = function (str, id) {
        console.assert(typeof str === "string", "str = " + str);
        console.assert(id instanceof identifier_1.Identifier, "id = ", id);
        var idi = new identifierinterval_1.IdentifierInterval(id.base, id.last, id.last + str.length - 1);
        if (this.root === null) {
            var bl = new logootsblock_1.LogootSBlock(idi, 0);
            this.mapBaseToBlock[bl.idInterval.base.join(",")] = bl;
            this.root = ropesnodes_1.RopesNodes.leaf(bl, id.last, str.length);
            var textInsert = new textinsert_1.TextInsert(0, str);
            this.applyTextInsert(textInsert);
            return [textInsert];
        }
        else {
            return this.addBlockFrom(str, idi, this.root, 0);
        }
    };
    LogootSRopes.prototype.mkNode = function (id1, id2, length) {
        console.assert(id1 === null || id1 instanceof identifier_1.Identifier, "id1 = ", id1);
        console.assert(id2 === null || id2 instanceof identifier_1.Identifier, "id2 = ", id2);
        console.assert(typeof length === "number", "length = " + length);
        console.assert(length > 0, "" + length, " > 0");
        var base = IDFactory.createBetweenPosition(id1, id2, this.replicaNumber, this.clock++);
        var idi = new identifierinterval_1.IdentifierInterval(base, 0, length - 1);
        var newBlock = logootsblock_1.LogootSBlock.mine(idi, 0);
        this.mapBaseToBlock[idi.base.join(",")] = newBlock;
        return ropesnodes_1.RopesNodes.leaf(newBlock, 0, length);
    };
    LogootSRopes.prototype.insertLocal = function (pos, l) {
        console.assert(typeof pos === "number", "pos = ", pos);
        console.assert(typeof l === "string", "l = ", l);
        var n;
        if (this.root === null) {
            this.root = this.mkNode(null, null, l.length);
            this.str = TextUtils.insert(this.str, pos, l);
            return new logootsadd_1.LogootSAdd(this.root.getIdBegin(), l);
        }
        else {
            var newNode = void 0;
            var length = this.str.length;
            this.str = TextUtils.insert(this.str, pos, l);
            var path = void 0;
            if (pos === 0) {
                path = [];
                path.push(this.root);
                n = this.getXest(leftChildOf, path);
                if (n.isAppendableBefore()) {
                    var id = n.appendBegin(l.length);
                    this.ascendentUpdate(path, l.length);
                    return new logootsadd_1.LogootSAdd(id, l);
                }
                else {
                    newNode = this.mkNode(null, n.getIdBegin(), l.length);
                    n.left = newNode;
                }
            }
            else if (pos >= length) {
                path = [];
                path.push(this.root);
                n = this.getXest(rightChildOf, path);
                if (n.isAppendableAfter()) {
                    var id3 = n.appendEnd(l.length);
                    this.ascendentUpdate(path, l.length);
                    return new logootsadd_1.LogootSAdd(id3, l);
                }
                else {
                    newNode = this.mkNode(n.getIdEnd(), null, l.length);
                    n.right = newNode;
                }
            }
            else {
                var inPos = this.searchNode(pos);
                // TODO: why non-null?
                if (inPos.i > 0) {
                    var id1 = inPos.node.block.idInterval.getBaseId(inPos.node.actualBegin + inPos.i - 1);
                    var id2 = inPos.node.block.idInterval.getBaseId(inPos.node.actualBegin + inPos.i);
                    newNode = this.mkNode(id1, id2, l.length);
                    path = inPos.path;
                    path.push(inPos.node.split(inPos.i, newNode));
                }
                else {
                    var prev = this.searchNode(pos - 1);
                    // TODO: why non-null?
                    if (inPos.node.isAppendableBefore() &&
                        inPos.node.getIdBegin().hasPlaceBefore(prev.node.getIdEnd(), l.length)) {
                        // append before
                        var id5 = inPos.node.appendBegin(l.length);
                        this.ascendentUpdate(inPos.path, l.length);
                        return new logootsadd_1.LogootSAdd(id5, l);
                    }
                    else if (prev.node.isAppendableAfter() &&
                        prev.node.getIdEnd().hasPlaceAfter(inPos.node.getIdBegin(), l.length)) {
                        // append after
                        var id4 = prev.node.appendEnd(l.length);
                        this.ascendentUpdate(prev.path, l.length);
                        return new logootsadd_1.LogootSAdd(id4, l);
                    }
                    else {
                        newNode = this.mkNode(prev.node.getIdEnd(), inPos.node.getIdBegin(), l.length);
                        newNode.right = prev.node.right;
                        prev.node.right = newNode;
                        path = prev.path;
                        path.push(newNode);
                    }
                }
            }
            this.balance(path);
            return new logootsadd_1.LogootSAdd(newNode.getIdBegin(), l);
        }
    };
    LogootSRopes.prototype.getXest = function (aChildOf, aPath) {
        console.assert(aChildOf instanceof Function, "aChildOf = ", aChildOf);
        console.assert(aPath instanceof Array, "aPath = ", aPath);
        var n = aPath[aPath.length - 1];
        var child = aChildOf(n);
        while (child !== null) {
            n = child;
            aPath[aPath.length] = child;
            child = aChildOf(child);
        }
        return n;
    };
    LogootSRopes.prototype.searchPos = function (id, path) {
        console.assert(id instanceof identifier_1.Identifier, "id = ", id);
        console.assert(path instanceof Array, "path = ", path);
        var i = 0;
        var node = this.root;
        while (node !== null) {
            path.push(node);
            if (id.compareTo(node.getIdBegin()) === -1) {
                node = node.left;
            }
            else if (id.compareTo(node.getIdEnd()) === 1) {
                i = i + node.leftSubtreeSize() + node.length;
                node = node.right;
            }
            else {
                if (id.equalsBase(node.getIdBegin())) {
                    return i + node.leftSubtreeSize();
                }
                else {
                    // Could not find the identifier, stop the search
                    node = null;
                }
            }
        }
        // FIXME: Clear path?
        return -1;
    };
    LogootSRopes.prototype.searchNode = function (pos) {
        console.assert(typeof pos === "number", "pos = ", pos);
        var node1 = this.root;
        var path1 = [];
        while (node1 !== null) {
            path1.push(node1);
            var before = node1.leftSubtreeSize();
            if (pos < before) {
                node1 = node1.left;
            }
            else if (pos < before + node1.length) {
                return {
                    i: pos - before,
                    node: node1,
                    path: path1
                };
            }
            else {
                pos -= before + node1.length;
                node1 = node1.right;
            }
        }
        return null;
    };
    LogootSRopes.prototype.ascendentUpdate = function (path, length) {
        console.assert(path instanceof Array, "path = ", path);
        console.assert(typeof length === "number", "length = ", length);
        // `length' may be negative
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var item = path_1[_i];
            item.addString(length);
        }
    };
    LogootSRopes.prototype.delBlock = function (id) {
        var _this = this;
        console.assert(id instanceof identifierinterval_1.IdentifierInterval, "id = ", id);
        var l = [];
        var i;
        while (true) {
            var path = [];
            i = this.searchPos(id.getBeginId(), path);
            if (i === -1) {
                // Could not find the first identifier from the interval
                if (id.begin < id.end) {
                    // Shifting the interval and resuming the search
                    id = new identifierinterval_1.IdentifierInterval(id.base, id.begin + 1, id.end);
                }
                else {
                    break;
                }
            }
            else {
                // Was able to find the position of the identifier
                var node = path[path.length - 1]; // Retrieving the node containing the identifier
                var end = Math.min(id.end, node.actualEnd);
                var pos = i + id.begin - node.actualBegin;
                var length = end - id.begin + 1;
                l.push(new textdelete_1.TextDelete(pos, length));
                var t = node.deleteOffsets(id.begin, end);
                if (node.length === 0) {
                    this.delNode(path);
                }
                else if (t !== null) {
                    path.push(t);
                    this.balance(path);
                }
                else {
                    // TODO: Check second argument
                    this.ascendentUpdate(path, id.begin - end - 1);
                }
                if (end === id.end) {
                    break;
                }
                else {
                    // TODO: Check if still valid
                    id = new identifierinterval_1.IdentifierInterval(id.base, end, id.end);
                }
            }
        }
        l.forEach(function (textDelete) {
            _this.applyTextDelete(textDelete);
        });
        return l;
    };
    LogootSRopes.prototype.delLocal = function (begin, end) {
        console.assert(typeof begin === "number", "begin = " + begin);
        console.assert(typeof end === "number", "end = " + end);
        console.assert(begin <= end, "" + begin, " <= " + end);
        this.str = TextUtils.del(this.str, begin, end);
        var length = end - begin + 1;
        var li = [];
        do {
            var start = this.searchNode(begin);
            if (start !== null) {
                var be = start.node.actualBegin + start.i;
                var en = Math.min(be + length - 1, start.node.actualEnd);
                li.push(new identifierinterval_1.IdentifierInterval(start.node.block.idInterval.base, be, en));
                var r = start.node.deleteOffsets(be, en);
                length -= en - be + 1;
                if (start.node.length === 0) {
                    this.delNode(start.path);
                }
                else if (r !== null) {
                    start.path.push(r);
                    this.balance(start.path);
                }
                else {
                    this.ascendentUpdate(start.path, be - en - 1);
                }
            }
            else {
                length = 0;
            }
        } while (length > 0);
        return new logootsdel_1.LogootSDel(li);
    };
    LogootSRopes.prototype.delNode = function (path) {
        console.assert(path instanceof Array, "path = ", path);
        var node = path[path.length - 1];
        if (node.block.nbElement === 0) {
            delete this.mapBaseToBlock[node.block.idInterval.base.join(",")];
        }
        if (node.right === null) {
            if (node === this.root) {
                this.root = node.left;
            }
            else {
                path.pop();
                path[path.length - 1].replaceChildren(node, node.left);
            }
        }
        else if (node.left === null) {
            if (node === this.root) {
                this.root = node.right;
            }
            else {
                path.pop();
                path[path.length - 1].replaceChildren(node, node.right);
            }
        }
        else {
            path.push(node.right);
            var min = this.getMinPath(path);
            node.become(min);
            path.pop();
            path[path.length - 1].replaceChildren(min, min.right);
        }
        this.balance(path);
    };
    LogootSRopes.prototype.getMinPath = function (path) {
        console.assert(path instanceof Array, "path = ", path);
        console.assert(path.length !== 0, "`path' has at least one item");
        var node = path[path.length - 1]; // precondition
        while (node.left !== null) {
            node = node.left;
            path.push(node);
        }
        return node;
    };
    // TODO: Implémenter la balance de Google (voir AVL.js) et vérifier ses performances en comparaison
    LogootSRopes.prototype.balance = function (path) {
        console.assert(path instanceof Array, "path = ", path);
        while (path.length > 0) {
            var node = path.pop(); // Loop condition
            var father = path.length === 0 ? null : path[path.length - 1];
            node.sumDirectChildren();
            var balance = node.balanceScore();
            while (Math.abs(balance) >= 2) {
                if (balance >= 2) {
                    if (node.right !== null && node.right.balanceScore() <= -1) {
                        father = this.rotateRL(node, father); // Double left
                    }
                    else {
                        father = this.rotateLeft(node, father);
                    }
                }
                else {
                    if (node.left !== null && node.left.balanceScore() >= 1) {
                        father = this.rotateLR(node, father); // Double right
                    }
                    else {
                        father = this.rotateRight(node, father);
                    }
                }
                path.push(father);
                balance = node.balanceScore();
            }
        }
    };
    LogootSRopes.prototype.rotateLeft = function (node, father) {
        console.assert(node instanceof ropesnodes_1.RopesNodes, "node = ", node);
        console.assert(father === null || father instanceof ropesnodes_1.RopesNodes, "father = ", father);
        console.assert(node.right !== null, "There exists a right node");
        console.assert((node === this.root) === (father === null), "The father is null when we are rotating left the root");
        var r = node.right; // precondition
        if (node === this.root) {
            this.root = r;
        }
        else {
            // FIXME: Should we not replace the left child in this case?
            father.replaceChildren(node, r);
            // FIXME: This assert fails from time to time, verify its correctness
            // console.assert((father as RopesNodes).left !== null, "There exists a left node")
        }
        node.right = r.left;
        r.left = node;
        node.sumDirectChildren();
        r.sumDirectChildren();
        return r;
    };
    LogootSRopes.prototype.rotateRight = function (node, father) {
        console.assert(node instanceof ropesnodes_1.RopesNodes, "node = ", node);
        console.assert(father === null || father instanceof ropesnodes_1.RopesNodes, "father = ", father);
        console.assert(node.left !== null, "There exists a left node");
        console.assert((node === this.root) === (father === null), "The father is null when we are rotating right the root");
        var r = node.left; // precondition
        if (node === this.root) {
            this.root = r;
        }
        else {
            // FIXME: Should we not replace the right child in this case?
            father.replaceChildren(node, r);
            // FIXME: This assert fails from time to time, verify its correctness
            // console.assert((father as RopesNodes).right !== null, "There exists a right node")
        }
        node.left = r.right;
        r.right = node;
        node.sumDirectChildren();
        r.sumDirectChildren();
        return r;
    };
    LogootSRopes.prototype.rotateRL = function (node, father) {
        console.assert(node instanceof ropesnodes_1.RopesNodes, "node = ", node);
        console.assert(father === null || father instanceof ropesnodes_1.RopesNodes, "father = ", father);
        console.assert(node.right !== null, "There exists a right node");
        var rightNode = node.right; // precondition
        console.assert(rightNode.left !== null, "There exists a left node of the right node");
        this.rotateRight(rightNode, node);
        return this.rotateLeft(node, father);
    };
    LogootSRopes.prototype.rotateLR = function (node, father) {
        console.assert(node instanceof ropesnodes_1.RopesNodes, "node = ", node);
        console.assert(father === null || father instanceof ropesnodes_1.RopesNodes, "father = ", father);
        console.assert(node.left !== null, "There exists a left node");
        var leftNode = node.left; // precondition
        console.assert(leftNode.right !== null, "There exists a right node of the left node");
        this.rotateLeft(leftNode, node);
        return this.rotateRight(node, father);
    };
    LogootSRopes.prototype.getNext = function (path) {
        console.assert(path instanceof Array, "path = ", path);
        var node = path[path.length - 1];
        if (node.right === null) {
            if (path.length > 1) {
                var father = path[path.length - 2];
                if (father.left === node) {
                    path.pop();
                    return true;
                }
            }
            return false;
        }
        else {
            path.push(node.right);
            this.getXest(leftChildOf, path);
            return true;
        }
    };
    /**
     * @return tree digest
     */
    LogootSRopes.prototype.digest = function () {
        var result = 0;
        var root = this.root;
        if (root !== null) {
            var linearRpr = root.toList();
            for (var _i = 0, linearRpr_1 = linearRpr; _i < linearRpr_1.length; _i++) {
                var idi = linearRpr_1[_i];
                result = (result * 17 + idi.digest()) | 0;
                // Convert to 32bits integer
            }
        }
        return result;
    };
    return LogootSRopes;
}());
exports.LogootSRopes = LogootSRopes;
//# sourceMappingURL=logootsropes.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BroadcastMessage_1 = __webpack_require__(40);
exports.BroadcastMessage = BroadcastMessage_1.BroadcastMessage;
var JoinEvent_1 = __webpack_require__(41);
exports.JoinEvent = JoinEvent_1.JoinEvent;
var NetworkMessage_1 = __webpack_require__(42);
exports.NetworkMessage = NetworkMessage_1.NetworkMessage;
var SendRandomlyMessage_1 = __webpack_require__(43);
exports.SendRandomlyMessage = SendRandomlyMessage_1.SendRandomlyMessage;
var SendToMessage_1 = __webpack_require__(44);
exports.SendToMessage = SendToMessage_1.SendToMessage;
var AbstractMessage_1 = __webpack_require__(1);
exports.AbstractMessage = AbstractMessage_1.AbstractMessage;
//# sourceMappingURL=index.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("protobufjs/minimal");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var identifier_1 = __webpack_require__(2);
exports.Identifier = identifier_1.Identifier;
var identifierinterval_1 = __webpack_require__(3);
exports.IdentifierInterval = identifierinterval_1.IdentifierInterval;
var logootsblock_1 = __webpack_require__(8);
exports.LogootSBlock = logootsblock_1.LogootSBlock;
var logootsropes_1 = __webpack_require__(4);
exports.LogootSRopes = logootsropes_1.LogootSRopes;
var ropesnodes_1 = __webpack_require__(21);
exports.RopesNodes = ropesnodes_1.RopesNodes;
var logootsadd_1 = __webpack_require__(19);
exports.LogootSAdd = logootsadd_1.LogootSAdd;
var logootsdel_1 = __webpack_require__(20);
exports.LogootSDel = logootsdel_1.LogootSDel;
var textdelete_1 = __webpack_require__(22);
exports.TextDelete = textdelete_1.TextDelete;
var textinsert_1 = __webpack_require__(23);
exports.TextInsert = textinsert_1.TextInsert;
var textutils_1 = __webpack_require__(24);
exports.insert = textutils_1.insert;
exports.del = textutils_1.del;
exports.occurrences = textutils_1.occurrences;
//# sourceMappingURL=index.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var identifierinterval_1 = __webpack_require__(3);
var LogootSBlock = /** @class */ (function () {
    // Creation
    function LogootSBlock(idInterval, nbElt, mine) {
        if (mine === void 0) { mine = false; }
        console.assert(Number.isInteger(nbElt) && nbElt >= 0, "nbElt must be a positive integer");
        this.idInterval = idInterval;
        this.nbElement = nbElt;
        this.mine = mine;
    }
    LogootSBlock.mine = function (idInterval, nbElt) {
        return new LogootSBlock(idInterval, nbElt, true);
    };
    LogootSBlock.foreign = function (idInterval, nbElt) {
        return new LogootSBlock(idInterval, nbElt, false);
    };
    LogootSBlock.fromPlain = function (o) {
        if (typeof o === "object" && o !== null) {
            var plainId = o.idInterval;
            var nbElt = o.nbElement;
            if (plainId instanceof Object && typeof nbElt === "number" &&
                Number.isInteger(nbElt) && nbElt >= 0) {
                var id = identifierinterval_1.IdentifierInterval.fromPlain(plainId);
                if (id !== null) {
                    return LogootSBlock.foreign(id, nbElt);
                    // FIXME: Always not mine?
                }
            }
        }
        return null;
    };
    LogootSBlock.prototype.addBlock = function (pos, length) {
        console.assert(Number.isInteger(length) && length > 0, "length must be a positive integer");
        this.nbElement += length;
        this.idInterval = this.idInterval.union(pos, pos + length - 1);
    };
    LogootSBlock.prototype.delBlock = function (nbElt) {
        console.assert(Number.isInteger(nbElt) && nbElt > 0, "nbElt must be a positive integer");
        this.nbElement -= nbElt;
    };
    LogootSBlock.prototype.toString = function () {
        return '{' + this.nbElement + ',' + this.idInterval.toString() + ', ' + (this.mine ? 'mine' : 'its') + '}';
    };
    return LogootSBlock;
}());
exports.LogootSBlock = LogootSBlock;
//# sourceMappingURL=logootsblock.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Interval = /** @class */ (function () {
    function Interval(id, begin, end) {
        this.id = id;
        this.begin = begin;
        this.end = end;
    }
    Interval.prototype.equals = function (aOther) {
        return this.id === aOther.id &&
            this.begin === aOther.begin &&
            this.end === aOther.end;
    };
    return Interval;
}());
exports.Interval = Interval;
//# sourceMappingURL=Interval.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ReplySyncEvent = /** @class */ (function () {
    function ReplySyncEvent(richLogootSOps, intervals) {
        this.richLogootSOps = richLogootSOps;
        this.intervals = intervals;
    }
    ReplySyncEvent.prototype.equals = function (aOther) {
        return this.richLogootSOps.length === aOther.richLogootSOps.length &&
            this.intervals.length === aOther.intervals.length &&
            this.richLogootSOps.every(function (richLogootSOp, index) {
                var otherRichLogootSOp = aOther.richLogootSOps[index];
                return richLogootSOp.equals(otherRichLogootSOp);
            }) &&
            this.intervals.every(function (interval, index) {
                var otherInterval = aOther.intervals[index];
                return interval.equals(otherInterval);
            });
    };
    return ReplySyncEvent;
}());
exports.ReplySyncEvent = ReplySyncEvent;
//# sourceMappingURL=ReplySyncEvent.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mute_structs_1 = __webpack_require__(7);
var RichLogootSOperation = /** @class */ (function () {
    function RichLogootSOperation(id, clock, logootSOp) {
        this.id = id;
        this.clock = clock;
        this.logootSOp = logootSOp;
    }
    RichLogootSOperation.fromPlain = function (o) {
        if (typeof o === 'object' && o !== null &&
            typeof o.id === 'number' && Number.isInteger(o.id) &&
            typeof o.clock === 'number' && Number.isInteger(o.clock)) {
            var logootSAdd = mute_structs_1.LogootSAdd.fromPlain(o.logootSOp);
            if (logootSAdd instanceof mute_structs_1.LogootSAdd) {
                return new RichLogootSOperation(o.id, o.clock, logootSAdd);
            }
            var logootSDel = mute_structs_1.LogootSDel.fromPlain(o.logootSOp);
            if (logootSDel instanceof mute_structs_1.LogootSDel) {
                return new RichLogootSOperation(o.id, o.clock, logootSDel);
            }
        }
        return null;
    };
    RichLogootSOperation.prototype.equals = function (aOther) {
        var result = this.id === aOther.id && this.clock === aOther.clock;
        if (this.logootSOp instanceof mute_structs_1.LogootSAdd &&
            aOther.logootSOp instanceof mute_structs_1.LogootSAdd) {
            return result && this.logootSOp.equals(aOther.logootSOp);
        }
        else if (this.logootSOp instanceof mute_structs_1.LogootSDel &&
            aOther.logootSOp instanceof mute_structs_1.LogootSDel) {
            return result && this.logootSOp.equals(aOther.logootSOp);
        }
        return false;
    };
    return RichLogootSOperation;
}());
exports.RichLogootSOperation = RichLogootSOperation;
//# sourceMappingURL=RichLogootSOperation.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Interval_1 = __webpack_require__(9);
/**
 * Keep track of the messages delivered by peers
 * Allow to maintain the causal delivery per peer
 */
var StateVector = /** @class */ (function () {
    function StateVector(otherMap) {
        if (otherMap) {
            otherMap.forEach(function (value) {
                console.assert(value >= 0, "Each value of a state vector must be positive");
            });
        }
        this.vector = new Map(otherMap);
    }
    StateVector.prototype.get = function (id) {
        return this.vector.get(id);
    };
    /**
     * Update the registered clock for a peer
     * The clock must be valid for the update to be perform
     * @param id The peer id
     * @param clock The message clock
     */
    StateVector.prototype.set = function (id, clock) {
        console.assert(clock >= 0, "clock must be positive");
        console.assert(this.isDeliverable(id, clock));
        this.vector.set(id, clock);
    };
    StateVector.prototype.clear = function () {
        this.vector.clear();
    };
    Object.defineProperty(StateVector.prototype, "size", {
        get: function () {
            return this.vector.size;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check if a message has already been delivered
     * @param id The peer id
     * @param clock The message clock
     */
    StateVector.prototype.isAlreadyDelivered = function (id, clock) {
        var v = this.get(id);
        return v !== undefined && v >= clock;
    };
    /**
     * Check if a message can be delivered
     * A message can be delivered if:
     *   - It is a new peer and the clock is equal to 0
     *   - The clock is equal to the registered clock + 1
     * @param id The peer id
     * @param clock The message clock
     */
    StateVector.prototype.isDeliverable = function (id, clock) {
        if (this.isAlreadyDelivered(id, clock)) {
            return false;
        }
        var v = this.get(id);
        if (v === undefined) {
            return clock === 0;
        }
        return clock === v + 1;
    };
    StateVector.prototype.forEach = function (f) {
        this.vector.forEach(f);
    };
    StateVector.prototype.asMap = function () {
        return new Map(this.vector);
    };
    /**
     * Compute the intervals representing the messages known by other but not by this
     * @param other
     */
    StateVector.prototype.computeMissingIntervals = function (other) {
        var _this = this;
        var missingIntervals = [];
        other.vector.forEach(function (clock, id) {
            var v = _this.get(id);
            if (v === undefined) {
                var begin = 0;
                var end = clock;
                missingIntervals.push(new Interval_1.Interval(id, begin, end));
            }
            else if (v < clock) {
                var begin = v + 1;
                var end = clock;
                missingIntervals.push(new Interval_1.Interval(id, begin, end));
            }
        });
        return missingIntervals;
    };
    return StateVector;
}());
exports.StateVector = StateVector;
//# sourceMappingURL=StateVector.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = __webpack_require__(54);
function createLogger(logIntoFile, logLevel) {
    const options = {
        name: 'mute-bot-storage',
    };
    if (logIntoFile) {
        options.streams = [{
                type: 'rotating-file',
                period: '1d',
                count: 3,
                path: `./${options.name}.log`,
            }];
    }
    exports.log = bunyan.createLogger(options);
    switch (logLevel) {
        case 'none':
            exports.log.level(bunyan.FATAL + 1);
            break;
        case 'trace':
            exports.log.level(bunyan.TRACE);
            break;
        case 'debug':
            exports.log.level(bunyan.DEBUG);
            break;
        case 'info':
            exports.log.level(bunyan.INFO);
            break;
        case 'warn':
            exports.log.level(bunyan.WARN);
            break;
        case 'error':
            exports.log.level(bunyan.ERROR);
            break;
        case 'fatal':
            exports.log.level(bunyan.FATAL);
            break;
        default:
            exports.log.level(bunyan.INFO);
    }
}
exports.createLogger = createLogger;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("uws");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(16);
exports.Collaborator = _1.Collaborator;
exports.CollaboratorsService = _1.CollaboratorsService;
var _2 = __webpack_require__(18);
exports.DocService = _2.DocService;
var _3 = __webpack_require__(5);
exports.BroadcastMessage = _3.BroadcastMessage;
exports.JoinEvent = _3.JoinEvent;
exports.NetworkMessage = _3.NetworkMessage;
exports.SendRandomlyMessage = _3.SendRandomlyMessage;
exports.SendToMessage = _3.SendToMessage;
exports.AbstractMessage = _3.AbstractMessage;
var MuteCore_1 = __webpack_require__(50);
exports.MuteCore = MuteCore_1.MuteCore;
var _4 = __webpack_require__(25);
exports.RichLogootSOperation = _4.RichLogootSOperation;
exports.State = _4.State;
//# sourceMappingURL=index.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Collaborator_1 = __webpack_require__(17);
exports.Collaborator = Collaborator_1.Collaborator;
var CollaboratorsService_1 = __webpack_require__(39);
exports.CollaboratorsService = CollaboratorsService_1.CollaboratorsService;
//# sourceMappingURL=index.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Collaborator = /** @class */ (function () {
    function Collaborator(id, pseudo) {
        this.id = id;
        this.pseudo = pseudo;
    }
    return Collaborator;
}());
exports.Collaborator = Collaborator;
//# sourceMappingURL=Collaborator.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DocService_1 = __webpack_require__(46);
exports.DocService = DocService_1.DocService;
//# sourceMappingURL=index.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var identifier_1 = __webpack_require__(2);
var logootsropes_1 = __webpack_require__(4);
/**
 * Represents a LogootSplit insert operation.
 */
var LogootSAdd = /** @class */ (function () {
    /**
    * @constructor
    * @param {Identifier} id - the identifier that localise the insertion in the logoot sequence.
    * @param {string} content - the content of the block to be inserted.
    */
    function LogootSAdd(id, content) {
        console.assert(content.length > 0, "content must not be empty");
        this.id = id;
        this.content = content;
    }
    LogootSAdd.fromPlain = function (o) {
        if (typeof o === "object" && o !== null) {
            var plainId = o.id;
            var content = o.content;
            if (typeof content === "string" && content.length > 0) {
                var id = identifier_1.Identifier.fromPlain(plainId);
                if (id !== null) {
                    return new LogootSAdd(id, content);
                }
            }
            // For backward compatibility
            // Allow to replay and update previous log of operations
            var l = o["l"];
            if (typeof l === "string" && l.length > 0) {
                var id = identifier_1.Identifier.fromPlain(plainId);
                if (id !== null) {
                    return new LogootSAdd(id, l);
                }
            }
        }
        return null;
    };
    LogootSAdd.prototype.equals = function (aOther) {
        return this.id.equals(aOther.id) &&
            this.content === aOther.content;
    };
    /**
    * Apply the current insert operation to a LogootSplit document.
    * @param {LogootSRopes} doc - the LogootSplit document on which the operation wil be applied.
    * @return {TextInsert[]} the insertion to be applied on the sequence representing the document content.
    */
    LogootSAdd.prototype.execute = function (doc) {
        console.assert(doc instanceof logootsropes_1.LogootSRopes, "doc = ", doc);
        return doc.addBlock(this.content, this.id);
    };
    return LogootSAdd;
}());
exports.LogootSAdd = LogootSAdd;
//# sourceMappingURL=logootsadd.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var identifierinterval_1 = __webpack_require__(3);
var logootsropes_1 = __webpack_require__(4);
var arrayConcat = Array.prototype.concat;
/**
 * Represents a LogootSplit delete operation.
 */
var LogootSDel = /** @class */ (function () {
    /**
    * @constructor
    * @param {IdentifierInterval[]} lid - the list of identifier that localise the deletion in the logoot sequence.
    */
    function LogootSDel(lid) {
        console.assert(lid.length > 0, "lid must not be empty");
        this.lid = lid;
    }
    LogootSDel.fromPlain = function (o) {
        if (typeof o === "object" && o !== null) {
            var plainLid = o.lid;
            if (plainLid instanceof Array && plainLid.length > 0) {
                var isOk = true;
                var i = 0;
                var lid = [];
                while (isOk && i < plainLid.length) {
                    var idi = identifierinterval_1.IdentifierInterval.fromPlain(plainLid[i]);
                    if (idi !== null) {
                        lid.push(idi);
                    }
                    else {
                        isOk = false;
                    }
                    i++;
                }
                if (isOk) {
                    return new LogootSDel(lid);
                }
            }
        }
        return null;
    };
    LogootSDel.prototype.equals = function (aOther) {
        return this.lid.length === aOther.lid.length &&
            this.lid.every(function (idInterval, index) {
                var otherIdInterval = aOther.lid[index];
                return idInterval.equals(otherIdInterval);
            });
    };
    /**
    * Apply the current delete operation to a LogootSplit document.
    * @param {LogootSRopes} doc - the LogootSplit document on which the deletions wil be performed.
    * @return {TextDelete[]} the list of deletions to be applied on the sequence representing the document content.
    */
    LogootSDel.prototype.execute = function (doc) {
        console.assert(doc instanceof logootsropes_1.LogootSRopes, "doc = ", doc);
        return arrayConcat.apply([], this.lid.map(function (aId) { return doc.delBlock(aId); }));
    };
    return LogootSDel;
}());
exports.LogootSDel = LogootSDel;
//# sourceMappingURL=logootsdel.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var identifierinterval_1 = __webpack_require__(3);
var logootsblock_1 = __webpack_require__(8);
/**
* @param aNode may be null
* @returns Height of aNode or 0 if aNode is null
*/
function heightOf(aNode) {
    console.assert(aNode === null || aNode instanceof RopesNodes, "aNode = ", aNode);
    if (aNode !== null) {
        return aNode.height;
    }
    else {
        return 0;
    }
}
/**
* @param aNode may be null
* @returns size of aNode (including children sizes) or 0 if aNode is null
*/
function subtreeSizeOf(aNode) {
    console.assert(aNode === null || aNode instanceof RopesNodes, "aNode = ", aNode);
    if (aNode !== null) {
        return aNode.sizeNodeAndChildren;
    }
    else {
        return 0;
    }
}
var RopesNodes = /** @class */ (function () {
    // Creation
    function RopesNodes(block, actualBegin, length, left, right) {
        console.assert(Number.isInteger(actualBegin), "actualBegin must be an integer");
        console.assert(block.idInterval.begin <= actualBegin, "actualBegin must be greater than or equal to idInterval.begin");
        this.block = block;
        this.actualBegin = actualBegin;
        this.length = length;
        this.left = left;
        this.right = right;
        this.height = Math.max(heightOf(left), heightOf(right)) + 1;
        this.sizeNodeAndChildren = length +
            subtreeSizeOf(left) + subtreeSizeOf(right);
    }
    RopesNodes.fromPlain = function (o) {
        if (typeof o === "object" && o !== null) {
            var plainBlock = o.block;
            var actualBegin = o.actualBegin;
            var length = o.length;
            var plainLeft = o.left;
            var plainRight = o.right;
            if (plainBlock instanceof Object &&
                typeof actualBegin === "number" && Number.isInteger(actualBegin) &&
                typeof length === "number" && Number.isInteger(length) &&
                length >= 0) {
                var block = logootsblock_1.LogootSBlock.fromPlain(plainBlock);
                var right = RopesNodes.fromPlain(plainRight);
                var left = RopesNodes.fromPlain(plainLeft);
                if (block !== null &&
                    block.idInterval.begin <= actualBegin &&
                    (block.idInterval.end - block.idInterval.begin) >= length - 1) {
                    return new RopesNodes(block, actualBegin, length, left, right);
                }
            }
        }
        return null;
    };
    RopesNodes.leaf = function (aBlock, aOffset, aLength) {
        console.assert(aBlock instanceof logootsblock_1.LogootSBlock, "aBlock = ", aBlock);
        console.assert(typeof aOffset === "number", "aOffset = " + aOffset);
        console.assert(typeof aLength === "number", "aLength = " + aLength);
        console.assert(aLength > 0, "" + aLength, " > 0");
        aBlock.addBlock(aOffset, aLength); // Mutation
        return new RopesNodes(aBlock, aOffset, aLength, null, null);
    };
    Object.defineProperty(RopesNodes.prototype, "actualEnd", {
        get: function () {
            return this.actualBegin + this.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    RopesNodes.prototype.getIdBegin = function () {
        return this.block.idInterval.getBaseId(this.actualBegin);
    };
    RopesNodes.prototype.getIdEnd = function () {
        return this.block.idInterval.getBaseId(this.actualEnd);
    };
    RopesNodes.prototype.addString = function (length) {
        console.assert(typeof length === "number", "length = " + length);
        // `length' may be negative
        this.sizeNodeAndChildren += length;
    };
    RopesNodes.prototype.appendEnd = function (length) {
        console.assert(typeof length === "number", "length = ", length);
        console.assert(length > 0, "" + length, " > 0");
        var b = this.actualEnd + 1;
        this.length += length;
        this.block.addBlock(b, length);
        return this.block.idInterval.getBaseId(b);
    };
    RopesNodes.prototype.appendBegin = function (length) {
        console.assert(typeof length === "number", "length = ", length);
        console.assert(length > 0, "" + length, " > 0");
        this.actualBegin -= length;
        this.length += length;
        this.block.addBlock(this.actualBegin, length);
        return this.getIdBegin();
    };
    /**
     * Delete a interval of identifiers belonging to this node
     * Reduces the node's {@link RopesNodes#length} and/or shifts its {@link RopesNodes#offset}
     * May also trigger a split of the current node if the deletion cuts it in two parts
     *
     * @param {number} begin The start of the interval to delete
     * @param {number} end The end of the interval to delete
     * @returns {RopesNodes | null} The resulting block if a split occured, null otherwise
     */
    RopesNodes.prototype.deleteOffsets = function (begin, end) {
        console.assert(typeof begin === "number" && Number.isInteger(begin), "begin = " + begin);
        console.assert(typeof end === "number" && Number.isInteger(end), "end = " + end);
        console.assert(begin <= end, "begin <= end: " + begin, " <= " + end);
        console.assert(this.block.idInterval.begin <= begin, "this.block.idInterval.begin <= to begin: " + this.block.idInterval.begin, " <= " + begin);
        console.assert(end <= this.block.idInterval.end, "end <= this.block.idInterval.end: " + end, " <= " + this.block.idInterval.end);
        var ret = null;
        // Some identifiers may have already been deleted by a previous operation
        // Need to update the range of the deletion accordingly
        // NOTE: actualEnd can be < to actualBegin if all the range has previously been deleted
        var actualBegin = Math.max(this.actualBegin, begin);
        var actualEnd = Math.min(this.actualEnd, end);
        if (actualBegin <= actualEnd) {
            var sizeToDelete = actualEnd - actualBegin + 1;
            this.block.delBlock(sizeToDelete);
            if (sizeToDelete !== this.length) {
                if (actualBegin === this.actualBegin) {
                    // Deleting the beginning of the block
                    this.actualBegin = actualEnd + 1;
                }
                else if (actualEnd !== this.actualEnd) {
                    // Deleting the middle of the block
                    ret = this.split(actualEnd - this.actualBegin + 1, null);
                }
            }
            this.length = this.length - sizeToDelete;
        }
        return ret;
    };
    RopesNodes.prototype.split = function (size, node) {
        console.assert(typeof size === "number", "size = ", size);
        console.assert(node instanceof RopesNodes || node === null, "node = ", node);
        var newRight = new RopesNodes(this.block, this.actualBegin + size, this.length - size, node, this.right);
        this.length = size;
        this.right = newRight;
        this.height = Math.max(this.height, newRight.height);
        return newRight;
    };
    RopesNodes.prototype.leftSubtreeSize = function () {
        return subtreeSizeOf(this.left);
    };
    RopesNodes.prototype.rightSubtreeSize = function () {
        return subtreeSizeOf(this.right);
    };
    RopesNodes.prototype.sumDirectChildren = function () {
        this.height = Math.max(heightOf(this.left), heightOf(this.right)) + 1;
        this.sizeNodeAndChildren = this.leftSubtreeSize() + this.rightSubtreeSize() + this.length;
    };
    RopesNodes.prototype.replaceChildren = function (node, by) {
        if (this.left === node) {
            this.left = by;
        }
        else if (this.right === node) {
            this.right = by;
        }
    };
    RopesNodes.prototype.balanceScore = function () {
        return heightOf(this.right) - heightOf(this.left);
    };
    RopesNodes.prototype.become = function (node) {
        this.sizeNodeAndChildren = -this.length + node.length;
        this.length = node.length;
        this.actualBegin = node.actualBegin;
        this.block = node.block;
    };
    RopesNodes.prototype.isAppendableAfter = function () {
        return this.block.mine && this.block.idInterval.end === this.actualEnd;
    };
    RopesNodes.prototype.isAppendableBefore = function () {
        return this.block.mine && this.block.idInterval.begin === this.actualBegin;
    };
    RopesNodes.prototype.toString = function () {
        var current = (new identifierinterval_1.IdentifierInterval(this.block.idInterval.base, this.actualBegin, this.actualEnd)).toString();
        var leftToString = (this.left !== null) ? this.left.toString() : "\t#";
        var rightToString = (this.right !== null) ? this.right.toString() : "\t#";
        return rightToString.replace(/(\t+)/g, "\t$1") + "\n" +
            "\t" + current + "\n" +
            leftToString.replace(/(\t+)/g, "\t$1");
    };
    /**
     * @return linear representation
     */
    RopesNodes.prototype.toList = function () {
        var idInterval = new identifierinterval_1.IdentifierInterval(this.block.idInterval.base, this.actualBegin, this.actualEnd);
        var leftList = (this.left !== null) ? this.left.toList() : [];
        var rightList = (this.right !== null) ? this.right.toList() : [];
        return leftList.concat(idInterval, rightList);
    };
    RopesNodes.prototype.getIdentifierInterval = function () {
        return new identifierinterval_1.IdentifierInterval(this.block.idInterval.base, this.actualBegin, this.actualEnd);
    };
    RopesNodes.prototype.getBlocks = function () {
        var result = [this.block];
        var left = this.left;
        if (left !== null) {
            result = result.concat(left.getBlocks());
        }
        var right = this.right;
        if (right !== null) {
            result = result.concat(right.getBlocks());
        }
        return result;
    };
    return RopesNodes;
}());
exports.RopesNodes = RopesNodes;
//# sourceMappingURL=ropesnodes.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var logootsropes_1 = __webpack_require__(4);
/**
 * Represents a sequence operation (deletion).
 */
var TextDelete = /** @class */ (function () {
    /**
    * @constructor
    * @param {number} offset - the position of the first element to be deleted in the sequence.
    * @param {number} length - the length of the range to be deleted in the sequence.
    */
    function TextDelete(offset, length) {
        console.assert(typeof offset === "number" && Number.isInteger(offset), "offset = ", offset);
        console.assert(typeof length === "number" && Number.isInteger(length), "length = ", length);
        console.assert(length > 0, "" + length + " > 0");
        this.offset = offset;
        this.length = length;
    }
    TextDelete.prototype.equals = function (other) {
        return this.offset === other.offset &&
            this.length === other.length;
    };
    /**
    * Apply the current delete operation to a LogootSplit document.
    * @param {LogootSDocument} doc - the LogootSplit document on which the deletion wil be performed.
    * @return {LogootSDel} the logootsplit deletion that is related to the deletion that has been performed.
    */
    TextDelete.prototype.applyTo = function (doc) {
        console.assert(doc instanceof logootsropes_1.LogootSRopes, "doc = ", doc);
        return doc.delLocal(this.offset, this.offset + this.length - 1);
    };
    return TextDelete;
}());
exports.TextDelete = TextDelete;
//# sourceMappingURL=textdelete.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var logootsropes_1 = __webpack_require__(4);
/**
 * Represents a sequence operation (insert).
 */
var TextInsert = /** @class */ (function () {
    /**
    * @constructor
    * @param {number} offset - the insertion position in the sequence.
    * @param {string} content - the content to be inserted in the sequence.
    */
    function TextInsert(offset, content) {
        console.assert(typeof offset === "number" && Number.isInteger(offset), "offset = ", offset);
        console.assert(typeof content === "string", "content = ", content);
        this.offset = offset;
        this.content = content;
    }
    TextInsert.prototype.equals = function (other) {
        return this.offset === other.offset &&
            this.content === other.content;
    };
    /**
    * Apply the current insert operation to a LogootSplit document.
    * @param {LogootSDocument} doc - the LogootSplit document on which the insertion wil be performed.
    * @return {LogootSAdd} the logootsplit insertion that is related to the insertion that has been performed.
    */
    TextInsert.prototype.applyTo = function (doc) {
        console.assert(doc instanceof logootsropes_1.LogootSRopes, "doc = ", doc);
        return doc.insertLocal(this.offset, this.content);
    };
    return TextInsert;
}());
exports.TextInsert = TextInsert;
//# sourceMappingURL=textinsert.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2016 Victorien Elvinger
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
  * Insert a string at a specific position in an existing string.
  * @param {string} aOriginal - the string in which to insert the new content.
  * @param {number} index - the position where to perform the insertion.
  * @param {string} string - the string to be inserted.
  * @return {string} the resulting string aOriginal[0:index]+string+aOriginal[index+1:aOriginal.length-1].
  */
function insert(aOriginal, index, str) {
    console.assert(typeof aOriginal === "string", "aOriginal = ", aOriginal);
    console.assert(typeof index === "number", "index = ", index);
    console.assert(typeof str === "string", "string = " + str);
    var positiveIndex = Math.max(0, index);
    return aOriginal.slice(0, positiveIndex) +
        str +
        aOriginal.slice(positiveIndex);
}
exports.insert = insert;
/**
  * Remove a range of characters from a string.
  * @param {string} aOriginal - the string in which to insert the new content.
  * @param {number} begin - the beginning index of the range to be removed.
  * @param {number} end - the end index of the range to be removed.
  * @return {string} the resulting string aOriginal[0:begin]+aOriginal[end:aOriginal.length-1].
  */
function del(aOriginal, begin, end) {
    console.assert(typeof aOriginal === "string", "aOriginal = ", aOriginal);
    console.assert(typeof begin === "number", "begin = ", begin);
    console.assert(typeof end === "number", "end = ", end);
    return aOriginal.slice(0, begin) +
        aOriginal.slice(end + 1);
}
exports.del = del;
/**
  * Compute the number of disjoint-occurence of a string within a string.
  * @param {string} string - the string in which to count occurences.
  * @param {string} substring - the substring to look for.
  * @return {number} the occurence count.
  */
function occurrences(str, substring) {
    console.assert(typeof str === "string", "string = " + str);
    console.assert(typeof substring === "string", "substring = ", substring);
    var result = 0;
    var substringLength = substring.length;
    var pos = str.indexOf(substring);
    while (pos !== -1) {
        result++;
        pos = str.indexOf(substring, pos + substringLength);
    }
    return result;
}
exports.occurrences = occurrences;
//# sourceMappingURL=textutils.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Interval_1 = __webpack_require__(9);
exports.Interval = Interval_1.Interval;
var ReplySyncEvent_1 = __webpack_require__(10);
exports.ReplySyncEvent = ReplySyncEvent_1.ReplySyncEvent;
var RichLogootSOperation_1 = __webpack_require__(11);
exports.RichLogootSOperation = RichLogootSOperation_1.RichLogootSOperation;
var State_1 = __webpack_require__(26);
exports.State = State_1.State;
var StateVector_1 = __webpack_require__(12);
exports.StateVector = StateVector_1.StateVector;
var SyncService_1 = __webpack_require__(51);
exports.SyncService = SyncService_1.SyncService;
var SyncMessageService_1 = __webpack_require__(52);
exports.SyncMessageService = SyncMessageService_1.SyncMessageService;
//# sourceMappingURL=index.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var State = /** @class */ (function () {
    function State(vector, richLogootSOps) {
        this.vector = vector;
        this.richLogootSOps = richLogootSOps;
    }
    return State;
}());
exports.State = State;
//# sourceMappingURL=State.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const program = __webpack_require__(28);
const http = __webpack_require__(29);
const koaCors = __webpack_require__(30);
const Koa = __webpack_require__(31);
const bodyParser = __webpack_require__(32);
const KoaRouter = __webpack_require__(33);
const netflux_1 = __webpack_require__(34);
const BotStorage_1 = __webpack_require__(38);
const log_1 = __webpack_require__(13);
const MongooseAdapter_1 = __webpack_require__(56);
// Default options
const defaults = {
    name: 'Repono',
    host: '0.0.0.0',
    port: 20000,
    botURL: 'ws://localhost:20000',
    signalingURL: 'ws://localhost:10000',
    useHttps: false,
    key: '',
    cert: '',
    ca: '',
    logLevel: 'info',
    logIntoFile: false,
};
// Configure command-line interface
program
    .option('-n, --name <bot name>', `Bot name. Default: "${defaults.name}"`, defaults.name)
    .option('-h, --host <ip or host name>', `Host address to bind to, Default: "${defaults.host}"`, defaults.host)
    .option('-p, --port <n>', `Port to use for the server. Default: ${defaults.port}`, defaults.port)
    .option('-b, --botURL <n>', `Bot public URL, to be shared on the p2p network. Default: ${defaults.botURL}`, defaults.botURL)
    .option('-s, --signalingURL <url>', `Signaling server url. Default: ${defaults.signalingURL}\n`, defaults.signalingURL)
    .option('-t, --https', `If present, the REST API server is listening on HTTPS instead of HTTP`)
    .option('-k, --key <value>', `Private key for the certificate`)
    .option('-c, --cert <value>', `The server certificate`)
    .option('-a, --ca <value>', `The additional intermediate certificate or certificates that web browsers
      will need in order to validate the server certificate.`)
    .option('-l, --logLevel <none|trace|debug|info|warn|error|fatal>', `Logging level. Default: "info". `, /^(none|trace|debug|info|warn|error|fatal)$/i, defaults.logLevel)
    .option('-f, --logFile', `If specified, writes logs into file`)
    .parse(process.argv);
if (!program.host) {
    throw new Error('-h, --host options is required');
}
// Command line parameters
const { name, host, port, botURL, signalingURL, key, cert, ca, logLevel } = program;
const useHttps = program.useHttps ? true : false;
const logIntoFile = program.logFile ? true : false;
// Configure logging
log_1.createLogger(logIntoFile, logLevel);
// Configure error handling on process
process.on('uncaughtException', (err) => log_1.log.fatal(err));
// Connect to MongoDB
const error = null;
const db = new MongooseAdapter_1.MongooseAdapter();
db.connect('localhost')
    .then(() => {
    log_1.log.info(`Connected to the database  ✓`);
    // Configure routes
    // Instantiate main objects
    const app = new Koa();
    const router = new KoaRouter();
    router
        .get('/name', (ctx, next) => {
        ctx.body = name;
    })
        .post('/exist', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        const keys = ctx.request.body;
        const existedKeys = yield db.whichExist(keys);
        ctx.body = JSON.stringify(existedKeys);
    }))
        .get('/docs', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        yield db.list()
            .then((docs) => {
            const docList = docs.map((doc) => ({ id: doc.key }));
            ctx.body = docList;
        })
            .catch((err) => {
            log_1.log.error('Could not retreive the document list stored in database', err);
            ctx.status = 500;
        });
    }));
    // Apply router and cors middlewares
    return app
        .use(bodyParser())
        .use(koaCors())
        .use(router.routes())
        .use(router.allowedMethods());
})
    .then((app) => {
    log_1.log.info(`Configured routes  ✓`);
    // Create server
    if (useHttps) {
        const fs = __webpack_require__(58);
        return __webpack_require__(59).createServer({
            key: fs.readFileSync(key),
            cert: fs.readFileSync(cert),
            ca: fs.readFileSync(ca),
        }, app.callback());
    }
    else {
        return http.createServer(app.callback());
    }
})
    .then((server) => {
    log_1.log.info(`Configured server  ✓`);
    // Configure storage bot
    const bot = new netflux_1.WebGroupBotServer({ url: botURL, server, webGroupOptions: { signalingURL } });
    bot.onWebGroup = (wg) => {
        log_1.log.info('New peer to peer network invitation received. Waiting for a document key...');
        const botStorage = new BotStorage_1.BotStorage(name, wg, db);
        wg.onStateChange = (state) => {
            if (state === netflux_1.WebGroupState.JOINED) {
                botStorage.sendKeyRequest(wg);
            }
        };
    };
    return new Promise((resolve, reject) => {
        // Start the server
        server.listen(port, host, resolve);
    });
})
    .then(() => {
    log_1.log.info(`Successfully started the storage bot server at ${host}:${port} with the following settings`, { name, host, port, botURL, signalingURL, useHttps, logLevel, logIntoFile });
})
    .catch((err) => {
    log_1.log.fatal(err);
});


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("kcors");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebGroupBotServer", function() { return WebGroupBotServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableLog", function() { return enableLog$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignalingState", function() { return SignalingState$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Topology", function() { return Topology; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebGroup", function() { return WebGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebGroupState", function() { return WebGroupState; });
try {
    var wrtc = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"wrtc\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    global.RTCPeerConnection = wrtc.RTCPeerConnection;
    global.RTCDataChannel = wrtc.RTCDataChannel;
    global.RTCIceCandidate = wrtc.RTCIceCandidate;
}
catch (err) {
    console.warn(err.message);
}
global.WebSocket = __webpack_require__(14);
var textEncoding = __webpack_require__(35);
global.TextEncoder = textEncoding.TextEncoder;
global.TextDecoder = textEncoding.TextDecoder;
global.crypto = __webpack_require__(36);
global.Event = (function () {
    function Event(name) {
        this.name = name;
    }
    return Event;
}());

/**
 * ECMAScript Proposal, specs, and reference implementation for `global`
 * http://tc39.github.io/proposal-global/
 * Code copied from: https://github.com/tc39/proposal-global
 */
(function (global) {
    if (!global.global) {
        if (Object.defineProperty) {
            Object.defineProperty(global, 'global', {
                configurable: true,
                enumerable: false,
                value: global,
                writable: true,
            });
        }
        else {
            global.global = global;
        }
    }
})(Function('return this')()); // tslint:disable-line

var TopologyEnum;
(function (TopologyEnum) {
    TopologyEnum[TopologyEnum["FULL_MESH"] = 0] = "FULL_MESH";
})(TopologyEnum || (TopologyEnum = {}));

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

"use strict";
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof commonjsGlobal !== 'undefined' && commonjsGlobal;
var _root = __window || __global || __self;
var root_1 = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();


var root = {
	root: root_1
};

"use strict";
function isFunction(x) {
    return typeof x === 'function';
}
var isFunction_2 = isFunction;


var isFunction_1 = {
	isFunction: isFunction_2
};

"use strict";
var isArray_1 = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });


var isArray = {
	isArray: isArray_1
};

"use strict";
function isObject(x) {
    return x != null && typeof x === 'object';
}
var isObject_2 = isObject;


var isObject_1 = {
	isObject: isObject_2
};

"use strict";
// typeof any so that it we don't have to cast when comparing a result to the error object
var errorObject_1 = { e: {} };


var errorObject = {
	errorObject: errorObject_1
};

"use strict";

var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject.errorObject.e = e;
        return errorObject.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
var tryCatch_2 = tryCatch;



var tryCatch_1 = {
	tryCatch: tryCatch_2
};

"use strict";
var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends$2(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
var UnsubscriptionError_2 = UnsubscriptionError;


var UnsubscriptionError_1 = {
	UnsubscriptionError: UnsubscriptionError_2
};

"use strict";






/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject.errorObject.e.errors) : [errorObject.errorObject.e]);
            }
        }
        if (isArray.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
var Subscription_2 = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}


var Subscription_1 = {
	Subscription: Subscription_2
};

"use strict";
var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};


var Observer = {
	empty: empty
};

var rxSubscriber = createCommonjsModule(function (module, exports) {
"use strict";

var Symbol = root.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;

});

"use strict";
var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};




/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends$1(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
var Subscriber_2 = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends$1(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));


var Subscriber_1 = {
	Subscriber: Subscriber_2
};

"use strict";



function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber.rxSubscriber]) {
            return nextOrObserver[rxSubscriber.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
var toSubscriber_2 = toSubscriber;


var toSubscriber_1 = {
	toSubscriber: toSubscriber_2
};

var observable = createCommonjsModule(function (module, exports) {
"use strict";

function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;

});

"use strict";



/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable$$1 = new Observable();
        observable$$1.source = this;
        observable$$1.operator = operator;
        return observable$$1;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root.root.Rx && root.root.Rx.config && root.root.Rx.config.Promise) {
                PromiseCtor = root.root.Rx.config.Promise;
            }
            else if (root.root.Promise) {
                PromiseCtor = root.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable.observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
var Observable_2 = Observable;


var Observable_1 = {
	Observable: Observable_2
};

"use strict";
var __extends$3 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends$3(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
var ObjectUnsubscribedError_2 = ObjectUnsubscribedError;


var ObjectUnsubscribedError_1 = {
	ObjectUnsubscribedError: ObjectUnsubscribedError_2
};

"use strict";
var __extends$4 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends$4(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1.Subscription));
var SubjectSubscription_2 = SubjectSubscription;


var SubjectSubscription_1 = {
	SubjectSubscription: SubjectSubscription_2
};

"use strict";
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};






/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
var SubjectSubscriber_1 = SubjectSubscriber;
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber.rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
var Subject_2 = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
var AnonymousSubject_1 = AnonymousSubject;


var Subject_1 = {
	SubjectSubscriber: SubjectSubscriber_1,
	Subject: Subject_2,
	AnonymousSubject: AnonymousSubject_1
};

/**
 * Equals to true in any browser.
 */
var isBrowser = (typeof global.window === 'undefined') ? false : true;
/**
 * Equals to true in Firefox and false elsewhere.
 * Thanks to https://github.com/lancedikson/bowser
 */
var isFirefox = (isBrowser &&
    navigator !== undefined &&
    navigator.userAgent !== undefined &&
    /firefox|iceweasel|fxios/i.test(navigator.userAgent)) ? true : false;
/**
 * Check whether the string is a valid URL.
 */
function isURL(str) {
    var regex = '^' +
        // protocol identifier
        '(?:wss|ws)://' +
        // Host name/IP
        '[^\\s]+' +
        // port number
        '(?::\\d{2,5})?' +
        '$';
    return (new RegExp(regex, 'i')).test(str);
}
/**
 * Generate random key which will be used to join the network.
 */
function generateKey() {
    var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var length = 42; // Should be less then MAX_KEY_LENGTH value
    var values = randNumbers(length);
    var result = '';
    for (var i = 0; i < length; i++) {
        result += mask[values[i] % mask.length];
    }
    return result;
}
function randNumbers(length) {
    if (length === void 0) { length = 1; }
    var res;
    if (isBrowser) {
        res = new Uint32Array(length);
        global.crypto.getRandomValues(res);
    }
    else {
        res = [];
        var bytes = crypto.randomBytes(4 * length);
        for (var i = 0; i < bytes.length; i += 4) {
            res[res.length] = bytes.readUInt32BE(i, true);
        }
    }
    return res;
}
var MAX_KEY_LENGTH = 512;
var netfluxCSS = 'background-color: #FFCA28; padding: 0 3px';
var signalingStateCSS = 'background-color: #9FA8DA; padding: 0 2px';
var webGroupStateCSS = 'background-color: #EF9A9A; padding: 0 2px';
var log;
function enableLog$1(isDebug) {
    if (isDebug) {
        log = {
            info: function (msg) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                if (rest.length === 0) {
                    console.info("%cNETFLUX%c: " + msg, netfluxCSS, '');
                }
                else {
                    console.info("%cNETFLUX%c: " + msg, rest, netfluxCSS, '');
                }
            },
            signalingState: function (msg) {
                console.info("%cNETFLUX%c: Signaling: %c" + msg + "%c", netfluxCSS, '', signalingStateCSS, '');
            },
            webGroupState: function (msg) {
                console.info("%cNETFLUX%c: WebGroup: %c" + msg + "%c", netfluxCSS, '', webGroupStateCSS, '');
            },
        };
    }
    else {
        log = {
            info: function () { },
            signalingState: function () { },
            webGroupState: function () { },
        };
    }
}
enableLog$1(false);

var commonjsGlobal$1 = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

"use strict";

var aspromise = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx /*, varargs */) {
    var params = new Array(arguments.length - 1),
        offset = 0,
        index = 2,
        pending = true;
    while (index < arguments.length) {
        params[offset++] = arguments[index++];
    }return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err /*, varargs */) {
            if (pending) {
                pending = false;
                if (err) reject(err);else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length) {
                        params[offset++] = arguments[offset];
                    }resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}

var base64_1 = createCommonjsModule$1(function (module, exports) {
    "use strict";

    /**
     * A minimal base64 implementation for number arrays.
     * @memberof util
     * @namespace
     */

    var base64 = exports;

    /**
     * Calculates the byte length of a base64 encoded string.
     * @param {string} string Base64 encoded string
     * @returns {number} Byte length
     */
    base64.length = function length(string) {
        var p = string.length;
        if (!p) return 0;
        var n = 0;
        while (--p % 4 > 1 && string.charAt(p) === "=") {
            ++n;
        }return Math.ceil(string.length * 3) / 4 - n;
    };

    // Base64 encoding table
    var b64 = new Array(64);

    // Base64 decoding table
    var s64 = new Array(123);

    // 65..90, 97..122, 48..57, 43, 47
    for (var i = 0; i < 64;) {
        s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    } /**
       * Encodes a buffer to a base64 encoded string.
       * @param {Uint8Array} buffer Source buffer
       * @param {number} start Source start
       * @param {number} end Source end
       * @returns {string} Base64 encoded string
       */
    base64.encode = function encode(buffer, start, end) {
        var parts = null,
            chunk = [];
        var i = 0,
            // output index
        j = 0,
            // goto index
        t; // temporary
        while (start < end) {
            var b = buffer[start++];
            switch (j) {
                case 0:
                    chunk[i++] = b64[b >> 2];
                    t = (b & 3) << 4;
                    j = 1;
                    break;
                case 1:
                    chunk[i++] = b64[t | b >> 4];
                    t = (b & 15) << 2;
                    j = 2;
                    break;
                case 2:
                    chunk[i++] = b64[t | b >> 6];
                    chunk[i++] = b64[b & 63];
                    j = 0;
                    break;
            }
            if (i > 8191) {
                (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
                i = 0;
            }
        }
        if (j) {
            chunk[i++] = b64[t];
            chunk[i++] = 61;
            if (j === 1) chunk[i++] = 61;
        }
        if (parts) {
            if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
            return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
    };

    var invalidEncoding = "invalid encoding";

    /**
     * Decodes a base64 encoded string to a buffer.
     * @param {string} string Source string
     * @param {Uint8Array} buffer Destination buffer
     * @param {number} offset Destination offset
     * @returns {number} Number of bytes written
     * @throws {Error} If encoding is invalid
     */
    base64.decode = function decode(string, buffer, offset) {
        var start = offset;
        var j = 0,
            // goto index
        t; // temporary
        for (var i = 0; i < string.length;) {
            var c = string.charCodeAt(i++);
            if (c === 61 && j > 1) break;
            if ((c = s64[c]) === undefined) throw Error(invalidEncoding);
            switch (j) {
                case 0:
                    t = c;
                    j = 1;
                    break;
                case 1:
                    buffer[offset++] = t << 2 | (c & 48) >> 4;
                    t = c;
                    j = 2;
                    break;
                case 2:
                    buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                    t = c;
                    j = 3;
                    break;
                case 3:
                    buffer[offset++] = (t & 3) << 6 | c;
                    j = 0;
                    break;
            }
        }
        if (j === 1) throw Error(invalidEncoding);
        return offset - start;
    };

    /**
     * Tests if the specified string appears to be base64 encoded.
     * @param {string} string String to test
     * @returns {boolean} `true` if probably base64 encoded, otherwise false
     */
    base64.test = function test(string) {
        return (/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string)
        );
    };
});

"use strict";

var eventemitter = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn: fn,
        ctx: ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined) this._listeners = {};else {
        if (fn === undefined) this._listeners[evt] = [];else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;) {
                if (listeners[i].fn === fn) listeners.splice(i, 1);else ++i;
            }
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;) {
            args.push(arguments[i++]);
        }for (i = 0; i < listeners.length;) {
            listeners[i].fn.apply(listeners[i++].ctx, args);
        }
    }
    return this;
};

"use strict";

var float_1 = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function () {

        var f32 = new Float32Array([-0]),
            f8b = new Uint8Array(f32.buffer),
            le = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

        // float: ieee754
    })();else (function () {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) writeUint(1 / val > 0 ? /* positive */0 : /* negative 0 */2147483648, buf, pos);else if (isNaN(val)) writeUint(2143289344, buf, pos);else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
            ? sign * 1.401298464324817e-45 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function () {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

        // double: ieee754
    })();else (function () {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */0 : /* negative 0 */2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) {
                // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) {
                    // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024) exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
            ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos] = val & 255;
    buf[pos + 1] = val >>> 8 & 255;
    buf[pos + 2] = val >>> 16 & 255;
    buf[pos + 3] = val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos] = val >>> 24;
    buf[pos + 1] = val >>> 16 & 255;
    buf[pos + 2] = val >>> 8 & 255;
    buf[pos + 3] = val & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
}

"use strict";

var inquire_1 = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = undefined; // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length)) return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}

var utf8_1 = createCommonjsModule$1(function (module, exports) {
    "use strict";

    /**
     * A minimal UTF8 implementation for number arrays.
     * @memberof util
     * @namespace
     */

    var utf8 = exports;

    /**
     * Calculates the UTF8 byte length of a string.
     * @param {string} string String
     * @returns {number} Byte length
     */
    utf8.length = function utf8_length(string) {
        var len = 0,
            c = 0;
        for (var i = 0; i < string.length; ++i) {
            c = string.charCodeAt(i);
            if (c < 128) len += 1;else if (c < 2048) len += 2;else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
                ++i;
                len += 4;
            } else len += 3;
        }
        return len;
    };

    /**
     * Reads UTF8 bytes as a string.
     * @param {Uint8Array} buffer Source buffer
     * @param {number} start Source start
     * @param {number} end Source end
     * @returns {string} String read
     */
    utf8.read = function utf8_read(buffer, start, end) {
        var len = end - start;
        if (len < 1) return "";
        var parts = null,
            chunk = [],
            i = 0,
            // char offset
        t; // temporary
        while (start < end) {
            t = buffer[start++];
            if (t < 128) chunk[i++] = t;else if (t > 191 && t < 224) chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;else if (t > 239 && t < 365) {
                t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
                chunk[i++] = 0xD800 + (t >> 10);
                chunk[i++] = 0xDC00 + (t & 1023);
            } else chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
            if (i > 8191) {
                (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
                i = 0;
            }
        }
        if (parts) {
            if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
            return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
    };

    /**
     * Writes a string as UTF8 bytes.
     * @param {string} string Source string
     * @param {Uint8Array} buffer Destination buffer
     * @param {number} offset Destination offset
     * @returns {number} Bytes written
     */
    utf8.write = function utf8_write(string, buffer, offset) {
        var start = offset,
            c1,
            // character 1
        c2; // character 2
        for (var i = 0; i < string.length; ++i) {
            c1 = string.charCodeAt(i);
            if (c1 < 128) {
                buffer[offset++] = c1;
            } else if (c1 < 2048) {
                buffer[offset++] = c1 >> 6 | 192;
                buffer[offset++] = c1 & 63 | 128;
            } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
                c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
                ++i;
                buffer[offset++] = c1 >> 18 | 240;
                buffer[offset++] = c1 >> 12 & 63 | 128;
                buffer[offset++] = c1 >> 6 & 63 | 128;
                buffer[offset++] = c1 & 63 | 128;
            } else {
                buffer[offset++] = c1 >> 12 | 224;
                buffer[offset++] = c1 >> 6 & 63 | 128;
                buffer[offset++] = c1 & 63 | 128;
            }
        }
        return offset - start;
    };
});

"use strict";

var pool_1 = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE = size || 8192;
    var MAX = SIZE >>> 1;
    var slab = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX) return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}

"use strict";
var longbits = LongBits$1;

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits$1(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits$1.zero = new LongBits$1(0, 0);

zero.toNumber = function () {
    return 0;
};
zero.zzEncode = zero.zzDecode = function () {
    return this;
};
zero.length = function () {
    return 1;
};

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits$1.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits$1.fromNumber = function fromNumber(value) {
    if (value === 0) return zero;
    var sign = value < 0;
    if (sign) value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295) hi = 0;
        }
    }
    return new LongBits$1(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits$1.from = function from(value) {
    if (typeof value === "number") return LongBits$1.fromNumber(value);
    if (minimal$2.isString(value)) {
        /* istanbul ignore else */
        if (minimal$2.Long) value = minimal$2.Long.fromString(value);else return LongBits$1.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits$1(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits$1.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi >>> 0;
        if (!lo) hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits$1.prototype.toLong = function toLong(unsigned) {
    return minimal$2.Long ? new minimal$2.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
    /* istanbul ignore next */
    : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits$1.fromHash = function fromHash(hash) {
    if (hash === zeroHash) return zero;
    return new LongBits$1((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits$1.prototype.toHash = function toHash() {
    return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits$1.prototype.zzEncode = function zzEncode() {
    var mask = this.hi >> 31;
    this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo = (this.lo << 1 ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits$1.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi = (this.hi >>> 1 ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits$1.prototype.length = function length() {
    var part0 = this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 = this.hi >>> 24;
    return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var minimal$2 = createCommonjsModule$1(function (module, exports) {
    "use strict";

    var util = exports;

    // used to return a Promise where callback is omitted
    util.asPromise = aspromise;

    // converts to / from base64 encoded strings
    util.base64 = base64_1;

    // base class of rpc.Service
    util.EventEmitter = eventemitter;

    // float handling accross browsers
    util.float = float_1;

    // requires modules optionally and hides the call from bundlers
    util.inquire = inquire_1;

    // converts to / from utf8 encoded strings
    util.utf8 = utf8_1;

    // provides a node-like buffer pool in the browser
    util.pool = pool_1;

    // utility to work with the low and high bits of a 64 bit value
    util.LongBits = longbits;

    /**
     * An immuable empty array.
     * @memberof util
     * @type {Array.<*>}
     * @const
     */
    util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */[]; // used on prototypes

    /**
     * An immutable empty object.
     * @type {Object}
     * @const
     */
    util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */{}; // used on prototypes

    /**
     * Whether running within node or not.
     * @memberof util
     * @type {boolean}
     * @const
     */
    util.isNode = Boolean(commonjsGlobal$1.process && commonjsGlobal$1.process.versions && commonjsGlobal$1.process.versions.node);

    /**
     * Tests if the specified value is an integer.
     * @function
     * @param {*} value Value to test
     * @returns {boolean} `true` if the value is an integer
     */
    util.isInteger = Number.isInteger || /* istanbul ignore next */function isInteger(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };

    /**
     * Tests if the specified value is a string.
     * @param {*} value Value to test
     * @returns {boolean} `true` if the value is a string
     */
    util.isString = function isString(value) {
        return typeof value === "string" || value instanceof String;
    };

    /**
     * Tests if the specified value is a non-null object.
     * @param {*} value Value to test
     * @returns {boolean} `true` if the value is a non-null object
     */
    util.isObject = function isObject(value) {
        return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object";
    };

    /**
     * Checks if a property on a message is considered to be present.
     * This is an alias of {@link util.isSet}.
     * @function
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    util.isset =

    /**
     * Checks if a property on a message is considered to be present.
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    util.isSet = function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
            return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
    };

    /**
     * Any compatible Buffer instance.
     * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
     * @interface Buffer
     * @extends Uint8Array
     */

    /**
     * Node's Buffer class if available.
     * @type {Constructor<Buffer>}
     */
    util.Buffer = function () {
        try {
            var Buffer = util.inquire("buffer").Buffer;
            // refuse to use non-node buffers if not explicitly assigned (perf reasons):
            return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */null;
        } catch (e) {
            /* istanbul ignore next */
            return null;
        }
    }();

    // Internal alias of or polyfull for Buffer.from.
    util._Buffer_from = null;

    // Internal alias of or polyfill for Buffer.allocUnsafe.
    util._Buffer_allocUnsafe = null;

    /**
     * Creates a new buffer of whatever type supported by the environment.
     * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
     * @returns {Uint8Array|Buffer} Buffer
     */
    util.newBuffer = function newBuffer(sizeOrArray) {
        /* istanbul ignore next */
        return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };

    /**
     * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
     * @type {Constructor<Uint8Array>}
     */
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

    /**
     * Any compatible Long instance.
     * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
     * @interface Long
     * @property {number} low Low bits
     * @property {number} high High bits
     * @property {boolean} unsigned Whether unsigned or not
     */

    /**
     * Long.js's Long class if available.
     * @type {Constructor<Long>}
     */
    util.Long = /* istanbul ignore next */commonjsGlobal$1.dcodeIO && /* istanbul ignore next */commonjsGlobal$1.dcodeIO.Long || util.inquire("long");

    /**
     * Regular expression used to verify 2 bit (`bool`) map keys.
     * @type {RegExp}
     * @const
     */
    util.key2Re = /^true|false|0|1$/;

    /**
     * Regular expression used to verify 32 bit (`int32` etc.) map keys.
     * @type {RegExp}
     * @const
     */
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

    /**
     * Regular expression used to verify 64 bit (`int64` etc.) map keys.
     * @type {RegExp}
     * @const
     */
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

    /**
     * Converts a number or long to an 8 characters long hash string.
     * @param {Long|number} value Value to convert
     * @returns {string} Hash
     */
    util.longToHash = function longToHash(value) {
        return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    };

    /**
     * Converts an 8 characters long hash string to a long or number.
     * @param {string} hash Hash
     * @param {boolean} [unsigned=false] Whether unsigned or not
     * @returns {Long|number} Original value
     */
    util.longFromHash = function longFromHash(hash, unsigned) {
        var bits = util.LongBits.fromHash(hash);
        if (util.Long) return util.Long.fromBits(bits.lo, bits.hi, unsigned);
        return bits.toNumber(Boolean(unsigned));
    };

    /**
     * Merges the properties of the source object into the destination object.
     * @memberof util
     * @param {Object.<string,*>} dst Destination object
     * @param {Object.<string,*>} src Source object
     * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
     * @returns {Object.<string,*>} Destination object
     */
    function merge(dst, src, ifNotSet) {
        // used by converters
        for (var keys = Object.keys(src), i = 0; i < keys.length; ++i) {
            if (dst[keys[i]] === undefined || !ifNotSet) dst[keys[i]] = src[keys[i]];
        }return dst;
    }

    util.merge = merge;

    /**
     * Converts the first character of a string to lower case.
     * @param {string} str String to convert
     * @returns {string} Converted string
     */
    util.lcFirst = function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
    };

    /**
     * Creates a custom error constructor.
     * @memberof util
     * @param {string} name Error name
     * @returns {Constructor<Error>} Custom error constructor
     */
    function newError(name) {

        function CustomError(message, properties) {

            if (!(this instanceof CustomError)) return new CustomError(message, properties);

            // Error.call(this, message);
            // ^ just returns a new error instance because the ctor can be called as a function

            Object.defineProperty(this, "message", { get: function get() {
                    return message;
                } });

            /* istanbul ignore next */
            if (Error.captureStackTrace) // node
                Error.captureStackTrace(this, CustomError);else Object.defineProperty(this, "stack", { value: new Error().stack || "" });

            if (properties) merge(this, properties);
        }

        (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

        Object.defineProperty(CustomError.prototype, "name", { get: function get() {
                return name;
            } });

        CustomError.prototype.toString = function toString() {
            return this.name + ": " + this.message;
        };

        return CustomError;
    }

    util.newError = newError;

    /**
     * Constructs a new protocol error.
     * @classdesc Error subclass indicating a protocol specifc error.
     * @memberof util
     * @extends Error
     * @template T extends Message<T>
     * @constructor
     * @param {string} message Error message
     * @param {Object.<string,*>} [properties] Additional properties
     * @example
     * try {
     *     MyMessage.decode(someBuffer); // throws if required fields are missing
     * } catch (e) {
     *     if (e instanceof ProtocolError && e.instance)
     *         console.log("decoded so far: " + JSON.stringify(e.instance));
     * }
     */
    util.ProtocolError = newError("ProtocolError");

    /**
     * So far decoded message instance.
     * @name util.ProtocolError#instance
     * @type {Message<T>}
     */

    /**
     * A OneOf getter as returned by {@link util.oneOfGetter}.
     * @typedef OneOfGetter
     * @type {function}
     * @returns {string|undefined} Set field name, if any
     */

    /**
     * Builds a getter for a oneof's present field name.
     * @param {string[]} fieldNames Field names
     * @returns {OneOfGetter} Unbound getter
     */
    util.oneOfGetter = function getOneOf(fieldNames) {
        var fieldMap = {};
        for (var i = 0; i < fieldNames.length; ++i) {
            fieldMap[fieldNames[i]] = 1;
        } /**
           * @returns {string|undefined} Set field name, if any
           * @this Object
           * @ignore
           */
        return function () {
            // eslint-disable-line consistent-return
            for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i) {
                if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null) return keys[i];
            }
        };
    };

    /**
     * A OneOf setter as returned by {@link util.oneOfSetter}.
     * @typedef OneOfSetter
     * @type {function}
     * @param {string|undefined} value Field name
     * @returns {undefined}
     */

    /**
     * Builds a setter for a oneof's present field name.
     * @param {string[]} fieldNames Field names
     * @returns {OneOfSetter} Unbound setter
     */
    util.oneOfSetter = function setOneOf(fieldNames) {

        /**
         * @param {string} name Field name
         * @returns {undefined}
         * @this Object
         * @ignore
         */
        return function (name) {
            for (var i = 0; i < fieldNames.length; ++i) {
                if (fieldNames[i] !== name) delete this[fieldNames[i]];
            }
        };
    };

    /**
     * Default conversion options used for {@link Message#toJSON} implementations.
     *
     * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
     *
     * - Longs become strings
     * - Enums become string keys
     * - Bytes become base64 encoded strings
     * - (Sub-)Messages become plain objects
     * - Maps become plain objects with all string keys
     * - Repeated fields become arrays
     * - NaN and Infinity for float and double fields become strings
     *
     * @type {IConversionOptions}
     * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
     */
    util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
    };

    util._configure = function () {
        var Buffer = util.Buffer;
        /* istanbul ignore if */
        if (!Buffer) {
            util._Buffer_from = util._Buffer_allocUnsafe = null;
            return;
        }
        // because node 4.x buffers are incompatible & immutable
        // see: https://github.com/dcodeIO/protobuf.js/pull/665
        util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
        util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
    };
});

"use strict";
var writer = Writer;

var BufferWriter; // cyclic

var LongBits = minimal$2.LongBits;
var base64 = minimal$2.base64;
var utf8 = minimal$2.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = minimal$2.Buffer ? function create_buffer_setup() {
    return (Writer.create = function create_buffer() {
        return new BufferWriter();
    })();
}
/* istanbul ignore next */
: function create_array() {
    return new Writer();
};

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new minimal$2.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (minimal$2.Array !== Array) Writer.alloc = minimal$2.pool(Writer.alloc, minimal$2.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
    : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos] = val & 255;
    buf[pos + 1] = val >>> 8 & 255;
    buf[pos + 2] = val >>> 16 & 255;
    buf[pos + 3] = val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(minimal$2.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(minimal$2.float.writeDoubleLE, 8, value);
};

var writeBytes = minimal$2.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
    buf.set(val, pos); // also works for plain array values
}
/* istanbul ignore next */
: function writeBytes_for(val, buf, pos) {
    for (var i = 0; i < val.length; ++i) {
        buf[pos + i] = val[i];
    }
};

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len) return this._push(writeByte, 1, 0);
    if (minimal$2.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next,
        // skip noop
    buf = this.constructor.alloc(this.len),
        pos = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function (BufferWriter_) {
    BufferWriter = BufferWriter_;
};

"use strict";
var writer_buffer = BufferWriter$1;

// extends Writer

(BufferWriter$1.prototype = Object.create(writer.prototype)).constructor = BufferWriter$1;

var Buffer = minimal$2.Buffer;

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter$1() {
    writer.call(this);
}

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Buffer} Buffer
 */
BufferWriter$1.alloc = function alloc_buffer(size) {
    return (BufferWriter$1.alloc = minimal$2._Buffer_allocUnsafe)(size);
};

var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
    buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
    // also works for plain array values
}
/* istanbul ignore next */
: function writeBytesBuffer_copy(val, buf, pos) {
    if (val.copy) // Buffer values
        val.copy(buf, pos, 0, val.length);else for (var i = 0; i < val.length;) {
        // plain array values
        buf[pos++] = val[i++];
    }
};

/**
 * @override
 */
BufferWriter$1.prototype.bytes = function write_bytes_buffer(value) {
    if (minimal$2.isString(value)) value = minimal$2._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len) this._push(writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        minimal$2.utf8.write(val, buf, pos);else buf.utf8Write(val, pos);
}

/**
 * @override
 */
BufferWriter$1.prototype.string = function write_string_buffer(value) {
    var len = Buffer.byteLength(value);
    this.uint32(len);
    if (len) this._push(writeStringBuffer, len, value);
    return this;
};

/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */

"use strict";
var reader = Reader;

var BufferReader; // cyclic

var LongBits$2 = minimal$2.LongBits;
var utf8$1 = minimal$2.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
    if (buffer instanceof Uint8Array || Array.isArray(buffer)) return new Reader(buffer);
    throw Error("illegal buffer");
}
/* istanbul ignore next */
: function create_array(buffer) {
    if (Array.isArray(buffer)) return new Reader(buffer);
    throw Error("illegal buffer");
};

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = minimal$2.Buffer ? function create_buffer_setup(buffer) {
    return (Reader.create = function create_buffer(buffer) {
        return minimal$2.Buffer.isBuffer(buffer) ? new BufferReader(buffer)
        /* istanbul ignore next */
        : create_array(buffer);
    })(buffer);
}
/* istanbul ignore next */
: create_array;

Reader.prototype._slice = minimal$2.Array.prototype.subarray || /* istanbul ignore next */minimal$2.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
}();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits$2(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) {
        // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128) return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len) throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) {
        // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len) throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) {
    // note that this uses `end`, not `pos`
    return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64() /* this: Reader */{

    /* istanbul ignore if */
    if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);

    return new LongBits$2(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);

    var value = minimal$2.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);

    var value = minimal$2.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start = this.pos,
        end = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len) throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
    ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8$1.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len) throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len) throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function (wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            do {
                // eslint-disable-line no-constant-condition
                if ((wireType = this.uint32() & 7) === 4) break;
                this.skipType(wireType);
            } while (true);
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function (BufferReader_) {
    BufferReader = BufferReader_;

    var fn = minimal$2.Long ? "toLong" : /* istanbul ignore next */"toNumber";
    minimal$2.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};

"use strict";
var reader_buffer = BufferReader$1;

// extends Reader

(BufferReader$1.prototype = Object.create(reader.prototype)).constructor = BufferReader$1;

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader$1(buffer) {
  reader.call(this, buffer);

  /**
   * Read buffer.
   * @name BufferReader#buf
   * @type {Buffer}
   */
}

/* istanbul ignore else */
if (minimal$2.Buffer) BufferReader$1.prototype._slice = minimal$2.Buffer.prototype.slice;

/**
 * @override
 */
BufferReader$1.prototype.string = function read_string_buffer() {
  var len = this.uint32(); // modifies pos
  return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */

"use strict";
var service$1 = Service;

// Extends EventEmitter
(Service.prototype = Object.create(minimal$2.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function") throw TypeError("rpcImpl must be a function");

    minimal$2.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request) throw TypeError("request must be specified");

    var self = this;
    if (!callback) return minimal$2.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function () {
            callback(Error("already ended"));
        }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(method, requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {

            if (err) {
                self.emit("error", err, method);
                return callback(err);
            }

            if (response === null) {
                self.end( /* endedByRPC */true);
                return undefined;
            }

            if (!(response instanceof responseCtor)) {
                try {
                    response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                } catch (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }
            }

            self.emit("data", response, method);
            return callback(null, response);
        });
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function () {
            callback(err);
        }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};

var rpc_1 = createCommonjsModule$1(function (module, exports) {
  "use strict";

  /**
   * Streaming RPC helpers.
   * @namespace
   */

  var rpc = exports;

  /**
   * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
   * @typedef RPCImpl
   * @type {function}
   * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
   * @param {Uint8Array} requestData Request data
   * @param {RPCImplCallback} callback Callback function
   * @returns {undefined}
   * @example
   * function rpcImpl(method, requestData, callback) {
   *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
   *         throw Error("no such method");
   *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
   *         callback(err, responseData);
   *     });
   * }
   */

  /**
   * Node-style callback as used by {@link RPCImpl}.
   * @typedef RPCImplCallback
   * @type {function}
   * @param {Error|null} error Error, if any, otherwise `null`
   * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
   * @returns {undefined}
   */

  rpc.Service = service$1;
});

"use strict";

var roots = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */

var indexMinimal = createCommonjsModule$1(function (module, exports) {
  "use strict";

  var protobuf = exports;

  /**
   * Build type, one of `"full"`, `"light"` or `"minimal"`.
   * @name build
   * @type {string}
   * @const
   */
  protobuf.build = "minimal";

  // Serialization
  protobuf.Writer = writer;
  protobuf.BufferWriter = writer_buffer;
  protobuf.Reader = reader;
  protobuf.BufferReader = reader_buffer;

  // Utility
  protobuf.util = minimal$2;
  protobuf.rpc = rpc_1;
  protobuf.roots = roots;
  protobuf.configure = configure;

  /* istanbul ignore next */
  /**
   * Reconfigures the library according to the environment.
   * @returns {undefined}
   */
  function configure() {
    protobuf.Reader._configure(protobuf.BufferReader);
    protobuf.util._configure();
  }

  // Configure serialization
  protobuf.Writer._configure(protobuf.BufferWriter);
  configure();
});

// minimal library entry point.

"use strict";
var minimal = indexMinimal;

var minimal_1 = minimal.Reader;
var minimal_2 = minimal.Writer;
var minimal_3 = minimal.util;
var minimal_4 = minimal.roots;

/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
// Common aliases
var $Reader = minimal_1;
var $Writer = minimal_2;
var $util = minimal_3;

// Exported root namespace
var $root = minimal_4["default"] || (minimal_4["default"] = {});

var Message = $root.Message = function () {

    /**
     * Properties of a Message.
     * @exports IMessage
     * @interface IMessage
     * @property {number} [senderId] Message senderId
     * @property {number} [recipientId] Message recipientId
     * @property {boolean} [isService] Message isService
     * @property {Uint8Array} [content] Message content
     */

    /**
     * Constructs a new Message.
     * @exports Message
     * @classdesc Represents a Message.
     * @constructor
     * @param {IMessage=} [properties] Properties to set
     */
    function Message(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * Message senderId.
     * @member {number}senderId
     * @memberof Message
     * @instance
     */
    Message.prototype.senderId = 0;

    /**
     * Message recipientId.
     * @member {number}recipientId
     * @memberof Message
     * @instance
     */
    Message.prototype.recipientId = 0;

    /**
     * Message isService.
     * @member {boolean}isService
     * @memberof Message
     * @instance
     */
    Message.prototype.isService = false;

    /**
     * Message content.
     * @member {Uint8Array}content
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
        if (message.senderId != null && message.hasOwnProperty("senderId")) writer.uint32( /* id 1, wireType 0 =*/8).uint32(message.senderId);
        if (message.recipientId != null && message.hasOwnProperty("recipientId")) writer.uint32( /* id 2, wireType 0 =*/16).uint32(message.recipientId);
        if (message.isService != null && message.hasOwnProperty("isService")) writer.uint32( /* id 3, wireType 0 =*/24).bool(message.isService);
        if (message.content != null && message.hasOwnProperty("content")) writer.uint32( /* id 4, wireType 2 =*/34).bytes(message.content);
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
                    message.senderId = reader.uint32();
                    break;
                case 2:
                    message.recipientId = reader.uint32();
                    break;
                case 3:
                    message.isService = reader.bool();
                    break;
                case 4:
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

var user = $root.user = function () {

    /**
     * Namespace user.
     * @exports user
     * @namespace
     */
    var user = {};

    user.Message = function () {

        /**
         * Properties of a Message.
         * @memberof user
         * @interface IMessage
         * @property {number} [length] Message length
         * @property {user.Message.Type} [type] Message type
         * @property {Uint8Array} [full] Message full
         * @property {user.Message.IChunk} [chunk] Message chunk
         */

        /**
         * Constructs a new Message.
         * @memberof user
         * @classdesc Represents a Message.
         * @constructor
         * @param {user.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * Message length.
         * @member {number}length
         * @memberof user.Message
         * @instance
         */
        Message.prototype.length = 0;

        /**
         * Message type.
         * @member {user.Message.Type}type
         * @memberof user.Message
         * @instance
         */
        Message.prototype.type = 0;

        /**
         * Message full.
         * @member {Uint8Array}full
         * @memberof user.Message
         * @instance
         */
        Message.prototype.full = $util.newBuffer([]);

        /**
         * Message chunk.
         * @member {(user.Message.IChunk|null|undefined)}chunk
         * @memberof user.Message
         * @instance
         */
        Message.prototype.chunk = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields = void 0;

        /**
         * Message content.
         * @member {string|undefined} content
         * @memberof user.Message
         * @instance
         */
        Object.defineProperty(Message.prototype, "content", {
            get: $util.oneOfGetter($oneOfFields = ["full", "chunk"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof user.Message
         * @static
         * @param {user.IMessage=} [properties] Properties to set
         * @returns {user.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link user.Message.verify|verify} messages.
         * @function encode
         * @memberof user.Message
         * @static
         * @param {user.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.length != null && message.hasOwnProperty("length")) writer.uint32( /* id 1, wireType 0 =*/8).uint32(message.length);
            if (message.type != null && message.hasOwnProperty("type")) writer.uint32( /* id 2, wireType 0 =*/16).int32(message.type);
            if (message.full != null && message.hasOwnProperty("full")) writer.uint32( /* id 3, wireType 2 =*/26).bytes(message.full);
            if (message.chunk != null && message.hasOwnProperty("chunk")) $root.user.Message.Chunk.encode(message.chunk, writer.uint32( /* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof user.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {user.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.user.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.length = reader.uint32();
                        break;
                    case 2:
                        message.type = reader.int32();
                        break;
                    case 3:
                        message.full = reader.bytes();
                        break;
                    case 4:
                        message.chunk = $root.user.Message.Chunk.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        Message.Chunk = function () {

            /**
             * Properties of a Chunk.
             * @memberof user.Message
             * @interface IChunk
             * @property {number} [id] Chunk id
             * @property {number} [number] Chunk number
             * @property {Uint8Array} [content] Chunk content
             */

            /**
             * Constructs a new Chunk.
             * @memberof user.Message
             * @classdesc Represents a Chunk.
             * @constructor
             * @param {user.Message.IChunk=} [properties] Properties to set
             */
            function Chunk(properties) {
                if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }
            }

            /**
             * Chunk id.
             * @member {number}id
             * @memberof user.Message.Chunk
             * @instance
             */
            Chunk.prototype.id = 0;

            /**
             * Chunk number.
             * @member {number}number
             * @memberof user.Message.Chunk
             * @instance
             */
            Chunk.prototype.number = 0;

            /**
             * Chunk content.
             * @member {Uint8Array}content
             * @memberof user.Message.Chunk
             * @instance
             */
            Chunk.prototype.content = $util.newBuffer([]);

            /**
             * Creates a new Chunk instance using the specified properties.
             * @function create
             * @memberof user.Message.Chunk
             * @static
             * @param {user.Message.IChunk=} [properties] Properties to set
             * @returns {user.Message.Chunk} Chunk instance
             */
            Chunk.create = function create(properties) {
                return new Chunk(properties);
            };

            /**
             * Encodes the specified Chunk message. Does not implicitly {@link user.Message.Chunk.verify|verify} messages.
             * @function encode
             * @memberof user.Message.Chunk
             * @static
             * @param {user.Message.IChunk} message Chunk message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Chunk.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id")) writer.uint32( /* id 1, wireType 0 =*/8).uint32(message.id);
                if (message.number != null && message.hasOwnProperty("number")) writer.uint32( /* id 2, wireType 0 =*/16).uint32(message.number);
                if (message.content != null && message.hasOwnProperty("content")) writer.uint32( /* id 4, wireType 2 =*/34).bytes(message.content);
                return writer;
            };

            /**
             * Decodes a Chunk message from the specified reader or buffer.
             * @function decode
             * @memberof user.Message.Chunk
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {user.Message.Chunk} Chunk
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Chunk.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.user.Message.Chunk();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.id = reader.uint32();
                            break;
                        case 2:
                            message.number = reader.uint32();
                            break;
                        case 4:
                            message.content = reader.bytes();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };

            return Chunk;
        }();

        /**
         * Type enum.
         * @enum {string}
         * @property {number} STRING=0 STRING value
         * @property {number} U_INT_8_ARRAY=1 U_INT_8_ARRAY value
         */
        Message.Type = function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[valuesById[0] = "STRING"] = 0;
            values[valuesById[1] = "U_INT_8_ARRAY"] = 1;
            return values;
        }();

        return Message;
    }();

    return user;
}();

var service = $root.service = function () {

    /**
     * Namespace service.
     * @exports service
     * @namespace
     */
    var service = {};

    service.Message = function () {

        /**
         * Properties of a Message.
         * @memberof service
         * @interface IMessage
         * @property {number} [id] Message id
         * @property {Uint8Array} [content] Message content
         */

        /**
         * Constructs a new Message.
         * @memberof service
         * @classdesc Represents a Message.
         * @constructor
         * @param {service.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * Message id.
         * @member {number}id
         * @memberof service.Message
         * @instance
         */
        Message.prototype.id = 0;

        /**
         * Message content.
         * @member {Uint8Array}content
         * @memberof service.Message
         * @instance
         */
        Message.prototype.content = $util.newBuffer([]);

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof service.Message
         * @static
         * @param {service.IMessage=} [properties] Properties to set
         * @returns {service.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link service.Message.verify|verify} messages.
         * @function encode
         * @memberof service.Message
         * @static
         * @param {service.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id")) writer.uint32( /* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.content != null && message.hasOwnProperty("content")) writer.uint32( /* id 2, wireType 2 =*/18).bytes(message.content);
            return writer;
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof service.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {service.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.service.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.id = reader.uint32();
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

    return service;
}();

var webChannel = $root.webChannel = function () {

    /**
     * Namespace webChannel.
     * @exports webChannel
     * @namespace
     */
    var webChannel = {};

    webChannel.Message = function () {

        /**
         * Properties of a Message.
         * @memberof webChannel
         * @interface IMessage
         * @property {webChannel.IInitData} [init] Message init
         * @property {webChannel.IPeers} [initOk] Message initOk
         * @property {boolean} [ping] Message ping
         * @property {boolean} [pong] Message pong
         */

        /**
         * Constructs a new Message.
         * @memberof webChannel
         * @classdesc Represents a Message.
         * @constructor
         * @param {webChannel.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * Message init.
         * @member {(webChannel.IInitData|null|undefined)}init
         * @memberof webChannel.Message
         * @instance
         */
        Message.prototype.init = null;

        /**
         * Message initOk.
         * @member {(webChannel.IPeers|null|undefined)}initOk
         * @memberof webChannel.Message
         * @instance
         */
        Message.prototype.initOk = null;

        /**
         * Message ping.
         * @member {boolean}ping
         * @memberof webChannel.Message
         * @instance
         */
        Message.prototype.ping = false;

        /**
         * Message pong.
         * @member {boolean}pong
         * @memberof webChannel.Message
         * @instance
         */
        Message.prototype.pong = false;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields = void 0;

        /**
         * Message type.
         * @member {string|undefined} type
         * @memberof webChannel.Message
         * @instance
         */
        Object.defineProperty(Message.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["init", "initOk", "ping", "pong"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof webChannel.Message
         * @static
         * @param {webChannel.IMessage=} [properties] Properties to set
         * @returns {webChannel.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link webChannel.Message.verify|verify} messages.
         * @function encode
         * @memberof webChannel.Message
         * @static
         * @param {webChannel.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.init != null && message.hasOwnProperty("init")) $root.webChannel.InitData.encode(message.init, writer.uint32( /* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.initOk != null && message.hasOwnProperty("initOk")) $root.webChannel.Peers.encode(message.initOk, writer.uint32( /* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.ping != null && message.hasOwnProperty("ping")) writer.uint32( /* id 3, wireType 0 =*/24).bool(message.ping);
            if (message.pong != null && message.hasOwnProperty("pong")) writer.uint32( /* id 4, wireType 0 =*/32).bool(message.pong);
            return writer;
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof webChannel.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webChannel.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.webChannel.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.init = $root.webChannel.InitData.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.initOk = $root.webChannel.Peers.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.ping = reader.bool();
                        break;
                    case 4:
                        message.pong = reader.bool();
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

    webChannel.InitData = function () {

        /**
         * Properties of an InitData.
         * @memberof webChannel
         * @interface IInitData
         * @property {number} [topology] InitData topology
         * @property {number} [wcId] InitData wcId
         * @property {Array.<number>} [generatedIds] InitData generatedIds
         */

        /**
         * Constructs a new InitData.
         * @memberof webChannel
         * @classdesc Represents an InitData.
         * @constructor
         * @param {webChannel.IInitData=} [properties] Properties to set
         */
        function InitData(properties) {
            this.generatedIds = [];
            if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * InitData topology.
         * @member {number}topology
         * @memberof webChannel.InitData
         * @instance
         */
        InitData.prototype.topology = 0;

        /**
         * InitData wcId.
         * @member {number}wcId
         * @memberof webChannel.InitData
         * @instance
         */
        InitData.prototype.wcId = 0;

        /**
         * InitData generatedIds.
         * @member {Array.<number>}generatedIds
         * @memberof webChannel.InitData
         * @instance
         */
        InitData.prototype.generatedIds = $util.emptyArray;

        /**
         * Creates a new InitData instance using the specified properties.
         * @function create
         * @memberof webChannel.InitData
         * @static
         * @param {webChannel.IInitData=} [properties] Properties to set
         * @returns {webChannel.InitData} InitData instance
         */
        InitData.create = function create(properties) {
            return new InitData(properties);
        };

        /**
         * Encodes the specified InitData message. Does not implicitly {@link webChannel.InitData.verify|verify} messages.
         * @function encode
         * @memberof webChannel.InitData
         * @static
         * @param {webChannel.IInitData} message InitData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InitData.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.topology != null && message.hasOwnProperty("topology")) writer.uint32( /* id 1, wireType 0 =*/8).uint32(message.topology);
            if (message.wcId != null && message.hasOwnProperty("wcId")) writer.uint32( /* id 2, wireType 0 =*/16).uint32(message.wcId);
            if (message.generatedIds != null && message.generatedIds.length) {
                writer.uint32( /* id 3, wireType 2 =*/26).fork();
                for (var i = 0; i < message.generatedIds.length; ++i) {
                    writer.uint32(message.generatedIds[i]);
                }writer.ldelim();
            }
            return writer;
        };

        /**
         * Decodes an InitData message from the specified reader or buffer.
         * @function decode
         * @memberof webChannel.InitData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webChannel.InitData} InitData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InitData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.webChannel.InitData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.topology = reader.uint32();
                        break;
                    case 2:
                        message.wcId = reader.uint32();
                        break;
                    case 3:
                        if (!(message.generatedIds && message.generatedIds.length)) message.generatedIds = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2) {
                                message.generatedIds.push(reader.uint32());
                            }
                        } else message.generatedIds.push(reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        return InitData;
    }();

    webChannel.Peers = function () {

        /**
         * Properties of a Peers.
         * @memberof webChannel
         * @interface IPeers
         * @property {Array.<number>} [members] Peers members
         */

        /**
         * Constructs a new Peers.
         * @memberof webChannel
         * @classdesc Represents a Peers.
         * @constructor
         * @param {webChannel.IPeers=} [properties] Properties to set
         */
        function Peers(properties) {
            this.members = [];
            if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * Peers members.
         * @member {Array.<number>}members
         * @memberof webChannel.Peers
         * @instance
         */
        Peers.prototype.members = $util.emptyArray;

        /**
         * Creates a new Peers instance using the specified properties.
         * @function create
         * @memberof webChannel.Peers
         * @static
         * @param {webChannel.IPeers=} [properties] Properties to set
         * @returns {webChannel.Peers} Peers instance
         */
        Peers.create = function create(properties) {
            return new Peers(properties);
        };

        /**
         * Encodes the specified Peers message. Does not implicitly {@link webChannel.Peers.verify|verify} messages.
         * @function encode
         * @memberof webChannel.Peers
         * @static
         * @param {webChannel.IPeers} message Peers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Peers.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.members != null && message.members.length) {
                writer.uint32( /* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.members.length; ++i) {
                    writer.uint32(message.members[i]);
                }writer.ldelim();
            }
            return writer;
        };

        /**
         * Decodes a Peers message from the specified reader or buffer.
         * @function decode
         * @memberof webChannel.Peers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webChannel.Peers} Peers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Peers.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.webChannel.Peers();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.members && message.members.length)) message.members = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2) {
                                message.members.push(reader.uint32());
                            }
                        } else message.members.push(reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        return Peers;
    }();

    return webChannel;
}();

var channelBuilder = $root.channelBuilder = function () {

    /**
     * Namespace channelBuilder.
     * @exports channelBuilder
     * @namespace
     */
    var channelBuilder = {};

    channelBuilder.Message = function () {

        /**
         * Properties of a Message.
         * @memberof channelBuilder
         * @interface IMessage
         * @property {channelBuilder.IConnection} [request] Message request
         * @property {channelBuilder.IConnection} [response] Message response
         * @property {string} [failed] Message failed
         */

        /**
         * Constructs a new Message.
         * @memberof channelBuilder
         * @classdesc Represents a Message.
         * @constructor
         * @param {channelBuilder.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * Message request.
         * @member {(channelBuilder.IConnection|null|undefined)}request
         * @memberof channelBuilder.Message
         * @instance
         */
        Message.prototype.request = null;

        /**
         * Message response.
         * @member {(channelBuilder.IConnection|null|undefined)}response
         * @memberof channelBuilder.Message
         * @instance
         */
        Message.prototype.response = null;

        /**
         * Message failed.
         * @member {string}failed
         * @memberof channelBuilder.Message
         * @instance
         */
        Message.prototype.failed = "";

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields = void 0;

        /**
         * Message type.
         * @member {string|undefined} type
         * @memberof channelBuilder.Message
         * @instance
         */
        Object.defineProperty(Message.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["request", "response", "failed"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof channelBuilder.Message
         * @static
         * @param {channelBuilder.IMessage=} [properties] Properties to set
         * @returns {channelBuilder.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link channelBuilder.Message.verify|verify} messages.
         * @function encode
         * @memberof channelBuilder.Message
         * @static
         * @param {channelBuilder.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.request != null && message.hasOwnProperty("request")) $root.channelBuilder.Connection.encode(message.request, writer.uint32( /* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.response != null && message.hasOwnProperty("response")) $root.channelBuilder.Connection.encode(message.response, writer.uint32( /* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.failed != null && message.hasOwnProperty("failed")) writer.uint32( /* id 3, wireType 2 =*/26).string(message.failed);
            return writer;
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof channelBuilder.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {channelBuilder.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.channelBuilder.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.request = $root.channelBuilder.Connection.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.response = $root.channelBuilder.Connection.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.failed = reader.string();
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

    channelBuilder.Connection = function () {

        /**
         * Properties of a Connection.
         * @memberof channelBuilder
         * @interface IConnection
         * @property {string} [wsUrl] Connection wsUrl
         * @property {boolean} [isWrtcSupport] Connection isWrtcSupport
         */

        /**
         * Constructs a new Connection.
         * @memberof channelBuilder
         * @classdesc Represents a Connection.
         * @constructor
         * @param {channelBuilder.IConnection=} [properties] Properties to set
         */
        function Connection(properties) {
            if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * Connection wsUrl.
         * @member {string}wsUrl
         * @memberof channelBuilder.Connection
         * @instance
         */
        Connection.prototype.wsUrl = "";

        /**
         * Connection isWrtcSupport.
         * @member {boolean}isWrtcSupport
         * @memberof channelBuilder.Connection
         * @instance
         */
        Connection.prototype.isWrtcSupport = false;

        /**
         * Creates a new Connection instance using the specified properties.
         * @function create
         * @memberof channelBuilder.Connection
         * @static
         * @param {channelBuilder.IConnection=} [properties] Properties to set
         * @returns {channelBuilder.Connection} Connection instance
         */
        Connection.create = function create(properties) {
            return new Connection(properties);
        };

        /**
         * Encodes the specified Connection message. Does not implicitly {@link channelBuilder.Connection.verify|verify} messages.
         * @function encode
         * @memberof channelBuilder.Connection
         * @static
         * @param {channelBuilder.IConnection} message Connection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Connection.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.wsUrl != null && message.hasOwnProperty("wsUrl")) writer.uint32( /* id 1, wireType 2 =*/10).string(message.wsUrl);
            if (message.isWrtcSupport != null && message.hasOwnProperty("isWrtcSupport")) writer.uint32( /* id 2, wireType 0 =*/16).bool(message.isWrtcSupport);
            return writer;
        };

        /**
         * Decodes a Connection message from the specified reader or buffer.
         * @function decode
         * @memberof channelBuilder.Connection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {channelBuilder.Connection} Connection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Connection.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.channelBuilder.Connection();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.wsUrl = reader.string();
                        break;
                    case 2:
                        message.isWrtcSupport = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        return Connection;
    }();

    return channelBuilder;
}();

var fullMesh = $root.fullMesh = function () {

    /**
     * Namespace fullMesh.
     * @exports fullMesh
     * @namespace
     */
    var fullMesh = {};

    fullMesh.Message = function () {

        /**
         * Properties of a Message.
         * @memberof fullMesh
         * @interface IMessage
         * @property {fullMesh.IPeers} [connectTo] Message connectTo
         * @property {fullMesh.IPeers} [connectedTo] Message connectedTo
         * @property {number} [joiningPeerId] Message joiningPeerId
         * @property {boolean} [joinSucceed] Message joinSucceed
         */

        /**
         * Constructs a new Message.
         * @memberof fullMesh
         * @classdesc Represents a Message.
         * @constructor
         * @param {fullMesh.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * Message connectTo.
         * @member {(fullMesh.IPeers|null|undefined)}connectTo
         * @memberof fullMesh.Message
         * @instance
         */
        Message.prototype.connectTo = null;

        /**
         * Message connectedTo.
         * @member {(fullMesh.IPeers|null|undefined)}connectedTo
         * @memberof fullMesh.Message
         * @instance
         */
        Message.prototype.connectedTo = null;

        /**
         * Message joiningPeerId.
         * @member {number}joiningPeerId
         * @memberof fullMesh.Message
         * @instance
         */
        Message.prototype.joiningPeerId = 0;

        /**
         * Message joinSucceed.
         * @member {boolean}joinSucceed
         * @memberof fullMesh.Message
         * @instance
         */
        Message.prototype.joinSucceed = false;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields = void 0;

        /**
         * Message type.
         * @member {string|undefined} type
         * @memberof fullMesh.Message
         * @instance
         */
        Object.defineProperty(Message.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["connectTo", "connectedTo", "joiningPeerId", "joinSucceed"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof fullMesh.Message
         * @static
         * @param {fullMesh.IMessage=} [properties] Properties to set
         * @returns {fullMesh.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link fullMesh.Message.verify|verify} messages.
         * @function encode
         * @memberof fullMesh.Message
         * @static
         * @param {fullMesh.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.connectTo != null && message.hasOwnProperty("connectTo")) $root.fullMesh.Peers.encode(message.connectTo, writer.uint32( /* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.connectedTo != null && message.hasOwnProperty("connectedTo")) $root.fullMesh.Peers.encode(message.connectedTo, writer.uint32( /* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.joiningPeerId != null && message.hasOwnProperty("joiningPeerId")) writer.uint32( /* id 3, wireType 0 =*/24).uint32(message.joiningPeerId);
            if (message.joinSucceed != null && message.hasOwnProperty("joinSucceed")) writer.uint32( /* id 4, wireType 0 =*/32).bool(message.joinSucceed);
            return writer;
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof fullMesh.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {fullMesh.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.fullMesh.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.connectTo = $root.fullMesh.Peers.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.connectedTo = $root.fullMesh.Peers.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.joiningPeerId = reader.uint32();
                        break;
                    case 4:
                        message.joinSucceed = reader.bool();
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

    fullMesh.Peers = function () {

        /**
         * Properties of a Peers.
         * @memberof fullMesh
         * @interface IPeers
         * @property {Array.<number>} [members] Peers members
         */

        /**
         * Constructs a new Peers.
         * @memberof fullMesh
         * @classdesc Represents a Peers.
         * @constructor
         * @param {fullMesh.IPeers=} [properties] Properties to set
         */
        function Peers(properties) {
            this.members = [];
            if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * Peers members.
         * @member {Array.<number>}members
         * @memberof fullMesh.Peers
         * @instance
         */
        Peers.prototype.members = $util.emptyArray;

        /**
         * Creates a new Peers instance using the specified properties.
         * @function create
         * @memberof fullMesh.Peers
         * @static
         * @param {fullMesh.IPeers=} [properties] Properties to set
         * @returns {fullMesh.Peers} Peers instance
         */
        Peers.create = function create(properties) {
            return new Peers(properties);
        };

        /**
         * Encodes the specified Peers message. Does not implicitly {@link fullMesh.Peers.verify|verify} messages.
         * @function encode
         * @memberof fullMesh.Peers
         * @static
         * @param {fullMesh.IPeers} message Peers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Peers.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.members != null && message.members.length) {
                writer.uint32( /* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.members.length; ++i) {
                    writer.uint32(message.members[i]);
                }writer.ldelim();
            }
            return writer;
        };

        /**
         * Decodes a Peers message from the specified reader or buffer.
         * @function decode
         * @memberof fullMesh.Peers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {fullMesh.Peers} Peers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Peers.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.fullMesh.Peers();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.members && message.members.length)) message.members = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2) {
                                message.members.push(reader.uint32());
                            }
                        } else message.members.push(reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        return Peers;
    }();

    return fullMesh;
}();

var webRTCBuilder = $root.webRTCBuilder = function () {

    /**
     * Namespace webRTCBuilder.
     * @exports webRTCBuilder
     * @namespace
     */
    var webRTCBuilder = {};

    webRTCBuilder.Message = function () {

        /**
         * Properties of a Message.
         * @memberof webRTCBuilder
         * @interface IMessage
         * @property {boolean} [isInitiator] Message isInitiator
         * @property {string} [offer] Message offer
         * @property {string} [answer] Message answer
         * @property {webRTCBuilder.IIceCandidate} [iceCandidate] Message iceCandidate
         */

        /**
         * Constructs a new Message.
         * @memberof webRTCBuilder
         * @classdesc Represents a Message.
         * @constructor
         * @param {webRTCBuilder.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * Message isInitiator.
         * @member {boolean}isInitiator
         * @memberof webRTCBuilder.Message
         * @instance
         */
        Message.prototype.isInitiator = false;

        /**
         * Message offer.
         * @member {string}offer
         * @memberof webRTCBuilder.Message
         * @instance
         */
        Message.prototype.offer = "";

        /**
         * Message answer.
         * @member {string}answer
         * @memberof webRTCBuilder.Message
         * @instance
         */
        Message.prototype.answer = "";

        /**
         * Message iceCandidate.
         * @member {(webRTCBuilder.IIceCandidate|null|undefined)}iceCandidate
         * @memberof webRTCBuilder.Message
         * @instance
         */
        Message.prototype.iceCandidate = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields = void 0;

        /**
         * Message type.
         * @member {string|undefined} type
         * @memberof webRTCBuilder.Message
         * @instance
         */
        Object.defineProperty(Message.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["offer", "answer", "iceCandidate"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof webRTCBuilder.Message
         * @static
         * @param {webRTCBuilder.IMessage=} [properties] Properties to set
         * @returns {webRTCBuilder.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link webRTCBuilder.Message.verify|verify} messages.
         * @function encode
         * @memberof webRTCBuilder.Message
         * @static
         * @param {webRTCBuilder.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.isInitiator != null && message.hasOwnProperty("isInitiator")) writer.uint32( /* id 1, wireType 0 =*/8).bool(message.isInitiator);
            if (message.offer != null && message.hasOwnProperty("offer")) writer.uint32( /* id 2, wireType 2 =*/18).string(message.offer);
            if (message.answer != null && message.hasOwnProperty("answer")) writer.uint32( /* id 3, wireType 2 =*/26).string(message.answer);
            if (message.iceCandidate != null && message.hasOwnProperty("iceCandidate")) $root.webRTCBuilder.IceCandidate.encode(message.iceCandidate, writer.uint32( /* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof webRTCBuilder.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webRTCBuilder.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.webRTCBuilder.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.isInitiator = reader.bool();
                        break;
                    case 2:
                        message.offer = reader.string();
                        break;
                    case 3:
                        message.answer = reader.string();
                        break;
                    case 4:
                        message.iceCandidate = $root.webRTCBuilder.IceCandidate.decode(reader, reader.uint32());
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

    webRTCBuilder.IceCandidate = function () {

        /**
         * Properties of an IceCandidate.
         * @memberof webRTCBuilder
         * @interface IIceCandidate
         * @property {string} [candidate] IceCandidate candidate
         * @property {string} [sdpMid] IceCandidate sdpMid
         * @property {number} [sdpMLineIndex] IceCandidate sdpMLineIndex
         */

        /**
         * Constructs a new IceCandidate.
         * @memberof webRTCBuilder
         * @classdesc Represents an IceCandidate.
         * @constructor
         * @param {webRTCBuilder.IIceCandidate=} [properties] Properties to set
         */
        function IceCandidate(properties) {
            if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * IceCandidate candidate.
         * @member {string}candidate
         * @memberof webRTCBuilder.IceCandidate
         * @instance
         */
        IceCandidate.prototype.candidate = "";

        /**
         * IceCandidate sdpMid.
         * @member {string}sdpMid
         * @memberof webRTCBuilder.IceCandidate
         * @instance
         */
        IceCandidate.prototype.sdpMid = "";

        /**
         * IceCandidate sdpMLineIndex.
         * @member {number}sdpMLineIndex
         * @memberof webRTCBuilder.IceCandidate
         * @instance
         */
        IceCandidate.prototype.sdpMLineIndex = 0;

        /**
         * Creates a new IceCandidate instance using the specified properties.
         * @function create
         * @memberof webRTCBuilder.IceCandidate
         * @static
         * @param {webRTCBuilder.IIceCandidate=} [properties] Properties to set
         * @returns {webRTCBuilder.IceCandidate} IceCandidate instance
         */
        IceCandidate.create = function create(properties) {
            return new IceCandidate(properties);
        };

        /**
         * Encodes the specified IceCandidate message. Does not implicitly {@link webRTCBuilder.IceCandidate.verify|verify} messages.
         * @function encode
         * @memberof webRTCBuilder.IceCandidate
         * @static
         * @param {webRTCBuilder.IIceCandidate} message IceCandidate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IceCandidate.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.candidate != null && message.hasOwnProperty("candidate")) writer.uint32( /* id 1, wireType 2 =*/10).string(message.candidate);
            if (message.sdpMid != null && message.hasOwnProperty("sdpMid")) writer.uint32( /* id 2, wireType 2 =*/18).string(message.sdpMid);
            if (message.sdpMLineIndex != null && message.hasOwnProperty("sdpMLineIndex")) writer.uint32( /* id 3, wireType 0 =*/24).uint32(message.sdpMLineIndex);
            return writer;
        };

        /**
         * Decodes an IceCandidate message from the specified reader or buffer.
         * @function decode
         * @memberof webRTCBuilder.IceCandidate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webRTCBuilder.IceCandidate} IceCandidate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IceCandidate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.webRTCBuilder.IceCandidate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.candidate = reader.string();
                        break;
                    case 2:
                        message.sdpMid = reader.string();
                        break;
                    case 3:
                        message.sdpMLineIndex = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        return IceCandidate;
    }();

    return webRTCBuilder;
}();

var signaling = $root.signaling = function () {

    /**
     * Namespace signaling.
     * @exports signaling
     * @namespace
     */
    var signaling = {};

    signaling.Message = function () {

        /**
         * Properties of a Message.
         * @memberof signaling
         * @interface IMessage
         * @property {signaling.IContent} [content] Message content
         * @property {boolean} [isFirst] Message isFirst
         * @property {boolean} [joined] Message joined
         * @property {boolean} [ping] Message ping
         * @property {boolean} [pong] Message pong
         */

        /**
         * Constructs a new Message.
         * @memberof signaling
         * @classdesc Represents a Message.
         * @constructor
         * @param {signaling.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * Message content.
         * @member {(signaling.IContent|null|undefined)}content
         * @memberof signaling.Message
         * @instance
         */
        Message.prototype.content = null;

        /**
         * Message isFirst.
         * @member {boolean}isFirst
         * @memberof signaling.Message
         * @instance
         */
        Message.prototype.isFirst = false;

        /**
         * Message joined.
         * @member {boolean}joined
         * @memberof signaling.Message
         * @instance
         */
        Message.prototype.joined = false;

        /**
         * Message ping.
         * @member {boolean}ping
         * @memberof signaling.Message
         * @instance
         */
        Message.prototype.ping = false;

        /**
         * Message pong.
         * @member {boolean}pong
         * @memberof signaling.Message
         * @instance
         */
        Message.prototype.pong = false;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields = void 0;

        /**
         * Message type.
         * @member {string|undefined} type
         * @memberof signaling.Message
         * @instance
         */
        Object.defineProperty(Message.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["content", "isFirst", "joined", "ping", "pong"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof signaling.Message
         * @static
         * @param {signaling.IMessage=} [properties] Properties to set
         * @returns {signaling.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link signaling.Message.verify|verify} messages.
         * @function encode
         * @memberof signaling.Message
         * @static
         * @param {signaling.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.content != null && message.hasOwnProperty("content")) $root.signaling.Content.encode(message.content, writer.uint32( /* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.isFirst != null && message.hasOwnProperty("isFirst")) writer.uint32( /* id 2, wireType 0 =*/16).bool(message.isFirst);
            if (message.joined != null && message.hasOwnProperty("joined")) writer.uint32( /* id 3, wireType 0 =*/24).bool(message.joined);
            if (message.ping != null && message.hasOwnProperty("ping")) writer.uint32( /* id 4, wireType 0 =*/32).bool(message.ping);
            if (message.pong != null && message.hasOwnProperty("pong")) writer.uint32( /* id 5, wireType 0 =*/40).bool(message.pong);
            return writer;
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof signaling.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signaling.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.signaling.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.content = $root.signaling.Content.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.isFirst = reader.bool();
                        break;
                    case 3:
                        message.joined = reader.bool();
                        break;
                    case 4:
                        message.ping = reader.bool();
                        break;
                    case 5:
                        message.pong = reader.bool();
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

    signaling.Content = function () {

        /**
         * Properties of a Content.
         * @memberof signaling
         * @interface IContent
         * @property {number} [id] Content id
         * @property {boolean} [isEnd] Content isEnd
         * @property {Uint8Array} [data] Content data
         * @property {boolean} [isError] Content isError
         */

        /**
         * Constructs a new Content.
         * @memberof signaling
         * @classdesc Represents a Content.
         * @constructor
         * @param {signaling.IContent=} [properties] Properties to set
         */
        function Content(properties) {
            if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
                if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }
        }

        /**
         * Content id.
         * @member {number}id
         * @memberof signaling.Content
         * @instance
         */
        Content.prototype.id = 0;

        /**
         * Content isEnd.
         * @member {boolean}isEnd
         * @memberof signaling.Content
         * @instance
         */
        Content.prototype.isEnd = false;

        /**
         * Content data.
         * @member {Uint8Array}data
         * @memberof signaling.Content
         * @instance
         */
        Content.prototype.data = $util.newBuffer([]);

        /**
         * Content isError.
         * @member {boolean}isError
         * @memberof signaling.Content
         * @instance
         */
        Content.prototype.isError = false;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields = void 0;

        /**
         * Content type.
         * @member {string|undefined} type
         * @memberof signaling.Content
         * @instance
         */
        Object.defineProperty(Content.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["data", "isError"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Content instance using the specified properties.
         * @function create
         * @memberof signaling.Content
         * @static
         * @param {signaling.IContent=} [properties] Properties to set
         * @returns {signaling.Content} Content instance
         */
        Content.create = function create(properties) {
            return new Content(properties);
        };

        /**
         * Encodes the specified Content message. Does not implicitly {@link signaling.Content.verify|verify} messages.
         * @function encode
         * @memberof signaling.Content
         * @static
         * @param {signaling.IContent} message Content message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Content.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id")) writer.uint32( /* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.isEnd != null && message.hasOwnProperty("isEnd")) writer.uint32( /* id 2, wireType 0 =*/16).bool(message.isEnd);
            if (message.data != null && message.hasOwnProperty("data")) writer.uint32( /* id 3, wireType 2 =*/26).bytes(message.data);
            if (message.isError != null && message.hasOwnProperty("isError")) writer.uint32( /* id 4, wireType 0 =*/32).bool(message.isError);
            return writer;
        };

        /**
         * Decodes a Content message from the specified reader or buffer.
         * @function decode
         * @memberof signaling.Content
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signaling.Content} Content
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Content.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.signaling.Content();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.id = reader.uint32();
                        break;
                    case 2:
                        message.isEnd = reader.bool();
                        break;
                    case 3:
                        message.data = reader.bytes();
                        break;
                    case 4:
                        message.isError = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        return Content;
    }();

    return signaling;
}();

var PING_INTERVAL = 3000;
/* WebSocket error codes */
var MESSAGE_ERROR_CODE = 4000;
var PING_ERROR_CODE = 4001;
var FIRST_CONNECTION_ERROR_CODE = 4002;
/* Preconstructed messages */
var pingMsg = signaling.Message.encode(signaling.Message.create({ ping: true })).finish();
var pongMsg = signaling.Message.encode(signaling.Message.create({ pong: true })).finish();
var SignalingState$1;
(function (SignalingState) {
    SignalingState[SignalingState["CONNECTING"] = 0] = "CONNECTING";
    SignalingState[SignalingState["OPEN"] = 1] = "OPEN";
    SignalingState[SignalingState["CONNECTED_WITH_FIRST_MEMBER"] = 2] = "CONNECTED_WITH_FIRST_MEMBER";
    SignalingState[SignalingState["READY_TO_JOIN_OTHERS"] = 3] = "READY_TO_JOIN_OTHERS";
    SignalingState[SignalingState["CLOSED"] = 4] = "CLOSED";
})(SignalingState$1 || (SignalingState$1 = {}));
/**
 * This class represents a door of the `WebChannel` for the current peer. If the door
 * is open, then clients can join the `WebChannel` through this peer. There are as
 * many doors as peers in the `WebChannel` and each of them can be closed or opened.
 */
var Signaling = (function () {
    function Signaling(wc, url) {
        // public
        this.url = url;
        this.state = SignalingState$1.CLOSED;
        // private
        this.wc = wc;
        this.stateSubject = new Subject_2();
        this.channelSubject = new Subject_2();
        this.rxWs = undefined;
        this.pingInterval = undefined;
        this.pongReceived = false;
    }
    Object.defineProperty(Signaling.prototype, "onState", {
        get: function () {
            return this.stateSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Signaling.prototype, "onChannel", {
        get: function () {
            return this.channelSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Notify Signaling server that you had joined the network and ready
     * to join new peers to the network.
     */
    Signaling.prototype.open = function () {
        if (this.state === SignalingState$1.CONNECTED_WITH_FIRST_MEMBER) {
            this.rxWs.send({ joined: true });
            this.setState(SignalingState$1.READY_TO_JOIN_OTHERS);
        }
    };
    Signaling.prototype.join = function (key) {
        var _this = this;
        if (this.state === SignalingState$1.READY_TO_JOIN_OTHERS) {
            throw new Error('Failed to join via signaling: connection with signaling is already opened');
        }
        if (this.state !== SignalingState$1.CLOSED) {
            this.close();
        }
        this.setState(SignalingState$1.CONNECTING);
        this.wc.webSocketBuilder.connect(this.getFullURL(key))
            .then(function (ws) {
            _this.setState(SignalingState$1.OPEN);
            _this.rxWs = _this.createRxWs(ws);
            _this.startPingInterval();
            _this.rxWs.onMessage.subscribe(function (msg) {
                switch (msg.type) {
                    case 'ping':
                        _this.rxWs.pong();
                        break;
                    case 'pong':
                        _this.pongReceived = true;
                        break;
                    case 'isFirst':
                        if (msg.isFirst) {
                            _this.setState(SignalingState$1.READY_TO_JOIN_OTHERS);
                        }
                        else {
                            _this.wc.webRTCBuilder.connectOverSignaling({
                                onMessage: _this.rxWs.onMessage.filter(function (m) { return m.type === 'content'; })
                                    .map(function (_a) {
                                    var content = _a.content;
                                    return content;
                                }),
                                send: function (m) { return _this.rxWs.send({ content: m }); },
                            })
                                .then(function (ch) {
                                _this.setState(SignalingState$1.CONNECTED_WITH_FIRST_MEMBER);
                                ch.markAsIntermediry();
                            })
                                .catch(function (err) {
                                _this.rxWs.close(FIRST_CONNECTION_ERROR_CODE, "Failed to join over Signaling: " + err.message);
                            });
                        }
                        break;
                }
            });
        })
            .catch(function (err) { return _this.setState(SignalingState$1.CLOSED); });
    };
    /**
     * Close the `WebSocket` with Signaling server.
     */
    Signaling.prototype.close = function () {
        if (this.rxWs) {
            this.rxWs.close(1000);
        }
    };
    Signaling.prototype.setState = function (state) {
        var _this = this;
        if (this.state !== state) {
            this.state = state;
            this.stateSubject.next(state);
            if (state === SignalingState$1.READY_TO_JOIN_OTHERS) {
                this.wc.webRTCBuilder.onChannelFromSignaling({
                    onMessage: this.rxWs.onMessage.filter(function (msg) { return msg.type === 'content'; })
                        .map(function (_a) {
                        var content = _a.content;
                        return content;
                    }),
                    send: function (msg) { return _this.rxWs.send({ content: msg }); },
                }).subscribe(function (ch) { return _this.channelSubject.next(ch); });
            }
        }
    };
    Signaling.prototype.startPingInterval = function () {
        var _this = this;
        this.rxWs.ping();
        this.pingInterval = setInterval(function () {
            if (_this.state !== SignalingState$1.CLOSED) {
                if (!_this.pongReceived) {
                    clearInterval(_this.pingInterval);
                    _this.rxWs.close(PING_ERROR_CODE, 'Signaling is not responding');
                }
                else {
                    _this.pongReceived = false;
                    _this.rxWs.ping();
                }
            }
        }, PING_INTERVAL);
    };
    Signaling.prototype.createRxWs = function (ws) {
        var _this = this;
        var subject = new Subject_2();
        ws.binaryType = 'arraybuffer';
        ws.onmessage = function (evt) {
            try {
                subject.next(signaling.Message.decode(new Uint8Array(evt.data)));
            }
            catch (err) {
                ws.close(MESSAGE_ERROR_CODE, err.message);
            }
        };
        ws.onerror = function (err) { return subject.error(err); };
        ws.onclose = function (closeEvt) {
            clearInterval(_this.pingInterval);
            _this.setState(SignalingState$1.CLOSED);
            if (closeEvt.code === 1000) {
                subject.complete();
            }
            log.info("Connection with Signaling '" + _this.url + "' closed: " + closeEvt.code + ": " + closeEvt.reason);
        };
        return {
            onMessage: subject.asObservable(),
            send: function (msg) {
                if (ws.readyState !== WebSocket.CLOSING && ws.readyState !== WebSocket.CLOSED) {
                    ws.send(signaling.Message.encode(signaling.Message.create(msg)).finish());
                }
            },
            ping: function () {
                if (ws.readyState !== WebSocket.CLOSING && ws.readyState !== WebSocket.CLOSED) {
                    ws.send(pingMsg);
                }
            },
            pong: function () {
                if (ws.readyState !== WebSocket.CLOSING && ws.readyState !== WebSocket.CLOSED) {
                    ws.send(pongMsg);
                }
            },
            close: function (code, reason) {
                if (code === void 0) { code = 1000; }
                if (reason === void 0) { reason = ''; }
                ws.onclose = undefined;
                ws.close(code, reason);
                _this.setState(SignalingState$1.CLOSED);
                clearInterval(_this.pingInterval);
                subject.complete();
            },
        };
    };
    Signaling.prototype.getFullURL = function (params) {
        if (this.url.endsWith('/')) {
            return this.url + params;
        }
        else {
            return this.url + '/' + params;
        }
    };
    return Signaling;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends$5(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

















function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/**
 * Wrapper class for `RTCDataChannel` and `WebSocket`.
 */
var Channel = (function () {
    /**
     * Creates a channel from existing `RTCDataChannel` or `WebSocket`.
     */
    function Channel(wc, connection, options) {
        if (options === void 0) { options = { id: -1 }; }
        var _this = this;
        log.info("new connection: Me: " + wc.myId + " with " + options.id);
        this.wc = wc;
        this.connection = connection;
        this.id = options.id;
        this.rtcPeerConnection = options.rtcPeerConnection;
        this.isIntermediary = false;
        // Configure `send` function
        if (isBrowser) {
            connection.binaryType = 'arraybuffer';
            this.send = this.sendInBrowser;
        }
        else if (!this.rtcPeerConnection) {
            this.send = this.sendInNodeViaWebSocket;
        }
        else {
            connection.binaryType = 'arraybuffer';
            this.send = this.sendInNodeViaDataChannel;
        }
        this.onClose = function (evt) {
            log.info("Connection with " + _this.id + " has closed");
            _this.connection.onclose = function () { };
            _this.connection.onmessage = function () { };
            _this.connection.onerror = function () { };
            wc.topologyService.onChannelClose(evt, _this);
            if (_this.rtcPeerConnection && _this.rtcPeerConnection.signalingState !== 'closed') {
                _this.rtcPeerConnection.close();
            }
        };
        // Configure handlers
        this.connection.onmessage = function (_a) {
            var data = _a.data;
            return wc.onMessageProxy(_this, new Uint8Array(data));
        };
        this.connection.onclose = function (evt) { return _this.onClose(evt); };
        this.connection.onerror = function (evt) { return wc.topologyService.onChannelError(evt, _this); };
    }
    Channel.prototype.markAsIntermediry = function () {
        this.wc.topologyService.initIntermediary(this);
    };
    Channel.prototype.close = function () {
        if (this.connection.readyState !== 'closed' &&
            this.connection.readyState !== 'closing' &&
            this.connection.readyState !== WebSocket.CLOSED &&
            this.connection.readyState !== WebSocket.CLOSING) {
            log.info("I:" + this.wc.myId + " close connection with " + this.id);
            this.connection.close();
            if (isFirefox && this.rtcPeerConnection && this.rtcPeerConnection.signalingState !== 'closed') {
                this.onClose(new global.Event('close'));
            }
        }
    };
    Channel.prototype.closeQuietly = function () {
        this.connection.onmessage = undefined;
        this.connection.onclose = undefined;
        this.connection.onerror = undefined;
        if (this.rtcPeerConnection) {
            this.rtcPeerConnection.oniceconnectionstatechange = undefined;
        }
        log.info("I:" + this.wc.myId + " close QUIETLY connection with " + this.id);
        this.connection.close();
        if (this.rtcPeerConnection && this.rtcPeerConnection.signalingState !== 'closed') {
            this.rtcPeerConnection.close();
        }
    };
    Channel.prototype.sendInBrowser = function (data) {
        // if (this.connection.readyState !== 'closed' && new Int8Array(data).length !== 0) {
        if (this.isOpen()) {
            try {
                this.connection.send(data);
            }
            catch (err) {
                console.error("Channel send: " + err.message);
            }
        }
    };
    Channel.prototype.sendInNodeViaWebSocket = function (data) {
        if (this.isOpen()) {
            try {
                this.connection.send(data, { binary: true });
            }
            catch (err) {
                console.error("Channel send: " + err.message);
            }
        }
    };
    Channel.prototype.sendInNodeViaDataChannel = function (data) {
        this.sendInBrowser(data.slice(0));
    };
    Channel.prototype.isOpen = function () {
        return this.connection.readyState === WebSocket.OPEN || this.connection.readyState === 'open';
    };
    return Channel;
}());

/**
 * Maximum size of the user message sent over `Channel` (without metadata).
 */
var MAX_USER_MSG_SIZE = 15000;
/**
 * Maximum message id number.
 */
var MAX_MSG_ID_SIZE = 65535;
var textEncoder = new global.TextEncoder();
var textDecoder = new global.TextDecoder();
/**
 * Message builder service is responsible to build messages to send them over the
 * `WebChannel` and treat messages received by the `WebChannel`. It also manage
 * big messages (more then 16ko) sent by users. Internal messages are always less
 * 16ko.
 */
var UserMessage = (function () {
    function UserMessage() {
        this.buffers = new Map();
    }
    /**
     * Encode user message for sending over the network.
     */
    UserMessage.prototype.encode = function (data) {
        var _a = this.userDataToType(data), type = _a.type, bytes = _a.bytes;
        var msg = { length: bytes.length, type: type };
        if (bytes.length <= MAX_USER_MSG_SIZE) {
            msg.full = bytes;
            return [user.Message.encode(user.Message.create(msg)).finish()];
        }
        else {
            msg.chunk = { id: Math.ceil(Math.random() * MAX_MSG_ID_SIZE) };
            var numberOfChunks = Math.ceil(bytes.length / MAX_USER_MSG_SIZE);
            var res = new Array(numberOfChunks);
            for (var i = 0; i < numberOfChunks; i++) {
                var length_1 = Math.min(MAX_USER_MSG_SIZE, bytes.length - MAX_USER_MSG_SIZE * i);
                var begin = MAX_USER_MSG_SIZE * i;
                var end = begin + length_1;
                msg.chunk.number = i;
                msg.chunk.content = new Uint8Array(bytes.slice(begin, end));
                res[i] = user.Message.encode(user.Message.create(msg)).finish();
            }
            return res;
        }
    };
    /**
     * Decode user message received from the network.
     */
    UserMessage.prototype.decode = function (bytes, senderId) {
        var msg = user.Message.decode(bytes);
        var content;
        switch (msg.content) {
            case 'full': {
                content = msg.full;
                break;
            }
            case 'chunk': {
                var buffer = this.getBuffer(senderId, msg.chunk.id);
                if (buffer === undefined) {
                    buffer = new Buffer$1(msg.length, msg.chunk.content, msg.chunk.number);
                    this.setBuffer(senderId, msg.chunk.id, buffer);
                    content = undefined;
                }
                else {
                    content = buffer.append(msg.chunk.content, msg.chunk.number);
                }
                break;
            }
            default: {
                throw new Error('Unknown message integrity');
            }
        }
        if (content !== undefined) {
            switch (msg.type) {
                case user.Message.Type.U_INT_8_ARRAY:
                    return content;
                case user.Message.Type.STRING:
                    return textDecoder.decode(content);
                default:
                    throw new Error('Unknown message type');
            }
        }
        return content;
    };
    /**
     * Identify the user data type.
     */
    UserMessage.prototype.userDataToType = function (data) {
        if (data instanceof Uint8Array) {
            return { type: user.Message.Type.U_INT_8_ARRAY, bytes: data };
        }
        else if (typeof data === 'string') {
            return { type: user.Message.Type.STRING, bytes: textEncoder.encode(data) };
        }
        else if (data instanceof String) {
            return { type: user.Message.Type.STRING, bytes: textEncoder.encode('' + data) };
        }
        else {
            throw new Error('Message neigther a string type or a Uint8Array type');
        }
    };
    UserMessage.prototype.getBuffer = function (peerId, msgId) {
        var buffers = this.buffers.get(peerId);
        if (buffers !== undefined) {
            return buffers.get(msgId);
        }
        return undefined;
    };
    UserMessage.prototype.setBuffer = function (peerId, msgId, buffer) {
        var buffers = this.buffers.get(peerId);
        if (buffers === undefined) {
            buffers = new Map();
        }
        buffers.set(msgId, buffer);
        this.buffers.set(peerId, buffers);
    };
    return UserMessage;
}());
/**
 * Buffer class used when the user message exceeds the message size limit which
 * may be sent over a `Channel`. Each buffer is identified by `WebChannel` id,
 * peer id of the sender and message id (in case if the peer sent more then
 * 1 big message at a time).
 */
var Buffer$1 = (function () {
    function Buffer(totalLength, data, chunkNb) {
        this.fullData = new Uint8Array(totalLength);
        this.currentLength = 0;
        this.append(data, chunkNb);
    }
    /**
     * Add a chunk of message to the buffer.
     */
    Buffer.prototype.append = function (data, chunkNb) {
        var i = chunkNb * MAX_USER_MSG_SIZE;
        this.currentLength += data.length;
        try {
            for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var d = data_1_1.value;
                this.fullData[i++] = d;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.currentLength === this.fullData.length ? this.fullData : undefined;
        var e_1, _a;
    };
    return Buffer;
}());

"use strict";
var __extends$6 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter$2(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
}
var filter_2 = filter$2;
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FilterSubscriber = (function (_super) {
    __extends$6(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_1.Subscriber));


var filter_1 = {
	filter: filter_2
};

"use strict";


Observable_1.Observable.prototype.filter = filter_1.filter;

"use strict";
var __extends$7 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * @class BehaviorSubject<T>
 */
var BehaviorSubject = (function (_super) {
    __extends$7(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        _super.call(this);
        this._value = _value;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return this._value;
        }
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject;
}(Subject_1.Subject));
var BehaviorSubject_2 = BehaviorSubject;

var CONNECT_TIMEOUT_FOR_NODE = 3000;
var listenSubject = new BehaviorSubject_2('');
/**
 * Service class responsible to establish connections between peers via
 * `WebSocket`.
 */
var WebSocketBuilder = (function () {
    function WebSocketBuilder(wc) {
        this.wc = wc;
        this.channelsSubject = new Subject_2();
    }
    WebSocketBuilder.listen = function () {
        return listenSubject;
    };
    WebSocketBuilder.newIncomingSocket = function (wc, ws, senderId) {
        wc.webSocketBuilder.channelsSubject.next(new Channel(wc, ws, { id: senderId }));
    };
    Object.defineProperty(WebSocketBuilder.prototype, "onChannel", {
        get: function () {
            return this.channelsSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Establish `WebSocket` with a server.
     *
     * @param url Server url
     */
    WebSocketBuilder.prototype.connect = function (url) {
        return new Promise(function (resolve, reject) {
            try {
                if (isURL(url) && url.search(/^wss?/) !== -1) {
                    var ws_1 = new global.WebSocket(url);
                    ws_1.onopen = function () { return resolve(ws_1); };
                    ws_1.onclose = function (closeEvt) { return reject(new Error("WebSocket connection to '" + url + "' failed with code " + closeEvt.code + ": " + closeEvt.reason)); };
                    if (!isBrowser) {
                        // Timeout for node (otherwise it will loop forever if incorrect address)
                        setTimeout(function () {
                            if (ws_1.readyState !== ws_1.OPEN) {
                                reject(new Error("WebSocket " + CONNECT_TIMEOUT_FOR_NODE + "ms connection timeout with " + url));
                            }
                        }, CONNECT_TIMEOUT_FOR_NODE);
                    }
                }
                else {
                    throw new Error(url + " is not a valid URL");
                }
            }
            catch (err) {
                console.error('WebSocketBuilder ERROR');
                reject(err);
            }
        });
    };
    /**
     * Establish a `Channel` with a server peer identified by `id`.
     *
     * @param url Server url
     * @param id  Peer id
     */
    WebSocketBuilder.prototype.connectTo = function (url, id) {
        var _this = this;
        var fullUrl = url + "/internalChannel?wcId=" + this.wc.id + "&senderId=" + this.wc.myId;
        return new Promise(function (resolve, reject) {
            if (isURL(url) && url.search(/^wss?/) !== -1) {
                var ws_2 = new global.WebSocket(fullUrl);
                var channel_1 = new Channel(_this.wc, ws_2, { id: id });
                ws_2.onopen = function () { return resolve(channel_1); };
                ws_2.onclose = function (closeEvt) { return reject(new Error("WebSocket connection to '" + url + "' failed with code " + closeEvt.code + ": " + closeEvt.reason)); };
                if (!isBrowser) {
                    // Timeout for node (otherwise it will loop forever if incorrect address)
                    setTimeout(function () {
                        if (ws_2.readyState !== ws_2.OPEN) {
                            reject(new Error("WebSocket " + CONNECT_TIMEOUT_FOR_NODE + "ms connection timeout with " + url));
                        }
                    }, CONNECT_TIMEOUT_FOR_NODE);
                }
            }
            else {
                throw new Error(url + " is not a valid URL");
            }
        });
    };
    return WebSocketBuilder;
}());

/**
 * Services are specific classes. Instance of such class communicates via
 * network with another instance of the same class. Indeed each peer in the
 * network instantiates its own service.
 * Each service has `.proto` file containing the desciption of its
 * communication protocol.
 */
var Service$1 = (function () {
    function Service(id, protoMessage, serviceMessageSubject) {
        this.serviceId = id;
        this.protoMessage = protoMessage;
        if (serviceMessageSubject !== undefined) {
            this.setupServiceMessage(serviceMessageSubject);
        }
    }
    /**
     * Encode service message for sending over the network.
     *
     * @param msg Service specific message object
     */
    Service.prototype.encode = function (msg) {
        return service.Message.encode(service.Message.create({
            id: this.serviceId,
            content: this.protoMessage.encode(this.protoMessage.create(msg)).finish(),
        })).finish();
    };
    /**
     * Decode service message received from the network.
     *
     * @return  Service specific message object
     */
    Service.prototype.decode = function (bytes) {
        return this.protoMessage.decode(bytes);
    };
    Service.prototype.setupServiceMessage = function (serviceMessageSubject) {
        var _this = this;
        this.onServiceMessage = serviceMessageSubject
            .filter(function (_a) {
            var id = _a.id;
            return id === _this.serviceId;
        })
            .map(function (_a) {
            var channel = _a.channel, senderId = _a.senderId, recipientId = _a.recipientId, content = _a.content;
            return ({
                channel: channel,
                senderId: senderId,
                recipientId: recipientId,
                msg: _this.protoMessage.decode(content),
            });
        });
    };
    return Service;
}());

"use strict";
var __extends$8 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map$2(project, thisArg) {
    if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
}
var map_2 = map$2;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
var MapOperator_1 = MapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = (function (_super) {
    __extends$8(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1.Subscriber));


var map_1 = {
	map: map_2,
	MapOperator: MapOperator_1
};

"use strict";


Observable_1.Observable.prototype.map = map_1.map;

"use strict";
var __extends$12 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = (function (_super) {
    __extends$12(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
var Action_2 = Action;


var Action_1 = {
	Action: Action_2
};

"use strict";
var __extends$11 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = (function (_super) {
    __extends$11(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return root.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // or the action has been rescheduled before it's executed, clear the interval id
        return root.root.clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(Action_1.Action));
var AsyncAction_2 = AsyncAction;


var AsyncAction_1 = {
	AsyncAction: AsyncAction_2
};

"use strict";
var __extends$10 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var QueueAction = (function (_super) {
    __extends$10(QueueAction, _super);
    function QueueAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        // Otherwise flush the scheduler starting with this action.
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction_1.AsyncAction));
var QueueAction_2 = QueueAction;


var QueueAction_1 = {
	QueueAction: QueueAction_2
};

"use strict";
/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
var Scheduler_2 = Scheduler;


var Scheduler_1 = {
	Scheduler: Scheduler_2
};

"use strict";
var __extends$14 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var AsyncScheduler = (function (_super) {
    __extends$14(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
var AsyncScheduler_2 = AsyncScheduler;


var AsyncScheduler_1 = {
	AsyncScheduler: AsyncScheduler_2
};

"use strict";
var __extends$13 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var QueueScheduler = (function (_super) {
    __extends$13(QueueScheduler, _super);
    function QueueScheduler() {
        _super.apply(this, arguments);
    }
    return QueueScheduler;
}(AsyncScheduler_1.AsyncScheduler));
var QueueScheduler_2 = QueueScheduler;


var QueueScheduler_1 = {
	QueueScheduler: QueueScheduler_2
};

"use strict";


/**
 *
 * Queue Scheduler
 *
 * <span class="informal">Put every next task on a queue, instead of executing it immediately</span>
 *
 * `queue` scheduler, when used with delay, behaves the same as {@link async} scheduler.
 *
 * When used without delay, it schedules given task synchronously - executes it right when
 * it is scheduled. However when called recursively, that is when inside the scheduled task,
 * another task is scheduled with queue scheduler, instead of executing immediately as well,
 * that task will be put on a queue and wait for current one to finish.
 *
 * This means that when you execute task with `queue` scheduler, you are sure it will end
 * before any other task scheduled with that scheduler will start.
 *
 * @examples <caption>Schedule recursively first, then do something</caption>
 *
 * Rx.Scheduler.queue.schedule(() => {
 *   Rx.Scheduler.queue.schedule(() => console.log('second')); // will not happen now, but will be put on a queue
 *
 *   console.log('first');
 * });
 *
 * // Logs:
 * // "first"
 * // "second"
 *
 *
 * @example <caption>Reschedule itself recursively</caption>
 *
 * Rx.Scheduler.queue.schedule(function(state) {
 *   if (state !== 0) {
 *     console.log('before', state);
 *     this.schedule(state - 1); // `this` references currently executing Action,
 *                               // which we reschedule with new state
 *     console.log('after', state);
 *   }
 * }, 0, 3);
 *
 * // In scheduler that runs recursively, you would expect:
 * // "before", 3
 * // "before", 2
 * // "before", 1
 * // "after", 1
 * // "after", 2
 * // "after", 3
 *
 * // But with queue it logs:
 * // "before", 3
 * // "after", 3
 * // "before", 2
 * // "after", 2
 * // "before", 1
 * // "after", 1
 *
 *
 * @static true
 * @name queue
 * @owner Scheduler
 */
var queue_1 = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);


var queue = {
	queue: queue_1
};

"use strict";

/**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {@link materialize}
 * @see {@link dematerialize}
 * @see {@link observeOn}
 *
 * @class Notification<T>
 */
var Notification = (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param {Observer} observer
     * @return
     */
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    /**
     * Given some {@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param {function(value: T): void} next An Observer `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    /**
     * Takes an Observer or its individual callback functions, and calls `observe`
     * or `do` methods accordingly.
     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
     * the `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return {any}
     */
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable_1.Observable.of(this.value);
            case 'E':
                return Observable_1.Observable.throw(this.error);
            case 'C':
                return Observable_1.Observable.empty();
        }
        throw new Error('unexpected notification kind value');
    };
    /**
     * A shortcut to create a Notification instance of the type `next` from a
     * given value.
     * @param {T} value The `next` value.
     * @return {Notification<T>} The "next" Notification representing the
     * argument.
     */
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    /**
     * A shortcut to create a Notification instance of the type `error` from a
     * given error.
     * @param {any} [err] The `error` error.
     * @return {Notification<T>} The "error" Notification representing the
     * argument.
     */
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return {Notification<any>} The valueless "complete" Notification.
     */
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());
var Notification_2 = Notification;


var Notification_1 = {
	Notification: Notification_2
};

"use strict";
var __extends$15 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 *
 * Re-emits all notifications from source Observable with specified scheduler.
 *
 * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
 *
 * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
 * notifications emitted by the source Observable. It might be useful, if you do not have control over
 * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
 *
 * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
 * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
 * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
 * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
 * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
 * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
 * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
 * little bit more, to ensure that they are emitted at expected moments.
 *
 * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
 * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
 * will delay all notifications - including error notifications - while `delay` will pass through error
 * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
 * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
 * for notification emissions in general.
 *
 * @example <caption>Ensure values in subscribe are called just before browser repaint.</caption>
 * const intervals = Rx.Observable.interval(10); // Intervals are scheduled
 *                                               // with async scheduler by default...
 *
 * intervals
 * .observeOn(Rx.Scheduler.animationFrame)       // ...but we will observe on animationFrame
 * .subscribe(val => {                           // scheduler to ensure smooth animation.
 *   someDiv.style.height = val + 'px';
 * });
 *
 * @see {@link delay}
 *
 * @param {IScheduler} scheduler Scheduler that will be used to reschedule notifications from source Observable.
 * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
 * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
 * but with provided scheduler.
 *
 * @method observeOn
 * @owner Observable
 */
function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return this.lift(new ObserveOnOperator(scheduler, delay));
}
var observeOn_2 = observeOn;
var ObserveOnOperator = (function () {
    function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
}());
var ObserveOnOperator_1 = ObserveOnOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ObserveOnSubscriber = (function (_super) {
    __extends$15(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        _super.call(this, destination);
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification, destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(Notification_1.Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(Notification_1.Notification.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(Notification_1.Notification.createComplete());
    };
    return ObserveOnSubscriber;
}(Subscriber_1.Subscriber));
var ObserveOnSubscriber_1 = ObserveOnSubscriber;
var ObserveOnMessage = (function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
}());
var ObserveOnMessage_1 = ObserveOnMessage;


var observeOn_1 = {
	observeOn: observeOn_2,
	ObserveOnOperator: ObserveOnOperator_1,
	ObserveOnSubscriber: ObserveOnSubscriber_1,
	ObserveOnMessage: ObserveOnMessage_1
};

"use strict";
var __extends$9 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};






/**
 * @class ReplaySubject<T>
 */
var ReplaySubject = (function (_super) {
    __extends$9(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
        _super.call(this);
        this.scheduler = scheduler;
        this._events = [];
        this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    ReplaySubject.prototype.next = function (value) {
        var now = this._getNow();
        this._events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _events = this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var subscription;
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
        }
        var len = _events.length;
        for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i].value);
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue.queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(Subject_1.Subject));
var ReplaySubject_2 = ReplaySubject;
var ReplayEvent = (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());

/**
 * Service id.
 */
var ID = 0;
/**
 * Service class responsible to establish `RTCDataChannel` between two clients via
 * signaling server or `WebChannel`.
 *
 */
var WebRTCBuilder = (function (_super) {
    __extends$5(WebRTCBuilder, _super);
    function WebRTCBuilder(wc, iceServers) {
        var _this = _super.call(this, ID, webRTCBuilder.Message, wc.serviceMessageSubject) || this;
        _this.wc = wc;
        _this.rtcConfiguration = { iceServers: iceServers };
        _this.clients = new Map();
        return _this;
    }
    Object.defineProperty(WebRTCBuilder, "isSupported", {
        /**
         * Indicates whether WebRTC is supported by the environment.
         */
        get: function () {
            return global.RTCPeerConnection !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    WebRTCBuilder.prototype.onChannelFromWebChannel = function () {
        var _this = this;
        if (WebRTCBuilder.isSupported) {
            return this.onChannel(this.onServiceMessage
                .filter(function (_a) {
                var msg = _a.msg;
                return msg.isInitiator;
            })
                .map(function (_a) {
                var msg = _a.msg, senderId = _a.senderId;
                msg.id = senderId;
                return msg;
            }), function (msg, id) { return _this.wc.sendToProxy({ recipientId: id, content: _super.prototype.encode.call(_this, msg) }); });
        }
        throw new Error('WebRTC is not supported');
    };
    /**
     * Establish an `RTCDataChannel` with a peer identified by `id` trough `WebChannel`.
     * Starts by sending an **SDP offer**.
     *
     * @param id  Peer id
     */
    WebRTCBuilder.prototype.connectOverWebChannel = function (id) {
        var _this = this;
        if (WebRTCBuilder.isSupported) {
            return this.establishChannel(this.onServiceMessage
                .filter(function (_a) {
                var msg = _a.msg, senderId = _a.senderId;
                return senderId === id && !msg.isInitiator;
            })
                .map(function (_a) {
                var msg = _a.msg;
                return ({ answer: msg.answer, iceCandidate: msg.iceCandidate });
            }), function (msg) {
                msg.isInitiator = true;
                _this.wc.sendToProxy({ recipientId: id, content: _super.prototype.encode.call(_this, msg) });
            }, id);
        }
        throw new Error('WebRTC is not supported');
    };
    /**
     * Listen on `RTCDataChannel` from Signaling server.
     * Starts to listen on **SDP answer**.
     */
    WebRTCBuilder.prototype.onChannelFromSignaling = function (signalingConnection) {
        var _this = this;
        if (WebRTCBuilder.isSupported) {
            return this.onChannel(signalingConnection.onMessage.filter(function (_a) {
                var id = _a.id;
                return id !== 0;
            })
                .map(function (msg) {
                if (msg.type === 'data') {
                    var completeData = _super.prototype.decode.call(_this, msg.data);
                    completeData.id = msg.id;
                    return completeData;
                }
                else {
                    return { isError: true };
                }
            }), function (msg, id) {
                var bytes = webRTCBuilder.Message
                    .encode(webRTCBuilder.Message.create(msg))
                    .finish();
                var isEnd = msg.iceCandidate !== undefined && msg.iceCandidate.candidate === '';
                signalingConnection.send({ id: id, isEnd: isEnd, data: bytes });
            });
        }
        throw new Error('WebRTC is not supported');
    };
    /**
     * Establish an `RTCDataChannel` with a peer identified by `id` trough Signaling server.
     * Starts by sending an **SDP offer**.
     */
    WebRTCBuilder.prototype.connectOverSignaling = function (signalingConnection) {
        var _this = this;
        if (WebRTCBuilder.isSupported) {
            return this.establishChannel(signalingConnection.onMessage.filter(function (_a) {
                var id = _a.id;
                return id === 0;
            })
                .map(function (msg) {
                return msg.type === 'data' ? _super.prototype.decode.call(_this, msg.data) : { isError: true };
            }), function (msg) {
                var bytes = webRTCBuilder.Message
                    .encode(webRTCBuilder.Message.create(msg))
                    .finish();
                var isEnd = msg.iceCandidate !== undefined && msg.iceCandidate.candidate === '';
                signalingConnection.send({ isEnd: isEnd, data: bytes });
            });
        }
        throw new Error('WebRTC is not supported');
    };
    WebRTCBuilder.prototype.establishChannel = function (onMessage, send, id) {
        var _this = this;
        if (id === void 0) { id = 1; }
        var pc = new global.RTCPeerConnection(this.rtcConfiguration);
        var remoteCandidateStream = new ReplaySubject_2();
        this.localCandidates(pc).subscribe(function (iceCandidate) { return send({ iceCandidate: iceCandidate }); }, function (err) { return console.warn(err); }, function () { return send({ iceCandidate: { candidate: '' } }); });
        return new Promise(function (resolve, reject) {
            var subs = onMessage.subscribe(function (_a) {
                var answer = _a.answer, iceCandidate = _a.iceCandidate, isError = _a.isError;
                if (answer) {
                    pc.setRemoteDescription({ type: 'answer', sdp: answer })
                        .then(function () {
                        remoteCandidateStream.subscribe(function (ic) {
                            pc.addIceCandidate(new global.RTCIceCandidate(ic))
                                .catch(reject);
                        }, function (err) { return console.warn(err); }, function () { return subs.unsubscribe(); });
                    })
                        .catch(reject);
                }
                else if (iceCandidate) {
                    if (iceCandidate.candidate !== '') {
                        remoteCandidateStream.next(iceCandidate);
                    }
                    else {
                        remoteCandidateStream.complete();
                    }
                }
                else if (isError) {
                    reject(new Error('Remote peer no longer available via Signaling'));
                }
                else {
                    reject(new Error('Unknown message from a remote peer'));
                }
            }, function (err) { return reject(err); }, function () { return reject(new Error('Failed to establish RTCDataChannel: the connection with Signaling server was closed')); });
            _this.openChannel(pc, id)
                .then(resolve)
                .catch(reject);
            pc.createOffer()
                .then(function (offer) { return pc.setLocalDescription(offer); })
                .then(function () { return send({ offer: pc.localDescription.sdp }); })
                .catch(reject);
        });
    };
    WebRTCBuilder.prototype.onChannel = function (onMessage, send) {
        var _this = this;
        return Observable_2.create(function (observer) {
            onMessage.subscribe(function (_a) {
                var offer = _a.offer, iceCandidate = _a.iceCandidate, id = _a.id, isError = _a.isError;
                var client = _this.clients.get(id);
                var pc;
                var remoteCandidateStream;
                if (client) {
                    _b = __read(client, 2), pc = _b[0], remoteCandidateStream = _b[1];
                }
                else {
                    pc = new global.RTCPeerConnection(_this.rtcConfiguration);
                    remoteCandidateStream = new ReplaySubject_2();
                    _this.localCandidates(pc).subscribe(function (ic) { return send({ iceCandidate: ic }, id); }, function (err) { return console.warn(err); }, function () { return send({ iceCandidate: { candidate: '' } }, id); });
                    _this.clients.set(id, [pc, remoteCandidateStream]);
                }
                if (offer) {
                    _this.openChannel(pc)
                        .then(function (ch) { return observer.next(ch); })
                        .catch(function (err) {
                        _this.clients.delete(id);
                        console.warn("Client \"" + id + "\" failed to establish RTCDataChannel with you: " + err.message);
                    });
                    pc.setRemoteDescription({ type: 'offer', sdp: offer })
                        .then(function () { return remoteCandidateStream.subscribe(function (ic) {
                        pc.addIceCandidate(new global.RTCIceCandidate(ic))
                            .catch(function (err) { return console.warn(err); });
                    }, function (err) { return console.warn(err); }, function () { return _this.clients.delete(id); }); })
                        .then(function () { return pc.createAnswer(); })
                        .then(function (answer) { return pc.setLocalDescription(answer); })
                        .then(function () { return send({ answer: pc.localDescription.sdp }, id); })
                        .catch(function (err) {
                        _this.clients.delete(id);
                        console.error(err);
                    });
                }
                else if (iceCandidate) {
                    if (iceCandidate.candidate !== '') {
                        remoteCandidateStream.next(iceCandidate);
                    }
                    else {
                        remoteCandidateStream.complete();
                    }
                }
                else if (isError) {
                    console.warn('Remote peer no longer available via Signaling');
                }
                else {
                    console.error(new Error('Unknown message from a remote peer'));
                }
                var _b;
            }, function (err) { return observer.error(err); }, function () { return observer.complete(); });
        });
    };
    WebRTCBuilder.prototype.localCandidates = function (pc) {
        return Observable_2.create(function (observer) {
            pc.onicecandidate = function (evt) {
                if (evt.candidate !== null) {
                    observer.next({
                        candidate: evt.candidate.candidate,
                        sdpMid: evt.candidate.sdpMid,
                        sdpMLineIndex: evt.candidate.sdpMLineIndex,
                    });
                }
                else {
                    observer.complete();
                }
            };
        });
    };
    WebRTCBuilder.prototype.openChannel = function (pc, id) {
        var _this = this;
        if (id !== undefined) {
            try {
                var dc_1 = pc.createDataChannel((this.wc.myId).toString());
                var channel_1 = new Channel(this.wc, dc_1, { rtcPeerConnection: pc, id: id });
                return new Promise(function (resolve, reject) {
                    pc.oniceconnectionstatechange = function () {
                        if (pc.iceConnectionState === 'failed') {
                            reject('Failed to establish PeerConnection: ' +
                                'The ICE candidate did not find compatible matches for all components of the connection');
                        }
                    };
                    dc_1.onopen = function () {
                        pc.oniceconnectionstatechange = function () {
                            log.info("ICE connection state with " + channel_1.id + " changed to " + pc.iceConnectionState.toUpperCase());
                            if (pc.iceConnectionState === 'failed') {
                                channel_1.close();
                            }
                        };
                        resolve(channel_1);
                    };
                });
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        else {
            return new Promise(function (resolve, reject) {
                pc.oniceconnectionstatechange = function () {
                    if (pc.iceConnectionState === 'failed') {
                        reject('The ICE candidate did not find compatible matches for all components of the connection');
                    }
                };
                pc.ondatachannel = function (dcEvt) {
                    var dc = dcEvt.channel;
                    var peerId = Number.parseInt(dc.label, 10);
                    var channel = new Channel(_this.wc, dc, { rtcPeerConnection: pc, id: peerId });
                    dc.onopen = function (evt) {
                        pc.oniceconnectionstatechange = function () {
                            log.info("ICE connection state with " + channel.id + " changed to " + pc.iceConnectionState.toUpperCase());
                            if (pc.iceConnectionState === 'failed') {
                                channel.close();
                            }
                        };
                        resolve(channel);
                    };
                };
            });
        }
    };
    return WebRTCBuilder;
}(Service$1));

var ME = {
    wsUrl: '',
    isWrtcSupport: false,
};
var request;
var response;
/**
 * It is responsible to build a channel between two peers with a help of `WebSocketBuilder` and `WebRTCBuilder`.
 * Its algorithm determine which channel (socket or dataChannel) should be created
 * based on the services availability and peers' preferences.
 */
var ChannelBuilder = (function (_super) {
    __extends$5(ChannelBuilder, _super);
    function ChannelBuilder(wc) {
        var _this = _super.call(this, 20, channelBuilder.Message, wc.serviceMessageSubject) || this;
        _this.wc = wc;
        _this.pendingRequests = new Map();
        _this.channelsSubject = new Subject_2();
        // Listen on Channels as RTCDataChannels if WebRTC is supported
        ME.isWrtcSupport = WebRTCBuilder.isSupported;
        if (ME.isWrtcSupport) {
            wc.webRTCBuilder.onChannelFromWebChannel()
                .subscribe(function (ch) { return _this.handleChannel(ch); });
        }
        // Listen on Channels as WebSockets if the peer is listening on WebSockets
        WebSocketBuilder.listen().subscribe(function (url) {
            ME.wsUrl = url;
            if (url) {
                wc.webSocketBuilder.onChannel.subscribe(function (ch) { return _this.handleChannel(ch); });
            }
            // Update preconstructed messages (for performance only)
            var content = { wsUrl: url, isWrtcSupport: ME.isWrtcSupport };
            request = _super.prototype.encode.call(_this, { request: content });
            response = _super.prototype.encode.call(_this, { response: content });
        });
        // Subscribe to WebChannel internal messages
        _this.onServiceMessage.subscribe(function (msg) { return _this.treatServiceMessage(msg); });
        return _this;
    }
    Object.defineProperty(ChannelBuilder.prototype, "onChannel", {
        get: function () {
            return this.channelsSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Establish a `Channel` with the peer identified by `id`.
     */
    ChannelBuilder.prototype.connectTo = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pendingRequests.set(id, {
                resolve: function (ch) {
                    _this.pendingRequests.delete(id);
                    resolve(ch);
                }, reject: function (err) {
                    _this.pendingRequests.delete(id);
                    reject(err);
                },
            });
            _this.wc.sendToProxy({ recipientId: id, content: request });
        });
    };
    ChannelBuilder.prototype.handleChannel = function (ch) {
        var pendReq = this.pendingRequests.get(ch.id);
        if (pendReq) {
            pendReq.resolve(ch);
        }
        else {
            this.channelsSubject.next(ch);
        }
    };
    ChannelBuilder.prototype.treatServiceMessage = function (_a) {
        var _this = this;
        var channel = _a.channel, senderId = _a.senderId, recipientId = _a.recipientId, msg = _a.msg;
        switch (msg.type) {
            case 'failed': {
                console.warn('treatServiceMessage ERROR: ', msg.failed);
                var pr = this.pendingRequests.get(senderId);
                if (pr !== undefined) {
                    pr.reject(new Error(msg.failed));
                }
                break;
            }
            case 'request': {
                var _b = msg.request, wsUrl = _b.wsUrl, isWrtcSupport = _b.isWrtcSupport;
                // If remote peer is listening on WebSocket, connect to him
                if (wsUrl) {
                    this.wc.webSocketBuilder.connectTo(wsUrl, senderId)
                        .then(function (ch) { return _this.handleChannel(ch); })
                        .catch(function (reason) {
                        if (ME.wsUrl) {
                            // Ask him to connect to me via WebSocket
                            _this.wc.sendToProxy({ recipientId: senderId, content: response });
                        }
                        else {
                            // Send failed reason
                            _this.wc.sendToProxy({
                                recipientId: senderId,
                                content: _super.prototype.encode.call(_this, { failed: "Failed to establish a socket: " + reason }),
                            });
                        }
                    });
                    // If remote peer is able to connect over RTCDataChannel, verify first if I am listening on WebSocket
                }
                else if (isWrtcSupport) {
                    if (ME.wsUrl) {
                        // Ask him to connect to me via WebSocket
                        this.wc.sendToProxy({ recipientId: senderId, content: response });
                    }
                    else if (ME.isWrtcSupport) {
                        this.wc.webRTCBuilder.connectOverWebChannel(senderId)
                            .then(function (ch) { return _this.handleChannel(ch); })
                            .catch(function (reason) {
                            // Send failed reason
                            _this.wc.sendToProxy({
                                recipientId: senderId,
                                content: _super.prototype.encode.call(_this, { failed: "Failed establish a data channel: " + reason }),
                            });
                        });
                    }
                    else {
                        // Send failed reason
                        this.wc.sendToProxy({
                            recipientId: senderId,
                            content: _super.prototype.encode.call(this, { failed: 'No common connectors' }),
                        });
                    }
                    // If peer is not listening on WebSocket and is not able to connect over RTCDataChannel
                }
                else if (!wsUrl && !isWrtcSupport) {
                    if (ME.wsUrl) {
                        // Ask him to connect to me via WebSocket
                        this.wc.sendToProxy({ recipientId: senderId, content: response });
                    }
                    else {
                        // Send failed reason
                        this.wc.sendToProxy({
                            recipientId: senderId,
                            content: _super.prototype.encode.call(this, { failed: 'No common connectors' }),
                        });
                    }
                }
                break;
            }
            case 'response': {
                var wsUrl = msg.response.wsUrl;
                if (wsUrl) {
                    this.wc.webSocketBuilder.connectTo(wsUrl, senderId)
                        .then(function (ch) { return _this.handleChannel(ch); })
                        .catch(function (reason) {
                        _this.pendingRequests.get(senderId)
                            .reject(new Error("Failed to establish a socket: " + reason));
                    });
                }
                break;
            }
        }
    };
    return ChannelBuilder;
}(Service$1));

/**
 * {@link FullMesh} identifier.
 * @ignore
 * @type {number}
 */
var FULL_MESH = 3;
var MAX_JOIN_ATTEMPTS = 100;
/**
 * Fully connected web channel manager. Implements fully connected topology
 * network, when each peer is connected to each other.
 *
 */
var FullMesh = (function (_super) {
    __extends$5(FullMesh, _super);
    function FullMesh(wc) {
        var _this = _super.call(this, FULL_MESH, fullMesh.Message, wc.serviceMessageSubject) || this;
        _this.wc = wc;
        _this.channels = new Set();
        _this.jps = new Map();
        _this.joinAttempts = 0;
        _this.intermediaryChannel = undefined;
        _this.joinSucceedContent = _super.prototype.encode.call(_this, { joinSucceed: true });
        _this.onServiceMessage.subscribe(function (msg) { return _this.handleSvcMsg(msg); });
        _this.wc.channelBuilder.onChannel.subscribe(function (ch) { return _this.peerJoined(ch); });
        return _this;
    }
    FullMesh.prototype.clean = function () { };
    FullMesh.prototype.addJoining = function (ch, members) {
        log.info("FULL_MESH: I:" + this.wc.myId + " am helping to join " + ch.id);
        this.peerJoined(ch);
        this.checkMembers(ch, members);
    };
    FullMesh.prototype.initIntermediary = function (ch) {
        this.intermediaryChannel = ch;
    };
    FullMesh.prototype.initJoining = function (ch) {
        log.info("FULL_MESH: I:" + this.wc.myId + " am joining with help of " + ch.id);
        this.peerJoined(ch);
        this.joinAttempts = 0;
        this.intermediaryChannel = ch;
    };
    FullMesh.prototype.send = function (msg) {
        var bytes = this.wc.encode(msg);
        try {
            for (var _a = __values(this.channels), _b = _a.next(); !_b.done; _b = _a.next()) {
                var ch = _b.value;
                ch.send(bytes);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    FullMesh.prototype.forward = function (msg) { };
    FullMesh.prototype.sendTo = function (msg) {
        var bytes = this.wc.encode(msg);
        try {
            for (var _a = __values(this.channels), _b = _a.next(); !_b.done; _b = _a.next()) {
                var ch = _b.value;
                if (ch.id === msg.recipientId) {
                    ch.send(bytes);
                    return;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (this.intermediaryChannel) {
            this.intermediaryChannel.send((bytes));
            return;
        }
        else {
            try {
                for (var _d = __values(this.jps), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var _f = __read(_e.value, 2), id = _f[0], ch = _f[1];
                    if (id === msg.recipientId) {
                        ch.send((bytes));
                        return;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_g = _d.return)) _g.call(_d);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        console.warn(this.wc.myId + ' The recipient could not be found', msg.recipientId);
        var e_2, _c, e_3, _g;
    };
    FullMesh.prototype.forwardTo = function (msg) {
        this.sendTo(msg);
    };
    FullMesh.prototype.leave = function () {
        try {
            for (var _a = __values(this.channels), _b = _a.next(); !_b.done; _b = _a.next()) {
                var ch = _b.value;
                ch.close();
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.jps = new Map();
        this.joinAttempts = 0;
        this.intermediaryChannel = undefined;
        var e_4, _c;
    };
    FullMesh.prototype.onChannelClose = function (event, channel) {
        if (channel === this.intermediaryChannel) {
            this.leave();
            this.wc.joinSubject.next(new Error("Intermediary channel closed: " + event.type));
        }
        if (this.channels.delete(channel)) {
            this.wc.onMemberLeaveProxy(channel.id);
        }
    };
    FullMesh.prototype.onChannelError = function (evt, channel) {
        console.warn("Channel error: " + evt.type);
    };
    FullMesh.prototype.handleSvcMsg = function (_a) {
        var _this = this;
        var channel = _a.channel, senderId = _a.senderId, recipientId = _a.recipientId, msg = _a.msg;
        switch (msg.type) {
            case 'connectTo': {
                // Filter only missing peers
                var missingPeers = msg.connectTo.members.filter(function (id) { return id !== _this.wc.myId && !_this.wc.members.includes(id); });
                // Establish connection to the missing peers
                var misssingConnections = [];
                var _loop_1 = function (id) {
                    misssingConnections[misssingConnections.length] = new Promise(function (resolve) {
                        _this.wc.channelBuilder.connectTo(id)
                            .then(function (ch) {
                            _this.peerJoined(ch);
                            resolve();
                        })
                            .catch(function (err) {
                            console.warn(_this.wc.myId + ' failed to connect to ' + id, err.message);
                            resolve();
                        });
                    });
                };
                try {
                    for (var missingPeers_1 = __values(missingPeers), missingPeers_1_1 = missingPeers_1.next(); !missingPeers_1_1.done; missingPeers_1_1 = missingPeers_1.next()) {
                        var id = missingPeers_1_1.value;
                        _loop_1(id);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (missingPeers_1_1 && !missingPeers_1_1.done && (_b = missingPeers_1.return)) _b.call(missingPeers_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                // Notify the intermediary peer about your members
                Promise.all(misssingConnections).then(function () {
                    var send = function () { return channel.send(_this.wc.encode({
                        recipientId: channel.id,
                        content: _super.prototype.encode.call(_this, { connectedTo: { members: _this.wc.members } }),
                    })); };
                    if (_this.joinAttempts === MAX_JOIN_ATTEMPTS) {
                        _this.leave();
                        _this.wc.joinSubject.next(new Error('Failed to join: maximum join attempts has reached'));
                        return;
                    }
                    if (_this.joinAttempts === 0) {
                        send();
                    }
                    else {
                        log.info("FULL_MESH: I:" + _this.wc.myId + " will resend my members " + _this.joinAttempts + " time(s)", {
                            myMembers: _this.wc.members,
                            intermediaryMembers: msg.connectTo.members,
                        });
                        setTimeout(function () { return send(); }, 200 + 100 * Math.random());
                    }
                    _this.joinAttempts++;
                });
                break;
            }
            case 'connectedTo': {
                this.checkMembers(channel, msg.connectedTo.members);
                break;
            }
            case 'joiningPeerId': {
                if (msg.joiningPeerId !== this.wc.myId && !this.wc.members.includes(msg.joiningPeerId)) {
                    this.jps.set(msg.joiningPeerId, channel);
                }
                break;
            }
            case 'joinSucceed': {
                this.intermediaryChannel = undefined;
                this.wc.joinSubject.next();
                break;
            }
        }
        var e_5, _b;
    };
    FullMesh.prototype.checkMembers = function (ch, members) {
        var _this = this;
        // Joining succeed if the joining peer and his intermediary peer
        // have same members (excludings themselves)
        if (this.wc.members.length === members.length && members.every(function (id) { return _this.wc.members.includes(id); })) {
            ch.send(this.wc.encode({
                recipientId: ch.id,
                content: this.joinSucceedContent,
            }));
            return;
        }
        // Joining did not finish, resend my members to the joining peer
        this.wc.sendProxy({ content: _super.prototype.encode.call(this, { joiningPeerId: ch.id }) });
        ch.send(this.wc.encode({
            recipientId: ch.id,
            content: _super.prototype.encode.call(this, { connectTo: { members: this.wc.members } }),
        }));
    };
    FullMesh.prototype.peerJoined = function (ch) {
        try {
            for (var _a = __values(this.channels), _b = _a.next(); !_b.done; _b = _a.next()) {
                var c = _b.value;
                if (c.id === ch.id) {
                    c.closeQuietly();
                    this.channels.delete(c);
                    this.channels.add(ch);
                    this.jps.delete(ch.id);
                    return;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_6) throw e_6.error; }
        }
        this.channels.add(ch);
        this.wc.onMemberJoinProxy(ch.id);
        this.jps.delete(ch.id);
        var e_6, _c;
    };
    return FullMesh;
}(Service$1));

var REJOIN_TIMEOUT = 3000;
/**
 * Timout for ping `WebChannel` in milliseconds.
 * @type {number}
 */
var PING_TIMEOUT = 5000;
var defaultOptions = {
    topology: TopologyEnum.FULL_MESH,
    signalingURL: 'wss://www.coedit.re:10473',
    iceServers: [
        { urls: 'stun:stun3.l.google.com:19302' },
    ],
    autoRejoin: true,
};
var WebChannelState;
(function (WebChannelState) {
    WebChannelState[WebChannelState["JOINING"] = 0] = "JOINING";
    WebChannelState[WebChannelState["JOINED"] = 1] = "JOINED";
    WebChannelState[WebChannelState["LEFT"] = 2] = "LEFT";
})(WebChannelState || (WebChannelState = {}));
/**
 * This class is an API starting point. It represents a group of collaborators
 * also called peers. Each peer can send/receive broadcast as well as personal
 * messages. Every peer in the `WebChannel` can invite another person to join
 * the `WebChannel` and he also possess enough information to be able to add it
 * preserving the current `WebChannel` structure (network topology).
 * [[include:installation.md]]
 */
var WebChannel = (function (_super) {
    __extends$5(WebChannel, _super);
    function WebChannel(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.topology, topology = _c === void 0 ? defaultOptions.topology : _c, _d = _b.signalingURL, signalingURL = _d === void 0 ? defaultOptions.signalingURL : _d, _e = _b.iceServers, iceServers = _e === void 0 ? defaultOptions.iceServers : _e, _f = _b.autoRejoin, autoRejoin = _f === void 0 ? defaultOptions.autoRejoin : _f;
        var _this = _super.call(this, 10, webChannel.Message) || this;
        // PUBLIC MEMBERS
        _this.topology = topology;
        _this.id = _this.generateId();
        _this.myId = _this.generateId();
        _this.members = [_this.myId];
        _this.key = '';
        _this.autoRejoin = autoRejoin;
        // PUBLIC EVENT HANDLERS
        _this.onMemberJoin = function none() { };
        _this.onMemberLeave = function none() { };
        _this.onMessage = function none() { };
        _this.onStateChange = function none() { };
        _this.onSignalingStateChange = function none() { };
        // PRIVATE
        _this.state = WebChannelState.LEFT;
        _this.userMsg = new UserMessage();
        // Signaling init
        _this.signaling = new Signaling(_this, signalingURL);
        _this.signaling.onChannel.subscribe(function (ch) { return _this.initChannel(ch); });
        _this.signaling.onState.subscribe(function (state) {
            log.signalingState(SignalingState$1[state]);
            _this.onSignalingStateChange(state);
            switch (state) {
                case SignalingState$1.OPEN:
                    _this.setState(WebChannelState.JOINING);
                    break;
                case SignalingState$1.READY_TO_JOIN_OTHERS:
                    _this.setState(WebChannelState.JOINED);
                    break;
                case SignalingState$1.CLOSED:
                    if (_this.members.length === 1) {
                        _this.setState(WebChannelState.LEFT);
                        if (_this.isRejoinDisabled) {
                            _this.key = '';
                        }
                    }
                    if (!_this.isRejoinDisabled) {
                        _this.rejoin();
                    }
                    break;
            }
        });
        // Services init
        _this.serviceMessageSubject = new Subject_2();
        _super.prototype.setupServiceMessage.call(_this, _this.serviceMessageSubject);
        _this.webRTCBuilder = new WebRTCBuilder(_this, iceServers);
        _this.webSocketBuilder = new WebSocketBuilder(_this);
        _this.channelBuilder = new ChannelBuilder(_this);
        _this.onServiceMessage.subscribe(function (msg) { return _this.treatServiceMessage(msg); }, function (err) { return console.error('service/WebChannel inner message error', err); });
        // Topology init
        _this.setTopology(topology);
        _this.joinSubject = new Subject_2();
        _this.joinSubject.subscribe(function (err) {
            if (err !== undefined) {
                console.warn('Failed to join: ' + err.message, err);
                _this.signaling.close();
            }
            else {
                _this.setState(WebChannelState.JOINED);
                _this.signaling.open();
            }
        });
        // Ping-pong init
        _this.pingTime = 0;
        _this.maxTime = 0;
        _this.pingFinish = function () { };
        _this.pongNb = 0;
        return _this;
    }
    /**
     * Join the network via a key provided by one of the network member or a `Channel`.
     */
    WebChannel.prototype.join = function (key) {
        if (key === void 0) { key = generateKey(); }
        if (this.state === WebChannelState.LEFT && this.signaling.state === SignalingState$1.CLOSED) {
            if (typeof key !== 'string') {
                throw new Error("Failed to join: the key type \"" + typeof key + "\" is not a \"string\"");
            }
            else if (key === '') {
                throw new Error('Failed to join: the key is an empty string');
            }
            else if (key.length > MAX_KEY_LENGTH) {
                throw new Error("Failed to join : the key length of " + key.length + " exceeds the maximum of " + MAX_KEY_LENGTH + " characters");
            }
            this.key = key;
            this.isRejoinDisabled = !this.autoRejoin;
            this.setState(WebChannelState.JOINING);
            this.signaling.join(this.key);
        }
        else {
            console.warn('Trying to join a group while already joined or joining. Maybe forgot to call leave().');
        }
    };
    /**
     * Invite a server peer to join the network.
     */
    WebChannel.prototype.invite = function (url) {
        var _this = this;
        if (isURL(url)) {
            this.webSocketBuilder.connect(url + "/invite?wcId=" + this.id + "&senderId=" + this.myId)
                .then(function (connection) { return _this.initChannel(new Channel(_this, connection)); })
                .catch(function (err) { return console.error("Failed to invite the bot " + url + ": " + err.message); });
        }
        else {
            throw new Error("Failed to invite a bot: " + url + " is not a valid URL");
        }
    };
    /**
     * Close the connection with Signaling server.
     */
    WebChannel.prototype.closeSignaling = function () {
        this.isRejoinDisabled = true;
        clearTimeout(this.rejoinTimer);
        this.signaling.close();
    };
    /**
     * Leave the network which means close channels with all peers and connection
     * with Signaling server.
     */
    WebChannel.prototype.leave = function () {
        this.key = '';
        this.isRejoinDisabled = true;
        clearTimeout(this.rejoinTimer);
        this.initPing();
        this.topologyService.leave();
        this.signaling.close();
    };
    /**
     * Broadcast a message to the network.
     */
    WebChannel.prototype.send = function (data) {
        if (this.members.length !== 1) {
            var msg = {
                senderId: this.myId,
                recipientId: 0,
                isService: false,
            };
            var chunkedData = this.userMsg.encode(data);
            try {
                for (var chunkedData_1 = __values(chunkedData), chunkedData_1_1 = chunkedData_1.next(); !chunkedData_1_1.done; chunkedData_1_1 = chunkedData_1.next()) {
                    var chunk = chunkedData_1_1.value;
                    msg.content = chunk;
                    this.topologyService.send(msg);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (chunkedData_1_1 && !chunkedData_1_1.done && (_a = chunkedData_1.return)) _a.call(chunkedData_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var e_1, _a;
    };
    /**
     * Send a message to a particular peer in the network.
     */
    WebChannel.prototype.sendTo = function (id, data) {
        if (this.members.length !== 1) {
            var msg = {
                senderId: this.myId,
                recipientId: id,
                isService: false,
            };
            var chunkedData = this.userMsg.encode(data);
            try {
                for (var chunkedData_2 = __values(chunkedData), chunkedData_2_1 = chunkedData_2.next(); !chunkedData_2_1.done; chunkedData_2_1 = chunkedData_2.next()) {
                    var chunk = chunkedData_2_1.value;
                    msg.content = chunk;
                    this.topologyService.sendTo(msg);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (chunkedData_2_1 && !chunkedData_2_1.done && (_a = chunkedData_2.return)) _a.call(chunkedData_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        var e_2, _a;
    };
    /**
     * Get the ping of the `network. It is an amount in milliseconds which
     * corresponds to the longest ping to each network member.
     */
    WebChannel.prototype.ping = function () {
        var _this = this;
        if (this.members.length !== 1 && this.pingTime === 0) {
            return new Promise(function (resolve, reject) {
                if (_this.pingTime === 0) {
                    _this.pingTime = Date.now();
                    _this.maxTime = 0;
                    _this.pongNb = 0;
                    _this.pingFinish = function (delay) { return resolve(delay); };
                    _this.sendProxy({ content: _super.prototype.encode.call(_this, { ping: true }) });
                    setTimeout(function () { return resolve(PING_TIMEOUT); }, PING_TIMEOUT);
                }
            });
        }
        else {
            return Promise.reject(new Error('No peers to ping'));
        }
    };
    WebChannel.prototype.onMemberJoinProxy = function (id) {
        this.members[this.members.length] = id;
        this.onMemberJoin(id);
    };
    WebChannel.prototype.onMemberLeaveProxy = function (id) {
        this.members.splice(this.members.indexOf(id), 1);
        this.onMemberLeave(id);
        if (this.members.length === 1 && this.signaling.state !== SignalingState$1.READY_TO_JOIN_OTHERS) {
            this.setState(WebChannelState.LEFT);
        }
    };
    /**
     * Send service message to a particular peer in the network.
     */
    WebChannel.prototype.sendToProxy = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.senderId, senderId = _c === void 0 ? this.myId : _c, _d = _b.recipientId, recipientId = _d === void 0 ? this.myId : _d, _e = _b.isService, isService = _e === void 0 ? true : _e, content = _b.content;
        var msg = { senderId: senderId, recipientId: recipientId, isService: isService, content: content };
        if (msg.recipientId === this.myId) {
            this.treatMessage(undefined, msg);
        }
        else {
            this.topologyService.sendTo(msg);
        }
    };
    /**
     * Broadcast service message to the network.
     */
    WebChannel.prototype.sendProxy = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.senderId, senderId = _c === void 0 ? this.myId : _c, _d = _b.recipientId, recipientId = _d === void 0 ? 0 : _d, _e = _b.isService, isService = _e === void 0 ? true : _e, content = _b.content, _f = _b.isMeIncluded, isMeIncluded = _f === void 0 ? false : _f;
        var msg = { senderId: senderId, recipientId: recipientId, isService: isService, content: content };
        if (isMeIncluded) {
            this.treatMessage(undefined, msg);
        }
        this.topologyService.send(msg);
    };
    WebChannel.prototype.encode = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.senderId, senderId = _c === void 0 ? this.myId : _c, _d = _b.recipientId, recipientId = _d === void 0 ? 0 : _d, _e = _b.isService, isService = _e === void 0 ? true : _e, content = _b.content;
        var msg = { senderId: senderId, recipientId: recipientId, isService: isService, content: content };
        return Message.encode(Message.create(msg)).finish();
    };
    /**
     * Message handler. All messages arrive here first.
     */
    WebChannel.prototype.onMessageProxy = function (channel, bytes) {
        var msg = Message.decode(new Uint8Array(bytes));
        switch (msg.recipientId) {
            // If the message is broadcasted
            case 0:
                this.treatMessage(channel, msg);
                this.topologyService.forward(msg);
                break;
            // If it is a private message to me
            case this.myId:
                this.treatMessage(channel, msg);
                break;
            // If is is a message to me from a peer who does not know yet my ID
            case 1:
                this.treatMessage(channel, msg);
                break;
            // Otherwise the message should be forwarded to the intended peer
            default:
                this.topologyService.forwardTo(msg);
        }
    };
    WebChannel.prototype.treatMessage = function (channel, msg) {
        // User Message
        if (!msg.isService) {
            var data = this.userMsg.decode(msg.content, msg.senderId);
            if (data !== undefined) {
                this.onMessage(msg.senderId, data, msg.recipientId === 0);
            }
            // Service Message
        }
        else {
            this.serviceMessageSubject.next(Object.assign({
                channel: channel,
                senderId: msg.senderId,
                recipientId: msg.recipientId,
            }, service.Message.decode(msg.content)));
        }
    };
    WebChannel.prototype.treatServiceMessage = function (_a) {
        var channel = _a.channel, senderId = _a.senderId, recipientId = _a.recipientId, msg = _a.msg;
        switch (msg.type) {
            case 'init': {
                var _b = msg.init, topology = _b.topology, wcId = _b.wcId, generatedIds = _b.generatedIds;
                // Check whether the intermidiary peer is already a member of your
                // network (possible when merging two networks (works with FullMesh)).
                // If it is a case then you are already a member of the network.
                if (this.members.includes(senderId)) {
                    if (!generatedIds.includes(this.myId)) {
                        console.warn("Failed merge networks: my members contain intermediary peer id,\n            but my id is not included into the intermediary peer members");
                        channel.close();
                        return;
                    }
                    if (this.topology !== topology) {
                        console.warn('Failed merge networks: different topologies');
                        channel.close();
                        return;
                    }
                    log.info("I:" + this.myId + " close connection with intermediary member " + senderId + ",\n          because already connected with him");
                    this.setState(WebChannelState.JOINED);
                    this.signaling.open();
                    channel.closeQuietly();
                }
                else {
                    this.setTopology(topology);
                    this.id = wcId;
                    channel.id = senderId;
                    this.topologyService.initJoining(channel);
                    channel.send(this.encode({
                        recipientId: channel.id,
                        content: _super.prototype.encode.call(this, { initOk: { members: this.members } }),
                    }));
                }
                break;
            }
            case 'initOk': {
                channel.id = senderId;
                this.topologyService.addJoining(channel, msg.initOk.members);
                break;
            }
            case 'ping': {
                this.sendToProxy({
                    recipientId: channel.id,
                    content: _super.prototype.encode.call(this, { pong: true }),
                });
                break;
            }
            case 'pong': {
                var now = Date.now();
                this.pongNb++;
                this.maxTime = Math.max(this.maxTime, now - this.pingTime);
                if (this.pongNb === this.members.length - 1) {
                    this.pingFinish(this.maxTime);
                    this.pingTime = 0;
                }
                break;
            }
            default:
                throw new Error("Unknown message type: \"" + msg.type + "\"");
        }
    };
    WebChannel.prototype.setState = function (state) {
        if (this.state !== state) {
            log.webGroupState(WebChannelState[state]);
            this.state = state;
            this.onStateChange(state);
            if (state === WebChannelState.LEFT) {
                this.initPing();
            }
        }
    };
    WebChannel.prototype.initPing = function () {
        this.pingTime = 0;
        this.maxTime = 0;
        this.pingFinish = function () { };
        this.pongNb = 0;
    };
    /**
     * Delegate adding a new peer in the network to topology.
     */
    WebChannel.prototype.initChannel = function (ch) {
        var msg = this.encode({
            recipientId: 1,
            content: _super.prototype.encode.call(this, { init: {
                    topology: this.topology,
                    wcId: this.id,
                    generatedIds: this.members,
                } }),
        });
        ch.send(msg);
    };
    WebChannel.prototype.setTopology = function (topology) {
        if (this.topologyService !== undefined) {
            if (this.topology !== topology) {
                this.topology = topology;
                this.topologyService.clean();
                this.topologyService = new FullMesh(this);
            }
        }
        else {
            this.topology = topology;
            this.topologyService = new FullMesh(this);
        }
    };
    WebChannel.prototype.rejoin = function () {
        var _this = this;
        this.rejoinTimer = setTimeout(function () {
            log.info("I:" + _this.myId + " rejoin");
            _this.signaling.join(_this.key);
        }, REJOIN_TIMEOUT);
    };
    /**
     * Generate random id for a `WebChannel` or a new peer.
     */
    WebChannel.prototype.generateId = function (excludeIds) {
        if (excludeIds === void 0) { excludeIds = []; }
        var id = randNumbers()[0];
        if (excludeIds.includes(id)) {
            return this.generateId();
        }
        return id;
    };
    return WebChannel;
}(Service$1));

/**
 * Is a helper type representing types that can be sent/received over a web group.
 * @typedef {string|Uint8Array} DataType
 */
/**
 * @ignore
 */
var wcs = new WeakMap();
/**
 * {@link WebGroup} state enum.
 * @type {Object}
 * @property {number} [JOINING=0] You are joining the web group.
 * @property {number} [JOINED=1] You have successfully joined the web group
 * and ready to broadcast messages via `send` method.
 * @property {number} [LEFT=2] You have left the web group. If the connection
 * to the web group has lost and `autoRejoin=true`, then the state would be `LEFT`,
 * (usually during a relatively short period) before the rejoining process start.
 */
var WebGroupState = (function () {
    function WebGroupState() {
    }
    Object.defineProperty(WebGroupState, "JOINING", {
        /**
         * Joining the group...
         * @type {number}
         */
        get: function () { return WebChannelState.JOINING; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGroupState, WebGroupState.JOINING, {
        /**
         * Equals to `'JOINING'`.
         * @type {string}
         */
        get: function () { return WebChannelState[WebChannelState.JOINING]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGroupState, "JOINED", {
        /**
         * Joined the group successfully.
         * @type {number}
         */
        get: function () { return WebChannelState.JOINED; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGroupState, WebGroupState.JOINED, {
        /**
         * Equals to `'JOINED'`.
         * @type {string}
         */
        get: function () { return WebChannelState[WebChannelState.JOINED]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGroupState, "LEFT", {
        /**
         * Left the group. If the connection to the web group has lost other then
         * by calling {@link WebGroup#leave} or {@link WebGroup#closeSignaling} methods
         * and {@link WebGroup#autoRejoin} is true, then the state would be `LEFT`,
         * (usually during a relatively short period) before the rejoining process start.
         * @type {number}
         */
        get: function () { return WebChannelState.LEFT; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGroupState, WebGroupState.LEFT, {
        /**
         * Equals to `'LEFT'`.
         * @type {string}
         */
        get: function () { return WebChannelState[WebChannelState.LEFT]; },
        enumerable: true,
        configurable: true
    });
    return WebGroupState;
}());
/**
 * This class is an API starting point. It represents a peer to peer network,
 * simply called a group. Each group member can send/receive broadcast
 * as well as personal messages, invite other persons or bots (see {@link WebGroupBotServer}).
 * @example
 * // Create a WebGroup with full mesh topology, autorejoin feature and
 * // specified Signaling and ICE servers for WebRTC.
 *
 * const wg = new WebGroup({
 *   signalingURL: 'wss://mysignaling.com'
 *   iceServers: [
 *     {
 *       urls: 'stun.l.google.com:19302'
 *     },
 *     {
 *       urls: ['turn:myturn.com?transport=udp', 'turn:myturn?transport=tcp'],
 *       username: 'user',
 *       password: 'password'
 *     }
 *   ]
 * })
 *
 * wg.onMemberJoin = (id) => {
 *   // YOUR CODE...
 * }
 * wg.onMemberLeave = (id) => {
 *   // YOUR CODE...
 * }
 * wg.onMessage = (id, data, isBroadcast) => {
 *   // YOUR CODE...
 * }
 * wg.onStateChange = (state) => {
 *   // YOUR CODE...
 * }
 * wg.onSignalingStateChange = (state) => {
 *   // YOUR CODE...
 * }
 */
var WebGroup = (function () {
    /**
     * @param {WebGroupOptions} [options]
     * @param {Topology} [options.topology=Topology.FULL_MESH]
     * @param {string} [options.signalingURL='wss://www.coedit.re:30443']
     * @param {RTCIceServer[]} [options.iceServers=[{urls: 'stun:stun3.l.google.com:19302'}]]
     * @param {boolean} [options.autoRejoin=true]
     */
    function WebGroup(options) {
        if (options === void 0) { options = {}; }
        var wc = new WebChannel(options);
        wcs.set(this, wc);
        /**
         * The read-only {@link WebGroup} identifier. The same value for all members.
         * @type {number}
         */
        this.id = undefined;
        Reflect.defineProperty(this, 'id', { configurable: false, enumerable: true, get: function () { return wc.id; } });
        /**
         * The read-only your unique member identifier in the group.
         * @type {number}
         */
        this.myId = undefined;
        Reflect.defineProperty(this, 'myId', { configurable: false, enumerable: true, get: function () { return wc.myId; } });
        /**
         * The read-only group session identifier. Equals to an empty string before calling {@link WebGroup#join}.
         * Different to {@link WebGroup#id}. This key is known and used by Signaling server
         * in order to join new members, on the other hand Signaling does not know {@link WebGroup#id}.
         * @type {string}
         */
        this.key = undefined;
        Reflect.defineProperty(this, 'key', { configurable: false, enumerable: true, get: function () { return wc.key; } });
        /**
         * The read-only array of all members including yourself (i.e. {@link WebGroup#myId})
         * @type {number[]}
         */
        this.members = undefined;
        Reflect.defineProperty(this, 'members', { configurable: false, enumerable: true, get: function () { return wc.members; } });
        /**
         * The read-only property which is an enum of type {@link Topology}
         * indicating the topology used for this {@link WebGroup} instance.
         * @type {Topology}
         */
        this.topology = undefined;
        Reflect.defineProperty(this, 'topology', { configurable: false, enumerable: true, get: function () { return wc.topology; } });
        /**
         * The read-only state of the {@link WebGroup} connection.
         * @type {WebGroupState}
         */
        this.state = undefined;
        Reflect.defineProperty(this, 'state', { configurable: false, enumerable: true, get: function () { return wc.state; } });
        /**
         * The read-only state of the signaling server.
         * @type {SignalingState}
         */
        this.signalingState = undefined;
        Reflect.defineProperty(this, 'signalingState', {
            configurable: false,
            enumerable: true,
            get: function () { return wc.signaling.state; },
        });
        /**
         * The read-only signaling server URL.
         * @type {string}
         */
        this.signalingURL = undefined;
        Reflect.defineProperty(this, 'signalingURL', { configurable: false, enumerable: true, get: function () { return wc.signaling.url; } });
        /**
         * Enable/Desable the auto rejoin feature.
         * @type {boolean}
         */
        this.autoRejoin = undefined;
        Reflect.defineProperty(this, 'autoRejoin', {
            configurable: false,
            enumerable: true,
            get: function () { return wc.autoRejoin; },
            set: function (value) { return wc.autoRejoin = value; },
        });
        /**
         * This handler is called when a message has been received from the group.
         * `id` is an identifier of the member who sent this message.
         * `isBroadcast` aquals to true if the data is sent via {@link WebGroup#send}
         * and false if sent via {@link WebGroup#sendTo}.
         * @type {function(id: number, data: DataType, isBroadcast: boolean)}
         */
        this.onMessage = undefined;
        Reflect.defineProperty(this, 'onMessage', {
            configurable: true,
            enumerable: true,
            get: function () { return (wc.onMessage.name === 'none') ? undefined : wc.onMessage; },
            set: function (handler) {
                if (typeof handler !== 'function') {
                    wc.onMessage = function none() { };
                }
                else {
                    wc.onMessage = handler;
                }
            },
        });
        /**
         * This handler is called when a new member with `id` as identifier has joined the group.
         * @type {function(id: number)}
         */
        this.onMemberJoin = undefined;
        Reflect.defineProperty(this, 'onMemberJoin', {
            configurable: true,
            enumerable: true,
            get: function () { return (wc.onMemberJoin.name === 'none') ? undefined : wc.onMemberJoin; },
            set: function (handler) {
                if (typeof handler !== 'function') {
                    wc.onMemberJoin = function none() { };
                }
                else {
                    wc.onMemberJoin = handler;
                }
            },
        });
        /**
         * This handler is called when a member with `id` as identifier hes left the group.
         * @type {function(id: number)}
         */
        this.onMemberLeave = undefined;
        Reflect.defineProperty(this, 'onMemberLeave', {
            configurable: true,
            enumerable: true,
            get: function () { return (wc.onMemberLeave.name === 'none') ? undefined : wc.onMemberLeave; },
            set: function (handler) {
                if (typeof handler !== 'function') {
                    wc.onMemberLeave = function none() { };
                }
                else {
                    wc.onMemberLeave = handler;
                }
            },
        });
        /**
         * This handler is called when the group state has changed.
         * @type {function(state: WebGroupState)}
         */
        this.onStateChange = undefined;
        Reflect.defineProperty(this, 'onStateChange', {
            configurable: true,
            enumerable: true,
            get: function () { return (wc.onStateChange.name === 'none') ? undefined : wc.onStateChange; },
            set: function (handler) {
                if (typeof handler !== 'function') {
                    wc.onStateChange = function none() { };
                }
                else {
                    wc.onStateChange = handler;
                }
            },
        });
        /**
         * This handler is called when the signaling state has changed.
         * @type {function(state: SignalingState)}
         */
        this.onSignalingStateChange = undefined;
        Reflect.defineProperty(this, 'onSignalingStateChange', {
            configurable: true,
            enumerable: true,
            get: function () { return (wc.onSignalingStateChange.name === 'none') ? undefined : wc.onSignalingStateChange; },
            set: function (handler) {
                if (typeof handler !== 'function') {
                    wc.onSignalingStateChange = function none() { };
                }
                else {
                    wc.onSignalingStateChange = handler;
                }
            },
        });
    }
    /**
     * Join the group identified by a key provided by one of the group member.
     * If the current {@link WebGroup#state} value is not {@link WebGroupState#LEFT} or
     * {@link WebGroup#signalingState} value is not {@link SignalingState.CLOSED},
     * then do nothing.
     * @param {string} [key] Will be generated if not provided
     */
    WebGroup.prototype.join = function (key) { return wcs.get(this).join(key); };
    /**
     * Invite a bot server to join this group.
     * @param {string} url - Bot server URL (See {@link WebGroupBotServerOptions})
     */
    WebGroup.prototype.invite = function (url) { return wcs.get(this).invite(url); };
    /**
     * Close the connection with Signaling server. It fires Signaling state event
     * if {@link WebGroup#signalingState} value does not equal to
     * {@link SignalingState.CLOSED} already.It may also fire state event only
     * if there is no one left in the group.
     * value does not equal to {@link SignalingState.CLOSED} already.
     */
    WebGroup.prototype.closeSignaling = function () { return wcs.get(this).closeSignaling(); };
    /**
     * Leave the group which means close channels with all members and connection
     * with the Signaling server.
     */
    WebGroup.prototype.leave = function () { return wcs.get(this).leave(); };
    /**
     * Broadcast a message to the group.
     * @param {DataType} data
     */
    WebGroup.prototype.send = function (data) { return wcs.get(this).send(data); };
    /**
     * Send a message to a particular group member.
     * @param {number}    id Member identifier
     * @param {DataType}  data Message
     */
    WebGroup.prototype.sendTo = function (id, data) { return wcs.get(this).sendTo(id, data); };
    /**
     * Get web group latency
     * @return {Promise<number>} Latency in milliseconds
     */
    WebGroup.prototype.ping = function () { return wcs.get(this).ping(); };
    return WebGroup;
}());

/**
 * Enable/Disable console logs. By default the logs are disabled. Consol logs
 * group and signaling states, connection establishment, disconnection and
 * other useful information for debugging.
 * @param {boolean} value
 */
function enableLog$$1(value) { enableLog$1(value); }
/**
 * The state enum of the signaling server for WebRTC.
 */
var SignalingState$$1 = (function () {
    function SignalingState$$1() {
    }
    Object.defineProperty(SignalingState$$1, "CONNECTING", {
        /**
         * The connection is not yet open.
         * @type {number}
         */
        get: function () { return SignalingState$1.CONNECTING; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalingState$$1, SignalingState$$1.CONNECTING, {
        /**
         * Equals to `'CONNECTING'`.
         * @type {string}
         */
        get: function () { return SignalingState$1[SignalingState$1.CONNECTING]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalingState$$1, "OPEN", {
        /**
         * The connection is open and ready to communicate.
         * @type {number}
         */
        get: function () { return SignalingState$1.OPEN; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalingState$$1, SignalingState$$1.OPEN, {
        /**
         * Equals to `'OPEN'`.
         * @type {string}
         */
        get: function () { return SignalingState$1[SignalingState$1.OPEN]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalingState$$1, "CONNECTED_WITH_FIRST_MEMBER", {
        /**
         * `RTCDataChannel` has been established with one of the group member.
         * From now the signaling is no longer needed, because the joining process
         * will continue with a help of this member.
         * @type {number}
         */
        get: function () { return SignalingState$1.CONNECTED_WITH_FIRST_MEMBER; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalingState$$1, SignalingState$$1.CONNECTED_WITH_FIRST_MEMBER, {
        /**
         * Equals to `'CONNECTED_WITH_FIRST_MEMBER'`.
         * @type {string}
         */
        get: function () {
            return SignalingState$1[SignalingState$1.CONNECTED_WITH_FIRST_MEMBER];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalingState$$1, "READY_TO_JOIN_OTHERS", {
        /**
         * You has successfully been joined a web group and ready to help join others.
         * @type {number}
         */
        get: function () { return SignalingState$1.READY_TO_JOIN_OTHERS; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalingState$$1, SignalingState$$1.READY_TO_JOIN_OTHERS, {
        /**
         * Equals to `'READY_TO_JOIN_OTHERS'`.
         * @type {string}
         */
        get: function () { return SignalingState$1[SignalingState$1.READY_TO_JOIN_OTHERS]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalingState$$1, "CLOSED", {
        /**
         * The connection is closed.
         * @type {number}
         */
        get: function () { return SignalingState$1.CLOSED; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignalingState$$1, SignalingState$$1.CLOSED, {
        /**
         * Equals to `'CLOSED'`.
         * @type {string}
         */
        get: function () { return SignalingState$1[SignalingState$1.CLOSED]; },
        enumerable: true,
        configurable: true
    });
    return SignalingState$$1;
}());
/**
 * The topology enum.
 */
var Topology = (function () {
    function Topology() {
    }
    Object.defineProperty(Topology, "FULL_MESH", {
        /**
         * Full mesh topology identifier.
         * @type {number}
         */
        get: function () { return TopologyEnum.FULL_MESH; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Topology, Topology.FULL_MESH, {
        /**
         * Equals to `'FULL_MESH'`.
         * @type {string}
         */
        get: function () { return TopologyEnum[TopologyEnum.FULL_MESH]; },
        enumerable: true,
        configurable: true
    });
    return Topology;
}());

/**
 * The options to be passed into {@link WebGroup} constructor.
 * @typedef {Object} WebGroupOptions
 * @property {Topology} [topology] Topology identifier
 * (Full mesh is the only one supported by Netflux for now).
 * @property {string} [signalingURL] Signaling URL for WebRTC.
 * @property {RTCIceServer[]} [iceServers] Array of Ice servers for WebRTC.
 * @property {boolean} [autoRejoin] Whether to automatically rejoin the web group
 * on disconnect or not. Its value may be modified after {@link WebGroup}
 * instantiation at any time.
 */
/**
 * The options to be passed into {@link WebGroupBotServer} constructor.
 * @typedef {Object} WebGroupBotServerOptions
 * @property {Topology} [topology] See WebGroupOptions.topology
 * @property {string} [signalingURL] See WebGroupOptions.signalingURL
 * @property {RTCIceServer[]} [iceServers] See WebGroupOptions.iceServers
 * @property {boolean} [autoRejoin] See WebGroupOptions.autoRejoin
 * @property {Object} bot Server related options of the bot.
 * @property {NodeJSHttpServer|NodeJSHttpsServer} bot.server NodeJS http(s) server.
 * @property {string} [bot.url] Bot server URL.
 * @property {boolean} [bot.perMessageDeflate] Enable/disable permessage-deflate.
 */
/**
 * @external {RTCIceServer} https://developer.mozilla.org/en/docs/Web/API/RTCIceServer
 */
/**
 * @external {Uint8Array} https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
 */
/**
 * @external {NodeJSHttpServer} https://nodejs.org/api/http.html#http_class_http_server
 */
/**
 * @external {NodeJSHttpsServer} https://nodejs.org/api/https.html#https_class_https_server
 */

var urlLib = __webpack_require__(37);
var uws = __webpack_require__(14);
var BotServer = (function () {
    function BotServer(_a) {
        var _b = _a === void 0 ? { server: undefined } : _a, _c = _b.url, url = _c === void 0 ? '' : _c, _d = _b.perMessageDeflate, perMessageDeflate = _d === void 0 ? false : _d, server = _b.server, _e = _b.webGroupOptions, webGroupOptions = _e === void 0 ? {
            topology: defaultOptions.topology,
            signalingURL: defaultOptions.signalingURL,
            iceServers: defaultOptions.iceServers,
            autoRejoin: false,
        } : _e;
        // public
        this.wcOptions = Object.assign({}, defaultOptions, { autoRejoin: false }, webGroupOptions);
        this.server = server;
        this.listenUrl = url;
        this.perMessageDeflate = perMessageDeflate;
        // private
        this.webGroups = new Set();
        this.onWebGroup = function none() { };
        this.onError = function none() { };
        // initialize server
        this.init();
    }
    Object.defineProperty(BotServer.prototype, "url", {
        get: function () {
            if (this.listenUrl !== '') {
                return this.listenUrl;
            }
            else {
                var info = this.server.address();
                return "ws://" + info.address + ":" + info.port;
            }
        },
        enumerable: true,
        configurable: true
    });
    BotServer.prototype.getWebGroup = function (id) {
        try {
            for (var _a = __values(this.webGroups), _b = _a.next(); !_b.done; _b = _a.next()) {
                var wg = _b.value;
                if (id === wg.id) {
                    return wg;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return undefined;
        var e_1, _c;
    };
    BotServer.prototype.init = function () {
        var _this = this;
        this.webSocketServer = new uws.Server({
            perMessageDeflate: this.perMessageDeflate,
            verifyClient: function (info) { return _this.validateConnection(info); },
            server: this.server,
        });
        var serverListening = this.server || this.webSocketServer;
        serverListening.on('listening', function () { return WebSocketBuilder.listen().next(_this.url); });
        this.webSocketServer.on('error', function (err) {
            WebSocketBuilder.listen().next('');
            _this.onError(err);
        });
        this.webSocketServer.on('connection', function (ws) {
            var _a = urlLib.parse(ws.upgradeReq.url, true), pathname = _a.pathname, query = _a.query;
            var wcId = Number(query.wcId);
            var wg = _this.getWebGroup(wcId);
            var senderId = Number(query.senderId);
            switch (pathname) {
                case '/invite': {
                    if (wg && wg.members.length === 1) {
                        _this.webGroups.delete(wg);
                    }
                    // FIXME: it is possible to create multiple WebChannels with the same ID
                    wg = new WebGroup(_this.wcOptions);
                    var wc = wcs.get(wg);
                    wc.id = wcId;
                    _this.webGroups.add(wg);
                    _this.onWebGroup(wg);
                    var ch = new Channel(wc, ws, { id: senderId });
                    break;
                }
                case '/internalChannel': {
                    if (wg !== undefined) {
                        WebSocketBuilder.newIncomingSocket(wcs.get(wg), ws, senderId);
                    }
                    else {
                        console.error('Cannot find WebChannel for a new internal channel');
                    }
                    break;
                }
            }
        });
    };
    BotServer.prototype.validateConnection = function (info) {
        var _a = urlLib.parse(info.req.url, true), pathname = _a.pathname, query = _a.query;
        var wcId = query.wcId ? Number(query.wcId) : undefined;
        switch (pathname) {
            case '/invite':
                if (wcId) {
                    var wg = this.getWebGroup(wcId);
                    return (wg === undefined || wg.members.length === 1) && query.senderId;
                }
                return false;
            case '/internalChannel':
                return query.senderId && wcId && this.getWebGroup(wcId) !== undefined;
            default:
                return false;
        }
    };
    return BotServer;
}());

var botServer;
/**
 * Bot server may be a member of severals groups. Each group is isolated.
 * He can be invited by a group member via {@link WebGroup#invite} method.
 * @example
 * // In NodeJS:
 * // Create a bot server with full mesh topology, without autorejoin feature
 * // and with specified Signaling and ICE servers for WebRTC.
 * // Bot server is listening on 'ws://BOT_HOST:BOT_PORT'.
 *
 * const http = require('http')
 * const server = http.createServer(app.callback())
 * const bot = new WebGroupBotServer({
 *   server,
 *   webGroupOptions: {
 *     signalingURL: 'wss://mysignaling.com'
 *     iceServers: [
 *       {
 *         urls: 'stun.l.google.com:19302'
 *       },
 *       {
 *         urls: ['turn:myturn.com?transport=udp', 'turn:myturn?transport=tcp'],
 *         username: 'user',
 *         password: 'password'
 *       }
 *     ]
 *   }
 * })
 *
 * bot.onWebGroup = (wg) => {
 *   // YOUR CODE
 * }
 *
 * bot.onError = (err) => {
 *   // YOUR CODE
 * }
 *
 * server.listen(BOT_PORT, BOT_HOST)
 */
var WebGroupBotServer = (function () {
    /**
     * @param {WebGroupBotServerOptions} options
     * @param {NodeJSHttpServer|NodeJSHttpsServer} options.server NodeJS http(s) server.
     * @param {string} [options.url] Bot server URL.
     * @param {boolean} [options.perMessageDeflate=false] Enable/disable permessage-deflate.
     * @param {WebGroupOptions} options.webGroupOptions Options for each {@link WebGroup} the bot is member of.
     * @param {Topology} [options.webGroupOptions.topology=Topology.FULL_MESH]
     * @param {string} [options.webGroupOptions.signalingURL='wss://www.coedit.re:30443']
     * @param {RTCIceServer[]} [options.webGroupOptions.iceServers=[{urls: 'stun:stun3.l.google.com:19302'}]]
     * @param {boolean} [options.webGroupOptions.autoRejoin=false]
     */
    function WebGroupBotServer(options) {
        botServer = new BotServer(options);
        /**
         * Read-only NodeJS http server instance.
         * @type {NodeJSHttpServer|NodeJSHttpsServer}
         */
        this.server = undefined;
        Reflect.defineProperty(this, 'server', { configurable: false, enumerable: true, get: function () { return botServer.server; } });
        /**
         * Read-only property of WebSocket server: permessage-deflate.
         * @type {NodeJSHttpServer|NodeJSHttpsServer}
         */
        this.perMessageDeflate = undefined;
        Reflect.defineProperty(this, 'perMessageDeflate', {
            configurable: false,
            enumerable: true,
            get: function () { return botServer.perMessageDeflate; },
        });
        /**
         * Read-only set of web groups the bot is member of.
         * @type {Set<WebGroup>}
         */
        this.webGroups = undefined;
        Reflect.defineProperty(this, 'webGroups', { configurable: false, enumerable: true, get: function () { return botServer.webGroups; } });
        /**
         * Bot server url. Used to invite the bot in a web group via {@link WebGroup#invite} method.
         * @type {string}
         */
        this.url = undefined;
        Reflect.defineProperty(this, 'url', { configurable: false, enumerable: true, get: function () { return botServer.url; } });
        /**
         * This handler is called when the bot has been invited into a group by one of its members.
         * @type  {function(wg: WebGroup)} handler
         */
        this.onWebGroup = undefined;
        Reflect.defineProperty(this, 'onWebGroup', {
            configurable: true,
            enumerable: true,
            get: function () { return (botServer.onWebGroup.name === 'none') ? undefined : botServer.onWebGroup; },
            set: function (handler) {
                if (typeof handler !== 'function') {
                    botServer.onWebGroup = function none() { };
                }
                else {
                    botServer.onWebGroup = handler;
                }
            },
        });
        /**
         * This handler is called when an error occurs on WebSocket server.
         * @type  {function(err: Error)}
         */
        this.onError = undefined;
        Reflect.defineProperty(this, 'onError', {
            configurable: true,
            enumerable: true,
            get: function () { return (botServer.onError.name === 'none') ? undefined : botServer.onError; },
            set: function (handler) {
                if (typeof handler !== 'function') {
                    botServer.onError = function none() { };
                }
                else {
                    botServer.onError = handler;
                }
            },
        });
    }
    return WebGroupBotServer;
}());


//# sourceMappingURL=index.node.js.map


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("text-encoding");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mute_core_1 = __webpack_require__(15);
const rxjs_1 = __webpack_require__(0);
const log_1 = __webpack_require__(13);
const proto_1 = __webpack_require__(55);
// TODO: BotStorage should serialize document in DB
class BotStorage {
    constructor(pseudonym, wg, mongooseAdapter) {
        this.pseudonym = pseudonym;
        this.joinSubject = new rxjs_1.Subject();
        this.messageSubject = new rxjs_1.ReplaySubject();
        this.peerJoinSubject = new rxjs_1.ReplaySubject();
        this.peerLeaveSubject = new rxjs_1.ReplaySubject();
        this.stateSubject = new rxjs_1.Subject();
        this.wg = wg;
        wg.onMessage = (id, bytes, isBroadcast) => {
            const msg = proto_1.Message.decode(bytes);
            if (msg.service === 'botprotocol') {
                const docKey = proto_1.BotProtocol.decode(msg.content).key;
                this.mongooseAdapter.find(docKey)
                    .then((doc) => {
                    this.initMuteCore(docKey);
                    this.joinSubject.next(new mute_core_1.JoinEvent(this.wg.myId, docKey, false));
                    if (doc === null) {
                        log_1.log.info(`"${docKey}" document was not found in database: create a new document`);
                        this.stateSubject.next(new mute_core_1.State(new Map(), []));
                    }
                    else {
                        log_1.log.info(`Document "${docKey}" retreived from database`);
                        this.stateSubject.next(new mute_core_1.State(new Map(), doc));
                    }
                })
                    .catch((err) => {
                    log_1.log.error(`Error when searching for the document ${docKey}`, err);
                });
                wg.onMessage = (id, bytes, isBroadcast) => {
                    const msg = proto_1.Message.decode(bytes);
                    this.messageSubject.next(new mute_core_1.NetworkMessage(msg.service, id, isBroadcast, msg.content));
                };
            }
            else {
                this.messageSubject.next(new mute_core_1.NetworkMessage(msg.service, id, isBroadcast, msg.content));
            }
        };
        // this.sendMyUrl()
        wg.onMemberJoin = (id) => {
            // this.sendMyUrl(id)
            this.peerJoinSubject.next(id);
        };
        wg.onMemberLeave = (id) => this.peerLeaveSubject.next(id);
        this.mongooseAdapter = mongooseAdapter;
    }
    sendKeyRequest(wg) {
        wg.sendTo(wg.members[1], this.encode({
            service: 'botprotocol',
            content: proto_1.BotProtocol.encode(proto_1.BotProtocol.create({ key: '' })).finish(),
        }));
    }
    initMuteCore(docKey) {
        // TODO: MuteCore should consume doc Object
        this.muteCore = new mute_core_1.MuteCore(42);
        this.muteCore.messageSource = this.messageSubject.asObservable();
        this.muteCore.onMsgToBroadcast.subscribe((bm) => {
            this.wg.send(this.encode(bm));
        });
        this.muteCore.onMsgToSendRandomly.subscribe((srm) => {
            const index = Math.ceil(Math.random() * this.wg.members.length) - 1;
            this.wg.sendTo(this.wg.members[index], this.encode(srm));
        });
        this.muteCore.onMsgToSendTo.subscribe((stm) => {
            this.wg.sendTo(stm.id, this.encode(stm));
        });
        // Collaborators config
        this.muteCore.collaboratorsService.peerJoinSource = this.peerJoinSubject.asObservable();
        this.muteCore.collaboratorsService.peerLeaveSource = this.peerLeaveSubject.asObservable();
        const pseudoSubject = new rxjs_1.BehaviorSubject(this.pseudonym);
        this.muteCore.collaboratorsService.pseudoSource = pseudoSubject.asObservable();
        // Sync service config
        this.muteCore.syncService.onState.subscribe((state) => {
            // FIXME: Reduce the number of saves
            this.mongooseAdapter.save(docKey, state.richLogootSOps)
                .catch((err) => {
                log_1.log.error(`The document ${docKey} could not be saved into database`, err);
            });
        });
        this.muteCore.syncService.setJoinAndStateSources(this.joinSubject.asObservable(), this.stateSubject.asObservable());
        this.muteCore.init(docKey);
    }
    // private sendMyUrl (id?: number) {
    //   const msg = new pb.BotResponse()
    //   msg.setUrl(this.url)
    //   if (id !== undefined) {
    //     this.wg.sendTo(this.wg.members[0], this.encode({
    //       service: 'botprotocol',
    //       content: msg.serializeBinary(),
    //     }))
    //   } else {
    //     this.wg.send(this.encode({
    //       service: 'botprotocol',
    //       content: msg.serializeBinary(),
    //     }))
    //   }
    // }
    encode(msg) {
        return proto_1.Message.encode(proto_1.Message.create(msg)).finish();
    }
}
exports.BotStorage = BotStorage;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(0);
var _1 = __webpack_require__(5);
var Collaborator_1 = __webpack_require__(17);
var collaborator_pb_1 = __webpack_require__(45);
var CollaboratorsService = /** @class */ (function () {
    function CollaboratorsService() {
        this.collaboratorChangePseudoSubject = new rxjs_1.Subject();
        this.collaboratorJoinSubject = new rxjs_1.Subject();
        this.collaboratorLeaveSubject = new rxjs_1.Subject();
        this.disposeSubject = new rxjs_1.Subject();
        this.msgToBroadcastSubject = new rxjs_1.Subject();
        this.msgToSendRandomlySubject = new rxjs_1.Subject();
        this.msgToSendToSubject = new rxjs_1.Subject();
    }
    Object.defineProperty(CollaboratorsService.prototype, "onCollaboratorChangePseudo", {
        get: function () {
            return this.collaboratorChangePseudoSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollaboratorsService.prototype, "onCollaboratorJoin", {
        get: function () {
            return this.collaboratorJoinSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollaboratorsService.prototype, "onCollaboratorLeave", {
        get: function () {
            return this.collaboratorLeaveSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollaboratorsService.prototype, "onMsgToBroadcast", {
        get: function () {
            return this.msgToBroadcastSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollaboratorsService.prototype, "onMsgToSendRandomly", {
        get: function () {
            return this.msgToSendRandomlySubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollaboratorsService.prototype, "onMsgToSendTo", {
        get: function () {
            return this.msgToSendToSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollaboratorsService.prototype, "leaveSource", {
        set: function (source) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollaboratorsService.prototype, "messageSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.disposeSubject)
                .filter(function (msg) { return msg.service === CollaboratorsService.ID; })
                .subscribe(function (msg) {
                var collabMsg = collaborator_pb_1.CollaboratorMsg.decode(msg.content);
                var id = msg.id;
                var pseudo = collabMsg.pseudo;
                _this.collaboratorChangePseudoSubject.next(new Collaborator_1.Collaborator(id, pseudo));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollaboratorsService.prototype, "peerJoinSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.disposeSubject)
                .subscribe(function (id) {
                _this.emitPseudo(_this.pseudonym, id);
                var newCollaborator = new Collaborator_1.Collaborator(id, CollaboratorsService.DEFAULT_PSEUDO);
                _this.collaboratorJoinSubject.next(newCollaborator);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollaboratorsService.prototype, "peerLeaveSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.disposeSubject)
                .subscribe(function (id) {
                _this.collaboratorLeaveSubject.next(id);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollaboratorsService.prototype, "pseudoSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.disposeSubject)
                .subscribe(function (pseudo) {
                _this.pseudonym = pseudo;
                _this.emitPseudo(pseudo);
            });
        },
        enumerable: true,
        configurable: true
    });
    CollaboratorsService.prototype.emitPseudo = function (pseudo, id) {
        var collabMsg = collaborator_pb_1.CollaboratorMsg.create({ pseudo: pseudo });
        if (id) {
            var msg = new _1.SendToMessage(CollaboratorsService.ID, id, collaborator_pb_1.CollaboratorMsg.encode(collabMsg).finish());
            this.msgToSendToSubject.next(msg);
        }
        else {
            var msg = new _1.BroadcastMessage(CollaboratorsService.ID, collaborator_pb_1.CollaboratorMsg.encode(collabMsg).finish());
            this.msgToBroadcastSubject.next(msg);
        }
        return collaborator_pb_1.CollaboratorMsg.encode(collabMsg).finish();
    };
    CollaboratorsService.prototype.dispose = function () {
        this.collaboratorChangePseudoSubject.complete();
        this.collaboratorJoinSubject.complete();
        this.collaboratorLeaveSubject.complete();
        this.disposeSubject.next();
        this.disposeSubject.complete();
        this.msgToBroadcastSubject.complete();
        this.msgToSendRandomlySubject.complete();
        this.msgToSendToSubject.complete();
    };
    CollaboratorsService.ID = 'Collaborators';
    CollaboratorsService.DEFAULT_PSEUDO = 'Anonymous';
    return CollaboratorsService;
}());
exports.CollaboratorsService = CollaboratorsService;
//# sourceMappingURL=CollaboratorsService.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractMessage_1 = __webpack_require__(1);
var BroadcastMessage = /** @class */ (function (_super) {
    __extends(BroadcastMessage, _super);
    function BroadcastMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BroadcastMessage;
}(AbstractMessage_1.AbstractMessage));
exports.BroadcastMessage = BroadcastMessage;
//# sourceMappingURL=BroadcastMessage.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JoinEvent = /** @class */ (function () {
    function JoinEvent(id, key, created) {
        this.id = id;
        this.key = key;
        this.created = created;
    }
    return JoinEvent;
}());
exports.JoinEvent = JoinEvent;
//# sourceMappingURL=JoinEvent.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractMessage_1 = __webpack_require__(1);
var NetworkMessage = /** @class */ (function (_super) {
    __extends(NetworkMessage, _super);
    function NetworkMessage(service, id, isBroadcast, content) {
        var _this = _super.call(this, service, content) || this;
        _this.id = id;
        _this.isBroadcast = isBroadcast;
        return _this;
    }
    return NetworkMessage;
}(AbstractMessage_1.AbstractMessage));
exports.NetworkMessage = NetworkMessage;
//# sourceMappingURL=NetworkMessage.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractMessage_1 = __webpack_require__(1);
var SendRandomlyMessage = /** @class */ (function (_super) {
    __extends(SendRandomlyMessage, _super);
    function SendRandomlyMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SendRandomlyMessage;
}(AbstractMessage_1.AbstractMessage));
exports.SendRandomlyMessage = SendRandomlyMessage;
//# sourceMappingURL=SendRandomlyMessage.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractMessage_1 = __webpack_require__(1);
var SendToMessage = /** @class */ (function (_super) {
    __extends(SendToMessage, _super);
    function SendToMessage(service, id, msg) {
        var _this = _super.call(this, service, msg) || this;
        _this.id = id;
        return _this;
    }
    return SendToMessage;
}(AbstractMessage_1.AbstractMessage));
exports.SendToMessage = SendToMessage;
//# sourceMappingURL=SendToMessage.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/


var $protobuf = __webpack_require__(6);

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.CollaboratorMsg = (function() {

    /**
     * Properties of a CollaboratorMsg.
     * @exports ICollaboratorMsg
     * @interface ICollaboratorMsg
     * @property {string} [pseudo] CollaboratorMsg pseudo
     */

    /**
     * Constructs a new CollaboratorMsg.
     * @exports CollaboratorMsg
     * @classdesc Represents a CollaboratorMsg.
     * @constructor
     * @param {ICollaboratorMsg=} [properties] Properties to set
     */
    function CollaboratorMsg(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CollaboratorMsg pseudo.
     * @member {string}pseudo
     * @memberof CollaboratorMsg
     * @instance
     */
    CollaboratorMsg.prototype.pseudo = "";

    /**
     * Creates a new CollaboratorMsg instance using the specified properties.
     * @function create
     * @memberof CollaboratorMsg
     * @static
     * @param {ICollaboratorMsg=} [properties] Properties to set
     * @returns {CollaboratorMsg} CollaboratorMsg instance
     */
    CollaboratorMsg.create = function create(properties) {
        return new CollaboratorMsg(properties);
    };

    /**
     * Encodes the specified CollaboratorMsg message. Does not implicitly {@link CollaboratorMsg.verify|verify} messages.
     * @function encode
     * @memberof CollaboratorMsg
     * @static
     * @param {ICollaboratorMsg} message CollaboratorMsg message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CollaboratorMsg.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pseudo != null && message.hasOwnProperty("pseudo"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.pseudo);
        return writer;
    };

    /**
     * Decodes a CollaboratorMsg message from the specified reader or buffer.
     * @function decode
     * @memberof CollaboratorMsg
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CollaboratorMsg} CollaboratorMsg
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CollaboratorMsg.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CollaboratorMsg();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pseudo = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    return CollaboratorMsg;
})();

module.exports = $root;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(0);
var mute_structs_1 = __webpack_require__(7);
var DocService = /** @class */ (function () {
    function DocService(id) {
        var _this = this;
        this.doc = new mute_structs_1.LogootSRopes(id);
        this.disposeSubject = new rxjs_1.Subject();
        this.docDigestSubject = new rxjs_1.Subject();
        this.docTreeSubject = new rxjs_1.Subject();
        this.localLogootSOperationSubject = new rxjs_1.Subject();
        this.remoteTextOperationsSubject = new rxjs_1.Subject();
        this.updateSubject = new rxjs_1.Subject();
        this.updateSubject
            .takeUntil(this.disposeSubject)
            .debounceTime(1000)
            .subscribe(function () {
            _this.docTreeSubject.next(JSON.stringify(_this.doc));
            _this.docDigestSubject.next(_this.doc.digest());
        });
    }
    Object.defineProperty(DocService.prototype, "initSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.disposeSubject)
                .subscribe(function (key) {
                _this.docID = key;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocService.prototype, "localTextOperationsSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.disposeSubject)
                .subscribe(function (textOperations) {
                _this.handleTextOperations(textOperations);
                _this.updateSubject.next();
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocService.prototype, "remoteLogootSOperationSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.disposeSubject)
                .subscribe(function (logootSOps) {
                var remoteTextOps = logootSOps
                    .map(function (logootSOp) {
                    return _this.handleRemoteOperation(logootSOp);
                })
                    .reduce(function (acc, textOps) {
                    return acc.concat(textOps);
                }, []);
                _this.remoteTextOperationsSubject.next(remoteTextOps);
                _this.updateSubject.next();
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocService.prototype, "onDocDigest", {
        get: function () {
            return this.docDigestSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocService.prototype, "onDocTree", {
        get: function () {
            return this.docTreeSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocService.prototype, "onLocalLogootSOperation", {
        get: function () {
            return this.localLogootSOperationSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocService.prototype, "onRemoteTextOperations", {
        get: function () {
            return this.remoteTextOperationsSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    DocService.prototype.dispose = function () {
        this.disposeSubject.next();
        this.disposeSubject.complete();
        this.localLogootSOperationSubject.complete();
        this.remoteTextOperationsSubject.complete();
        this.updateSubject.complete();
    };
    DocService.prototype.handleTextOperations = function (textOperations) {
        var _this = this;
        textOperations.forEach(function (textOperation) {
            var logootSOperation = textOperation.applyTo(_this.doc);
            _this.localLogootSOperationSubject.next(logootSOperation);
        });
        // log.info('operation:doc', 'updated doc: ', this.doc)
    };
    DocService.prototype.handleRemoteOperation = function (logootSOperation) {
        var textOperations = logootSOperation.execute(this.doc);
        // log.info('operation:doc', 'updated doc: ', this.doc)
        return textOperations;
    };
    DocService.prototype.positionFromIndex = function (index) {
        var respIntnode = this.doc.searchNode(index);
        if (respIntnode !== null) {
            var base = respIntnode.node.block.idInterval.base;
            var last = respIntnode.node.actualBegin + respIntnode.i;
            var id = new mute_structs_1.Identifier(base, last);
            return {
                id: id,
                index: respIntnode.i
            };
        }
        return null;
    };
    DocService.prototype.indexFromId = function (id) {
        return this.doc.searchPos(id, new Array());
    };
    DocService.prototype.setTitle = function (title) {
        // log.debug('Sending title: ' + title)
        // this.network.sendDocTitle(title)
    };
    return DocService;
}());
exports.DocService = DocService;
//# sourceMappingURL=DocService.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var identifier_1 = __webpack_require__(2);
var infinitestring_1 = __webpack_require__(48);
function isMine(replica) {
    return function (base) { return base[base.length - 2] === replica; };
}
exports.isMine = isMine;
function createBetweenPosition(id1, id2, replicaNumber, clock) {
    console.assert(id1 === null || id1 instanceof identifier_1.Identifier, "id1 = " + id1);
    console.assert(id2 === null || id2 instanceof identifier_1.Identifier, "id2 = ", id2);
    console.assert(typeof replicaNumber === "number", "replicaNumber = ", replicaNumber);
    console.assert(typeof clock === "number", "clock = ", clock);
    var s1 = new infinitestring_1.InfiniteString(id1 !== null ? id1.base.concat(id1.last) : [], identifier_1.INT_32_MIN_VALUE);
    var s2 = new infinitestring_1.InfiniteString(id2 !== null ? id2.base.concat(id2.last) : [], identifier_1.INT_32_MAX_VALUE);
    var sb = [];
    do {
        var b1 = s1.next();
        var b2 = s2.next();
        if (b2 - b1 > 2) {
            var f = (Math.random() * (b2 - b1 - 2)) + b1 + 1; // Generate a random number ∈ ]b1, b2[
            var i = f | 0; // Truncate the float in order to get a 32bits int
            sb.push(i);
            break;
        }
        else {
            // Copy the whole tuple <random, replicaNumber, clock, offset>
            sb.push(b1);
            for (var i = 0; i < 3; i++) {
                sb.push(s1.next());
                s2.next();
            }
        }
    } while (true);
    sb.push(replicaNumber);
    sb.push(clock);
    console.assert(isMine(replicaNumber)(sb), "replica = " + replicaNumber + " base = ", sb);
    return sb;
}
exports.createBetweenPosition = createBetweenPosition;
//# sourceMappingURL=idfactory.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var InfiniteString = /** @class */ (function () {
    function InfiniteString(aPrefix, aFiller) {
        console.assert(aPrefix instanceof Array, "aPrefix = ", aPrefix);
        console.assert(typeof aFiller !== "undefined");
        this.filler = aFiller;
        this.prefix = aPrefix;
        this.currentIndex = 0;
    }
    InfiniteString.prototype.next = function () {
        if (this.currentIndex < this.prefix.length) {
            var result = this.prefix[this.currentIndex];
            this.currentIndex++;
            return result;
        }
        else {
            return this.filler;
        }
    };
    return InfiniteString;
}());
exports.InfiniteString = InfiniteString;
//# sourceMappingURL=infinitestring.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  Copyright 2014 Matthieu Nicolas
 *
 *  This file is part of Mute-structs.
 *
 *  Mute-structs is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Mute-structs is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Mute-structs.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function compareBase(idInterval1, idInterval2) {
    var b1 = idInterval1.base;
    var begin1 = idInterval1.begin;
    var end1 = idInterval1.end;
    var b2 = idInterval2.base;
    var begin2 = idInterval2.begin;
    var end2 = idInterval2.end;
    var minLength = Math.min(b1.length, b2.length);
    var i = 0;
    while (i < minLength && b1[i] === b2[i]) {
        i++;
    }
    if (i === minLength) {
        if (b1.length > minLength) {
            var offset = b1[i];
            if (offset < begin2) {
                return 1 /* B1_BEFORE_B2 */;
            }
            else if (offset >= end2) {
                return 0 /* B1_AFTER_B2 */;
            }
            else {
                return 2 /* B1_INSIDE_B2 */;
            }
        }
        else if (b2.length > minLength) {
            var offset = b2[i];
            if (offset < begin1) {
                return 0 /* B1_AFTER_B2 */;
            }
            else if (offset >= end1) {
                return 1 /* B1_BEFORE_B2 */;
            }
            else {
                return 3 /* B2_INSIDE_B1 */;
            }
        }
        else {
            if (begin1 === begin2 && end1 === end2) {
                return 6 /* B1_EQUALS_B2 */;
            }
            else if ((end1 + 1) === begin2) {
                return 4 /* B1_CONCAT_B2 */;
            }
            else if (begin1 === (end2 + 1)) {
                return 5 /* B2_CONCAT_B1 */;
            }
            else if (end1 < begin2) {
                return 1 /* B1_BEFORE_B2 */;
            }
            else if (end2 < begin1) {
                return 0 /* B1_AFTER_B2 */;
            }
            else {
                /*
                    (B2 ⊂ B1) || (B1 ⊂ B2)  || (B1 ∩ B2 !== {})
                    It happens only in the following cases:
                        - An already applied operation is delivered again,
                        but the interval has since then been updated
                        (append, prepend, deletion at the bounds)
                        - It is a malicious operation which try to insert
                        again some identifiers
                    For now, do not do anything in both cases.
                */
                console.warn('Trying to duplicate existing identifiers: ', idInterval1, idInterval2);
                return 6 /* B1_EQUALS_B2 */;
            }
        }
    }
    else if (b1[i] > b2[i]) {
        return 0 /* B1_AFTER_B2 */;
    }
    else {
        return 1 /* B1_BEFORE_B2 */;
    }
}
exports.compareBase = compareBase;
//# sourceMappingURL=iteratorhelperidentifier.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(0);
var _1 = __webpack_require__(16);
var _2 = __webpack_require__(18);
var _3 = __webpack_require__(25);
var MuteCore = /** @class */ (function () {
    function MuteCore(id) {
        this.initSubject = new rxjs_1.Subject();
        this.collaboratorsService = new _1.CollaboratorsService();
        this.docService = new _2.DocService(id);
        this.syncService = new _3.SyncService(id);
        this.syncMessageService = new _3.SyncMessageService();
        this.docService.initSource = this.initSubject;
        this.docService.remoteLogootSOperationSource = this.syncService.onRemoteLogootSOperation;
        this.syncService.localLogootSOperationSource = this.docService.onLocalLogootSOperation;
        this.syncService.remoteQuerySyncSource = this.syncMessageService.onRemoteQuerySync;
        this.syncService.remoteReplySyncSource = this.syncMessageService.onRemoteReplySync;
        this.syncService.remoteRichLogootSOperationSource = this.syncMessageService.onRemoteRichLogootSOperation;
        // this.syncService.storedStateSource = this.syncStorage.onStoredState
        this.syncMessageService.localRichLogootSOperationSource = this.syncService.onLocalRichLogootSOperation;
        this.syncMessageService.querySyncSource = this.syncService.onQuerySync;
        this.syncMessageService.replySyncSource = this.syncService.onReplySync;
    }
    Object.defineProperty(MuteCore.prototype, "messageSource", {
        set: function (source) {
            this.collaboratorsService.messageSource = source;
            this.syncMessageService.messageSource = source;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MuteCore.prototype, "onInit", {
        get: function () {
            return this.initSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MuteCore.prototype, "onMsgToBroadcast", {
        get: function () {
            return rxjs_1.Observable.merge(this.collaboratorsService.onMsgToBroadcast, this.syncMessageService.onMsgToBroadcast);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MuteCore.prototype, "onMsgToSendRandomly", {
        get: function () {
            return rxjs_1.Observable.merge(this.collaboratorsService.onMsgToSendRandomly, this.syncMessageService.onMsgToSendRandomly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MuteCore.prototype, "onMsgToSendTo", {
        get: function () {
            return rxjs_1.Observable.merge(this.collaboratorsService.onMsgToSendTo, this.syncMessageService.onMsgToSendTo);
        },
        enumerable: true,
        configurable: true
    });
    MuteCore.prototype.init = function (key) {
        this.initSubject.next(key);
    };
    MuteCore.prototype.dispose = function () {
        this.collaboratorsService.dispose();
        this.docService.dispose();
        this.syncService.dispose();
        this.syncMessageService.dispose();
    };
    return MuteCore;
}());
exports.MuteCore = MuteCore;
//# sourceMappingURL=MuteCore.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(0);
var ReplySyncEvent_1 = __webpack_require__(10);
var RichLogootSOperation_1 = __webpack_require__(11);
var State_1 = __webpack_require__(26);
var StateVector_1 = __webpack_require__(12);
var SyncService = /** @class */ (function () {
    function SyncService(id) {
        this.id = -1;
        this.clock = 0;
        this.richLogootSOps = [];
        this.id = id;
        this.vector = new StateVector_1.StateVector();
        this.appliedOperationsSubject = new rxjs_1.Subject();
        this.disposeSubject = new rxjs_1.Subject();
        this.isReadySubject = new rxjs_1.Subject();
        this.localRichLogootSOperationSubject = new rxjs_1.Subject();
        this.querySyncSubject = new rxjs_1.Subject();
        this.remoteLogootSOperationSubject = new rxjs_1.Subject();
        this.replySyncSubject = new rxjs_1.Subject();
        this.stateSubject = new rxjs_1.Subject();
        this.triggerQuerySyncSubject = new rxjs_1.Subject();
        this.initPeriodicQuerySync();
    }
    Object.defineProperty(SyncService.prototype, "onLocalRichLogootSOperation", {
        get: function () {
            return this.localRichLogootSOperationSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncService.prototype, "onQuerySync", {
        get: function () {
            return this.querySyncSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncService.prototype, "onRemoteLogootSOperation", {
        get: function () {
            return this.remoteLogootSOperationSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncService.prototype, "onReplySync", {
        get: function () {
            return this.replySyncSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncService.prototype, "onState", {
        get: function () {
            return this.stateSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncService.prototype, "state", {
        get: function () {
            return new State_1.State(this.vector.asMap(), this.richLogootSOps);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncService.prototype, "localLogootSOperationSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.disposeSubject)
                .subscribe(function (logootSOp) {
                var richLogootSOp = new RichLogootSOperation_1.RichLogootSOperation(_this.id, _this.clock, logootSOp);
                _this.updateState(richLogootSOp);
                _this.stateSubject.next(_this.state);
                _this.localRichLogootSOperationSubject.next(richLogootSOp);
                _this.clock++;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncService.prototype, "remoteQuerySyncSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.disposeSubject)
                .subscribe(function (vector) {
                var missingRichLogootSOps = _this.computeMissingOps(vector);
                // TODO: Add sort function to apply LogootSAdd operations before LogootSDel ones
                var missingIntervals = _this.vector.computeMissingIntervals(vector);
                var replySyncEvent = new ReplySyncEvent_1.ReplySyncEvent(missingRichLogootSOps, missingIntervals);
                _this.replySyncSubject.next(replySyncEvent);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncService.prototype, "remoteReplySyncSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.disposeSubject)
                .subscribe(function (replySyncEvent) {
                if (replySyncEvent.richLogootSOps.length > 0) {
                    _this.applyRichLogootSOperations(replySyncEvent.richLogootSOps);
                    _this.stateSubject.next(_this.state);
                }
                replySyncEvent.intervals.forEach(function (interval) {
                    _this.richLogootSOps
                        .filter(function (richLogootSOp) {
                        var id = richLogootSOp.id;
                        var clock = richLogootSOp.clock;
                        return interval.id === id && interval.begin <= clock && clock <= interval.end;
                    })
                        .forEach(function (richLogootSOp) {
                        _this.localRichLogootSOperationSubject.next(richLogootSOp);
                    });
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncService.prototype, "remoteRichLogootSOperationSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.disposeSubject)
                .subscribe(function (richLogootSOp) {
                _this.applyRichLogootSOperations([richLogootSOp]);
                _this.stateSubject.next(_this.state);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncService.prototype, "storedStateSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.disposeSubject)
                .subscribe(function (state) {
                _this.richLogootSOps = [];
                _this.vector.clear();
                _this.applyRichLogootSOperations(state.richLogootSOps);
                _this.isReadySubject.next();
            });
        },
        enumerable: true,
        configurable: true
    });
    SyncService.prototype.setJoinAndStateSources = function (joinSource, storedStateSource) {
        var _this = this;
        var triggerQuerySyncObservable = joinSource;
        if (storedStateSource) {
            this.storedStateSource = storedStateSource;
            triggerQuerySyncObservable =
                joinSource
                    .takeUntil(this.disposeSubject)
                    .zip(this.isReadySubject, function (joinEvent) {
                    return joinEvent;
                });
        }
        triggerQuerySyncObservable
            .take(1)
            .subscribe(function (joinEvent) {
            if (!joinEvent.created) {
                _this.querySyncSubject.next(_this.vector);
            }
        });
    };
    SyncService.prototype.initPeriodicQuerySync = function () {
        var _this = this;
        this.triggerQuerySyncSubject
            .takeUntil(this.disposeSubject)
            .subscribe(function () {
            _this.querySyncSubject.next(_this.vector);
            _this.triggerPeriodicQuerySync();
        });
        this.triggerPeriodicQuerySync();
    };
    SyncService.prototype.triggerPeriodicQuerySync = function () {
        var _this = this;
        var defaultTime = 10000;
        var max = defaultTime / 2;
        var min = -max;
        var random = Math.floor(Math.random() * 2 * max) + min; // Compute a random number between [0, 10000] then shift interval to [-5000, 5000]
        setTimeout(function () {
            _this.triggerQuerySyncSubject.next();
        }, defaultTime + random);
    };
    SyncService.prototype.dispose = function () {
        this.appliedOperationsSubject.complete();
        this.disposeSubject.next();
        this.disposeSubject.complete();
        this.isReadySubject.complete();
        this.localRichLogootSOperationSubject.complete();
        this.querySyncSubject.complete();
        this.remoteLogootSOperationSubject.complete();
        this.replySyncSubject.complete();
        this.stateSubject.complete();
    };
    SyncService.prototype.applyRichLogootSOperations = function (richLogootSOps) {
        var _this = this;
        // Keep only new operations
        var newRichLogootSOps = richLogootSOps.filter(function (richLogootSOp) {
            var id = richLogootSOp.id;
            var clock = richLogootSOp.clock;
            return !_this.vector.isAlreadyDelivered(id, clock);
        });
        if (newRichLogootSOps.length > 0) {
            var logootSOperations_1 = [];
            var appliedOperations_1 = [];
            newRichLogootSOps
                .forEach(function (richLogootSOp) {
                var id = richLogootSOp.id;
                var clock = richLogootSOp.clock;
                if (_this.vector.isDeliverable(id, clock)) {
                    _this.updateState(richLogootSOp);
                    logootSOperations_1.push(richLogootSOp.logootSOp);
                    appliedOperations_1.push({ id: id, clock: clock });
                }
                else if (!_this.vector.isAlreadyDelivered(id, clock)) {
                    // Deliver operation once the previous one will be applied
                    console.log('SyncService: Buffering operation: ', { id: id, clock: clock });
                    _this.appliedOperationsSubject
                        .filter(function (_a) {
                        var id = _a.id, clock = _a.clock;
                        return richLogootSOp.id === id && richLogootSOp.clock === (clock + 1);
                    })
                        .take(1)
                        .subscribe(function () {
                        console.log('SyncService: Delivering operation: ', { id: id, clock: clock });
                        if (!_this.vector.isAlreadyDelivered(id, clock)) {
                            _this.applyRichLogootSOperations([richLogootSOp]);
                        }
                    });
                }
            });
            this.remoteLogootSOperationSubject.next(logootSOperations_1);
            appliedOperations_1.forEach(function (appliedOperation) {
                _this.appliedOperationsSubject.next(appliedOperation);
            });
        }
    };
    SyncService.prototype.updateState = function (richLogootSOp) {
        console.assert(this.vector.isDeliverable(richLogootSOp.id, richLogootSOp.clock));
        this.vector.set(richLogootSOp.id, richLogootSOp.clock);
        this.richLogootSOps.push(richLogootSOp);
    };
    SyncService.prototype.computeMissingOps = function (vector) {
        return this.richLogootSOps
            .filter(function (richLogootSOperation) {
            var id = richLogootSOperation.id;
            var clock = richLogootSOperation.clock;
            var v = vector.get(id);
            return v === undefined ? true : v < clock ? true : false;
        });
    };
    return SyncService;
}());
exports.SyncService = SyncService;
//# sourceMappingURL=SyncService.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mute_structs_1 = __webpack_require__(7);
var rxjs_1 = __webpack_require__(0);
var Interval_1 = __webpack_require__(9);
var _1 = __webpack_require__(5);
var ReplySyncEvent_1 = __webpack_require__(10);
var RichLogootSOperation_1 = __webpack_require__(11);
var StateVector_1 = __webpack_require__(12);
var sync_pb_1 = __webpack_require__(53);
var SyncMessageService = /** @class */ (function () {
    function SyncMessageService() {
        this.disposeSubject = new rxjs_1.Subject();
        this.msgToBroadcastSubject = new rxjs_1.Subject();
        this.msgToSendRandomlySubject = new rxjs_1.Subject();
        this.msgToSendToSubject = new rxjs_1.Subject();
        this.remoteQuerySyncSubject = new rxjs_1.Subject();
        this.remoteQuerySyncIdSubject = new rxjs_1.Subject();
        this.remoteRichLogootSOperationSubject = new rxjs_1.Subject();
        this.remoteReplySyncSubject = new rxjs_1.Subject();
    }
    Object.defineProperty(SyncMessageService.prototype, "localRichLogootSOperationSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.onDispose)
                .subscribe(function (richLogootSOp) {
                var richLogootSOpMsg = _this.generateRichLogootSOpMsg(richLogootSOp);
                var msg = new _1.BroadcastMessage(SyncMessageService.ID, richLogootSOpMsg);
                _this.msgToBroadcastSubject.next(msg);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncMessageService.prototype, "messageSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.onDispose)
                .filter(function (msg) { return msg.service === SyncMessageService.ID; })
                .subscribe(function (msg) {
                var content = sync_pb_1.sync.SyncMsg.decode(msg.content);
                switch (content.type) {
                    case 'richLogootSOpMsg':
                        _this.handleRichLogootSOpMsg(content.richLogootSOpMsg);
                        break;
                    case 'querySync':
                        _this.remoteQuerySyncIdSubject.next(msg.id); // Register the id of the peer
                        _this.handleQuerySyncMsg(content.querySync);
                        break;
                    case 'replySync':
                        _this.handleReplySyncMsg(content.replySync);
                        break;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncMessageService.prototype, "querySyncSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.onDispose)
                .subscribe(function (vector) {
                var querySyncMsg = _this.generateQuerySyncMsg(vector);
                var msg = new _1.SendRandomlyMessage(SyncMessageService.ID, querySyncMsg);
                _this.msgToSendRandomlySubject.next(msg);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncMessageService.prototype, "replySyncSource", {
        set: function (source) {
            var _this = this;
            rxjs_1.Observable.zip(source, this.remoteQuerySyncIdSubject.asObservable(), function (replySyncEvent, id) {
                return { id: id, replySyncEvent: replySyncEvent };
            })
                .takeUntil(this.onDispose)
                .subscribe(function (_a) {
                var id = _a.id, replySyncEvent = _a.replySyncEvent;
                var replySyncMsg = _this.generateReplySyncMsg(replySyncEvent.richLogootSOps, replySyncEvent.intervals);
                var msg = new _1.SendToMessage(SyncMessageService.ID, id, replySyncMsg);
                _this.msgToSendToSubject.next(msg);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncMessageService.prototype, "onDispose", {
        get: function () {
            return this.disposeSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncMessageService.prototype, "onMsgToBroadcast", {
        get: function () {
            return this.msgToBroadcastSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncMessageService.prototype, "onMsgToSendRandomly", {
        get: function () {
            return this.msgToSendRandomlySubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncMessageService.prototype, "onMsgToSendTo", {
        get: function () {
            return this.msgToSendToSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncMessageService.prototype, "onRemoteRichLogootSOperation", {
        get: function () {
            return this.remoteRichLogootSOperationSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncMessageService.prototype, "onRemoteQuerySync", {
        get: function () {
            return this.remoteQuerySyncSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncMessageService.prototype, "onRemoteReplySync", {
        get: function () {
            return this.remoteReplySyncSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    SyncMessageService.prototype.dispose = function () {
        this.disposeSubject.next();
        this.disposeSubject.complete();
        this.msgToBroadcastSubject.complete();
        this.msgToSendRandomlySubject.complete();
        this.msgToSendToSubject.complete();
        this.remoteQuerySyncSubject.complete();
        this.remoteQuerySyncIdSubject.complete();
        this.remoteRichLogootSOperationSubject.complete();
        this.remoteReplySyncSubject.complete();
    };
    SyncMessageService.prototype.handleRichLogootSOpMsg = function (content) {
        var richLogootSOp = this.deserializeRichLogootSOperation(content);
        this.remoteRichLogootSOperationSubject.next(richLogootSOp);
    };
    SyncMessageService.prototype.handleQuerySyncMsg = function (content) {
        var map = new Map();
        Object.keys(content.vector).forEach(function (key) {
            var newKey = parseInt(key, 10);
            map.set(newKey, content.vector[key]);
        });
        var vector = new StateVector_1.StateVector(map);
        this.remoteQuerySyncSubject.next(vector);
    };
    SyncMessageService.prototype.handleReplySyncMsg = function (content) {
        var _this = this;
        var richLogootSOpsList = content.richLogootSOpsMsg;
        var richLogootSOps = richLogootSOpsList.map(function (richLogootSOpMsg) {
            return _this.deserializeRichLogootSOperation(richLogootSOpMsg);
        });
        var intervals = content.intervals.map(function (interval) {
            return new Interval_1.Interval(interval.id, interval.begin, interval.end);
        });
        var replySyncEvent = new ReplySyncEvent_1.ReplySyncEvent(richLogootSOps, intervals);
        this.remoteReplySyncSubject.next(replySyncEvent);
    };
    SyncMessageService.prototype.generateRichLogootSOpMsg = function (richLogootSOp) {
        var richLogootSOperationMsg = this.serializeRichLogootSOperation(richLogootSOp);
        var msg = sync_pb_1.sync.SyncMsg.create({ richLogootSOpMsg: richLogootSOperationMsg });
        return sync_pb_1.sync.SyncMsg.encode(msg).finish();
    };
    // TODO: Watch this function
    SyncMessageService.prototype.serializeRichLogootSOperation = function (richLogootSOp) {
        var richLogootSOperationMsg = sync_pb_1.sync.RichLogootSOperationMsg.create({ id: richLogootSOp.id, clock: richLogootSOp.clock });
        var logootSOp = richLogootSOp.logootSOp;
        if (logootSOp instanceof mute_structs_1.LogootSDel) {
            richLogootSOperationMsg.logootSDelMsg = sync_pb_1.sync.LogootSDelMsg.create(logootSOp);
        }
        else if (logootSOp instanceof mute_structs_1.LogootSAdd) {
            richLogootSOperationMsg.logootSAddMsg = sync_pb_1.sync.LogootSAddMsg.create(logootSOp);
        }
        return richLogootSOperationMsg;
    };
    SyncMessageService.prototype.deserializeRichLogootSOperation = function (content) {
        var id = content.id;
        var clock = content.clock;
        var logootSOp;
        if (content.logootSAddMsg) {
            var logootSAddMsg = content.logootSAddMsg;
            logootSOp = mute_structs_1.LogootSAdd.fromPlain(logootSAddMsg);
        }
        else {
            var logootSDelMsg = content.logootSDelMsg;
            logootSOp = mute_structs_1.LogootSDel.fromPlain(logootSDelMsg);
        }
        return new RichLogootSOperation_1.RichLogootSOperation(id, clock, logootSOp);
    };
    SyncMessageService.prototype.generateQuerySyncMsg = function (vector) {
        var querySyncMsg = sync_pb_1.sync.QuerySyncMsg.create();
        vector.forEach(function (clock, id) {
            querySyncMsg.vector[id] = clock;
        });
        var msg = sync_pb_1.sync.SyncMsg.create({ querySync: querySyncMsg });
        return sync_pb_1.sync.SyncMsg.encode(msg).finish();
    };
    SyncMessageService.prototype.generateReplySyncMsg = function (richLogootSOps, intervals) {
        var _this = this;
        var replySyncMsg = sync_pb_1.sync.ReplySyncMsg.create();
        replySyncMsg.richLogootSOpsMsg = (richLogootSOps.map(function (richLogootSOp) {
            return _this.serializeRichLogootSOperation(richLogootSOp);
        }));
        var intervalsMsg = intervals.map(function (interval) {
            var intervalMsg = sync_pb_1.sync.IntervalMsg.create({ id: interval.id, begin: interval.begin, end: interval.end });
            return intervalMsg;
        });
        replySyncMsg.intervals = intervalsMsg;
        var msg = sync_pb_1.sync.SyncMsg.create({ replySync: replySyncMsg });
        return sync_pb_1.sync.SyncMsg.encode(msg).finish();
    };
    SyncMessageService.ID = 'SyncMessage';
    return SyncMessageService;
}());
exports.SyncMessageService = SyncMessageService;
//# sourceMappingURL=SyncMessageService.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/


var $protobuf = __webpack_require__(6);

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.sync = (function() {

    /**
     * Namespace sync.
     * @exports sync
     * @namespace
     */
    var sync = {};

    sync.SyncMsg = (function() {

        /**
         * Properties of a SyncMsg.
         * @memberof sync
         * @interface ISyncMsg
         * @property {sync.IRichLogootSOperationMsg} [richLogootSOpMsg] SyncMsg richLogootSOpMsg
         * @property {sync.IQuerySyncMsg} [querySync] SyncMsg querySync
         * @property {sync.IReplySyncMsg} [replySync] SyncMsg replySync
         */

        /**
         * Constructs a new SyncMsg.
         * @memberof sync
         * @classdesc Represents a SyncMsg.
         * @constructor
         * @param {sync.ISyncMsg=} [properties] Properties to set
         */
        function SyncMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SyncMsg richLogootSOpMsg.
         * @member {(sync.IRichLogootSOperationMsg|null|undefined)}richLogootSOpMsg
         * @memberof sync.SyncMsg
         * @instance
         */
        SyncMsg.prototype.richLogootSOpMsg = null;

        /**
         * SyncMsg querySync.
         * @member {(sync.IQuerySyncMsg|null|undefined)}querySync
         * @memberof sync.SyncMsg
         * @instance
         */
        SyncMsg.prototype.querySync = null;

        /**
         * SyncMsg replySync.
         * @member {(sync.IReplySyncMsg|null|undefined)}replySync
         * @memberof sync.SyncMsg
         * @instance
         */
        SyncMsg.prototype.replySync = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * SyncMsg type.
         * @member {string|undefined} type
         * @memberof sync.SyncMsg
         * @instance
         */
        Object.defineProperty(SyncMsg.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["richLogootSOpMsg", "querySync", "replySync"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new SyncMsg instance using the specified properties.
         * @function create
         * @memberof sync.SyncMsg
         * @static
         * @param {sync.ISyncMsg=} [properties] Properties to set
         * @returns {sync.SyncMsg} SyncMsg instance
         */
        SyncMsg.create = function create(properties) {
            return new SyncMsg(properties);
        };

        /**
         * Encodes the specified SyncMsg message. Does not implicitly {@link sync.SyncMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.SyncMsg
         * @static
         * @param {sync.ISyncMsg} message SyncMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.richLogootSOpMsg != null && message.hasOwnProperty("richLogootSOpMsg"))
                $root.sync.RichLogootSOperationMsg.encode(message.richLogootSOpMsg, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.querySync != null && message.hasOwnProperty("querySync"))
                $root.sync.QuerySyncMsg.encode(message.querySync, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.replySync != null && message.hasOwnProperty("replySync"))
                $root.sync.ReplySyncMsg.encode(message.replySync, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Decodes a SyncMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.SyncMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.SyncMsg} SyncMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.SyncMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.richLogootSOpMsg = $root.sync.RichLogootSOperationMsg.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.querySync = $root.sync.QuerySyncMsg.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.replySync = $root.sync.ReplySyncMsg.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return SyncMsg;
    })();

    sync.RichLogootSOperationMsg = (function() {

        /**
         * Properties of a RichLogootSOperationMsg.
         * @memberof sync
         * @interface IRichLogootSOperationMsg
         * @property {number} [id] RichLogootSOperationMsg id
         * @property {number} [clock] RichLogootSOperationMsg clock
         * @property {sync.ILogootSAddMsg} [logootSAddMsg] RichLogootSOperationMsg logootSAddMsg
         * @property {sync.ILogootSDelMsg} [logootSDelMsg] RichLogootSOperationMsg logootSDelMsg
         */

        /**
         * Constructs a new RichLogootSOperationMsg.
         * @memberof sync
         * @classdesc Represents a RichLogootSOperationMsg.
         * @constructor
         * @param {sync.IRichLogootSOperationMsg=} [properties] Properties to set
         */
        function RichLogootSOperationMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RichLogootSOperationMsg id.
         * @member {number}id
         * @memberof sync.RichLogootSOperationMsg
         * @instance
         */
        RichLogootSOperationMsg.prototype.id = 0;

        /**
         * RichLogootSOperationMsg clock.
         * @member {number}clock
         * @memberof sync.RichLogootSOperationMsg
         * @instance
         */
        RichLogootSOperationMsg.prototype.clock = 0;

        /**
         * RichLogootSOperationMsg logootSAddMsg.
         * @member {(sync.ILogootSAddMsg|null|undefined)}logootSAddMsg
         * @memberof sync.RichLogootSOperationMsg
         * @instance
         */
        RichLogootSOperationMsg.prototype.logootSAddMsg = null;

        /**
         * RichLogootSOperationMsg logootSDelMsg.
         * @member {(sync.ILogootSDelMsg|null|undefined)}logootSDelMsg
         * @memberof sync.RichLogootSOperationMsg
         * @instance
         */
        RichLogootSOperationMsg.prototype.logootSDelMsg = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * RichLogootSOperationMsg type.
         * @member {string|undefined} type
         * @memberof sync.RichLogootSOperationMsg
         * @instance
         */
        Object.defineProperty(RichLogootSOperationMsg.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["logootSAddMsg", "logootSDelMsg"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new RichLogootSOperationMsg instance using the specified properties.
         * @function create
         * @memberof sync.RichLogootSOperationMsg
         * @static
         * @param {sync.IRichLogootSOperationMsg=} [properties] Properties to set
         * @returns {sync.RichLogootSOperationMsg} RichLogootSOperationMsg instance
         */
        RichLogootSOperationMsg.create = function create(properties) {
            return new RichLogootSOperationMsg(properties);
        };

        /**
         * Encodes the specified RichLogootSOperationMsg message. Does not implicitly {@link sync.RichLogootSOperationMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.RichLogootSOperationMsg
         * @static
         * @param {sync.IRichLogootSOperationMsg} message RichLogootSOperationMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RichLogootSOperationMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.clock != null && message.hasOwnProperty("clock"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.clock);
            if (message.logootSAddMsg != null && message.hasOwnProperty("logootSAddMsg"))
                $root.sync.LogootSAddMsg.encode(message.logootSAddMsg, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.logootSDelMsg != null && message.hasOwnProperty("logootSDelMsg"))
                $root.sync.LogootSDelMsg.encode(message.logootSDelMsg, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Decodes a RichLogootSOperationMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.RichLogootSOperationMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.RichLogootSOperationMsg} RichLogootSOperationMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RichLogootSOperationMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.RichLogootSOperationMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.clock = reader.int32();
                    break;
                case 3:
                    message.logootSAddMsg = $root.sync.LogootSAddMsg.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.logootSDelMsg = $root.sync.LogootSDelMsg.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return RichLogootSOperationMsg;
    })();

    sync.LogootSAddMsg = (function() {

        /**
         * Properties of a LogootSAddMsg.
         * @memberof sync
         * @interface ILogootSAddMsg
         * @property {sync.IIdentifierMsg} [id] LogootSAddMsg id
         * @property {string} [content] LogootSAddMsg content
         */

        /**
         * Constructs a new LogootSAddMsg.
         * @memberof sync
         * @classdesc Represents a LogootSAddMsg.
         * @constructor
         * @param {sync.ILogootSAddMsg=} [properties] Properties to set
         */
        function LogootSAddMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LogootSAddMsg id.
         * @member {(sync.IIdentifierMsg|null|undefined)}id
         * @memberof sync.LogootSAddMsg
         * @instance
         */
        LogootSAddMsg.prototype.id = null;

        /**
         * LogootSAddMsg content.
         * @member {string}content
         * @memberof sync.LogootSAddMsg
         * @instance
         */
        LogootSAddMsg.prototype.content = "";

        /**
         * Creates a new LogootSAddMsg instance using the specified properties.
         * @function create
         * @memberof sync.LogootSAddMsg
         * @static
         * @param {sync.ILogootSAddMsg=} [properties] Properties to set
         * @returns {sync.LogootSAddMsg} LogootSAddMsg instance
         */
        LogootSAddMsg.create = function create(properties) {
            return new LogootSAddMsg(properties);
        };

        /**
         * Encodes the specified LogootSAddMsg message. Does not implicitly {@link sync.LogootSAddMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.LogootSAddMsg
         * @static
         * @param {sync.ILogootSAddMsg} message LogootSAddMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogootSAddMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                $root.sync.IdentifierMsg.encode(message.id, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.content != null && message.hasOwnProperty("content"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.content);
            return writer;
        };

        /**
         * Decodes a LogootSAddMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.LogootSAddMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.LogootSAddMsg} LogootSAddMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogootSAddMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.LogootSAddMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = $root.sync.IdentifierMsg.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.content = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return LogootSAddMsg;
    })();

    sync.IdentifierMsg = (function() {

        /**
         * Properties of an IdentifierMsg.
         * @memberof sync
         * @interface IIdentifierMsg
         * @property {Array.<number>} [base] IdentifierMsg base
         * @property {number} [last] IdentifierMsg last
         */

        /**
         * Constructs a new IdentifierMsg.
         * @memberof sync
         * @classdesc Represents an IdentifierMsg.
         * @constructor
         * @param {sync.IIdentifierMsg=} [properties] Properties to set
         */
        function IdentifierMsg(properties) {
            this.base = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * IdentifierMsg base.
         * @member {Array.<number>}base
         * @memberof sync.IdentifierMsg
         * @instance
         */
        IdentifierMsg.prototype.base = $util.emptyArray;

        /**
         * IdentifierMsg last.
         * @member {number}last
         * @memberof sync.IdentifierMsg
         * @instance
         */
        IdentifierMsg.prototype.last = 0;

        /**
         * Creates a new IdentifierMsg instance using the specified properties.
         * @function create
         * @memberof sync.IdentifierMsg
         * @static
         * @param {sync.IIdentifierMsg=} [properties] Properties to set
         * @returns {sync.IdentifierMsg} IdentifierMsg instance
         */
        IdentifierMsg.create = function create(properties) {
            return new IdentifierMsg(properties);
        };

        /**
         * Encodes the specified IdentifierMsg message. Does not implicitly {@link sync.IdentifierMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.IdentifierMsg
         * @static
         * @param {sync.IIdentifierMsg} message IdentifierMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IdentifierMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.base != null && message.base.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.base.length; ++i)
                    writer.int32(message.base[i]);
                writer.ldelim();
            }
            if (message.last != null && message.hasOwnProperty("last"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.last);
            return writer;
        };

        /**
         * Decodes an IdentifierMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.IdentifierMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.IdentifierMsg} IdentifierMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IdentifierMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.IdentifierMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.base && message.base.length))
                        message.base = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.base.push(reader.int32());
                    } else
                        message.base.push(reader.int32());
                    break;
                case 2:
                    message.last = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return IdentifierMsg;
    })();

    sync.LogootSDelMsg = (function() {

        /**
         * Properties of a LogootSDelMsg.
         * @memberof sync
         * @interface ILogootSDelMsg
         * @property {Array.<sync.IIdentifierIntervalMsg>} [lid] LogootSDelMsg lid
         */

        /**
         * Constructs a new LogootSDelMsg.
         * @memberof sync
         * @classdesc Represents a LogootSDelMsg.
         * @constructor
         * @param {sync.ILogootSDelMsg=} [properties] Properties to set
         */
        function LogootSDelMsg(properties) {
            this.lid = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LogootSDelMsg lid.
         * @member {Array.<sync.IIdentifierIntervalMsg>}lid
         * @memberof sync.LogootSDelMsg
         * @instance
         */
        LogootSDelMsg.prototype.lid = $util.emptyArray;

        /**
         * Creates a new LogootSDelMsg instance using the specified properties.
         * @function create
         * @memberof sync.LogootSDelMsg
         * @static
         * @param {sync.ILogootSDelMsg=} [properties] Properties to set
         * @returns {sync.LogootSDelMsg} LogootSDelMsg instance
         */
        LogootSDelMsg.create = function create(properties) {
            return new LogootSDelMsg(properties);
        };

        /**
         * Encodes the specified LogootSDelMsg message. Does not implicitly {@link sync.LogootSDelMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.LogootSDelMsg
         * @static
         * @param {sync.ILogootSDelMsg} message LogootSDelMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogootSDelMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.lid != null && message.lid.length)
                for (var i = 0; i < message.lid.length; ++i)
                    $root.sync.IdentifierIntervalMsg.encode(message.lid[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Decodes a LogootSDelMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.LogootSDelMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.LogootSDelMsg} LogootSDelMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogootSDelMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.LogootSDelMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.lid && message.lid.length))
                        message.lid = [];
                    message.lid.push($root.sync.IdentifierIntervalMsg.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return LogootSDelMsg;
    })();

    sync.IdentifierIntervalMsg = (function() {

        /**
         * Properties of an IdentifierIntervalMsg.
         * @memberof sync
         * @interface IIdentifierIntervalMsg
         * @property {Array.<number>} [base] IdentifierIntervalMsg base
         * @property {number} [begin] IdentifierIntervalMsg begin
         * @property {number} [end] IdentifierIntervalMsg end
         */

        /**
         * Constructs a new IdentifierIntervalMsg.
         * @memberof sync
         * @classdesc Represents an IdentifierIntervalMsg.
         * @constructor
         * @param {sync.IIdentifierIntervalMsg=} [properties] Properties to set
         */
        function IdentifierIntervalMsg(properties) {
            this.base = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * IdentifierIntervalMsg base.
         * @member {Array.<number>}base
         * @memberof sync.IdentifierIntervalMsg
         * @instance
         */
        IdentifierIntervalMsg.prototype.base = $util.emptyArray;

        /**
         * IdentifierIntervalMsg begin.
         * @member {number}begin
         * @memberof sync.IdentifierIntervalMsg
         * @instance
         */
        IdentifierIntervalMsg.prototype.begin = 0;

        /**
         * IdentifierIntervalMsg end.
         * @member {number}end
         * @memberof sync.IdentifierIntervalMsg
         * @instance
         */
        IdentifierIntervalMsg.prototype.end = 0;

        /**
         * Creates a new IdentifierIntervalMsg instance using the specified properties.
         * @function create
         * @memberof sync.IdentifierIntervalMsg
         * @static
         * @param {sync.IIdentifierIntervalMsg=} [properties] Properties to set
         * @returns {sync.IdentifierIntervalMsg} IdentifierIntervalMsg instance
         */
        IdentifierIntervalMsg.create = function create(properties) {
            return new IdentifierIntervalMsg(properties);
        };

        /**
         * Encodes the specified IdentifierIntervalMsg message. Does not implicitly {@link sync.IdentifierIntervalMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.IdentifierIntervalMsg
         * @static
         * @param {sync.IIdentifierIntervalMsg} message IdentifierIntervalMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IdentifierIntervalMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.base != null && message.base.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.base.length; ++i)
                    writer.int32(message.base[i]);
                writer.ldelim();
            }
            if (message.begin != null && message.hasOwnProperty("begin"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.begin);
            if (message.end != null && message.hasOwnProperty("end"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.end);
            return writer;
        };

        /**
         * Decodes an IdentifierIntervalMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.IdentifierIntervalMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.IdentifierIntervalMsg} IdentifierIntervalMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IdentifierIntervalMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.IdentifierIntervalMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.base && message.base.length))
                        message.base = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.base.push(reader.int32());
                    } else
                        message.base.push(reader.int32());
                    break;
                case 2:
                    message.begin = reader.int32();
                    break;
                case 3:
                    message.end = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return IdentifierIntervalMsg;
    })();

    sync.QuerySyncMsg = (function() {

        /**
         * Properties of a QuerySyncMsg.
         * @memberof sync
         * @interface IQuerySyncMsg
         * @property {Object.<string,number>} [vector] QuerySyncMsg vector
         */

        /**
         * Constructs a new QuerySyncMsg.
         * @memberof sync
         * @classdesc Represents a QuerySyncMsg.
         * @constructor
         * @param {sync.IQuerySyncMsg=} [properties] Properties to set
         */
        function QuerySyncMsg(properties) {
            this.vector = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QuerySyncMsg vector.
         * @member {Object.<string,number>}vector
         * @memberof sync.QuerySyncMsg
         * @instance
         */
        QuerySyncMsg.prototype.vector = $util.emptyObject;

        /**
         * Creates a new QuerySyncMsg instance using the specified properties.
         * @function create
         * @memberof sync.QuerySyncMsg
         * @static
         * @param {sync.IQuerySyncMsg=} [properties] Properties to set
         * @returns {sync.QuerySyncMsg} QuerySyncMsg instance
         */
        QuerySyncMsg.create = function create(properties) {
            return new QuerySyncMsg(properties);
        };

        /**
         * Encodes the specified QuerySyncMsg message. Does not implicitly {@link sync.QuerySyncMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.QuerySyncMsg
         * @static
         * @param {sync.IQuerySyncMsg} message QuerySyncMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QuerySyncMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.vector != null && message.hasOwnProperty("vector"))
                for (var keys = Object.keys(message.vector), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.vector[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Decodes a QuerySyncMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.QuerySyncMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.QuerySyncMsg} QuerySyncMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QuerySyncMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.QuerySyncMsg(), key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    reader.skip().pos++;
                    if (message.vector === $util.emptyObject)
                        message.vector = {};
                    key = reader.int32();
                    reader.pos++;
                    message.vector[key] = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return QuerySyncMsg;
    })();

    sync.ReplySyncMsg = (function() {

        /**
         * Properties of a ReplySyncMsg.
         * @memberof sync
         * @interface IReplySyncMsg
         * @property {Array.<sync.IRichLogootSOperationMsg>} [richLogootSOpsMsg] ReplySyncMsg richLogootSOpsMsg
         * @property {Array.<sync.IIntervalMsg>} [intervals] ReplySyncMsg intervals
         */

        /**
         * Constructs a new ReplySyncMsg.
         * @memberof sync
         * @classdesc Represents a ReplySyncMsg.
         * @constructor
         * @param {sync.IReplySyncMsg=} [properties] Properties to set
         */
        function ReplySyncMsg(properties) {
            this.richLogootSOpsMsg = [];
            this.intervals = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReplySyncMsg richLogootSOpsMsg.
         * @member {Array.<sync.IRichLogootSOperationMsg>}richLogootSOpsMsg
         * @memberof sync.ReplySyncMsg
         * @instance
         */
        ReplySyncMsg.prototype.richLogootSOpsMsg = $util.emptyArray;

        /**
         * ReplySyncMsg intervals.
         * @member {Array.<sync.IIntervalMsg>}intervals
         * @memberof sync.ReplySyncMsg
         * @instance
         */
        ReplySyncMsg.prototype.intervals = $util.emptyArray;

        /**
         * Creates a new ReplySyncMsg instance using the specified properties.
         * @function create
         * @memberof sync.ReplySyncMsg
         * @static
         * @param {sync.IReplySyncMsg=} [properties] Properties to set
         * @returns {sync.ReplySyncMsg} ReplySyncMsg instance
         */
        ReplySyncMsg.create = function create(properties) {
            return new ReplySyncMsg(properties);
        };

        /**
         * Encodes the specified ReplySyncMsg message. Does not implicitly {@link sync.ReplySyncMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.ReplySyncMsg
         * @static
         * @param {sync.IReplySyncMsg} message ReplySyncMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReplySyncMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.richLogootSOpsMsg != null && message.richLogootSOpsMsg.length)
                for (var i = 0; i < message.richLogootSOpsMsg.length; ++i)
                    $root.sync.RichLogootSOperationMsg.encode(message.richLogootSOpsMsg[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.intervals != null && message.intervals.length)
                for (var i = 0; i < message.intervals.length; ++i)
                    $root.sync.IntervalMsg.encode(message.intervals[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Decodes a ReplySyncMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.ReplySyncMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.ReplySyncMsg} ReplySyncMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReplySyncMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.ReplySyncMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.richLogootSOpsMsg && message.richLogootSOpsMsg.length))
                        message.richLogootSOpsMsg = [];
                    message.richLogootSOpsMsg.push($root.sync.RichLogootSOperationMsg.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.intervals && message.intervals.length))
                        message.intervals = [];
                    message.intervals.push($root.sync.IntervalMsg.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return ReplySyncMsg;
    })();

    sync.IntervalMsg = (function() {

        /**
         * Properties of an IntervalMsg.
         * @memberof sync
         * @interface IIntervalMsg
         * @property {number} [id] IntervalMsg id
         * @property {number} [begin] IntervalMsg begin
         * @property {number} [end] IntervalMsg end
         */

        /**
         * Constructs a new IntervalMsg.
         * @memberof sync
         * @classdesc Represents an IntervalMsg.
         * @constructor
         * @param {sync.IIntervalMsg=} [properties] Properties to set
         */
        function IntervalMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * IntervalMsg id.
         * @member {number}id
         * @memberof sync.IntervalMsg
         * @instance
         */
        IntervalMsg.prototype.id = 0;

        /**
         * IntervalMsg begin.
         * @member {number}begin
         * @memberof sync.IntervalMsg
         * @instance
         */
        IntervalMsg.prototype.begin = 0;

        /**
         * IntervalMsg end.
         * @member {number}end
         * @memberof sync.IntervalMsg
         * @instance
         */
        IntervalMsg.prototype.end = 0;

        /**
         * Creates a new IntervalMsg instance using the specified properties.
         * @function create
         * @memberof sync.IntervalMsg
         * @static
         * @param {sync.IIntervalMsg=} [properties] Properties to set
         * @returns {sync.IntervalMsg} IntervalMsg instance
         */
        IntervalMsg.create = function create(properties) {
            return new IntervalMsg(properties);
        };

        /**
         * Encodes the specified IntervalMsg message. Does not implicitly {@link sync.IntervalMsg.verify|verify} messages.
         * @function encode
         * @memberof sync.IntervalMsg
         * @static
         * @param {sync.IIntervalMsg} message IntervalMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IntervalMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.begin != null && message.hasOwnProperty("begin"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.begin);
            if (message.end != null && message.hasOwnProperty("end"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.end);
            return writer;
        };

        /**
         * Decodes an IntervalMsg message from the specified reader or buffer.
         * @function decode
         * @memberof sync.IntervalMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sync.IntervalMsg} IntervalMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IntervalMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sync.IntervalMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.begin = reader.int32();
                    break;
                case 3:
                    message.end = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return IntervalMsg;
    })();

    return sync;
})();

module.exports = $root;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.Keys = exports.BotResponse = exports.BotProtocol = exports.Message = undefined;

var _minimal = __webpack_require__(6);

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
     * @property {string} [service] Message service
     * @property {Uint8Array} [content] Message content
     */

    /**
     * Constructs a new Message.
     * @exports Message
     * @classdesc Represents a Message.
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
     * @member {string}service
     * @memberof Message
     * @instance
     */
    Message.prototype.service = "";

    /**
     * Message content.
     * @member {Uint8Array}content
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
     * @property {string} [key] BotProtocol key
     */

    /**
     * Constructs a new BotProtocol.
     * @exports BotProtocol
     * @classdesc Represents a BotProtocol.
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
     * @member {string}key
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
     * @property {string} [url] BotResponse url
     */

    /**
     * Constructs a new BotResponse.
     * @exports BotResponse
     * @classdesc Represents a BotResponse.
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
     * @member {string}url
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
     * @property {Array.<string>} [keys] Keys keys
     */

    /**
     * Constructs a new Keys.
     * @exports Keys
     * @classdesc Represents a Keys.
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
     * @member {Array.<string>}keys
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


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mute_core_1 = __webpack_require__(15);
const log_1 = __webpack_require__(13);
const mongoose = __webpack_require__(57);
mongoose.Promise = global.Promise;
class MongooseAdapter {
    constructor() {
        this.docSchema = new mongoose.Schema({
            key: { type: String, require: true },
            doc: { type: Object },
        });
        this.docModel = mongoose.model('Doc', this.docSchema);
    }
    connect(url) {
        const uri = `mongodb://${url}/docs`;
        return mongoose.connect(uri, {
            useMongoClient: true,
        })
            .then(() => {
            this.db = mongoose.connection;
            mongoose.connection.on('close', () => {
                log_1.log.warn(`Connection to the database ${uri} has been closed`);
            });
        });
    }
    find(key) {
        return this.docModel.findOne({ key })
            .then((response) => {
            if (response !== null) {
                return response.doc.map((op) => {
                    return mute_core_1.RichLogootSOperation.fromPlain(op);
                });
            }
            return response;
        });
    }
    list() {
        return this.docModel.find().exec();
    }
    whichExist(keys) {
        return this.docModel.find({ key: { $in: keys } }).exec()
            .then((docs) => {
            if (docs !== null) {
                return docs.map((doc) => doc.key);
            }
        });
    }
    save(key, doc) {
        const query = { key };
        const update = { doc };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        return this.docModel.findOneAndUpdate(query, update, options).exec();
    }
}
exports.MongooseAdapter = MongooseAdapter;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ })
/******/ ]);