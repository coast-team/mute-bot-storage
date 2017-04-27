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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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

var identifier_1 = __webpack_require__(3);
var IdentifierInterval = (function () {
    // Creation
    function IdentifierInterval(base, begin, end) {
        console.assert(base instanceof Array, "base = ", base);
        console.assert(typeof begin === "number" && Number.isInteger(begin), "begin = ", begin);
        console.assert(typeof end === "number" && Number.isInteger(end), "end = ", end);
        console.assert(begin <= end, "" + begin + " <= ", end);
        this.base = base;
        this.begin = begin;
        this.end = end;
    }
    IdentifierInterval.fromPlain = function (o) {
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
        else {
            return null;
        }
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
    IdentifierInterval.prototype.toString = function () {
        return 'Id[' + this.base.join(",") + ', ' +
            this.begin + ' .. ' + this.end + ']';
    };
    return IdentifierInterval;
}());
exports.IdentifierInterval = IdentifierInterval;
//# sourceMappingURL=identifierinterval.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AbstractMessage = (function () {
    function AbstractMessage(service, content) {
        this.service = service;
        this.content = content;
    }
    return AbstractMessage;
}());
exports.AbstractMessage = AbstractMessage;
//# sourceMappingURL=AbstractMessage.js.map

/***/ }),
/* 3 */
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

var Identifier = (function () {
    // Creation
    function Identifier(base, u) {
        console.assert(base instanceof Array, "base = ", base);
        console.assert(base.every(function (a) {
            return typeof a === "number" && Number.isInteger(a);
        }), "Every items are integers. base = ", base);
        console.assert(typeof u === "number" && Number.isInteger(u), "u = ", u);
        this.base = base;
        this.last = u;
    }
    Identifier.fromPlain = function (o) {
        var base = o.base;
        var last = o.last;
        if (base instanceof Array && base.every(function (n) {
            return typeof n === "number" && Number.isInteger(n);
        }) &&
            typeof last === "number" && Number.isInteger(last)) {
            return new Identifier(base, last);
        }
        else {
            return null;
        }
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
                return 1;
            }
            else if (otherExtended.length > minLength) {
                return -1;
            }
            else {
                return 0;
            }
        }
        else {
            if (extended[i] < otherExtended[i]) {
                return -1;
            }
            else {
                return 1;
            }
        }
    };
    Identifier.prototype.toString = function () {
        return "Id[" + this.base.concat(this.last).join(", ") + ']';
    };
    Identifier.prototype.hasPlaceAfter = function (next, length) {
        console.assert(next instanceof Identifier, "next = ", next);
        console.assert(typeof length === "number", "length = ", length);
        var base = this.base;
        if (base.length > next.base.length) {
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
        if (base.length > prev.base.length) {
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
    Identifier.prototype.maxOffsetBeforeNex = function (next, max) {
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
            return Math.max(nextExtended[i], max);
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

var identifier_1 = __webpack_require__(3);
var identifierinterval_1 = __webpack_require__(0);
var IDFactory = __webpack_require__(45);
var iteratorhelperidentifier_1 = __webpack_require__(47);
var logootsadd_1 = __webpack_require__(19);
var logootsblock_1 = __webpack_require__(11);
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
var LogootSRopes = (function () {
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
                var key = b.id.base.join(",");
                baseToBlock[key] = b;
            }
        }
        this.mapBaseToBlock = baseToBlock;
    }
    LogootSRopes.empty = function () {
        return new LogootSRopes(0, 0);
    };
    LogootSRopes.fromPlain = function (replica, clock, o) {
        var plainRoot = o.root;
        var str = o.str;
        if (typeof str === "string") {
            var root = (plainRoot !== undefined && plainRoot !== null) ?
                ropesnodes_1.RopesNodes.fromPlain(plainRoot) :
                null;
            var result = new LogootSRopes(replica, clock, root, str);
            if (str.length !== 0 && root === null) {
                // FIXME: Need more checking (str's length compared to tree length?)
                return null;
            }
            else {
                return result;
            }
        }
        else {
            return null;
        }
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
    LogootSRopes.prototype.addBlockFrom = function (str, idi, from, startOffset) {
        var _this = this;
        var path = [];
        var result = [];
        var con = true;
        var i = startOffset;
        while (con) {
            path.push(from);
            var ihi = new iteratorhelperidentifier_1.IteratorHelperIdentifier(idi, from.getIdentifierInterval());
            var split = void 0;
            switch (ihi.compareBase()) {
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
                    split = Math.min(from.maxOffset(), ihi.nextOffset);
                    var rp = ropesnodes_1.RopesNodes.leaf(this.getBlock(idi), idi.begin, str.length);
                    path.push(from.split(split - from.offset + 1, rp));
                    i = i + from.leftSubtreeSize();
                    result.push(new textinsert_1.TextInsert(i + split - from.offset + 1, str));
                    con = false;
                    break;
                }
                case 3 /* B2_INSIDE_B1 */: {
                    // split b1 the node to insert
                    var split2 = ihi.nextOffset; /* ) */
                    var ls = str.substr(0, split2 + 1 - idi.begin);
                    var idi1 = new identifierinterval_1.IdentifierInterval(idi.base, idi.begin, split2);
                    if (from.left === null) {
                        from.left = ropesnodes_1.RopesNodes.leaf(this.getBlock(idi1), idi1.begin, ls.length);
                        result.push(new textinsert_1.TextInsert(i, ls));
                    }
                    else {
                        Array.prototype.push.apply(result, this.addBlockFrom(ls, idi1, from.left, i));
                    }
                    // i=i+ls.size()
                    ls = str.substr(split2 + 1 - idi.begin, str.length);
                    idi1 = new identifierinterval_1.IdentifierInterval(idi.base, split2 + 1, idi.end);
                    i = i + from.leftSubtreeSize() + from.length;
                    if (from.right === null) {
                        from.right = ropesnodes_1.RopesNodes.leaf(this.getBlock(idi1), idi1.begin, ls.length);
                        result.push(new textinsert_1.TextInsert(i, ls));
                    }
                    else {
                        Array.prototype.push.apply(result, this.addBlockFrom(ls, idi1, from.right, i));
                    }
                    con = false;
                    break;
                }
                case 4 /* B1_CONCAT_B2 */: {
                    // node to insert concat the node
                    if (from.left !== null) {
                        split = from.getIdBegin().minOffsetAfterPrev(from.left.getIdEnd(), idi.begin);
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
                        split = from.getIdEnd().maxOffsetBeforeNex(from.right.getIdBegin(), idi.end);
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
        result.forEach(function (textInsert) {
            _this.applyTextInsert(textInsert);
        });
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
            this.mapBaseToBlock[bl.id.base.join(",")] = bl;
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
            var length_1 = this.str.length;
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
            else if (pos >= length_1) {
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
                    var id1 = inPos.node.block.id.getBaseId(inPos.node.offset + inPos.i - 1);
                    var id2 = inPos.node.block.id.getBaseId(inPos.node.offset + inPos.i);
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
                return i + node.leftSubtreeSize();
            }
        }
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
                if (id.begin < id.end) {
                    id = new identifierinterval_1.IdentifierInterval(id.base, id.begin + 1, id.end);
                }
                else {
                    break;
                }
            }
            else {
                var node = path[path.length - 1]; // TODO: why?
                var end = Math.min(id.end, node.maxOffset());
                var pos = i + id.begin - node.offset;
                var length_2 = end - id.begin + 1;
                l.push(new textdelete_1.TextDelete(pos, length_2));
                var t = node.deleteOffsets(id.begin, end);
                if (node.length === 0) {
                    this.delNode(path);
                }
                else if (t !== null) {
                    path.push(t);
                    this.balance(path);
                }
                else {
                    this.ascendentUpdate(path, id.begin - end - 1);
                }
                if (end === id.end) {
                    break;
                }
                else {
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
                var be = start.node.offset + start.i;
                var en = Math.min(be + length - 1, start.node.maxOffset());
                li.push(new identifierinterval_1.IdentifierInterval(start.node.block.id.base, be, en));
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
            delete this.mapBaseToBlock[node.block.id.base.join(",")];
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
    LogootSRopes.prototype.digest = function () {
        var result;
        var root = this.root;
        if (root !== null) {
            var linearRpr = (root.toString() + "\n")
                .replace(/\t+|(?:#\n)/g, "") + "\n";
            result = 11;
            for (var i = 0; i < linearRpr.length; i++) {
                result = (31 * result) + linearRpr.charCodeAt(i);
                result = result | 0; // Convert to 32bits integer
            }
        }
        else {
            result = 0;
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
const bunyan = __webpack_require__(50);
function createLogger(logIntoFile, logLevel) {
    const options = {
        name: 'mute-bot-storage'
    };
    if (logIntoFile) {
        options.streams = [{
                type: 'rotating-file',
                period: '1d',
                count: 3,
                path: `./${options.name}.log`
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BroadcastMessage_1 = __webpack_require__(36);
exports.BroadcastMessage = BroadcastMessage_1.BroadcastMessage;
var JoinEvent_1 = __webpack_require__(37);
exports.JoinEvent = JoinEvent_1.JoinEvent;
var NetworkMessage_1 = __webpack_require__(38);
exports.NetworkMessage = NetworkMessage_1.NetworkMessage;
var SendRandomlyMessage_1 = __webpack_require__(39);
exports.SendRandomlyMessage = SendRandomlyMessage_1.SendRandomlyMessage;
var SendToMessage_1 = __webpack_require__(40);
exports.SendToMessage = SendToMessage_1.SendToMessage;
var AbstractMessage_1 = __webpack_require__(2);
exports.AbstractMessage = AbstractMessage_1.AbstractMessage;
//# sourceMappingURL=index.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Interval = (function () {
    function Interval(id, begin, end) {
        this.id = id;
        this.begin = begin;
        this.end = end;
    }
    return Interval;
}());
exports.Interval = Interval;
//# sourceMappingURL=Interval.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ReplySyncEvent = (function () {
    function ReplySyncEvent(richLogootSOps, intervals) {
        this.richLogootSOps = richLogootSOps;
        this.intervals = intervals;
    }
    return ReplySyncEvent;
}());
exports.ReplySyncEvent = ReplySyncEvent;
//# sourceMappingURL=ReplySyncEvent.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mute_structs_1 = __webpack_require__(10);
var RichLogootSOperation = (function () {
    function RichLogootSOperation(id, clock, logootSOp) {
        this.id = id;
        this.clock = clock;
        this.logootSOp = logootSOp;
    }
    RichLogootSOperation.fromPlain = function (o) {
        var logootSAdd = mute_structs_1.LogootSAdd.fromPlain(o.logootSOp);
        if (logootSAdd instanceof mute_structs_1.LogootSAdd) {
            return new RichLogootSOperation(o.id, o.clock, logootSAdd);
        }
        var logootSDel = mute_structs_1.LogootSDel.fromPlain(o.logootSOp);
        if (logootSDel instanceof mute_structs_1.LogootSDel) {
            return new RichLogootSOperation(o.id, o.clock, logootSDel);
        }
        return null;
    };
    return RichLogootSOperation;
}());
exports.RichLogootSOperation = RichLogootSOperation;
//# sourceMappingURL=RichLogootSOperation.js.map

/***/ }),
/* 10 */
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

var identifier_1 = __webpack_require__(3);
exports.Identifier = identifier_1.Identifier;
var identifierinterval_1 = __webpack_require__(0);
exports.IdentifierInterval = identifierinterval_1.IdentifierInterval;
var logootsblock_1 = __webpack_require__(11);
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
/* 11 */
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

var identifierinterval_1 = __webpack_require__(0);
var LogootSBlock = (function () {
    // Creation
    function LogootSBlock(id, nbElt, mine) {
        if (mine === void 0) { mine = false; }
        console.assert(id instanceof identifierinterval_1.IdentifierInterval, "id = ", id);
        console.assert(typeof nbElt === "number" && Number.isInteger(nbElt), "nbElt = ", "" + nbElt);
        console.assert(nbElt >= 0, "" + nbElt, ">= 0");
        console.assert(typeof mine === "boolean", "mine = " + mine);
        this.id = id;
        this.nbElement = nbElt;
        this.mine = mine;
    }
    LogootSBlock.mine = function (idi, nbElt) {
        return new LogootSBlock(idi, nbElt, true);
    };
    LogootSBlock.foreign = function (idi, nbElt) {
        return new LogootSBlock(idi, nbElt, false);
    };
    LogootSBlock.fromPlain = function (o) {
        var plainId = o.id;
        var nbElt = o.nbElement;
        if (plainId instanceof Object && typeof nbElt === "number" &&
            Number.isInteger(nbElt) && nbElt >= 0) {
            var id = identifierinterval_1.IdentifierInterval.fromPlain(plainId);
            if (id !== null) {
                return LogootSBlock.foreign(id, nbElt);
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    LogootSBlock.prototype.addBlock = function (pos, length) {
        console.assert(typeof pos === "number", "pos = " + pos);
        console.assert(typeof length === "number", "length = " + length);
        console.assert(length > 0, "" + length, "> 0");
        this.nbElement += length;
        this.id = this.id.union(pos, pos + length - 1);
    };
    LogootSBlock.prototype.delBlock = function (begin, end, nbElement) {
        console.assert(typeof begin === "number", "begin = " + begin);
        console.assert(typeof end === "number", "end = ", end);
        console.assert(typeof nbElement === "number", "nbElement = " + nbElement);
        console.assert(nbElement > 0, "" + nbElement, " > 0");
        this.nbElement -= nbElement;
    };
    LogootSBlock.prototype.toString = function () {
        return '{' + this.nbElement + ',' + this.id.toString() + ', ' + (this.mine ? 'mine' : 'its') + '}';
    };
    return LogootSBlock;
}());
exports.LogootSBlock = LogootSBlock;
//# sourceMappingURL=logootsblock.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("google-protobuf");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Collaborator = (function () {
    function Collaborator(id, pseudo) {
        this.id = id;
        this.pseudo = pseudo;
    }
    return Collaborator;
}());
exports.Collaborator = Collaborator;
//# sourceMappingURL=Collaborator.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Collaborator_1 = __webpack_require__(13);
exports.Collaborator = Collaborator_1.Collaborator;
var CollaboratorsService_1 = __webpack_require__(34);
exports.CollaboratorsService = CollaboratorsService_1.CollaboratorsService;
//# sourceMappingURL=index.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DocService_1 = __webpack_require__(35);
exports.DocService = DocService_1.DocService;
//# sourceMappingURL=index.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(14);
exports.Collaborator = _1.Collaborator;
exports.CollaboratorsService = _1.CollaboratorsService;
var _2 = __webpack_require__(15);
exports.DocService = _2.DocService;
var _3 = __webpack_require__(6);
exports.BroadcastMessage = _3.BroadcastMessage;
exports.JoinEvent = _3.JoinEvent;
exports.NetworkMessage = _3.NetworkMessage;
exports.SendRandomlyMessage = _3.SendRandomlyMessage;
exports.SendToMessage = _3.SendToMessage;
exports.AbstractMessage = _3.AbstractMessage;
var MuteCore_1 = __webpack_require__(33);
exports.MuteCore = MuteCore_1.MuteCore;
var _4 = __webpack_require__(18);
exports.RichLogootSOperation = _4.RichLogootSOperation;
exports.State = _4.State;
//# sourceMappingURL=index.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var State = (function () {
    function State(vector, richLogootSOps) {
        this.vector = vector;
        this.richLogootSOps = richLogootSOps;
    }
    return State;
}());
exports.State = State;
//# sourceMappingURL=State.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Interval_1 = __webpack_require__(7);
exports.Interval = Interval_1.Interval;
var ReplySyncEvent_1 = __webpack_require__(8);
exports.ReplySyncEvent = ReplySyncEvent_1.ReplySyncEvent;
var RichLogootSOperation_1 = __webpack_require__(9);
exports.RichLogootSOperation = RichLogootSOperation_1.RichLogootSOperation;
var State_1 = __webpack_require__(17);
exports.State = State_1.State;
var SyncService_1 = __webpack_require__(42);
exports.SyncService = SyncService_1.SyncService;
var SyncMessageService_1 = __webpack_require__(41);
exports.SyncMessageService = SyncMessageService_1.SyncMessageService;
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

var identifier_1 = __webpack_require__(3);
var logootsropes_1 = __webpack_require__(4);
/**
 * Represents a LogootSplit insert operation.
 */
var LogootSAdd = (function () {
    /**
    * @constructor
    * @param {Identifier} id - the identifier that localise the insertion in the logoot sequence.
    * @param {string} l - the content of the block to be inserted.
    */
    function LogootSAdd(id, l) {
        // is is structurally an Identifier
        console.assert(typeof id === "object" &&
            id.base instanceof Array &&
            typeof id.last === "number" && Number.isInteger(id.last), "id = ", id);
        console.assert(typeof l === "string", "l = ", l);
        this.id = identifier_1.Identifier.fromPlain(id); // precondition
        this.l = l;
    }
    LogootSAdd.fromPlain = function (o) {
        var plainId = o.id;
        var l = o.l;
        if (plainId instanceof Object && typeof l === "string") {
            var id = identifier_1.Identifier.fromPlain(plainId);
            if (id !== null) {
                return new LogootSAdd(id, l);
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    /**
    * Apply the current insert operation to a LogootSplit document.
    * @param {LogootSRopes} doc - the LogootSplit document on which the operation wil be applied.
    * @return {TextInsert[]} the insertion to be applied on the sequence representing the document content.
    */
    LogootSAdd.prototype.execute = function (doc) {
        console.assert(doc instanceof logootsropes_1.LogootSRopes, "doc = ", doc);
        return doc.addBlock(this.l, this.id);
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

var identifierinterval_1 = __webpack_require__(0);
var logootsropes_1 = __webpack_require__(4);
var arrayConcat = Array.prototype.concat;
/**
 * Represents a LogootSplit delete operation.
 */
var LogootSDel = (function () {
    /**
    * @constructor
    * @param {IdentifierInterval[]} lid - the list of identifier that localise the deletion in the logoot sequence.
    */
    function LogootSDel(lid) {
        console.assert(lid instanceof Array &&
            lid.every(function (item) {
                return typeof item === "object" && item.hasOwnProperty("base") &&
                    item.hasOwnProperty("begin") && item.hasOwnProperty("end");
            }), "lid = ", lid);
        this.lid = lid.map(identifierinterval_1.IdentifierInterval.fromPlain);
        // ASSERT: precondition
    }
    LogootSDel.fromPlain = function (o) {
        var plainLid = o.lid;
        if (plainLid instanceof Array) {
            var lid = plainLid.map(function (a) {
                if (a instanceof Object) {
                    return identifierinterval_1.IdentifierInterval.fromPlain(a);
                }
                else {
                    return null;
                }
            });
            if (lid.every(function (a) { return a !== null; })) {
                return new LogootSDel(lid);
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
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

var identifierinterval_1 = __webpack_require__(0);
var logootsblock_1 = __webpack_require__(11);
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
var RopesNodes = (function () {
    // Creation
    function RopesNodes(block, offset, length, left, right) {
        this.block = block;
        this.offset = offset;
        this.length = length;
        this.left = left;
        this.right = right;
        this.height = Math.max(heightOf(left), heightOf(right)) + 1;
        this.sizeNodeAndChildren = length +
            subtreeSizeOf(left) + subtreeSizeOf(right);
    }
    RopesNodes.fromPlain = function (o) {
        var plainBlock = o.block;
        var offset = o.offset;
        var length = o.length;
        var plainLeft = o.left;
        var plainRight = o.right;
        if (plainBlock instanceof Object &&
            typeof offset === "number" && Number.isInteger(offset) &&
            typeof length === "number" && Number.isInteger(length) &&
            length >= 0) {
            var block = logootsblock_1.LogootSBlock.fromPlain(plainBlock);
            var right = plainRight instanceof Object ?
                RopesNodes.fromPlain(plainRight) :
                null;
            var left = plainLeft instanceof Object ?
                RopesNodes.fromPlain(plainLeft) :
                null;
            if (block !== null &&
                block.id.begin <= offset &&
                (block.id.end - block.id.begin) >= length - 1) {
                return new RopesNodes(block, offset, length, left, right);
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    RopesNodes.leaf = function (aBlock, aOffset, aLength) {
        console.assert(aBlock instanceof logootsblock_1.LogootSBlock, "aBlock = ", aBlock);
        console.assert(typeof aOffset === "number", "aOffset = " + aOffset);
        console.assert(typeof aLength === "number", "aLength = " + aLength);
        console.assert(aLength > 0, "" + aLength, " > 0");
        aBlock.addBlock(aOffset, aLength); // Mutation
        return new RopesNodes(aBlock, aOffset, aLength, null, null);
    };
    RopesNodes.prototype.getIdBegin = function () {
        return this.block.id.getBaseId(this.offset);
    };
    RopesNodes.prototype.getIdEnd = function () {
        return this.block.id.getBaseId(this.maxOffset());
    };
    RopesNodes.prototype.addString = function (length) {
        console.assert(typeof length === "number", "length = " + length);
        // `length' may be negative
        this.sizeNodeAndChildren += length;
    };
    RopesNodes.prototype.appendEnd = function (length) {
        console.assert(typeof length === "number", "length = ", length);
        console.assert(length > 0, "" + length, " > 0");
        var b = this.maxOffset() + 1;
        this.length += length;
        this.block.addBlock(b, length);
        return this.block.id.getBaseId(b);
    };
    RopesNodes.prototype.appendBegin = function (length) {
        console.assert(typeof length === "number", "length = ", length);
        console.assert(length > 0, "" + length, " > 0");
        this.offset -= length;
        this.length += length;
        this.block.addBlock(this.offset, length);
        return this.getIdBegin();
    };
    RopesNodes.prototype.deleteOffsets = function (begin, end) {
        console.assert(typeof begin === "number" && Number.isInteger(begin), "begin = " + begin);
        console.assert(typeof end === "number" && Number.isInteger(end), "end = " + end);
        console.assert(begin <= end, "" + begin, " <= " + end);
        var sizeToDelete = end - begin + 1;
        this.block.delBlock(begin, end, sizeToDelete);
        var ret = null;
        if (sizeToDelete === this.length) {
            this.length = 0;
        }
        else if (end === this.maxOffset()) {
            this.length = begin - this.offset;
        }
        else if (begin === this.offset) {
            this.length = this.maxOffset() - end;
            this.offset = end + 1;
        }
        else {
            ret = this.split(end - this.offset + 1, null);
            this.length = begin - this.offset;
        }
        return ret;
    };
    RopesNodes.prototype.split = function (size, node) {
        console.assert(typeof size === "number", "size = ", size);
        console.assert(node instanceof RopesNodes || node === null, "node = ", node);
        var newRight = new RopesNodes(this.block, this.offset + size, this.length - size, node, this.right);
        this.length = size;
        this.right = newRight;
        this.height = Math.max(this.height, newRight.height);
        return newRight;
    };
    RopesNodes.prototype.maxOffset = function () {
        return this.offset + this.length - 1;
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
        this.offset = node.offset;
        this.block = node.block;
    };
    RopesNodes.prototype.isAppendableAfter = function () {
        return this.block.mine && this.block.id.end === this.maxOffset();
    };
    RopesNodes.prototype.isAppendableBefore = function () {
        return this.block.mine && this.block.id.begin === this.offset;
    };
    RopesNodes.prototype.toString = function () {
        var current = (new identifierinterval_1.IdentifierInterval(this.block.id.base, this.offset, this.maxOffset())).toString();
        var leftToString = (this.left !== null) ? this.left.toString() : "\t#";
        var rightToString = (this.right !== null) ? this.right.toString() : "\t#";
        return rightToString.replace(/(\t+)/g, "\t$1") + "\n" +
            "\t" + current + "\n" +
            leftToString.replace(/(\t+)/g, "\t$1");
    };
    RopesNodes.prototype.getIdentifierInterval = function () {
        return new identifierinterval_1.IdentifierInterval(this.block.id.base, this.offset, this.maxOffset());
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

var logootsropes_1 = __webpack_require__(4);
/**
 * Represents a sequence operation (deletion).
 */
var TextDelete = (function () {
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

var logootsropes_1 = __webpack_require__(4);
/**
 * Represents a sequence operation (insert).
 */
var TextInsert = (function () {
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
/***/ (function(module, exports) {

module.exports = require("uws");

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BotServer", function() { return BotServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEB_SOCKET", function() { return WEB_SOCKET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEB_RTC", function() { return WEB_RTC; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Default timeout for any pending request.
 * @type {number}
 */
var DEFAULT_REQUEST_TIMEOUT = 60000;

/**
 * Item storage which is separate for each service. The `Map` key is the service `id`.
 */
var itemsStorage = new Map();

/**
 * Pending request map. Pending request is when a service uses a Promise
 * which will be fulfilled or rejected somewhere else in code. For exemple when
 * a peer is waiting for a feedback from another peer before Promise has completed.
 * @type {Map}
 */
var requestsStorage = new Map();

/**
 * Abstract class which each service should inherit. Each service is independent
 * and can store data temporarly in order to accomplish its task(s).
 */

var Service = function () {
  /**
   * It should be invoked only by calling `super` from the children constructor.
   *
   * @param {number} id The service unique identifier
   */
  function Service(id) {
    classCallCheck(this, Service);

    /**
     * The service unique identifier.
     * @type {number}
     */
    this.id = id;
    if (!itemsStorage.has(this.id)) itemsStorage.set(this.id, new WeakMap());
    if (!requestsStorage.has(this.id)) requestsStorage.set(this.id, new WeakMap());
  }

  /**
   * Add a new pending request identified by `obj` and `id`.
   * @param {Object} obj
   * @param {number} id
   * @param {{resolve: Promise.resolve, reject:Promise.reject}} data
   * @param {number} [timeout=DEFAULT_REQUEST_TIMEOUT] Timeout in milliseconds
   */


  createClass(Service, [{
    key: 'setPendingRequest',
    value: function setPendingRequest(obj, id, data) {
      var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_REQUEST_TIMEOUT;

      this.setTo(requestsStorage, obj, id, data);
      setTimeout(function () {
        data.reject('Pending request timeout');
      }, timeout);
    }

    /**
     * Get pending request identified by `obj` and `id`.
     *
     * @param  {Object} obj
     * @param  {number} id
     * @returns {{resolve: Promise.resolve, reject:Promise.reject}}
     */

  }, {
    key: 'getPendingRequest',
    value: function getPendingRequest(obj, id) {
      return this.getFrom(requestsStorage, obj, id);
    }

    /**
     * Add item with `obj` and `ìd` as identifier.
     * @param {Object} obj
     * @param {number} id
     * @param {Object} data
     */

  }, {
    key: 'setItem',
    value: function setItem(obj, id, data) {
      this.setTo(itemsStorage, obj, id, data);
    }

    /**
     * Get item identified by `obj` and `id`.
     *
     * @param {Object} obj
     * @param {number} id
     *
     * @returns {Object}
     */

  }, {
    key: 'getItem',
    value: function getItem(obj, id) {
      return this.getFrom(itemsStorage, obj, id);
    }

    /**
     * Get all items belonging to `obj`.
     *
     * @param {Object} obj
     * @returns {Map}
     */

  }, {
    key: 'getItems',
    value: function getItems(obj) {
      var items = itemsStorage.get(this.id).get(obj);
      if (items) return items;else return new Map();
    }

    /**
     * Remove item identified by `obj` and `id`.
     *
     * @param {Object} obj
     * @param {number} id
     */

  }, {
    key: 'removeItem',
    value: function removeItem(obj, id) {
      var currentServiceTemp = itemsStorage.get(this.id);
      var idMap = currentServiceTemp.get(obj);
      if (idMap !== undefined) {
        idMap.delete(id);
        if (idMap.size === 0) currentServiceTemp.delete(obj);
      }
    }

    /**
     * @private
     * @param {Map} storage
     * @param {Object} obj
     * @param {number} id
     *
     * @returns {Object}
     */

  }, {
    key: 'getFrom',
    value: function getFrom(storage, obj, id) {
      var idMap = storage.get(this.id).get(obj);
      if (idMap !== undefined) {
        var item = idMap.get(id);
        if (item !== undefined) return item;
      }
      return null;
    }

    /**
     * @private
     * @param {Map} storage
     * @param {WebChannel} obj
     * @param {number} id
     * @param {Object} data
     *
     */

  }, {
    key: 'setTo',
    value: function setTo(storage, obj, id, data) {
      var currentServiceTemp = storage.get(this.id);
      var idMap = void 0;
      if (currentServiceTemp.has(obj)) {
        idMap = currentServiceTemp.get(obj);
      } else {
        idMap = new Map();
        currentServiceTemp.set(obj, idMap);
      }
      if (!idMap.has(id)) idMap.set(id, data);
    }
  }]);
  return Service;
}();

/**
 * It is responsible to preserve Web Channel
 * structure intact (i.e. all peers have the same vision of the Web Channel).
 * Among its duties are:
 *
 * - Add a new peer into Web Channel.
 * - Remove a peer from Web Channel.
 * - Send a broadcast message.
 * - Send a message to a particular peer.
 *
 * @see FullyConnectedService
 * @interface
 */

var TopologyInterface = function (_Service) {
  inherits(TopologyInterface, _Service);

  function TopologyInterface() {
    classCallCheck(this, TopologyInterface);
    return possibleConstructorReturn(this, (TopologyInterface.__proto__ || Object.getPrototypeOf(TopologyInterface)).apply(this, arguments));
  }

  createClass(TopologyInterface, [{
    key: 'connectTo',
    value: function connectTo(wc, peerIds) {
      var _this2 = this;

      var failed = [];
      if (peerIds.length === 0) return Promise.resolve(failed);else {
        return new Promise(function (resolve, reject) {
          var counter = 0;
          var cBuilder = ServiceFactory.get(CHANNEL_BUILDER);
          peerIds.forEach(function (id) {
            cBuilder.connectTo(wc, id).then(function (channel) {
              return _this2.onChannel(channel);
            }).then(function () {
              if (++counter === peerIds.length) resolve(failed);
            }).catch(function (reason) {
              failed.push({ id: id, reason: reason });
              if (++counter === peerIds.length) resolve(failed);
            });
          });
        });
      }
    }

    /**
     * Adds a new peer into Web Channel.
     *
     * @abstract
     * @param  {Channel} ch - Channel to be added (it should has
     * the `webChannel` property).
     * @return {Promise} - Resolved once the channel has been succesfully added,
     * rejected otherwise.
     */

  }, {
    key: 'add',
    value: function add(ch) {
      throw new Error('Must be implemented by subclass!');
    }

    /**
     * Send a message to all peers in Web Channel.
     *
     * @abstract
     * @param  {WebChannel} wc - Web Channel where the message will be propagated.
     * @param  {string} data - Data in stringified JSON format to be send.
     */

  }, {
    key: 'broadcast',
    value: function broadcast(wc, data) {
      throw new Error('Must be implemented by subclass!');
    }

    /**
     * Send a message to a particular peer in Web Channel.
     *
     * @abstract
     * @param  {string} id - Peer id.
     * @param  {WebChannel} wc - Web Channel where the message will be propagated.
     * @param  {string} data - Data in stringified JSON format to be send.
     */

  }, {
    key: 'sendTo',
    value: function sendTo(id, wc, data) {
      throw new Error('Must be implemented by subclass!');
    }

    /**
     * Leave Web Channel.
     *
     * @abstract
     * @param  {WebChannel} wc - Web Channel to leave.
     */

  }, {
    key: 'leave',
    value: function leave(wc) {
      throw new Error('Must be implemented by subclass!');
    }
  }]);
  return TopologyInterface;
}(Service);

/**
 * One of the internal message type. The message is intended for the `WebChannel`
 * members to notify them about the joining peer.
 * @type {number}
 */
var SHOULD_ADD_NEW_JOINING_PEER = 1;
/**
 * Connection service of the peer who received a message of this type should
 * establish connection with one or several peers.
 */
var SHOULD_CONNECT_TO = 2;
/**
 * One of the internal message type. The message sent by the joining peer to
 * notify all `WebChannel` members about his arrivel.
 * @type {number}
 */
var PEER_JOINED = 3;

var TICK = 4;
var TOCK = 5;

/**
 * Fully connected web channel manager. Implements fully connected topology
 * network, when each peer is connected to each other.
 *
 * @extends module:webChannelManager~WebChannelTopologyInterface
 */

var FullyConnectedService = function (_TopologyInterface) {
  inherits(FullyConnectedService, _TopologyInterface);

  function FullyConnectedService() {
    classCallCheck(this, FullyConnectedService);
    return possibleConstructorReturn(this, (FullyConnectedService.__proto__ || Object.getPrototypeOf(FullyConnectedService)).apply(this, arguments));
  }

  createClass(FullyConnectedService, [{
    key: 'add',

    /**
     * Add a peer to the `WebChannel`.
     *
     * @param {WebSocket|RTCDataChannel} channel
     *
     * @returns {Promise<number, string>}
     */
    value: function add(channel) {
      var _this2 = this;

      var wc = channel.webChannel;
      var peers = wc.members.slice();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'getItems', this).call(this, wc).keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var jpId = _step.value;
          peers[peers.length] = jpId;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.setJP(wc, channel.peerId, channel);
      wc.sendInner(this.id, { code: SHOULD_ADD_NEW_JOINING_PEER, jpId: channel.peerId });
      wc.sendInnerTo(channel, this.id, { code: SHOULD_CONNECT_TO, peers: peers });
      return new Promise(function (resolve, reject) {
        get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'setPendingRequest', _this2).call(_this2, wc, channel.peerId, { resolve: resolve, reject: reject });
      });
    }

    /**
     * Send message to all `WebChannel` members.
     *
     * @param {WebChannel} webChannel
     * @param {ArrayBuffer} data
     */

  }, {
    key: 'broadcast',
    value: function broadcast(webChannel, data) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = webChannel.channels[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var c = _step2.value;
          c.send(data);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'sendTo',
    value: function sendTo(id, webChannel, data) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = webChannel.channels[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var c = _step3.value;

          if (c.peerId === id) {
            c.send(data);
            return;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: 'sendInnerTo',
    value: function sendInnerTo(recepient, wc, data) {
      // If the peer sent a message to himself
      if (recepient === wc.myId) wc.onChannelMessage(null, data);else {
        var jp = get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'getItem', this).call(this, wc, wc.myId);
        if (jp === null) jp = get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'getItem', this).call(this, wc, recepient);

        if (jp !== null) {
          // If me or recepient is joining the WebChannel
          jp.channel.send(data);
        } else if (wc.members.includes(recepient)) {
          // If recepient is a WebChannel member
          this.sendTo(recepient, wc, data);
        } else this.sendTo(wc.members[0], wc, data);
      }
    }
  }, {
    key: 'sendInner',
    value: function sendInner(wc, data) {
      var jp = get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'getItem', this).call(this, wc, wc.myId);
      if (jp === null) this.broadcast(wc, data);else jp.channel.send(data);
    }
  }, {
    key: 'leave',
    value: function leave(wc) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = wc.channels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var c = _step4.value;

          c.clearHandlers();
          c.close();
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      wc.channels.clear();
    }
  }, {
    key: 'onChannel',
    value: function onChannel(channel) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'setPendingRequest', _this3).call(_this3, channel.webChannel, channel.peerId, { resolve: resolve, reject: reject });
        channel.webChannel.sendInnerTo(channel, _this3.id, { code: TICK });
      });
    }

    /**
     * Close event handler for each `Channel` in the `WebChannel`.
     *
     * @param {CloseEvent} closeEvt
     * @param {Channel} channel
     *
     * @returns {boolean}
     */

  }, {
    key: 'onChannelClose',
    value: function onChannelClose(closeEvt, channel) {
      // TODO: need to check if this is a peer leaving and thus he closed channels
      // with all WebChannel members or this is abnormal channel closing
      var wc = channel.webChannel;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = wc.channels[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var c = _step5.value;

          if (c.peerId === channel.peerId) return wc.channels.delete(c);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var jps = get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'getItems', this).call(this, wc);
      jps.forEach(function (jp) {
        return jp.channels.delete(channel);
      });
      return false;
    }

    /**
     * Error event handler for each `Channel` in the `WebChannel`.
     *
     * @param {Event} evt
     * @param {Channel} channel
     */

  }, {
    key: 'onChannelError',
    value: function onChannelError(evt, channel) {
      console.error('Channel error with id: ' + channel.peerId + ': ', evt);
    }
  }, {
    key: 'onMessage',
    value: function onMessage(channel, senderId, recepientId, msg) {
      var _this4 = this;

      var wc = channel.webChannel;
      switch (msg.code) {
        case SHOULD_CONNECT_TO:
          {
            var jpMe = this.setJP(wc, wc.myId, channel);
            jpMe.channels.add(channel);
            get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'connectTo', this).call(this, wc, msg.peers).then(function (failed) {
              var msg = { code: PEER_JOINED };
              jpMe.channels.forEach(function (ch) {
                wc.sendInnerTo(ch, _this4.id, msg);
                wc.channels.add(ch);
                wc.onPeerJoin$(ch.peerId);
              });
              get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'removeItem', _this4).call(_this4, wc, wc.myId);
              get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'getItems', _this4).call(_this4, wc).forEach(function (jp) {
                return wc.sendInnerTo(jp.channel, _this4.id, msg);
              });
              wc.onJoin();
            });
            break;
          }case PEER_JOINED:
          {
            var _jpMe = get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'getItem', this).call(this, wc, wc.myId);
            get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'removeItem', this).call(this, wc, senderId);
            if (_jpMe !== null) {
              _jpMe.channels.add(channel);
            } else {
              wc.channels.add(channel);
              wc.onPeerJoin$(senderId);
              var request = get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'getPendingRequest', this).call(this, wc, senderId);
              if (request !== null) request.resolve(senderId);
            }
            break;
          }case TICK:
          {
            this.setJP(wc, senderId, channel);
            var isJoining = get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'getItem', this).call(this, wc, wc.myId) !== null;
            wc.sendInnerTo(channel, this.id, { code: TOCK, isJoining: isJoining });
            break;
          }
        case TOCK:
          if (msg.isJoining) {
            this.setJP(wc, senderId, channel);
          } else {
            var jp = get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'getItem', this).call(this, wc, wc.myId);
            if (jp !== null) {
              jp.channels.add(channel);
            }
          }
          get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'getPendingRequest', this).call(this, wc, senderId).resolve();
          break;
        case SHOULD_ADD_NEW_JOINING_PEER:
          this.setJP(wc, msg.jpId, channel);
          break;
      }
    }

    /**
     * @private
     * @param {WebChannel} wc
     * @param {number} jpId
     * @param {WebSocket|RTCDataChannel} channel
     *
     * @returns {type} Description
     */

  }, {
    key: 'setJP',
    value: function setJP(wc, jpId, channel) {
      var jp = get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'getItem', this).call(this, wc, jpId);
      if (!jp) {
        jp = new JoiningPeer(channel);
        get(FullyConnectedService.prototype.__proto__ || Object.getPrototypeOf(FullyConnectedService.prototype), 'setItem', this).call(this, wc, jpId, jp);
      } else jp.channel = channel;
      return jp;
    }
  }]);
  return FullyConnectedService;
}(TopologyInterface);

/**
 * This class represents a temporary state of a peer, while he is about to join
 * the web channel. During the joining process every peer in the web channel
 * and the joining peer have an instance of this class with the same `id` and
 * `intermediaryId` attribute values. After the joining process has been finished
 * regardless of success, these instances will be deleted.
 */


var JoiningPeer = function JoiningPeer(channel, onJoin) {
  classCallCheck(this, JoiningPeer);

  /**
   * The channel between the joining peer and intermediary peer. It is null
   * for every peer, but the joining and intermediary peers.
   *
   * @type {Channel}
   */
  this.channel = channel;

  /**
   * This attribute is proper to each peer. Array of channels which will be
   * added to the current peer once it becomes the member of the web channel.
   * @type {Channel[]}
   */
  this.channels = new Set();
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}



function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

!function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof commonjsRequire && commonjsRequire;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n || e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }for (var i = "function" == typeof commonjsRequire && commonjsRequire, o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
}({ 1: [function (require, module, exports) {}, {}], 2: [function (require, module, exports) {
    "use strict";
    !function () {
      var utils = require("./utils"),
          logging = utils.log,
          browserDetails = utils.browserDetails;module.exports.browserDetails = browserDetails, module.exports.extractVersion = utils.extractVersion, module.exports.disableLog = utils.disableLog;var chromeShim = require("./chrome/chrome_shim") || null,
          edgeShim = require("./edge/edge_shim") || null,
          firefoxShim = require("./firefox/firefox_shim") || null,
          safariShim = require("./safari/safari_shim") || null;switch (browserDetails.browser) {case "chrome":
          if (!chromeShim || !chromeShim.shimPeerConnection) return void logging("Chrome shim is not included in this adapter release.");logging("adapter.js shimming chrome."), module.exports.browserShim = chromeShim, chromeShim.shimGetUserMedia(), chromeShim.shimMediaStream(), utils.shimCreateObjectURL(), chromeShim.shimSourceObject(), chromeShim.shimPeerConnection(), chromeShim.shimOnTrack(), chromeShim.shimGetSendersWithDtmf();break;case "firefox":
          if (!firefoxShim || !firefoxShim.shimPeerConnection) return void logging("Firefox shim is not included in this adapter release.");logging("adapter.js shimming firefox."), module.exports.browserShim = firefoxShim, firefoxShim.shimGetUserMedia(), utils.shimCreateObjectURL(), firefoxShim.shimSourceObject(), firefoxShim.shimPeerConnection(), firefoxShim.shimOnTrack();break;case "edge":
          if (!edgeShim || !edgeShim.shimPeerConnection) return void logging("MS edge shim is not included in this adapter release.");logging("adapter.js shimming edge."), module.exports.browserShim = edgeShim, edgeShim.shimGetUserMedia(), utils.shimCreateObjectURL(), edgeShim.shimPeerConnection(), edgeShim.shimReplaceTrack();break;case "safari":
          if (!safariShim) return void logging("Safari shim is not included in this adapter release.");logging("adapter.js shimming safari."), module.exports.browserShim = safariShim, safariShim.shimOnAddStream(), safariShim.shimGetUserMedia();break;default:
          logging("Unsupported browser!");}
    }();
  }, { "./chrome/chrome_shim": 3, "./edge/edge_shim": 1, "./firefox/firefox_shim": 5, "./safari/safari_shim": 7, "./utils": 8 }], 3: [function (require, module, exports) {
    "use strict";
    var logging = require("../utils.js").log,
        browserDetails = require("../utils.js").browserDetails,
        chromeShim = { shimMediaStream: function shimMediaStream() {
        window.MediaStream = window.MediaStream || window.webkitMediaStream;
      }, shimOnTrack: function shimOnTrack() {
        "object" != (typeof window === "undefined" ? "undefined" : _typeof(window)) || !window.RTCPeerConnection || "ontrack" in window.RTCPeerConnection.prototype || Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", { get: function get$$1() {
            return this._ontrack;
          }, set: function set$$1(f) {
            var self = this;this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = f), this.addEventListener("addstream", this._ontrackpoly = function (e) {
              e.stream.addEventListener("addtrack", function (te) {
                var event = new Event("track");event.track = te.track, event.receiver = { track: te.track }, event.streams = [e.stream], self.dispatchEvent(event);
              }), e.stream.getTracks().forEach(function (track) {
                var event = new Event("track");event.track = track, event.receiver = { track: track }, event.streams = [e.stream], this.dispatchEvent(event);
              }.bind(this));
            }.bind(this));
          } });
      }, shimGetSendersWithDtmf: function shimGetSendersWithDtmf() {
        if ("object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window.RTCPeerConnection && !("getSenders" in RTCPeerConnection.prototype) && "createDTMFSender" in RTCPeerConnection.prototype) {
          RTCPeerConnection.prototype.getSenders = function () {
            return this._senders;
          };var origAddStream = RTCPeerConnection.prototype.addStream,
              origRemoveStream = RTCPeerConnection.prototype.removeStream;RTCPeerConnection.prototype.addStream = function (stream) {
            var pc = this;pc._senders = pc._senders || [], origAddStream.apply(pc, [stream]), stream.getTracks().forEach(function (track) {
              pc._senders.push({ track: track, get dtmf() {
                  return void 0 === this._dtmf && ("audio" === track.kind ? this._dtmf = pc.createDTMFSender(track) : this._dtmf = null), this._dtmf;
                } });
            });
          }, RTCPeerConnection.prototype.removeStream = function (stream) {
            var pc = this;pc._senders = pc._senders || [], origRemoveStream.apply(pc, [stream]), stream.getTracks().forEach(function (track) {
              var sender = pc._senders.find(function (s) {
                return s.track === track;
              });sender && pc._senders.splice(pc._senders.indexOf(sender), 1);
            });
          };
        }
      }, shimSourceObject: function shimSourceObject() {
        "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (!window.HTMLMediaElement || "srcObject" in window.HTMLMediaElement.prototype || Object.defineProperty(window.HTMLMediaElement.prototype, "srcObject", { get: function get$$1() {
            return this._srcObject;
          }, set: function set$$1(stream) {
            var self = this;if (this._srcObject = stream, this.src && URL.revokeObjectURL(this.src), !stream) return void (this.src = "");this.src = URL.createObjectURL(stream), stream.addEventListener("addtrack", function () {
              self.src && URL.revokeObjectURL(self.src), self.src = URL.createObjectURL(stream);
            }), stream.addEventListener("removetrack", function () {
              self.src && URL.revokeObjectURL(self.src), self.src = URL.createObjectURL(stream);
            });
          } }));
      }, shimPeerConnection: function shimPeerConnection() {
        if (window.RTCPeerConnection) {
          var OrigPeerConnection = RTCPeerConnection;window.RTCPeerConnection = function (pcConfig, pcConstraints) {
            if (pcConfig && pcConfig.iceServers) {
              for (var newIceServers = [], i = 0; i < pcConfig.iceServers.length; i++) {
                var server = pcConfig.iceServers[i];!server.hasOwnProperty("urls") && server.hasOwnProperty("url") ? (console.warn("RTCIceServer.url is deprecated! Use urls instead."), server = JSON.parse(JSON.stringify(server)), server.urls = server.url, newIceServers.push(server)) : newIceServers.push(pcConfig.iceServers[i]);
              }pcConfig.iceServers = newIceServers;
            }return new OrigPeerConnection(pcConfig, pcConstraints);
          }, window.RTCPeerConnection.prototype = OrigPeerConnection.prototype, Object.defineProperty(window.RTCPeerConnection, "generateCertificate", { get: function get$$1() {
              return OrigPeerConnection.generateCertificate;
            } });
        } else window.RTCPeerConnection = function (pcConfig, pcConstraints) {
          return logging("PeerConnection"), pcConfig && pcConfig.iceTransportPolicy && (pcConfig.iceTransports = pcConfig.iceTransportPolicy), new webkitRTCPeerConnection(pcConfig, pcConstraints);
        }, window.RTCPeerConnection.prototype = webkitRTCPeerConnection.prototype, webkitRTCPeerConnection.generateCertificate && Object.defineProperty(window.RTCPeerConnection, "generateCertificate", { get: function get$$1() {
            return webkitRTCPeerConnection.generateCertificate;
          } });var origGetStats = RTCPeerConnection.prototype.getStats;RTCPeerConnection.prototype.getStats = function (selector, successCallback, errorCallback) {
          var self = this,
              args = arguments;if (arguments.length > 0 && "function" == typeof selector) return origGetStats.apply(this, arguments);if (0 === origGetStats.length && (0 === arguments.length || "function" != typeof arguments[0])) return origGetStats.apply(this, []);var fixChromeStats_ = function fixChromeStats_(response) {
            var standardReport = {};return response.result().forEach(function (report) {
              var standardStats = { id: report.id, timestamp: report.timestamp, type: { localcandidate: "local-candidate", remotecandidate: "remote-candidate" }[report.type] || report.type };report.names().forEach(function (name) {
                standardStats[name] = report.stat(name);
              }), standardReport[standardStats.id] = standardStats;
            }), standardReport;
          },
              makeMapStats = function makeMapStats(stats) {
            return new Map(Object.keys(stats).map(function (key) {
              return [key, stats[key]];
            }));
          };if (arguments.length >= 2) {
            var successCallbackWrapper_ = function successCallbackWrapper_(response) {
              args[1](makeMapStats(fixChromeStats_(response)));
            };return origGetStats.apply(this, [successCallbackWrapper_, arguments[0]]);
          }return new Promise(function (resolve, reject) {
            origGetStats.apply(self, [function (response) {
              resolve(makeMapStats(fixChromeStats_(response)));
            }, reject]);
          }).then(successCallback, errorCallback);
        }, browserDetails.version < 51 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (method) {
          var nativeMethod = RTCPeerConnection.prototype[method];RTCPeerConnection.prototype[method] = function () {
            var args = arguments,
                self = this,
                promise = new Promise(function (resolve, reject) {
              nativeMethod.apply(self, [args[0], resolve, reject]);
            });return args.length < 2 ? promise : promise.then(function () {
              args[1].apply(null, []);
            }, function (err) {
              args.length >= 3 && args[2].apply(null, [err]);
            });
          };
        }), browserDetails.version < 52 && ["createOffer", "createAnswer"].forEach(function (method) {
          var nativeMethod = RTCPeerConnection.prototype[method];RTCPeerConnection.prototype[method] = function () {
            var self = this;if (arguments.length < 1 || 1 === arguments.length && "object" == _typeof(arguments[0])) {
              var opts = 1 === arguments.length ? arguments[0] : void 0;return new Promise(function (resolve, reject) {
                nativeMethod.apply(self, [resolve, reject, opts]);
              });
            }return nativeMethod.apply(this, arguments);
          };
        }), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (method) {
          var nativeMethod = RTCPeerConnection.prototype[method];RTCPeerConnection.prototype[method] = function () {
            return arguments[0] = new ("addIceCandidate" === method ? RTCIceCandidate : RTCSessionDescription)(arguments[0]), nativeMethod.apply(this, arguments);
          };
        });var nativeAddIceCandidate = RTCPeerConnection.prototype.addIceCandidate;RTCPeerConnection.prototype.addIceCandidate = function () {
          return arguments[0] ? nativeAddIceCandidate.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
        };
      } };module.exports = { shimMediaStream: chromeShim.shimMediaStream, shimOnTrack: chromeShim.shimOnTrack, shimGetSendersWithDtmf: chromeShim.shimGetSendersWithDtmf, shimSourceObject: chromeShim.shimSourceObject, shimPeerConnection: chromeShim.shimPeerConnection, shimGetUserMedia: require("./getusermedia") };
  }, { "../utils.js": 8, "./getusermedia": 4 }], 4: [function (require, module, exports) {
    "use strict";
    var logging = require("../utils.js").log,
        browserDetails = require("../utils.js").browserDetails;module.exports = function () {
      var constraintsToChrome_ = function constraintsToChrome_(c) {
        if ("object" != (typeof c === "undefined" ? "undefined" : _typeof(c)) || c.mandatory || c.optional) return c;var cc = {};return Object.keys(c).forEach(function (key) {
          if ("require" !== key && "advanced" !== key && "mediaSource" !== key) {
            var r = "object" == _typeof(c[key]) ? c[key] : { ideal: c[key] };void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact);var oldname_ = function oldname_(prefix, name) {
              return prefix ? prefix + name.charAt(0).toUpperCase() + name.slice(1) : "deviceId" === name ? "sourceId" : name;
            };if (void 0 !== r.ideal) {
              cc.optional = cc.optional || [];var oc = {};"number" == typeof r.ideal ? (oc[oldname_("min", key)] = r.ideal, cc.optional.push(oc), oc = {}, oc[oldname_("max", key)] = r.ideal, cc.optional.push(oc)) : (oc[oldname_("", key)] = r.ideal, cc.optional.push(oc));
            }void 0 !== r.exact && "number" != typeof r.exact ? (cc.mandatory = cc.mandatory || {}, cc.mandatory[oldname_("", key)] = r.exact) : ["min", "max"].forEach(function (mix) {
              void 0 !== r[mix] && (cc.mandatory = cc.mandatory || {}, cc.mandatory[oldname_(mix, key)] = r[mix]);
            });
          }
        }), c.advanced && (cc.optional = (cc.optional || []).concat(c.advanced)), cc;
      },
          shimConstraints_ = function shimConstraints_(constraints, func) {
        if (constraints = JSON.parse(JSON.stringify(constraints)), constraints && constraints.audio && (constraints.audio = constraintsToChrome_(constraints.audio)), constraints && "object" == _typeof(constraints.video)) {
          var face = constraints.video.facingMode;face = face && ("object" == (typeof face === "undefined" ? "undefined" : _typeof(face)) ? face : { ideal: face });var getSupportedFacingModeLies = browserDetails.version < 61;if (face && ("user" === face.exact || "environment" === face.exact || "user" === face.ideal || "environment" === face.ideal) && (!navigator.mediaDevices.getSupportedConstraints || !navigator.mediaDevices.getSupportedConstraints().facingMode || getSupportedFacingModeLies)) {
            delete constraints.video.facingMode;var matches;if ("environment" === face.exact || "environment" === face.ideal ? matches = ["back", "rear"] : "user" !== face.exact && "user" !== face.ideal || (matches = ["front"]), matches) return navigator.mediaDevices.enumerateDevices().then(function (devices) {
              devices = devices.filter(function (d) {
                return "videoinput" === d.kind;
              });var dev = devices.find(function (d) {
                return matches.some(function (match) {
                  return -1 !== d.label.toLowerCase().indexOf(match);
                });
              });return !dev && devices.length && -1 !== matches.indexOf("back") && (dev = devices[devices.length - 1]), dev && (constraints.video.deviceId = face.exact ? { exact: dev.deviceId } : { ideal: dev.deviceId }), constraints.video = constraintsToChrome_(constraints.video), logging("chrome: " + JSON.stringify(constraints)), func(constraints);
            });
          }constraints.video = constraintsToChrome_(constraints.video);
        }return logging("chrome: " + JSON.stringify(constraints)), func(constraints);
      },
          shimError_ = function shimError_(e) {
        return { name: { PermissionDeniedError: "NotAllowedError", ConstraintNotSatisfiedError: "OverconstrainedError" }[e.name] || e.name, message: e.message, constraint: e.constraintName, toString: function toString() {
            return this.name + (this.message && ": ") + this.message;
          } };
      },
          getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
        shimConstraints_(constraints, function (c) {
          navigator.webkitGetUserMedia(c, onSuccess, function (e) {
            onError(shimError_(e));
          });
        });
      };navigator.getUserMedia = getUserMedia_;var getUserMediaPromise_ = function getUserMediaPromise_(constraints) {
        return new Promise(function (resolve, reject) {
          navigator.getUserMedia(constraints, resolve, reject);
        });
      };if (navigator.mediaDevices || (navigator.mediaDevices = { getUserMedia: getUserMediaPromise_, enumerateDevices: function enumerateDevices() {
          return new Promise(function (resolve) {
            var kinds = { audio: "audioinput", video: "videoinput" };return MediaStreamTrack.getSources(function (devices) {
              resolve(devices.map(function (device) {
                return { label: device.label, kind: kinds[device.kind], deviceId: device.id, groupId: "" };
              }));
            });
          });
        }, getSupportedConstraints: function getSupportedConstraints() {
          return { deviceId: !0, echoCancellation: !0, facingMode: !0, frameRate: !0, height: !0, width: !0 };
        } }), navigator.mediaDevices.getUserMedia) {
        var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia = function (cs) {
          return shimConstraints_(cs, function (c) {
            return origGetUserMedia(c).then(function (stream) {
              if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) throw stream.getTracks().forEach(function (track) {
                track.stop();
              }), new DOMException("", "NotFoundError");return stream;
            }, function (e) {
              return Promise.reject(shimError_(e));
            });
          });
        };
      } else navigator.mediaDevices.getUserMedia = function (constraints) {
        return getUserMediaPromise_(constraints);
      };void 0 === navigator.mediaDevices.addEventListener && (navigator.mediaDevices.addEventListener = function () {
        logging("Dummy mediaDevices.addEventListener called.");
      }), void 0 === navigator.mediaDevices.removeEventListener && (navigator.mediaDevices.removeEventListener = function () {
        logging("Dummy mediaDevices.removeEventListener called.");
      });
    };
  }, { "../utils.js": 8 }], 5: [function (require, module, exports) {
    "use strict";
    var browserDetails = require("../utils").browserDetails,
        firefoxShim = { shimOnTrack: function shimOnTrack() {
        "object" != (typeof window === "undefined" ? "undefined" : _typeof(window)) || !window.RTCPeerConnection || "ontrack" in window.RTCPeerConnection.prototype || Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", { get: function get$$1() {
            return this._ontrack;
          }, set: function set$$1(f) {
            this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = f), this.addEventListener("addstream", this._ontrackpoly = function (e) {
              e.stream.getTracks().forEach(function (track) {
                var event = new Event("track");event.track = track, event.receiver = { track: track }, event.streams = [e.stream], this.dispatchEvent(event);
              }.bind(this));
            }.bind(this));
          } });
      }, shimSourceObject: function shimSourceObject() {
        "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (!window.HTMLMediaElement || "srcObject" in window.HTMLMediaElement.prototype || Object.defineProperty(window.HTMLMediaElement.prototype, "srcObject", { get: function get$$1() {
            return this.mozSrcObject;
          }, set: function set$$1(stream) {
            this.mozSrcObject = stream;
          } }));
      }, shimPeerConnection: function shimPeerConnection() {
        if ("object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (window.RTCPeerConnection || window.mozRTCPeerConnection)) {
          window.RTCPeerConnection || (window.RTCPeerConnection = function (pcConfig, pcConstraints) {
            if (browserDetails.version < 38 && pcConfig && pcConfig.iceServers) {
              for (var newIceServers = [], i = 0; i < pcConfig.iceServers.length; i++) {
                var server = pcConfig.iceServers[i];if (server.hasOwnProperty("urls")) for (var j = 0; j < server.urls.length; j++) {
                  var newServer = { url: server.urls[j] };0 === server.urls[j].indexOf("turn") && (newServer.username = server.username, newServer.credential = server.credential), newIceServers.push(newServer);
                } else newIceServers.push(pcConfig.iceServers[i]);
              }pcConfig.iceServers = newIceServers;
            }return new mozRTCPeerConnection(pcConfig, pcConstraints);
          }, window.RTCPeerConnection.prototype = mozRTCPeerConnection.prototype, mozRTCPeerConnection.generateCertificate && Object.defineProperty(window.RTCPeerConnection, "generateCertificate", { get: function get$$1() {
              return mozRTCPeerConnection.generateCertificate;
            } }), window.RTCSessionDescription = mozRTCSessionDescription, window.RTCIceCandidate = mozRTCIceCandidate), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (method) {
            var nativeMethod = RTCPeerConnection.prototype[method];RTCPeerConnection.prototype[method] = function () {
              return arguments[0] = new ("addIceCandidate" === method ? RTCIceCandidate : RTCSessionDescription)(arguments[0]), nativeMethod.apply(this, arguments);
            };
          });var nativeAddIceCandidate = RTCPeerConnection.prototype.addIceCandidate;RTCPeerConnection.prototype.addIceCandidate = function () {
            return arguments[0] ? nativeAddIceCandidate.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
          };var makeMapStats = function makeMapStats(stats) {
            var map = new Map();return Object.keys(stats).forEach(function (key) {
              map.set(key, stats[key]), map[key] = stats[key];
            }), map;
          },
              modernStatsTypes = { inboundrtp: "inbound-rtp", outboundrtp: "outbound-rtp", candidatepair: "candidate-pair", localcandidate: "local-candidate", remotecandidate: "remote-candidate" },
              nativeGetStats = RTCPeerConnection.prototype.getStats;RTCPeerConnection.prototype.getStats = function (selector, onSucc, onErr) {
            return nativeGetStats.apply(this, [selector || null]).then(function (stats) {
              if (browserDetails.version < 48 && (stats = makeMapStats(stats)), browserDetails.version < 53 && !onSucc) try {
                stats.forEach(function (stat) {
                  stat.type = modernStatsTypes[stat.type] || stat.type;
                });
              } catch (e) {
                if ("TypeError" !== e.name) throw e;stats.forEach(function (stat, i) {
                  stats.set(i, Object.assign({}, stat, { type: modernStatsTypes[stat.type] || stat.type }));
                });
              }return stats;
            }).then(onSucc, onErr);
          };
        }
      } };module.exports = { shimOnTrack: firefoxShim.shimOnTrack, shimSourceObject: firefoxShim.shimSourceObject, shimPeerConnection: firefoxShim.shimPeerConnection, shimGetUserMedia: require("./getusermedia") };
  }, { "../utils": 8, "./getusermedia": 6 }], 6: [function (require, module, exports) {
    "use strict";
    var logging = require("../utils").log,
        browserDetails = require("../utils").browserDetails;module.exports = function () {
      var shimError_ = function shimError_(e) {
        return { name: { NotSupportedError: "TypeError", SecurityError: "NotAllowedError", PermissionDeniedError: "NotAllowedError" }[e.name] || e.name, message: { "The operation is insecure.": "The request is not allowed by the user agent or the platform in the current context." }[e.message] || e.message, constraint: e.constraint, toString: function toString() {
            return this.name + (this.message && ": ") + this.message;
          } };
      },
          getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
        var constraintsToFF37_ = function constraintsToFF37_(c) {
          if ("object" != (typeof c === "undefined" ? "undefined" : _typeof(c)) || c.require) return c;var require = [];return Object.keys(c).forEach(function (key) {
            if ("require" !== key && "advanced" !== key && "mediaSource" !== key) {
              var r = c[key] = "object" == _typeof(c[key]) ? c[key] : { ideal: c[key] };if (void 0 === r.min && void 0 === r.max && void 0 === r.exact || require.push(key), void 0 !== r.exact && ("number" == typeof r.exact ? r.min = r.max = r.exact : c[key] = r.exact, delete r.exact), void 0 !== r.ideal) {
                c.advanced = c.advanced || [];var oc = {};"number" == typeof r.ideal ? oc[key] = { min: r.ideal, max: r.ideal } : oc[key] = r.ideal, c.advanced.push(oc), delete r.ideal, Object.keys(r).length || delete c[key];
              }
            }
          }), require.length && (c.require = require), c;
        };return constraints = JSON.parse(JSON.stringify(constraints)), browserDetails.version < 38 && (logging("spec: " + JSON.stringify(constraints)), constraints.audio && (constraints.audio = constraintsToFF37_(constraints.audio)), constraints.video && (constraints.video = constraintsToFF37_(constraints.video)), logging("ff37: " + JSON.stringify(constraints))), navigator.mozGetUserMedia(constraints, onSuccess, function (e) {
          onError(shimError_(e));
        });
      },
          getUserMediaPromise_ = function getUserMediaPromise_(constraints) {
        return new Promise(function (resolve, reject) {
          getUserMedia_(constraints, resolve, reject);
        });
      };if (navigator.mediaDevices || (navigator.mediaDevices = { getUserMedia: getUserMediaPromise_, addEventListener: function addEventListener() {}, removeEventListener: function removeEventListener() {} }), navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function () {
        return new Promise(function (resolve) {
          resolve([{ kind: "audioinput", deviceId: "default", label: "", groupId: "" }, { kind: "videoinput", deviceId: "default", label: "", groupId: "" }]);
        });
      }, browserDetails.version < 41) {
        var orgEnumerateDevices = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);navigator.mediaDevices.enumerateDevices = function () {
          return orgEnumerateDevices().then(void 0, function (e) {
            if ("NotFoundError" === e.name) return [];throw e;
          });
        };
      }if (browserDetails.version < 49) {
        var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia = function (c) {
          return origGetUserMedia(c).then(function (stream) {
            if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) throw stream.getTracks().forEach(function (track) {
              track.stop();
            }), new DOMException("The object can not be found here.", "NotFoundError");return stream;
          }, function (e) {
            return Promise.reject(shimError_(e));
          });
        };
      }navigator.getUserMedia = function (constraints, onSuccess, onError) {
        if (browserDetails.version < 44) return getUserMedia_(constraints, onSuccess, onError);console.warn("navigator.getUserMedia has been replaced by navigator.mediaDevices.getUserMedia"), navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
      };
    };
  }, { "../utils": 8 }], 7: [function (require, module, exports) {
    "use strict";
    var safariShim = { shimOnAddStream: function shimOnAddStream() {
        "object" != (typeof window === "undefined" ? "undefined" : _typeof(window)) || !window.RTCPeerConnection || "onaddstream" in window.RTCPeerConnection.prototype || Object.defineProperty(window.RTCPeerConnection.prototype, "onaddstream", { get: function get$$1() {
            return this._onaddstream;
          }, set: function set$$1(f) {
            this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = f), this.addEventListener("track", this._onaddstreampoly = function (e) {
              var stream = e.streams[0];if (this._streams || (this._streams = []), !(this._streams.indexOf(stream) >= 0)) {
                this._streams.push(stream);var event = new Event("addstream");event.stream = e.streams[0], this.dispatchEvent(event);
              }
            }.bind(this));
          } });
      }, shimGetUserMedia: function shimGetUserMedia() {
        navigator.getUserMedia || (navigator.webkitGetUserMedia ? navigator.getUserMedia = navigator.webkitGetUserMedia.bind(navigator) : navigator.mediaDevices && navigator.mediaDevices.getUserMedia && (navigator.getUserMedia = function (constraints, cb, errcb) {
          navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
        }.bind(navigator)));
      } };module.exports = { shimOnAddStream: safariShim.shimOnAddStream, shimGetUserMedia: safariShim.shimGetUserMedia };
  }, {}], 8: [function (require, module, exports) {
    "use strict";
    var logDisabled_ = !0,
        utils = { disableLog: function disableLog(bool) {
        return "boolean" != typeof bool ? new Error("Argument type: " + (typeof bool === "undefined" ? "undefined" : _typeof(bool)) + ". Please use a boolean.") : (logDisabled_ = bool, bool ? "adapter.js logging disabled" : "adapter.js logging enabled");
      }, log: function log() {
        if ("object" == (typeof window === "undefined" ? "undefined" : _typeof(window))) {
          if (logDisabled_) return;"undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments);
        }
      }, extractVersion: function extractVersion(uastring, expr, pos) {
        var match = uastring.match(expr);return match && match.length >= pos && parseInt(match[pos], 10);
      }, detectBrowser: function detectBrowser() {
        var result = {};if (result.browser = null, result.version = null, "undefined" == typeof window || !window.navigator) return result.browser = "Not a browser.", result;if (navigator.mozGetUserMedia) result.browser = "firefox", result.version = this.extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);else if (navigator.webkitGetUserMedia) {
          if (window.webkitRTCPeerConnection) result.browser = "chrome", result.version = this.extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);else {
            if (!navigator.userAgent.match(/Version\/(\d+).(\d+)/)) return result.browser = "Unsupported webkit-based browser with GUM support but no WebRTC support.", result;result.browser = "safari", result.version = this.extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
          }
        } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) result.browser = "edge", result.version = this.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);else {
          if (!navigator.mediaDevices || !navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) return result.browser = "Not a supported browser.", result;result.browser = "safari", result.version = this.extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
        }return result;
      }, shimCreateObjectURL: function shimCreateObjectURL() {
        if ("object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window.HTMLMediaElement && "srcObject" in window.HTMLMediaElement.prototype) {
          var nativeCreateObjectURL = URL.createObjectURL.bind(URL),
              nativeRevokeObjectURL = URL.revokeObjectURL.bind(URL),
              streams = new Map(),
              newId = 0;URL.createObjectURL = function (stream) {
            if ("getTracks" in stream) {
              var url = "polyblob:" + ++newId;return streams.set(url, stream), console.log("URL.createObjectURL(stream) is deprecated! Use elem.srcObject = stream instead!"), url;
            }return nativeCreateObjectURL(stream);
          }, URL.revokeObjectURL = function (url) {
            nativeRevokeObjectURL(url), streams.delete(url);
          };var dsc = Object.getOwnPropertyDescriptor(window.HTMLMediaElement.prototype, "src");Object.defineProperty(window.HTMLMediaElement.prototype, "src", { get: function get$$1() {
              return dsc.get.apply(this);
            }, set: function set$$1(url) {
              return this.srcObject = streams.get(url) || null, dsc.set.apply(this, [url]);
            } });var nativeSetAttribute = HTMLMediaElement.prototype.setAttribute;HTMLMediaElement.prototype.setAttribute = function () {
            return 2 === arguments.length && "src" === ("" + arguments[0]).toLowerCase() && (this.srcObject = streams.get(arguments[1]) || null), nativeSetAttribute.apply(this, arguments);
          };
        }
      } };module.exports = { log: utils.log, disableLog: utils.disableLog, browserDetails: utils.detectBrowser(), extractVersion: utils.extractVersion, shimCreateObjectURL: utils.shimCreateObjectURL, detectBrowser: utils.detectBrowser.bind(utils) };
  }, {}] }, {}, [2]);

var NodeCloseEvent = function CloseEvent(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  classCallCheck(this, CloseEvent);

  this.name = name;
  this.wasClean = options.wasClean || false;
  this.code = options.code || 0;
  this.reason = options.reason || '';
};

/**
 * Utility class contains some helper static methods.
 */

var Util = function () {
  function Util() {
    classCallCheck(this, Util);
  }

  createClass(Util, null, [{
    key: 'isBrowser',

    /**
     * Check execution environment.
     *
     * @returns {boolean} Description
     */
    value: function isBrowser() {
      if (typeof window === 'undefined' || typeof process !== 'undefined' && process.title === 'node') {
        return false;
      }
      return true;
    }

    /**
     * Check whether the channel is a socket.
     *
     * @param {WebSocket|RTCDataChannel} channel
     *
     * @returns {boolean}
     */

  }, {
    key: 'isSocket',
    value: function isSocket(channel) {
      return channel.constructor.name === 'WebSocket';
    }

    /**
     * Check whether the string is a valid URL.
     *
     * @param {string} str
     *
     * @returns {type} Description
     */

  }, {
    key: 'isURL',
    value: function isURL(str) {
      var regex = '^' +
      // protocol identifier
      '(?:(?:wss|ws|http|https)://)' +
      // user:pass authentication
      '(?:\\S+(?::\\S*)?@)?' + '(?:';

      var tld = '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))?';

      regex +=
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broacast addresses
      // (first & last IP address of each class)
      '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' + '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' + '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' + '|' +
      // host name
      '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
      // domain name
      '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' + tld + ')' +
      // port number
      '(?::\\d{2,5})?' +
      // resource path
      '(?:[/?#]\\S*)?' + '$';

      if (!new RegExp(regex, 'i').exec(str)) return false;
      return true;
    }
  }, {
    key: 'require',
    value: function (_require) {
      function require(_x2) {
        return _require.apply(this, arguments);
      }

      require.toString = function () {
        return _require.toString();
      };

      return require;
    }(function (libConst) {
      try {
        switch (libConst) {
          case Util.WEB_RTC:
            return __webpack_require__(55);
          case Util.WEB_SOCKET:
            return __webpack_require__(25);
          case Util.TEXT_ENCODING:
            return __webpack_require__(54);
          case Util.EVENT_SOURCE:
            return __webpack_require__(51);
          case Util.FETCH:
            return __webpack_require__(53);
          case Util.CLOSE_EVENT:
            return Util.isBrowser() ? window.CloseEvent : NodeCloseEvent;
          default:
            console.error(libConst + ' is unknown library');
            return undefined;
        }
      } catch (err) {
        console.error(err.message);
        return undefined;
      }
    })
  }, {
    key: 'WEB_RTC',
    get: function get$$1() {
      return 1;
    }
  }, {
    key: 'WEB_SOCKET',
    get: function get$$1() {
      return 2;
    }
  }, {
    key: 'TEXT_ENCODING',
    get: function get$$1() {
      return 3;
    }
  }, {
    key: 'EVENT_SOURCE',
    get: function get$$1() {
      return 4;
    }
  }, {
    key: 'FETCH',
    get: function get$$1() {
      return 5;
    }
  }, {
    key: 'CLOSE_EVENT',
    get: function get$$1() {
      return 6;
    }
  }]);
  return Util;
}();

var wrtc = Util.require(Util.WEB_RTC);
var CloseEvent = Util.require(Util.CLOSE_EVENT);

var CONNECT_OVER_WEBCHANNEL_TIMEOUT = 10000;
var CONNECT_OVER_SIGNALING_TIMEOUT = 4000;
var REMOVE_ITEM_TIMEOUT = 5000;

/**
 * Service class responsible to establish connections between peers via
 * `RTCDataChannel`.
 *
 */

var WebRTCService = function (_Service) {
  inherits(WebRTCService, _Service);

  /**
   * @param  {number} id Service identifier
   * @param  {RTCIceServer} iceServers WebRTC configuration object
   */
  function WebRTCService(id, iceServers) {
    classCallCheck(this, WebRTCService);

    /**
     * @private
     * @type {RTCIceServer}
     */
    var _this = possibleConstructorReturn(this, (WebRTCService.__proto__ || Object.getPrototypeOf(WebRTCService)).call(this, id));

    _this.iceServers = iceServers;
    return _this;
  }

  /**
   * @param {Channel} channel
   * @param {number} senderId
   * @param {number} recepientId
   * @param {Object} msg
   */


  createClass(WebRTCService, [{
    key: 'onMessage',
    value: function onMessage(channel, senderId, recepientId, msg) {
      var _this2 = this;

      var wc = channel.webChannel;
      var item = get(WebRTCService.prototype.__proto__ || Object.getPrototypeOf(WebRTCService.prototype), 'getItem', this).call(this, wc, senderId);
      if (!item) {
        item = new CandidatesBuffer();
        get(WebRTCService.prototype.__proto__ || Object.getPrototypeOf(WebRTCService.prototype), 'setItem', this).call(this, wc, senderId, item);
      }
      if ('offer' in msg) {
        item.pc = this.createPeerConnection(function (candidate) {
          wc.sendInnerTo(senderId, _this2.id, { candidate: candidate });
        });
        this.listenOnDataChannel(item.pc, function (dataCh) {
          setTimeout(function () {
            return get(WebRTCService.prototype.__proto__ || Object.getPrototypeOf(WebRTCService.prototype), 'removeItem', _this2).call(_this2, wc, senderId);
          }, REMOVE_ITEM_TIMEOUT);
          ServiceFactory.get(CHANNEL_BUILDER).onChannel(wc, dataCh, senderId);
        });
        this.createAnswer(item.pc, msg.offer, item.candidates).then(function (answer) {
          return wc.sendInnerTo(senderId, _this2.id, { answer: answer });
        }).catch(function (err) {
          return console.error('During Establishing dataChannel connection over webChannel: ' + err.message);
        });
      }if ('answer' in msg) {
        item.pc.setRemoteDescription(msg.answer).then(function () {
          return item.pc.addReceivedCandidates(item.candidates);
        }).catch(function (err) {
          return console.error('Set answer (webChannel): ' + err.message);
        });
      } else if ('candidate' in msg) {
        this.addIceCandidate(item, msg.candidate);
      }
    }

    /**
     * Establishes an `RTCDataChannel` with a peer identified by `id` trough `WebChannel`.
     *
     * @param {WebChannel} wc
     * @param {number} id
     *
     * @returns {Promise<RTCDataChannel, string>}
     */

  }, {
    key: 'connectOverWebChannel',
    value: function connectOverWebChannel(wc, id) {
      var _this3 = this;

      var item = new CandidatesBuffer(this.createPeerConnection(function (candidate) {
        wc.sendInnerTo(id, _this3.id, { candidate: candidate });
      }));
      get(WebRTCService.prototype.__proto__ || Object.getPrototypeOf(WebRTCService.prototype), 'setItem', this).call(this, wc, id, item);
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          return reject(new Error('WebRTC ' + CONNECT_OVER_WEBCHANNEL_TIMEOUT + ' connection timeout'));
        }, CONNECT_OVER_WEBCHANNEL_TIMEOUT);
        _this3.createDataChannel(item.pc, function (dataCh) {
          setTimeout(function () {
            return get(WebRTCService.prototype.__proto__ || Object.getPrototypeOf(WebRTCService.prototype), 'removeItem', _this3).call(_this3, wc, id);
          }, REMOVE_ITEM_TIMEOUT);
          resolve(dataCh);
        });
        _this3.createOffer(item.pc).then(function (offer) {
          return wc.sendInnerTo(id, _this3.id, { offer: offer });
        }).catch(reject);
      });
    }

    /**
     *
     * @param {WebSocket} ws
     * @param {function(channel: RTCDataChannel)} onChannel
     *
     */

  }, {
    key: 'listenFromSignaling',
    value: function listenFromSignaling(signaling, onChannel) {
      var _this4 = this;

      signaling.filter(function (msg) {
        return 'id' in msg && 'data' in msg;
      }).subscribe(function (msg) {
        var item = get(WebRTCService.prototype.__proto__ || Object.getPrototypeOf(WebRTCService.prototype), 'getItem', _this4).call(_this4, signaling, msg.id);
        if (!item) {
          item = new CandidatesBuffer(_this4.createPeerConnection(function (candidate) {
            signaling.send(JSON.stringify({ id: msg.id, data: { candidate: candidate } }));
          }));
          get(WebRTCService.prototype.__proto__ || Object.getPrototypeOf(WebRTCService.prototype), 'setItem', _this4).call(_this4, signaling, msg.id, item);
        }
        if ('offer' in msg.data) {
          _this4.listenOnDataChannel(item.pc, function (dataCh) {
            setTimeout(function () {
              return get(WebRTCService.prototype.__proto__ || Object.getPrototypeOf(WebRTCService.prototype), 'removeItem', _this4).call(_this4, signaling, msg.id);
            }, REMOVE_ITEM_TIMEOUT);
            onChannel(dataCh);
          });
          _this4.createAnswer(item.pc, msg.data.offer, item.candidates).then(function (answer) {
            signaling.send(JSON.stringify({ id: msg.id, data: { answer: answer } }));
          }).catch(function (err) {
            console.error('During establishing data channel connection through signaling: ' + err.message);
          });
        } else if ('candidate' in msg.data) {
          _this4.addIceCandidate(item, msg.data.candidate);
        }
      }, function (err) {
        return console.log(err);
      }, function () {
        // clean
      });
    }

    /**
     *
     * @param {type} ws
     * @param {type} key Description
     *
     * @returns {type} Description
     */

  }, {
    key: 'connectOverSignaling',
    value: function connectOverSignaling(signaling, key) {
      var _this5 = this;

      var item = new CandidatesBuffer(this.createPeerConnection(function (candidate) {
        signaling.send(JSON.stringify({ data: { candidate: candidate } }));
      }));
      get(WebRTCService.prototype.__proto__ || Object.getPrototypeOf(WebRTCService.prototype), 'setItem', this).call(this, signaling, key, item);
      return new Promise(function (resolve, reject) {
        var subs = signaling.filter(function (msg) {
          return 'data' in msg;
        }).subscribe(function (msg) {
          if ('answer' in msg.data) {
            item.pc.setRemoteDescription(msg.data.answer).then(function () {
              return item.pc.addReceivedCandidates(item.candidates);
            }).catch(function (err) {
              return reject(new Error('Set answer (signaling): ' + err.message));
            });
          } else if ('candidate' in msg.data) {
            _this5.addIceCandidate(get(WebRTCService.prototype.__proto__ || Object.getPrototypeOf(WebRTCService.prototype), 'getItem', _this5).call(_this5, signaling, key), msg.data.candidate);
          }
        }, function (err) {
          get(WebRTCService.prototype.__proto__ || Object.getPrototypeOf(WebRTCService.prototype), 'removeItem', _this5).call(_this5, signaling, key);
          reject(err);
        }, function () {
          get(WebRTCService.prototype.__proto__ || Object.getPrototypeOf(WebRTCService.prototype), 'removeItem', _this5).call(_this5, signaling, key);
          reject(new Error('Could not create an RTCDataChannel: WebSocket ' + signaling.socket.url + ' closed'));
        });
        _this5.createDataChannel(item.pc, function (dataCh) {
          setTimeout(function () {
            subs.unsubscribe();
            get(WebRTCService.prototype.__proto__ || Object.getPrototypeOf(WebRTCService.prototype), 'removeItem', _this5).call(_this5, signaling, key);
          }, REMOVE_ITEM_TIMEOUT);
          resolve(dataCh);
        });
        _this5.createOffer(item.pc).then(function (offer) {
          signaling.send(JSON.stringify({ data: { offer: offer } }));
          setTimeout(function () {
            reject(new Error('Could not create an RTCDataChannel: CONNECT_OVER_SIGNALING_TIMEOUT (' + CONNECT_OVER_SIGNALING_TIMEOUT + 'ms)'));
          }, CONNECT_OVER_SIGNALING_TIMEOUT);
        }).catch(reject);
      });
    }

    /**
     * Creates an SDP offer.
     *
     * @private
     * @param  {RTCPeerConnection} pc
     * @return {Promise<RTCSessionDescription, string>} - Resolved when the offer has been succesfully created,
     * set as local description and sent to the peer.
     */

  }, {
    key: 'createOffer',
    value: function createOffer(pc) {
      return pc.createOffer().then(function (offer) {
        return pc.setLocalDescription(offer);
      }).then(function () {
        return {
          type: pc.localDescription.type,
          sdp: pc.localDescription.sdp
        };
      });
    }

    /**
     * Creates an SDP answer.
     *
     * @private
     * @param {RTCPeerConnection} pc
     * @param {string} offer
     * @param {string[]} candidates
     * @return {Promise<RTCSessionDescription, string>} - Resolved when the offer
     *  has been succesfully created, set as local description and sent to the peer.
     */

  }, {
    key: 'createAnswer',
    value: function createAnswer(pc, offer, candidates) {
      return pc.setRemoteDescription(offer).then(function () {
        pc.addReceivedCandidates(candidates);
        return pc.createAnswer();
      }).then(function (answer) {
        return pc.setLocalDescription(answer);
      }).then(function () {
        return {
          type: pc.localDescription.type,
          sdp: pc.localDescription.sdp
        };
      });
    }

    /**
     * Creates an instance of `RTCPeerConnection` and sets `onicecandidate` event handler.
     *
     * @private
     * @param  {function(candidate: Object)} onCandidate
     * candidate event handler.
     * @return {RTCPeerConnection}
     */

  }, {
    key: 'createPeerConnection',
    value: function createPeerConnection(onCandidate) {
      var _this6 = this;

      var pc = new wrtc.RTCPeerConnection({ iceServers: this.iceServers });
      pc.isRemoteDescriptionSet = false;
      pc.addReceivedCandidates = function (candidates) {
        pc.isRemoteDescriptionSet = true;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = candidates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var c = _step.value;
            _this6.addIceCandidate({ pc: pc }, c);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      };
      pc.onicecandidate = function (evt) {
        if (evt.candidate !== null) {
          var candidate = {
            candidate: evt.candidate.candidate,
            sdpMid: evt.candidate.sdpMid,
            sdpMLineIndex: evt.candidate.sdpMLineIndex
          };
          onCandidate(candidate);
        }
      };
      return pc;
    }

    /**
     *
     * @private
     * @param {RTCPeerConnection} pc
     * @param {function(dc: RTCDataChannel)} onOpen
     *
     */

  }, {
    key: 'createDataChannel',
    value: function createDataChannel(pc, onOpen) {
      var dc = pc.createDataChannel(null);
      dc.onopen = function (evt) {
        return onOpen(dc);
      };
      this.setUpOnDisconnect(pc, dc);
    }

    /**
     *
     * @private
     * @param {RTCPeerConnection} pc
     * @param {function(dc: RTCDataChannel)} onOpen
     *
     */

  }, {
    key: 'listenOnDataChannel',
    value: function listenOnDataChannel(pc, onOpen) {
      var _this7 = this;

      pc.ondatachannel = function (dcEvt) {
        _this7.setUpOnDisconnect(pc, dcEvt.channel);
        dcEvt.channel.onopen = function (evt) {
          return onOpen(dcEvt.channel);
        };
      };
    }

    /**
     * @private
     * @param {RTCPeerConnection} pc
     * @param {RTCDataChannel} dataCh
     */

  }, {
    key: 'setUpOnDisconnect',
    value: function setUpOnDisconnect(pc, dataCh) {
      pc.oniceconnectionstatechange = function () {
        if (pc.iceConnectionState === 'disconnected') {
          if (dataCh.onclose) {
            dataCh.onclose(new CloseEvent('disconnect', {
              code: 4201,
              reason: 'disconnected'
            }));
          }
        }
      };
    }

    /**
     * @private
     * @param {CandidatesBuffer|null} obj
     * @param {string} candidate
     */

  }, {
    key: 'addIceCandidate',
    value: function addIceCandidate(obj, candidate) {
      if (obj !== null && obj.pc && obj.pc.isRemoteDescriptionSet) {
        obj.pc.addIceCandidate(new wrtc.RTCIceCandidate(candidate)).catch(function (evt) {
          return console.error('Add ICE candidate: ' + evt.message);
        });
      } else obj.candidates[obj.candidates.length] = candidate;
    }
  }]);
  return WebRTCService;
}(Service);

/**
 * @private
 */


var CandidatesBuffer = function CandidatesBuffer() {
  var pc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var candidates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  classCallCheck(this, CandidatesBuffer);

  this.pc = pc;
  this.candidates = candidates;
};

var root = createCommonjsModule(function (module, exports) {
"use strict";
/**
 * window: browser in DOM main thread
 * self: browser in WebWorker
 * global: Node.js/other
 */
exports.root = (typeof window == 'object' && window.window === window && window
    || typeof self == 'object' && self.self === self && self
    || typeof commonjsGlobal == 'object' && commonjsGlobal.global === commonjsGlobal && commonjsGlobal);
if (!exports.root) {
    throw new Error('RxJS could not find any global context (window, self, global)');
}

});

function isFunction(x) {
    return typeof x === 'function';
}
var isFunction_2 = isFunction;


var isFunction_1 = {
	isFunction: isFunction_2
};

var isArray_1 = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });


var isArray = {
	isArray: isArray_1
};

function isObject(x) {
    return x != null && typeof x === 'object';
}
var isObject_2 = isObject;


var isObject_1 = {
	isObject: isObject_2
};

// typeof any so that it we don't have to cast when comparing a result to the error object
var errorObject_1 = { e: {} };


var errorObject = {
	errorObject: errorObject_1
};

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
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._complete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._complete);
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

/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
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
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this._trySubscribe(sink));
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

var __extends$5 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
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
    __extends$5(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
        this.predicate = predicate;
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

Observable_1.Observable.prototype.filter = filter_1.filter;

var WebSocket = Util.require(Util.WEB_SOCKET);

var CONNECT_TIMEOUT = 3000;

/**
 * Service class responsible to establish connections between peers via
 * `WebSocket`.
 */

var WebSocketService = function (_Service) {
  inherits(WebSocketService, _Service);

  function WebSocketService() {
    classCallCheck(this, WebSocketService);
    return possibleConstructorReturn(this, (WebSocketService.__proto__ || Object.getPrototypeOf(WebSocketService)).apply(this, arguments));
  }

  createClass(WebSocketService, [{
    key: 'connect',

    /**
     * Creates WebSocket with server.
     *
     * @param {string} url - Server url
     * @returns {Promise<WebSocket, string>} It is resolved once the WebSocket has been created and rejected otherwise
     */
    value: function connect(url) {
      return new Promise(function (resolve, reject) {
        if (Util.isURL(url) && url.search(/^wss?/) !== -1) {
          var ws = new WebSocket(url);
          ws.onopen = function () {
            return resolve(ws);
          };
          // Timeout for node (otherwise it will loop forever if incorrect address)
          setTimeout(function () {
            if (ws.readyState !== ws.OPEN) {
              reject(new Error('WebSocket ' + CONNECT_TIMEOUT + 'ms connection timeout with ' + url));
            }
          }, CONNECT_TIMEOUT);
        } else {
          throw new Error(url + ' is not a valid URL');
        }
      });
    }
  }, {
    key: 'subject',
    value: function subject(url) {
      return this.connect(url).then(function (socket) {
        var subject = new Subject_2();
        socket.onmessage = function (evt) {
          try {
            subject.next(JSON.parse(evt.data));
          } catch (err) {
            console.error('Unknown message from websocket : ' + socket.url + evt.data);
            socket.close(4000, err.message);
          }
        };
        socket.onerror = function (err) {
          return subject.error(err);
        };
        socket.onclose = function (closeEvt) {
          if (closeEvt.code === 1000) {
            subject.complete();
          } else {
            subject.error(new Error(closeEvt.code + ': ' + closeEvt.reason));
          }
        };
        subject.send = function (msg) {
          return socket.send(msg);
        };
        subject.close = function (code, reason) {
          return socket.close(code, reason);
        };
        subject.socket = socket;
        return subject;
      });
    }
  }]);
  return WebSocketService;
}(Service);

var EventSource = Util.require(Util.EVENT_SOURCE);
var fetch = Util.require(Util.FETCH);
var CloseEvent$1 = Util.require(Util.CLOSE_EVENT);

var CONNECT_TIMEOUT$1 = 5000;

/**
 * Service class responsible to establish connections between peers via
 * `WebSocket`.
 */

var EventSourceService = function (_Service) {
  inherits(EventSourceService, _Service);

  function EventSourceService() {
    classCallCheck(this, EventSourceService);
    return possibleConstructorReturn(this, (EventSourceService.__proto__ || Object.getPrototypeOf(EventSourceService)).apply(this, arguments));
  }

  createClass(EventSourceService, [{
    key: 'connect',

    /**
     * Creates RichEventSource object.
     *
     * @param {string} url - Server url
     * @returns {Promise<EventSource, string>} It is resolved once the WebSocket has been created and rejected otherwise
     */
    value: function connect(url) {
      return new Promise(function (resolve, reject) {
        try {
          var res = new RichEventSource(url);
          res.onopen = function () {
            return resolve(res);
          };
          res.onerror = function (err) {
            return reject(err.message);
          };
          // Timeout if "auth" event has not been received.
          setTimeout(function () {
            reject(new Error('Authentication event has not been received from ' + url + ' within ' + CONNECT_TIMEOUT$1 + 'ms'));
          }, CONNECT_TIMEOUT$1);
        } catch (err) {
          reject(err.message);
        }
      });
    }
  }]);
  return EventSourceService;
}(Service);

var RichEventSource = function () {
  function RichEventSource(url) {
    var _this2 = this;

    classCallCheck(this, RichEventSource);

    this.auth = '';
    this._onopen = function () {};
    this._onerror = function () {};
    this._onclose = function () {};
    this.es = new EventSource(url);
    this.es.addEventListener('auth', function (evtMsg) {
      _this2.auth = evtMsg.data;
      _this2._onopen();
    });
    this.es.addEventListener('close', function (evtMsg) {
      var data = JSON.parse(evtMsg.data);
      _this2.es.close();
      _this2._onclose(new CloseEvent$1('close', {
        wasClean: true,
        code: data.code,
        reason: data.reason
      }));
    });
    this.es.onerror = this._onerror;
  }

  createClass(RichEventSource, [{
    key: 'close',
    value: function close() {
      this.es.close();
      this._onclose(new CloseEvent$1('close', { wasClean: true, code: 1000 }));
    }
  }, {
    key: 'send',
    value: function send() {
      var _this3 = this;

      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      fetch(this.url, { method: 'POST', body: this.auth + '@' + str }).then(function (response) {
        if (response.status !== 200) {
          _this3._onerror(new Error(response.status + ': ' + response.statusText));
        }
      }).catch(function (err) {
        return _this3._onerror(err);
      });
    }
  }, {
    key: 'CONNECTING',
    get: function get$$1() {
      return this.es.OPEN !== undefined ? this.es.OPEN : 0;
    }
  }, {
    key: 'OPEN',
    get: function get$$1() {
      return this.es.OPEN !== undefined ? this.es.OPEN : 1;
    }
  }, {
    key: 'CLOSED',
    get: function get$$1() {
      return this.es.OPEN !== undefined ? this.es.OPEN : 2;
    }
  }, {
    key: 'url',
    get: function get$$1() {
      return this.es.url;
    }
  }, {
    key: 'readyState',
    get: function get$$1() {
      return this.es.readyState;
    }
  }, {
    key: 'onopen',
    get: function get$$1() {
      return this._onopen;
    },
    set: function set$$1(cb) {
      this._onopen = cb;
    }
  }, {
    key: 'onmessage',
    get: function get$$1() {
      return this.es.onmessage;
    },
    set: function set$$1(cb) {
      this.es.onmessage = cb;
    }
  }, {
    key: 'onclose',
    get: function get$$1() {
      return this._onclose;
    },
    set: function set$$1(cb) {
      this._onclose = cb;
    }
  }, {
    key: 'onerror',
    get: function get$$1() {
      return this._onerror;
    },
    set: function set$$1(cb) {
      this._onerror = cb;
    }
  }]);
  return RichEventSource;
}();

/**
 * It is responsible to build a channel between two peers with a help of `WebSocketService` and `WebRTCService`.
 * Its algorithm determine which channel (socket or dataChannel) should be created
 * based on the services availability and peers' preferences.
 */

var ChannelBuilderService = function (_Service) {
  inherits(ChannelBuilderService, _Service);

  /**
   * @param {number} id Service identifier
   */
  function ChannelBuilderService(id) {
    classCallCheck(this, ChannelBuilderService);

    /**
     * @private
     */
    var _this = possibleConstructorReturn(this, (ChannelBuilderService.__proto__ || Object.getPrototypeOf(ChannelBuilderService)).call(this, id));

    _this.WS = [WEB_SOCKET];
    /**
     * @private
     */
    _this.WR = [WEB_RTC];
    /**
     * @private
     */
    _this.WS_WR = [WEB_SOCKET, WEB_RTC];
    /**
     * @private
     */
    _this.WR_WS = [WEB_RTC, WEB_SOCKET];
    return _this;
  }

  /**
   * Establish a channel with the peer identified by `id`.
   *
   * @param {WebChannel} wc
   * @param {number} id
   *
   * @returns {Promise<Channel, string>}
   */


  createClass(ChannelBuilderService, [{
    key: 'connectTo',
    value: function connectTo(wc, id) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        get(ChannelBuilderService.prototype.__proto__ || Object.getPrototypeOf(ChannelBuilderService.prototype), 'setPendingRequest', _this2).call(_this2, wc, id, { resolve: resolve, reject: reject });
        wc.sendInnerTo(id, _this2.id, _this2.availableConnectors(wc));
      });
    }

    /**
     * @param {WebChannel} wc
     *
     * @returns {{listenOn: string, connectors: number[]}}
     */

  }, {
    key: 'availableConnectors',
    value: function availableConnectors(wc) {
      var res = {};
      var connectors = [];
      if (Util.require(Util.WEB_RTC) !== undefined) {
        connectors[connectors.length] = WEB_RTC;
      }
      if (wc.settings.listenOn !== '') {
        connectors[connectors.length] = WEB_SOCKET;
        res.listenOn = wc.settings.listenOn;
      }
      if (connectors.length === 2 && connectors[0] !== wc.settings.connector) {
        connectors.reverse();
      }
      res.connectors = connectors;
      return res;
    }

    /**
     * @param {WebChannel} wc
     * @param {WebSocket|RTCDataChannel} channel
     * @param {number} senderId
     */

  }, {
    key: 'onChannel',
    value: function onChannel(wc, channel, senderId) {
      var _this3 = this;

      wc.initChannel(channel, senderId).then(function (channel) {
        var pendReq = get(ChannelBuilderService.prototype.__proto__ || Object.getPrototypeOf(ChannelBuilderService.prototype), 'getPendingRequest', _this3).call(_this3, wc, senderId);
        if (pendReq !== null) pendReq.resolve(channel);
      });
    }

    /**
     * @param {Channel} channel
     * @param {number} senderId
     * @param {number} recepientId
     * @param {Object} msg
     */

  }, {
    key: 'onMessage',
    value: function onMessage(channel, senderId, recepientId, msg) {
      var _this4 = this;

      var wc = channel.webChannel;
      var myConnectObj = this.availableConnectors(wc);
      var myConnectors = myConnectObj.connectors;
      if ('failedReason' in msg) {
        get(ChannelBuilderService.prototype.__proto__ || Object.getPrototypeOf(ChannelBuilderService.prototype), 'getPendingRequest', this).call(this, wc, senderId).reject(new Error(msg.failedReason));
      } else if ('shouldConnect' in msg) {
        if (this.isEqual(msg.shouldConnect, this.WS)) {
          ServiceFactory.get(WEB_SOCKET).connect(msg.listenOn).then(function (channel) {
            channel.send(JSON.stringify({ wcId: wc.id, senderId: wc.myId }));
            _this4.onChannel(wc, channel, senderId);
          }).catch(function (reason) {
            get(ChannelBuilderService.prototype.__proto__ || Object.getPrototypeOf(ChannelBuilderService.prototype), 'getPendingRequest', _this4).call(_this4, wc, senderId).reject(new Error('Failed to establish a socket: ' + reason));
          });
        } else if (this.isEqual(msg.shouldConnect, this.WS_WR)) {
          ServiceFactory.get(WEB_SOCKET).connect(msg.listenOn).then(function (channel) {
            channel.send(JSON.stringify({ wcId: wc.id, senderId: wc.myId }));
            _this4.onChannel(wc, channel, senderId);
          }).catch(function (reason) {
            ServiceFactory.get(WEB_RTC, wc.settings.iceServers).connectOverWebChannel(wc, senderId).then(function (channel) {
              return _this4.onChannel(wc, channel, senderId);
            }).catch(function (reason) {
              if ('feedbackOnFail' in msg && msg.feedbackOnFail === true) {
                wc.sendInnerTo(senderId, _this4.id, { tryOn: _this4.WS, listenOn: myConnectObj.listenOn });
              } else {
                get(ChannelBuilderService.prototype.__proto__ || Object.getPrototypeOf(ChannelBuilderService.prototype), 'getPendingRequest', _this4).call(_this4, wc, senderId).reject(new Error('Failed to establish a socket and then a data channel: ' + reason));
              }
            });
          });
        }
      } else if ('tryOn' in msg && this.isEqual(msg.tryOn, this.WS)) {
        ServiceFactory.get(WEB_SOCKET).connect(msg.listenOn).then(function (channel) {
          channel.send(JSON.stringify({ wcId: wc.id, senderId: wc.myId }));
          _this4.onChannel(wc, channel, senderId);
        }).catch(function (reason) {
          return wc.sendInnerTo(senderId, _this4.id, { failedReason: 'Failed to establish a socket: ' + reason });
        });
      } else if ('connectors' in msg) {
        if (!this.isValid(msg.connectors)) {
          wc.sendInnerTo(senderId, this.id, { failedReason: 'Unknown connectors: ' + msg.connectors });
        } else {
          // []
          if (msg.connectors.length === 0) {
            if (myConnectors.length === 0 || this.isEqual(myConnectors, this.WS)) {
              wc.sendInnerTo(senderId, this.id, { failedReason: 'No common connectors' });
            } else {
              wc.sendInnerTo(senderId, this.id, { shouldConnect: this.WS, listenOn: myConnectObj.listenOn });
            }
          }

          // [ws]
          if (this.isEqual(msg.connectors, this.WS)) {
            if (myConnectors.length === 0 || this.isEqual(myConnectors, this.WS)) {
              this.ws(wc, senderId, msg.listenOn);
            } else {
              this.wsWs(wc, senderId, msg.listenOn, myConnectObj.listenOn);
            }
          }

          // [wr]
          if (this.isEqual(msg.connectors, this.WR)) {
            if (myConnectors.length === 0) {
              wc.sendInnerTo(senderId, this.id, { failedReason: 'No common connectors' });
            } else if (this.isEqual(myConnectors, this.WS)) {
              wc.sendInnerTo(senderId, this.id, { shouldConnect: this.WS, listenOn: myConnectObj.listenOn });
            } else if (this.isEqual(myConnectors, this.WR)) {
              ServiceFactory.get(WEB_RTC, wc.settings.iceServers).connectOverWebChannel(wc, senderId).then(function (channel) {
                _this4.onChannel(wc, channel, senderId);
              }).catch(function (reason) {
                wc.sendInnerTo(senderId, _this4.id, { failedReason: 'Failed establish a data channel: ' + reason });
              });
            } else if (this.isEqual(myConnectors, this.WS_WR)) {
              wc.sendInnerTo(senderId, this.id, { shouldConnect: this.WS_WR, listenOn: myConnectObj.listenOn });
            } else if (this.isEqual(myConnectors, this.WR_WS)) {
              ServiceFactory.get(WEB_RTC, wc.settings.iceServers).connectOverWebChannel(wc, senderId).then(function (channel) {
                return _this4.onChannel(wc, channel, senderId);
              }).catch(function (reason) {
                wc.sendInnerTo(senderId, _this4.id, { shouldConnect: _this4.WS, listenOn: myConnectObj.listenOn });
              });
            }
          }

          // [ws, wr]
          if (this.isEqual(msg.connectors, this.WS_WR)) {
            if (myConnectors.length === 0) {
              this.ws(wc, senderId, msg.listenOn);
            } else if (this.isEqual(myConnectors, this.WS)) {
              this.wsWs(wc, senderId, msg.listenOn, myConnectObj.listenOn);
            } else if (this.isEqual(myConnectors, this.WR)) {
              ServiceFactory.get(WEB_SOCKET).connect(msg.listenOn).then(function (channel) {
                channel.send(JSON.stringify({ wcId: wc.id, senderId: wc.myId }));
                _this4.onChannel(wc, channel, senderId);
              }).catch(function (reason) {
                return ServiceFactory.get(WEB_RTC, wc.settings.iceServers).connectOverWebChannel(wc, senderId);
              }).then(function (channel) {
                return _this4.onChannel(wc, channel, senderId);
              }).catch(function (reason) {
                return wc.sendInnerTo(senderId, _this4.id, { failedReason: 'Failed to establish a socket and then a data channel: ' + reason });
              });
            } else if (this.isEqual(myConnectors, this.WS_WR)) {
              ServiceFactory.get(WEB_SOCKET).connect(msg.listenOn).then(function (channel) {
                channel.send(JSON.stringify({ wcId: wc.id, senderId: wc.myId }));
                _this4.onChannel(wc, channel, senderId);
              });
            } else if (this.isEqual(myConnectors, this.WR_WS)) {
              wc.sendInnerTo(senderId, this.id, { shouldConnect: this.WS_WR, listenOn: myConnectObj.listenOn });
            } else {
              ServiceFactory.get(WEB_SOCKET).connect(msg.listenOn).then(function (channel) {
                channel.send(JSON.stringify({ wcId: wc.id, senderId: wc.myId }));
                _this4.onChannel(wc, channel, senderId);
              }).catch(function (reason) {
                ServiceFactory.get(WEB_RTC, wc.settings.iceServers).connectOverWebChannel(wc, senderId).then(function (channel) {
                  return _this4.onChannel(wc, channel, senderId);
                }).catch(function (reason) {
                  return wc.sendInnerTo(senderId, _this4.id, { shouldConnect: _this4.WS, listenOn: myConnectObj.listenOn });
                });
              });
            }
          }

          // [wr, ws]
          if (this.isEqual(msg.connectors, this.WR_WS)) {
            if (myConnectors.length === 0) {
              this.ws(wc, senderId, msg.listenOn);
            } else if (this.isEqual(myConnectors, this.WS)) {
              this.wsWs(wc, senderId, msg.listenOn, myConnectObj.listenOn);
            } else if (this.isEqual(myConnectors, this.WR)) {
              ServiceFactory.get(WEB_RTC, wc.settings.iceServers).connectOverWebChannel(wc, senderId).then(function (channel) {
                return _this4.onChannel(wc, channel, senderId);
              }).catch(function (reason) {
                ServiceFactory.get(WEB_SOCKET).connect(msg.listenOn).then(function (channel) {
                  channel.send(JSON.stringify({ wcId: wc.id, senderId: wc.myId }));
                  _this4.onChannel(wc, channel, senderId);
                }).catch(function (reason) {
                  return wc.sendInnerTo(senderId, _this4.id, { failedReason: 'Failed to establish a data channel and then a socket: ' + reason });
                });
              });
            } else if (this.isEqual(myConnectors, this.WS_WR)) {
              wc.sendInnerTo(senderId, this.id, { shouldConnect: this.WS_WR, feedbackOnFail: true, listenOn: myConnectObj.listenOn });
            } else if (this.isEqual(myConnectors, this.WR_WS)) {
              ServiceFactory.get(WEB_RTC, wc.settings.iceServers).connectOverWebChannel(wc, senderId).then(function (channel) {
                return _this4.onChannel(wc, channel, senderId);
              }).catch(function (reason) {
                ServiceFactory.get(WEB_SOCKET).connect(msg.listenOn).then(function (channel) {
                  channel.send(JSON.stringify({ wcId: wc.id, senderId: wc.myId }));
                  _this4.onChannel(wc, channel, senderId);
                }).catch(function (reason) {
                  return wc.sendInnerTo(senderId, _this4.id, { shouldConnect: _this4.WS, listenOn: myConnectObj.listenOn });
                });
              });
            }
          }
        }
      }
    }

    /**
     * @private
     * @param {WebChannel} wc
     * @param {number} senderId
     * @param {string} peerWsURL
     * @param {string} myWsURL
     */

  }, {
    key: 'wsWs',
    value: function wsWs(wc, senderId, peerWsURL, myWsURL) {
      var _this5 = this;

      ServiceFactory.get(WEB_SOCKET).connect(peerWsURL).then(function (channel) {
        channel.send(JSON.stringify({ wcId: wc.id, senderId: wc.myId }));
        _this5.onChannel(wc, channel, senderId);
      }).catch(function (reason) {
        wc.sendInnerTo(senderId, _this5.id, { shouldConnect: _this5.WS, listenOn: myWsURL });
      });
    }

    /**
     * @private
     * @param {WebChannel} wc
     * @param {number} senderId
     * @param {string} peerWsURL
     */

  }, {
    key: 'ws',
    value: function ws(wc, senderId, peerWsURL) {
      var _this6 = this;

      ServiceFactory.get(WEB_SOCKET).connect(peerWsURL).then(function (channel) {
        channel.send(JSON.stringify({ wcId: wc.id, senderId: wc.myId }));
        _this6.onChannel(wc, channel, senderId);
      }).catch(function (reason) {
        wc.sendInnerTo(senderId, _this6.id, {
          failedReason: 'Failed to establish a socket: ' + reason
        });
      });
    }

    /**
     * @private
     * @param {number[]} connectors
     *
     * @returns {boolean}
     */

  }, {
    key: 'isValid',
    value: function isValid(connectors) {
      if (this.isEqual(connectors, this.WS) || this.isEqual(connectors, this.WR) || this.isEqual(connectors, this.WS_WR) || this.isEqual(connectors, this.WR_WS)) return true;
      return false;
    }

    /**
     * @private
     * @param {number[]} arr1
     * @param {number[]} arr2
     *
     * @returns {type} Description
     */

  }, {
    key: 'isEqual',
    value: function isEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) return false;
      for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
      }
      return true;
    }
  }]);
  return ChannelBuilderService;
}(Service);

/**
 * Wrapper class for `RTCDataChannel` and `WebSocket`.
 */

var Channel = function () {
  /**
   * Creates a channel from existing `RTCDataChannel` or `WebSocket`.
   * @param {WebSocket|RTCDataChannel} channel Data channel or web socket
   * @param {WebChannel} webChannel The `WebChannel` this channel will be part of
   * @param {number} peerId Identifier of the peer who is at the other end of
   * this channel
   */
  function Channel(channel, webChannel, peerId) {
    classCallCheck(this, Channel);

    /**
     * Data channel or web socket.
     * @private
     * @type {external:WebSocket|external:RTCDataChannel}
     */
    this.channel = channel;

    /**
     * The `WebChannel` which this channel belongs to.
     * @type {WebChannel}
     */
    this.webChannel = null;

    /**
     * Identifier of the peer who is at the other end of this channel
     * @type {WebChannel}
     */
    this.peerId = -1;

    /**
     * Send message.
     * @type {function(message: ArrayBuffer)}
     */
    this.send = null;

    if (Util.isBrowser()) {
      channel.binaryType = 'arraybuffer';
      this.send = this.sendBrowser;
    } else if (Util.isSocket(channel)) {
      this.send = this.sendInNodeThroughSocket;
    } else {
      channel.binaryType = 'arraybuffer';
      this.send = this.sendInNodeThroughDataChannel;
    }
  }

  /**
   * Send message over this channel. The message should be prepared beforhand by
   * the {@link MessageBuilderService} (see{@link MessageBuilderService#msg},
   * {@link MessageBuilderService#handleUserMessage}).
   *
   * @private
   * @param {ArrayBuffer} data Message
   */


  createClass(Channel, [{
    key: 'sendBrowser',
    value: function sendBrowser(data) {
      // if (this.channel.readyState !== 'closed' && new Int8Array(data).length !== 0) {
      if (this.isOpen()) {
        try {
          this.channel.send(data);
        } catch (err) {
          console.error('Channel send: ' + err.message);
        }
      }
    }

    /**
     * @private
     * @param {ArrayBuffer} data
     */

  }, {
    key: 'sendInNodeThroughSocket',
    value: function sendInNodeThroughSocket(data) {
      if (this.isOpen()) {
        try {
          this.channel.send(data, { binary: true });
        } catch (err) {
          console.error('Channel send: ' + err.message);
        }
      }
    }

    /**
     * @private
     * @param {ArrayBuffer} data
     */

  }, {
    key: 'sendInNodeThroughDataChannel',
    value: function sendInNodeThroughDataChannel(data) {
      this.sendBrowser(data.slice(0));
    }

    /**
     * @param {function(msg: ArrayBuffer)} handler
     */

  }, {
    key: 'clearHandlers',


    /**
     */
    value: function clearHandlers() {
      this.onMessage = function () {};
      this.onClose = function () {};
      this.onError = function () {};
    }

    /**
     * @returns {boolean}
     */

  }, {
    key: 'isOpen',
    value: function isOpen() {
      var state = this.channel.readyState;
      return state === 1 || state === 'open';
    }

    /**
     * Close the channel.
     */

  }, {
    key: 'close',
    value: function close() {
      this.channel.close();
    }
  }, {
    key: 'onMessage',
    set: function set$$1(handler) {
      if (!Util.isBrowser() && Util.isSocket(this.channel)) {
        this.channel.onmessage = function (msgEvt) {
          handler(new Uint8Array(msgEvt.data).buffer);
        };
      } else this.channel.onmessage = function (msgEvt) {
        return handler(msgEvt.data);
      };
    }

    /**
     * @param {function(message: CloseEvent)} handler
     */

  }, {
    key: 'onClose',
    set: function set$$1(handler) {
      var _this = this;

      this.channel.onclose = function (closeEvt) {
        if (_this.webChannel !== null && handler(closeEvt)) {
          _this.webChannel.members.splice(_this.webChannel.members.indexOf(_this.peerId), 1);
          _this.webChannel.onPeerLeave(_this.peerId);
        } else handler(closeEvt);
      };
    }

    /**
     * @param {function(message: Event)} handler
     */

  }, {
    key: 'onError',
    set: function set$$1(handler) {
      this.channel.onerror = function (evt) {
        return handler(evt);
      };
    }
  }]);
  return Channel;
}();

/**
 * This class represents a door of the `WebChannel` for the current peer. If the door
 * is open, then clients can join the `WebChannel` through this peer. There are as
 * many doors as peers in the `WebChannel` and each of them can be closed or opened.
 */

var SignalingGate = function () {
  /**
   * @param {WebChannel} wc
   * @param {function(ch: RTCDataChannel)} onChannel
   */
  function SignalingGate(wc, onChannel) {
    classCallCheck(this, SignalingGate);

    /**
     * @type {WebChannel}
     */
    this.webChannel = wc;
    /**
     * Signaling server url.
     * @private
     * @type {string}
     */
    this.url = null;
    /**
     * Key related to the `url`.
     * @private
     * @type {string}
     */
    this.key = null;
    /**
     * Connection with the signaling server.
     * @private
     * @type {external:WebSocket|external:ws/WebSocket|external:EventSource}
     */
    this.stream = null;

    this.onChannel = onChannel;
  }

  /**
   * Open the gate.
   *
   * @param {string} url Signaling server url
   * @param {string} [key = this.generateKey()]
   * @returns {Promise<OpenData, string>}
   */


  createClass(SignalingGate, [{
    key: 'open',
    value: function open(url) {
      var _this = this;

      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.generateKey();
      var signaling = arguments[2];

      if (signaling) {
        return this.listenOnOpen(url, key, signaling);
      } else {
        return this.getConnectionService(url).subject(url).then(function (signaling) {
          signaling.filter(function (msg) {
            return 'first' in msg || 'ping' in msg;
          }).subscribe(function () {
            return signaling.send(JSON.stringify({ pong: true }));
          });
          return _this.listenOnOpen(url, key, signaling);
        });
      }
    }
  }, {
    key: 'listenOnOpen',
    value: function listenOnOpen(url, key, signaling) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        signaling.filter(function (msg) {
          return 'first' in msg;
        }).subscribe(function (msg) {
          if (msg.first) {
            _this2.stream = signaling;
            _this2.key = key;
            _this2.url = url.endsWith('/') ? url.substr(0, url.length - 1) : url;
            resolve({ url: _this2.url, key: key });
          }
        }, function (err) {
          _this2.onClose();
          reject(err);
        }, function () {
          _this2.onClose();
          reject(new Error(''));
        });
        ServiceFactory.get(WEB_RTC, _this2.webChannel.settings.iceServers).listenFromSignaling(signaling, function (channel) {
          return _this2.onChannel(channel);
        });
        signaling.send(JSON.stringify({ open: key }));
      });
    }
  }, {
    key: 'join',
    value: function join(key, url, shouldOpen) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.getConnectionService(url).subject(url).then(function (signaling) {
          signaling.filter(function (msg) {
            return 'first' in msg || 'ping' in msg;
          }).subscribe(function () {
            return signaling.send(JSON.stringify({ pong: true }));
          });
          var subs = signaling.filter(function (msg) {
            return 'first' in msg;
          }).subscribe(function (msg) {
            if (msg.first) {
              subs.unsubscribe();
              if (shouldOpen) {
                _this3.open(url, key, signaling).then(function () {
                  return resolve();
                }).catch(function (err) {
                  return reject(err);
                });
              } else {
                signaling.close(1000);
                resolve();
              }
            } else {
              if ('useThis' in msg) {
                if (msg.useThis) {
                  subs.unsubscribe();
                  resolve(signaling.socket);
                } else {
                  signaling.error(new Error('Failed to join via ' + url + ': uncorrect bot server response'));
                }
              } else {
                ServiceFactory.get(WEB_RTC, _this3.webChannel.settings.iceServers).connectOverSignaling(signaling, key).then(function (dc) {
                  subs.unsubscribe();
                  if (shouldOpen) {
                    _this3.open(url, key, signaling).then(function () {
                      return resolve(dc);
                    }).catch(function (err) {
                      return reject(err);
                    });
                  } else {
                    signaling.close(1000);
                    resolve(dc);
                  }
                }).catch(function (err) {
                  signaling.close(1000);
                  signaling.error(err);
                });
              }
            }
          }, function (err) {
            return reject(err);
          });
          signaling.send(JSON.stringify({ join: key }));
        }).catch(function (err) {
          return reject(err);
        });
      });
    }

    /**
     * Check if the door is opened or closed.
     *
     * @returns {boolean} - Returns true if the door is opened and false if it is
     * closed
     */

  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.stream !== null;
    }

    /**
     * Get open data.
     *
     * @returns {OpenData|null} Open data if the door is open and null otherwise
     */

  }, {
    key: 'getOpenData',
    value: function getOpenData() {
      if (this.isOpen()) {
        return {
          url: this.url,
          key: this.key
        };
      }
      return null;
    }

    /**
     * Close the door if it is open and do nothing if it is closed already.
     */

  }, {
    key: 'close',
    value: function close() {
      if (this.isOpen()) {
        this.stream.close(1000);
      }
    }

    /**
     * Get the connection service for signaling server.
     *
     * @private
     * @param {string} url Signaling server url
     *
     * @returns {Service}
     */

  }, {
    key: 'getConnectionService',
    value: function getConnectionService(url) {
      if (Util.isURL(url)) {
        if (url.search(/^wss?/) !== -1) {
          return ServiceFactory.get(WEB_SOCKET);
        } else {
          return ServiceFactory.get(EVENT_SOURCE);
        }
      }
      throw new Error(url + ' is not a valid URL');
    }
  }, {
    key: 'onClose',
    value: function onClose() {
      if (this.isOpen()) {
        this.key = null;
        this.stream = null;
        this.url = null;
        this.webChannel.onClose();
      }
    }

    /**
     * Generate random key which will be used to join the `WebChannel`.
     *
     * @private
     * @returns {string} - Generated key
     */

  }, {
    key: 'generateKey',
    value: function generateKey() {
      var MIN_LENGTH = 5;
      var DELTA_LENGTH = 0;
      var MASK = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var result = '';
      var length = MIN_LENGTH + Math.round(Math.random() * DELTA_LENGTH);

      for (var i = 0; i < length; i++) {
        result += MASK[Math.round(Math.random() * (MASK.length - 1))];
      }
      return result;
    }
  }]);
  return SignalingGate;
}();

/**
 * Maximum identifier number for {@link WebChannel#generateId} function.
 * @type {number}
 */
var MAX_ID = 2147483647;

var REJOIN_MAX_ATTEMPTS = 10;
var REJOIN_TIMEOUT = 2000;

/**
 * Timout for ping `WebChannel` in milliseconds.
 * @type {number}
 */
var PING_TIMEOUT = 5000;

var ID_TIMEOUT = 10000;

/**
 * One of the internal message type. It's a peer message.
 * @ignore
 * @type {number}
 */
var USER_DATA = 1;

/**
 * One of the internal message type. This message should be threated by a
 * specific service class.
 * @type {number}
 */
var INNER_DATA = 2;

var INITIALIZATION = 3;

/**
 * One of the internal message type. Ping message.
 * @type {number}
 */
var PING = 4;

/**
 * One of the internal message type. Pong message, response to the ping message.
 * @type {number}
 */
var PONG = 5;

var INIT_CHANNEL = 6;

var INIT_CHANNEL_BIS = 7;

/**
 * This class is an API starting point. It represents a group of collaborators
 * also called peers. Each peer can send/receive broadcast as well as personal
 * messages. Every peer in the `WebChannel` can invite another person to join
 * the `WebChannel` and he also possess enough information to be able to add it
 * preserving the current `WebChannel` structure (network topology).
 */

var WebChannel = function () {
  /**
   * @param {WebChannelSettings} settings Web channel settings
   */
  function WebChannel(settings) {
    var _this = this;

    classCallCheck(this, WebChannel);

    /**
     * @private
     * @type {WebChannelSettings}
     */
    this.settings = settings;

    /**
     * Channels through which this peer is connected with other peers. This
     * attribute depends on the `WebChannel` topology. E. g. in fully connected
     * `WebChannel` you are connected to each other peer in the group, however
     * in the star structure this attribute contains only the connection to
     * the central peer.
     * @private
     * @type {external:Set}
     */
    this.channels = new Set();

    /**
     * This event handler is used to resolve *Promise* in {@link WebChannel#join}.
     * @private
     */
    this.onJoin = function () {};

    /**
     * `WebChannel` topology.
     * @private
     * @type {Service}
     */
    this.manager = ServiceFactory.get(this.settings.topology);

    /**
     * Message builder service instance.
     *
     * @private
     * @type {MessageBuilderService}
     */
    this.msgBld = ServiceFactory.get(MESSAGE_BUILDER);

    /**
     * An array of all peer ids except this.
     * @type {number[]}
     */
    this.members = [];

    /**
     * @private
     * @type {Set<number>}
     */
    this.generatedIds = new Set();

    /**
     * @private
     * @type {Date}
     */
    this.pingTime = 0;

    /**
     * @private
     * @type {number}
     */
    this.maxTime = 0;

    /**
     * @private
     * @type {function(delay: number)}
     */
    this.pingFinish = function () {};

    /**
     * @private
     * @type {number}
     */
    this.pongNb = 0;

    /**
     * The `WebChannel` gate.
     * @private
     * @type {SignalingGate}
     */
    this.gate = new SignalingGate(this, function (ch) {
      return _this.addChannel(ch);
    });

    this.onInitChannel = new Map();

    /**
     * Unique `WebChannel` identifier. Its value is the same for all `WebChannel` members.
     * @type {number}
     */
    this.id = this.generateId();

    /**
     * Unique peer identifier of you in this `WebChannel`. After each `join` function call
     * this id will change, because it is up to the `WebChannel` to assign it when
     * you join.
     * @type {number}
     */
    this.myId = this.generateId();

    /**
     * Is the event handler called when a new peer has  joined the `WebChannel`.
     * @type {function(id: number)}
     */
    this.onPeerJoin = function () {};

    /**
     * Is the event handler called when a peer hes left the `WebChannel`.
     * @type {function(id: number)}
     */
    this.onPeerLeave = function () {};

    /**
     * Is the event handler called when a message is available on the `WebChannel`.
     * @type {function(id: number, msg: UserMessage, isBroadcast: boolean)}
     */
    this.onMessage = function () {};

    /**
     * Is the event handler called when the `WebChannel` has been closed.
     * @type {function(closeEvt: CloseEvent)}
     */
    this.onClose = function () {};
  }

  /**
   * Join the `WebChannel`.
   *
   * @param  {string|WebSocket} keyOrSocket The key provided by one of the `WebChannel` members or a socket
   * @param  {string} [url=this.settings.signalingURL] Server URL
   * @returns {Promise<undefined,string>} It resolves once you became a `WebChannel` member.
   */


  createClass(WebChannel, [{
    key: 'join',
    value: function join(keyOrSocket) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var settings = {
        url: this.settings.signalingURL,
        open: true,
        rejoinAttempts: REJOIN_MAX_ATTEMPTS,
        rejoinTimeout: REJOIN_TIMEOUT
      };
      Object.assign(settings, options);
      return new Promise(function (resolve, reject) {
        if (keyOrSocket.constructor.name !== 'WebSocket') {
          _this2.joinRecursively(keyOrSocket, settings, function () {
            return resolve();
          }, function (err) {
            return reject(err);
          }, 0);
        } else {
          _this2.onJoin = resolve;
          _this2.initChannel(keyOrSocket).catch(reject);
        }
      });
    }

    /**
     * Invite a peer to join the `WebChannel`.
     *
     * @param {string|WebSocket} urlOrSocket
     *
     * @returns {Promise<undefined,string>}
     */

  }, {
    key: 'invite',
    value: function invite(urlOrSocket) {
      var _this3 = this;

      if (typeof urlOrSocket === 'string' || urlOrSocket instanceof String) {
        if (!Util.isURL(urlOrSocket)) {
          return Promise.reject(new Error(urlOrSocket + ' is not a valid URL'));
        }
        return new Promise(function (resolve, reject) {
          ServiceFactory.get(WEB_SOCKET).connect(urlOrSocket).then(function (ws) {
            ws.onmessage = function (evt) {
              var msg = JSON.parse(evt.data);
              if ('inviteOk' in msg) {
                if (msg.inviteOk) {
                  ws.onmessage = function () {};
                  ws.send(JSON.stringify({ wcId: _this3.id }));
                  _this3.addChannel(ws).then(function () {
                    return resolve();
                  });
                } else {
                  ws.close(1000);
                  reject(new Error('Bot already has been invited'));
                }
              } else {
                ws.close(1000);
                reject(new Error('Unknown message from bot server: ' + evt.data));
              }
            };
            ws.send(JSON.stringify({ wcId: _this3.id, check: true }));
          });
        });
      } else if (urlOrSocket.constructor.name === 'WebSocket') {
        return this.addChannel(urlOrSocket);
      } else {
        return Promise.reject(new Error(urlOrSocket + ' is not a valid URL'));
      }
    }

    /**
     * Enable other peers to join the `WebChannel` with your help as an
     * intermediary peer.
     * @param  {string} [key] Key to use. If none provide, then generate one.
     * @returns {Promise} It is resolved once the `WebChannel` is open. The
     * callback function take a parameter of type {@link SignalingGate~AccessData}.
     */

  }, {
    key: 'open',
    value: function open() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (key !== null) {
        return this.gate.open(this.settings.signalingURL, key);
      } else {
        return this.gate.open(this.settings.signalingURL);
      }
    }

    /**
     * Prevent clients to join the `WebChannel` even if they possesses a key.
     */

  }, {
    key: 'close',
    value: function close() {
      this.gate.close();
    }

    /**
     * If the `WebChannel` is open, the clients can join it through you, otherwise
     * it is not possible.
     * @returns {boolean} True if the `WebChannel` is open, false otherwise
     */

  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.gate.isOpen();
    }

    /**
     * Get the data allowing to join the `WebChannel`. It is the same data which
     * {@link WebChannel#open} callback function provides.
     * @returns {OpenData|null} - Data to join the `WebChannel` or null is the `WebChannel` is closed
     */

  }, {
    key: 'getOpenData',
    value: function getOpenData() {
      return this.gate.getOpenData();
    }

    /**
     * Leave the `WebChannel`. No longer can receive and send messages to the group.
     */

  }, {
    key: 'leave',
    value: function leave() {
      this.pingTime = 0;
      if (this.channels.size !== 0) {
        this.members = [];
        this.manager.leave(this);
      }
      this.onInitChannel = function () {};
      this.onJoin = function () {};
      this.gate.close();
    }

    /**
     * Send the message to all `WebChannel` members.
     * @param  {UserMessage} data - Message
     */

  }, {
    key: 'send',
    value: function send(data) {
      var _this4 = this;

      if (this.channels.size !== 0) {
        this.msgBld.handleUserMessage(data, this.myId, null, function (dataChunk) {
          _this4.manager.broadcast(_this4, dataChunk);
        });
      }
    }

    /**
     * Send the message to a particular peer in the `WebChannel`.
     * @param  {number} id - Id of the recipient peer
     * @param  {UserMessage} data - Message
     */

  }, {
    key: 'sendTo',
    value: function sendTo(id, data) {
      var _this5 = this;

      if (this.channels.size !== 0) {
        this.msgBld.handleUserMessage(data, this.myId, id, function (dataChunk) {
          _this5.manager.sendTo(id, _this5, dataChunk);
        }, false);
      }
    }

    /**
     * Get the ping of the `WebChannel`. It is an amount in milliseconds which
     * corresponds to the longest ping to each `WebChannel` member.
     * @returns {Promise}
     */

  }, {
    key: 'ping',
    value: function ping() {
      var _this6 = this;

      if (this.channels.size !== 0 && this.pingTime === 0) {
        return new Promise(function (resolve, reject) {
          if (_this6.pingTime === 0) {
            _this6.pingTime = Date.now();
            _this6.maxTime = 0;
            _this6.pongNb = 0;
            _this6.pingFinish = function (delay) {
              return resolve(delay);
            };
            _this6.manager.broadcast(_this6, _this6.msgBld.msg(PING, _this6.myId));
            setTimeout(function () {
              return resolve(PING_TIMEOUT);
            }, PING_TIMEOUT);
          }
        });
      } else return Promise.reject(new Error('No peers to ping'));
    }

    /**
     * @private
     * @param {WebSocket|RTCDataChannel} channel
     *
     * @returns {Promise<undefined,string>}
     */

  }, {
    key: 'addChannel',
    value: function addChannel(channel) {
      var _this7 = this;

      return this.initChannel(channel).then(function (channel) {
        var msg = _this7.msgBld.msg(INITIALIZATION, _this7.myId, channel.peerId, {
          manager: _this7.manager.id,
          wcId: _this7.id
        });
        channel.send(msg);
        return _this7.manager.add(channel);
      });
    }

    /**
     * @private
     * @param {number} peerId
     */

  }, {
    key: 'onPeerJoin$',
    value: function onPeerJoin$(peerId) {
      this.members[this.members.length] = peerId;
      this.onPeerJoin(peerId);
    }

    /**
     * @private
     * @param {number} peerId
     */

  }, {
    key: 'onPeerLeave$',
    value: function onPeerLeave$(peerId) {
      this.members.splice(this.members.indexOf(peerId), 1);
      this.onPeerLeave(peerId);
    }

    /**
     * Send a message to a service of the same peer, joining peer or any peer in
     * the `WebChannel`.
     * @private
     * @param {number} recepient - Identifier of recepient peer id
     * @param {string} serviceId - Service id
     * @param {Object} data - Message to send
     * @param {boolean} [forward=false] - SHould the message be forwarded?
     */

  }, {
    key: 'sendInnerTo',
    value: function sendInnerTo(recepient, serviceId, data) {
      var forward = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (forward) {
        this.manager.sendInnerTo(recepient, this, data);
      } else {
        if (Number.isInteger(recepient)) {
          var msg = this.msgBld.msg(INNER_DATA, this.myId, recepient, { serviceId: serviceId, data: data });
          this.manager.sendInnerTo(recepient, this, msg);
        } else {
          recepient.send(this.msgBld.msg(INNER_DATA, this.myId, recepient.peerId, { serviceId: serviceId, data: data }));
        }
      }
    }

    /**
     * @private
     * @param {number} serviceId
     * @param {Object} data
     */

  }, {
    key: 'sendInner',
    value: function sendInner(serviceId, data) {
      this.manager.sendInner(this, this.msgBld.msg(INNER_DATA, this.myId, null, { serviceId: serviceId, data: data }));
    }

    /**
     * Message event handler (`WebChannel` mediator). All messages arrive here first.
     * @private
     * @param {Channel} channel - The channel the message came from
     * @param {external:ArrayBuffer} data - Message
     */

  }, {
    key: 'onChannelMessage',
    value: function onChannelMessage(channel, data) {
      var _this8 = this;

      var header = this.msgBld.readHeader(data);
      if (header.code === USER_DATA) {
        this.msgBld.readUserMessage(this, header.senderId, data, function (fullData, isBroadcast) {
          _this8.onMessage(header.senderId, fullData, isBroadcast);
        });
      } else {
        var msg = this.msgBld.readInternalMessage(data);
        switch (header.code) {
          case INITIALIZATION:
            {
              this.settings.topology = msg.manager;
              this.manager = ServiceFactory.get(this.settings.topology);
              this.myId = header.recepientId;
              this.id = msg.wcId;
              channel.peerId = header.senderId;
              break;
            }
          case INNER_DATA:
            {
              if (header.recepientId === 0 || this.myId === header.recepientId) {
                this.getService(msg.serviceId).onMessage(channel, header.senderId, header.recepientId, msg.data);
              } else this.sendInnerTo(header.recepientId, null, data, true);
              break;
            }
          case INIT_CHANNEL:
            {
              this.onInitChannel.get(channel.peerId).resolve();
              channel.send(this.msgBld.msg(INIT_CHANNEL_BIS, this.myId, channel.peerId));
              break;
            }
          case INIT_CHANNEL_BIS:
            {
              var resolver = this.onInitChannel.get(channel.peerId);
              if (resolver) {
                resolver.resolve();
              }
              break;
            }
          case PING:
            this.manager.sendTo(header.senderId, this, this.msgBld.msg(PONG, this.myId));
            break;
          case PONG:
            {
              var now = Date.now();
              this.pongNb++;
              this.maxTime = Math.max(this.maxTime, now - this.pingTime);
              if (this.pongNb === this.members.length) {
                this.pingFinish(this.maxTime);
                this.pingTime = 0;
              }
              break;
            }
          default:
            throw new Error('Unknown message type code: "' + header.code + '"');
        }
      }
    }

    /**
     * Initialize channel. The *Channel* object is a facade for *WebSocket* and
     * *RTCDataChannel*.
     * @private
     * @param {external:WebSocket|external:RTCDataChannel} ch - Channel to
     * initialize
     * @param {number} [id] - Assign an id to this channel. It would be generated
     * if not provided
     * @returns {Promise} - Resolved once the channel is initialized on both sides
     */

  }, {
    key: 'initChannel',
    value: function initChannel(ch) {
      var _this9 = this;

      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      return new Promise(function (_resolve, reject) {
        if (id === -1) id = _this9.generateId();
        var channel = new Channel(ch);
        channel.peerId = id;
        channel.webChannel = _this9;
        channel.onMessage = function (data) {
          return _this9.onChannelMessage(channel, data);
        };
        channel.onClose = function (closeEvt) {
          return _this9.manager.onChannelClose(closeEvt, channel);
        };
        channel.onError = function (evt) {
          return _this9.manager.onChannelError(evt, channel);
        };
        _this9.onInitChannel.set(channel.peerId, { resolve: function resolve() {
            _this9.onInitChannel.delete(channel.peerId);
            _resolve(channel);
          } });
        channel.send(_this9.msgBld.msg(INIT_CHANNEL, _this9.myId, channel.peerId));
      });
    }

    /**
     * @private
     * @param {MESSAGE_BUILDER|WEB_RTC|WEB_SOCKET|FULLY_CONNECTED|CHANNEL_BUILDER} id
     *
     * @returns {Service}
     */

  }, {
    key: 'getService',
    value: function getService(id) {
      if (id === WEB_RTC) {
        return ServiceFactory.get(WEB_RTC, this.settings.iceServers);
      }
      return ServiceFactory.get(id);
    }

    /**
     *
     * @private
     * @param  {[type]} key
     * @param  {[type]} options
     * @param  {[type]} resolve
     * @param  {[type]} reject
     * @param  {[type]} attempt
     * @return {void}
     */

  }, {
    key: 'joinRecursively',
    value: function joinRecursively(key, options, resolve, reject, attempt) {
      var _this10 = this;

      this.gate.join(key, options.url, options.open).then(function (connection) {
        if (connection) {
          _this10.onJoin = function () {
            return resolve();
          };
          _this10.initChannel(connection).catch(reject);
        } else {
          resolve();
        }
      }).catch(function (err) {
        attempt++;
        console.log('Failed to join via ' + options.url + ' with ' + key + ' key: ' + err.message);
        if (attempt === options.rejoinAttempts) {
          reject(new Error('Failed to join via ' + options.url + ' with ' + key + ' key: reached maximum rejoin attempts (' + REJOIN_MAX_ATTEMPTS + ')'));
        } else {
          console.log('Trying to rejoin in ' + options.rejoinTimeout + ' the ' + attempt + ' time... ');
          setTimeout(function () {
            _this10.joinRecursively(key, options, function () {
              return resolve();
            }, function (err) {
              return reject(err);
            }, attempt);
          }, options.rejoinTimeout);
        }
      });
    }

    /**
     * Generate random id for a `WebChannel` or a new peer.
     * @private
     * @returns {number} - Generated id
     */

  }, {
    key: 'generateId',
    value: function generateId() {
      var _this11 = this;

      var _loop = function _loop() {
        var id = Math.ceil(Math.random() * MAX_ID);
        if (id === _this11.myId) return 'continue';
        if (_this11.members.includes(id)) return 'continue';
        if (_this11.generatedIds.has(id)) return 'continue';
        _this11.generatedIds.add(id);
        setTimeout(function () {
          return _this11.generatedIds.delete(id);
        }, ID_TIMEOUT);
        return {
          v: id
        };
      };

      do {
        var _ret = _loop();

        switch (_ret) {
          case 'continue':
            continue;

          default:
            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
      } while (true);
    }
  }]);
  return WebChannel;
}();

var ted = Util.require(Util.TEXT_ENCODING);

/**
 * Maximum size of the user message sent over `Channel`. Is meant without metadata.
 * @type {number}
 */
var MAX_USER_MSG_SIZE = 16365;

/**
 * User message offset in the array buffer. All data before are metadata.
 * @type {number}
 */
var USER_MSG_OFFSET = 19;

/**
 * First index in the array buffer after header (which is the part of metadata).
 * @type {number}
 */
var HEADER_OFFSET = 9;

/**
 * Maximum message id number.
 * @type {number}
 */
var MAX_MSG_ID_SIZE = 65535;

/**
 * User allowed message type: {@link ArrayBuffer}
 * @type {number}
 */
var ARRAY_BUFFER_TYPE = 1;

/**
 * User allowed message type: {@link external:Uint8Array}
 * @type {number}
 */
var U_INT_8_ARRAY_TYPE = 2;

/**
 * User allowed message type: {@link external:String}
 * @type {number}
 */
var STRING_TYPE = 3;

/**
 * User allowed message type: {@link external:Int8Array}
 * @type {number}
 */
var INT_8_ARRAY_TYPE = 4;

/**
 * User allowed message type: {@link external:Uint8ClampedArray}
 * @type {number}
 */
var U_INT_8_CLAMPED_ARRAY_TYPE = 5;

/**
 * User allowed message type: {@link external:Int16Array}
 * @type {number}
 */
var INT_16_ARRAY_TYPE = 6;

/**
 * User allowed message type: {@link external:Uint16Array}
 * @type {number}
 */
var U_INT_16_ARRAY_TYPE = 7;

/**
 * User allowed message type: {@link external:Int32Array}
 * @type {number}
 */
var INT_32_ARRAY_TYPE = 8;

/**
 * User allowed message type: {@link external:Uint32Array}
 * @type {number}
 */
var U_INT_32_ARRAY_TYPE = 9;

/**
 * User allowed message type: {@link external:Float32Array}
 * @type {number}
 */
var FLOAT_32_ARRAY_TYPE = 10;

/**
 * User allowed message type: {@link external:Float64Array}
 * @type {number}
 */
var FLOAT_64_ARRAY_TYPE = 11;

/**
 * Buffer for big user messages.
 */
var buffers = new WeakMap();

/**
 * Message builder service is responsible to build messages to send them over the
 * `WebChannel` and treat messages received by the `WebChannel`. It also manage
 * big messages (more then 16ko) sent by users. Internal messages are always less
 * 16ko.
 */

var MessageBuilderService = function (_Service) {
  inherits(MessageBuilderService, _Service);

  function MessageBuilderService() {
    classCallCheck(this, MessageBuilderService);
    return possibleConstructorReturn(this, (MessageBuilderService.__proto__ || Object.getPrototypeOf(MessageBuilderService)).apply(this, arguments));
  }

  createClass(MessageBuilderService, [{
    key: 'handleUserMessage',

    /**
     * @callback MessageBuilderService~Send
     * @param {ArrayBuffer} dataChunk - If the message is too big this
     * action would be executed for each data chunk until send whole message
     */

    /**
     * @private
     * @typedef {ARRAY_BUFFER_TYPE|U_INT_8_ARRAY_TYPE|STRING_TYPE|INT_8_ARRAY_TYPE|U_INT_8_CLAMPED_ARRAY_TYPE|INT_16_ARRAY_TYPE|U_INT_16_ARRAY_TYPE|INT_32_ARRAY_TYPE|U_INT_32_ARRAY_TYPE|FLOAT_32_ARRAY_TYPE|FLOAT_64_ARRAY_TYPE} MessageTypeEnum
     */

    /**
     * Prepare user message to be sent over the `WebChannel`.
     *
     * @param {UserMessage} data Message to be sent
     * @param {number} senderId Id of the peer who sends this message
     * @param {number} recipientId Id of the recipient peer
     * @param {function(dataChunk: ArrayBuffer)} action Send callback executed for each
     * data chunk if the message is too big
     * @param {boolean} [isBroadcast=true] Equals to true if this message would be
     * sent to all `WebChannel` members and false if only to one member
     */
    value: function handleUserMessage(data, senderId, recipientId, action) {
      var isBroadcast = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      var workingData = this.userDataToType(data);
      var dataUint8Array = workingData.content;
      if (dataUint8Array.byteLength <= MAX_USER_MSG_SIZE) {
        var dataView = this.initHeader(1, senderId, recipientId, dataUint8Array.byteLength + USER_MSG_OFFSET);
        dataView.setUint32(HEADER_OFFSET, dataUint8Array.byteLength);
        dataView.setUint8(13, workingData.type);
        dataView.setUint8(14, isBroadcast ? 1 : 0);
        var resultUint8Array = new Uint8Array(dataView.buffer);
        resultUint8Array.set(dataUint8Array, USER_MSG_OFFSET);
        action(resultUint8Array.buffer);
      } else {
        var msgId = Math.ceil(Math.random() * MAX_MSG_ID_SIZE);
        var totalChunksNb = Math.ceil(dataUint8Array.byteLength / MAX_USER_MSG_SIZE);
        for (var chunkNb = 0; chunkNb < totalChunksNb; chunkNb++) {
          var currentChunkMsgByteLength = Math.min(MAX_USER_MSG_SIZE, dataUint8Array.byteLength - MAX_USER_MSG_SIZE * chunkNb);
          var _dataView = this.initHeader(USER_DATA, senderId, recipientId, USER_MSG_OFFSET + currentChunkMsgByteLength);
          _dataView.setUint32(9, dataUint8Array.byteLength);
          _dataView.setUint8(13, workingData.type);
          _dataView.setUint8(14, isBroadcast ? 1 : 0);
          _dataView.setUint16(15, msgId);
          _dataView.setUint16(17, chunkNb);
          var _resultUint8Array = new Uint8Array(_dataView.buffer);
          var j = USER_MSG_OFFSET;
          var startIndex = MAX_USER_MSG_SIZE * chunkNb;
          var endIndex = startIndex + currentChunkMsgByteLength;
          for (var i = startIndex; i < endIndex; i++) {
            _resultUint8Array[j++] = dataUint8Array[i];
          }
          action(_resultUint8Array.buffer);
        }
      }
    }

    /**
     * Build a message which can be then sent trough the `Channel`.
     *
     * @param {number} code One of the internal message type code (e.g. {@link
     * USER_DATA})
     * @param {number} [senderId=null]
     * @param {number} [recepientId=null]
     * @param {Object} [data={}] Could be empty if the code is enough
     * @returns {ArrayBuffer} - Built message
     */

  }, {
    key: 'msg',
    value: function msg(code) {
      var senderId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var recepientId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var msgEncoded = new ted.TextEncoder().encode(JSON.stringify(data));
      var msgSize = msgEncoded.byteLength + HEADER_OFFSET;
      var dataView = this.initHeader(code, senderId, recepientId, msgSize);
      var fullMsg = new Uint8Array(dataView.buffer);
      fullMsg.set(msgEncoded, HEADER_OFFSET);
      return fullMsg.buffer;
    }

    /**
     * Read user message which was prepared by another peer with
     * {@link MessageBuilderService#handleUserMessage} and sent.
     * @param {WebChannel} wc WebChannel
     * @param {number} senderId Id of the peer who sent this message
     * @param {ArrayBuffer} data Message
     * @param {function(msg: UserMessage, isBroadcast: boolean)} action Callback when the message is ready
     */

  }, {
    key: 'readUserMessage',
    value: function readUserMessage(wc, senderId, data, action) {
      var _this2 = this;

      var dataView = new DataView(data);
      var msgSize = dataView.getUint32(HEADER_OFFSET);
      var dataType = dataView.getUint8(13);
      var isBroadcast = dataView.getUint8(14);
      if (msgSize > MAX_USER_MSG_SIZE) {
        var msgId = dataView.getUint16(15);
        var chunk = dataView.getUint16(17);
        var buffer = this.getBuffer(wc, senderId, msgId);
        if (buffer === undefined) {
          this.setBuffer(wc, senderId, msgId, new Buffer(msgSize, data, chunk, function (fullData) {
            action(_this2.extractUserData(fullData, dataType), isBroadcast);
          }));
        } else {
          buffer.add(data, chunk);
        }
      } else {
        var dataArray = new Uint8Array(data);
        var userData = new Uint8Array(data.byteLength - USER_MSG_OFFSET);
        var j = USER_MSG_OFFSET;
        for (var i = 0; i < userData.byteLength; i++) {
          userData[i] = dataArray[j++];
        }
        action(this.extractUserData(userData.buffer, dataType), isBroadcast);
      }
    }

    /**
     * Read internal Netflux message.
     * @param {ArrayBuffer} data Message
     * @returns {Object}
     */

  }, {
    key: 'readInternalMessage',
    value: function readInternalMessage(data) {
      var uInt8Array = new Uint8Array(data);
      return JSON.parse(new ted.TextDecoder().decode(uInt8Array.subarray(HEADER_OFFSET, uInt8Array.byteLength)));
    }

    /**
     * Extract header from the message. Each user message has a header which is
     * a part of the message metadata.
     * @param {ArrayBuffer} data Whole message
     * @returns {MessageHeader}
     */

  }, {
    key: 'readHeader',
    value: function readHeader(data) {
      var dataView = new DataView(data);
      return {
        code: dataView.getUint8(0),
        senderId: dataView.getUint32(1),
        recepientId: dataView.getUint32(5)
      };
    }

    /**
     * Create an `ArrayBuffer` and fill in the header.
     * @private
     * @param {number} code Message type code
     * @param {number} senderId Sender peer id
     * @param {number} recipientId Recipient peer id
     * @param {number} dataSize Message size in bytes
     * @return {DataView} Data view with initialized header
     */

  }, {
    key: 'initHeader',
    value: function initHeader(code, senderId, recipientId, dataSize) {
      var dataView = new DataView(new ArrayBuffer(dataSize));
      dataView.setUint8(0, code);
      dataView.setUint32(1, senderId);
      dataView.setUint32(5, recipientId);
      return dataView;
    }

    /**
     * Netflux sends data in `ArrayBuffer`, but the user can send data in different
     * types. This function retrieve the inital message sent by the user.
     * @private
     * @param {ArrayBuffer} buffer Message as it was received by the `WebChannel`
     * @param {MessageTypeEnum} type Message type as it was defined by the user
     * @returns {ArrayBuffer|TypedArray} Initial user message
     */

  }, {
    key: 'extractUserData',
    value: function extractUserData(buffer, type) {
      switch (type) {
        case ARRAY_BUFFER_TYPE:
          return buffer;
        case U_INT_8_ARRAY_TYPE:
          return new Uint8Array(buffer);
        case STRING_TYPE:
          return new ted.TextDecoder().decode(new Uint8Array(buffer));
        case INT_8_ARRAY_TYPE:
          return new Int8Array(buffer);
        case U_INT_8_CLAMPED_ARRAY_TYPE:
          return new Uint8ClampedArray(buffer);
        case INT_16_ARRAY_TYPE:
          return new Int16Array(buffer);
        case U_INT_16_ARRAY_TYPE:
          return new Uint16Array(buffer);
        case INT_32_ARRAY_TYPE:
          return new Int32Array(buffer);
        case U_INT_32_ARRAY_TYPE:
          return new Uint32Array(buffer);
        case FLOAT_32_ARRAY_TYPE:
          return new Float32Array(buffer);
        case FLOAT_64_ARRAY_TYPE:
          return new Float64Array(buffer);
        default:
          throw new Error('Unknown type');
      }
    }

    /**
     * Identify the user message type.
     *
     * @private
     * @param {UserMessage} data User message
     * @returns {MessageTypeEnum} User message type
     */

  }, {
    key: 'userDataToType',
    value: function userDataToType(data) {
      var result = {};
      if (data instanceof ArrayBuffer) {
        result.type = ARRAY_BUFFER_TYPE;
        result.content = new Uint8Array(data);
      } else if (data instanceof Uint8Array) {
        result.type = U_INT_8_ARRAY_TYPE;
        result.content = data;
      } else if (typeof data === 'string' || data instanceof String) {
        result.type = STRING_TYPE;
        result.content = new ted.TextEncoder().encode(data);
      } else {
        result.content = new Uint8Array(data.buffer);
        if (data instanceof Int8Array) {
          result.type = INT_8_ARRAY_TYPE;
        } else if (data instanceof Uint8ClampedArray) {
          result.type = U_INT_8_CLAMPED_ARRAY_TYPE;
        } else if (data instanceof Int16Array) {
          result.type = INT_16_ARRAY_TYPE;
        } else if (data instanceof Uint16Array) {
          result.type = U_INT_16_ARRAY_TYPE;
        } else if (data instanceof Int32Array) {
          result.type = INT_32_ARRAY_TYPE;
        } else if (data instanceof Uint32Array) {
          result.type = U_INT_32_ARRAY_TYPE;
        } else if (data instanceof Float32Array) {
          result.type = FLOAT_32_ARRAY_TYPE;
        } else if (data instanceof Float64Array) {
          result.type = FLOAT_64_ARRAY_TYPE;
        } else {
          throw new Error('Unknown data object');
        }
      }
      return result;
    }

    /**
     * Get the buffer.
     * @private
     * @param {WebChannel} wc WebChannel
     * @param {number} peerId Peer id
     * @param {number} msgId Message id
     * @returns {Buffer|undefined} Returns buffer if it was found and undefined if not
     */

  }, {
    key: 'getBuffer',
    value: function getBuffer(wc, peerId, msgId) {
      var wcBuffer = buffers.get(wc);
      if (wcBuffer !== undefined) {
        var peerBuffer = wcBuffer.get(peerId);
        if (peerBuffer !== undefined) {
          return peerBuffer.get(msgId);
        }
      }
      return undefined;
    }

    /**
     * Add a new buffer to the buffer array.
     * @private
     * @param {WebChannel} wc WebChannel
     * @param {number} peerId Peer id
     * @param {number} msgId Message id
     * @param {Buffer} buffer
     */

  }, {
    key: 'setBuffer',
    value: function setBuffer(wc, peerId, msgId, buffer) {
      var wcBuffer = buffers.get(wc);
      if (wcBuffer === undefined) {
        wcBuffer = new Map();
        buffers.set(wc, wcBuffer);
      }
      var peerBuffer = wcBuffer.get(peerId);
      if (peerBuffer === undefined) {
        peerBuffer = new Map();
        wcBuffer.set(peerId, peerBuffer);
      }
      peerBuffer.set(msgId, buffer);
    }
  }]);
  return MessageBuilderService;
}(Service);

/**
 * Buffer class used when the user message exceeds the message size limit which
 * may be sent over a `Channel`. Each buffer is identified by `WebChannel` id,
 * peer id (who sends the big message) and message id (in case if the peer sends
 * more then 1 big message at a time).
 * @private
 */


var Buffer = function () {
  /**
   * @param {number} fullDataSize The total user message size
   * @param {ArrayBuffer} data The first chunk of the user message
   * @param {number} chunkNb Number of the chunk
   * @param {function(buffer: ArrayBuffer)} action Callback to be executed when all
   * message chunks are received and thus the message is ready
   */
  function Buffer(fullDataSize, data, chunkNb, action) {
    classCallCheck(this, Buffer);

    this.fullData = new Uint8Array(fullDataSize);
    this.currentSize = 0;
    this.action = action;
    this.add(data, chunkNb);
  }

  /**
   * Add a chunk of message to the buffer.
   * @param {ArrayBuffer} data - Message chunk
   * @param {number} chunkNb - Number of the chunk
   */


  createClass(Buffer, [{
    key: 'add',
    value: function add(data, chunkNb) {
      var dataChunk = new Uint8Array(data);
      var dataChunkSize = data.byteLength;
      this.currentSize += dataChunkSize - USER_MSG_OFFSET;
      var index = chunkNb * MAX_USER_MSG_SIZE;
      for (var i = USER_MSG_OFFSET; i < dataChunkSize; i++) {
        this.fullData[index++] = dataChunk[i];
      }
      if (this.currentSize === this.fullData.byteLength) {
        this.action(this.fullData.buffer);
      }
    }
  }]);
  return Buffer;
}();

/**
 * {@link WebRTCService} identifier.
 * @type {number}
 */
var WEB_RTC = 0;

/**
* {@link WebSocketService} identifier.
* @type {number}
*/
var WEB_SOCKET = 1;

/**
* {@link WebSocketService} identifier.
* @type {number}
*/
var EVENT_SOURCE = 5;

/**
 * {@link ChannelBuilderService} identifier.
 * @ignore
 * @type {number}
 */
var CHANNEL_BUILDER = 2;

/**
 * {@link FullyConnectedService} identifier.
 * @ignore
 * @type {number}
 */
var FULLY_CONNECTED = 3;

/**
 * {@link MessageBuilderService} identifier
 * @ignore
 * @type {number}
 */
var MESSAGE_BUILDER = 4;

/**
 * Contains singletons services.
 * @type {Map}
 */
var services = new Map();

/**
 * It is a factory helper class which is responsible to instantiate any service class.
 */

var ServiceFactory = function () {
  function ServiceFactory() {
    classCallCheck(this, ServiceFactory);
  }

  createClass(ServiceFactory, null, [{
    key: 'get',

    /**
     * Provides the service instance specified by `id`.
     *
     * @throws {Error} If the service `id` is unknown
     * @param  {MESSAGE_BUILDER|WEB_RTC|WEB_SOCKET|FULLY_CONNECTED|CHANNEL_BUILDER} id The service identifier
     * @param  {Object} [options] Any options that the service accepts
     * @returns {Service}
     */
    value: function get$$1(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (services.has(id)) {
        return services.get(id);
      }
      var service = void 0;
      switch (id) {
        case WEB_RTC:
          return new WebRTCService(WEB_RTC, options);
        case WEB_SOCKET:
          return new WebSocketService(WEB_SOCKET);
        case EVENT_SOURCE:
          return new EventSourceService(EVENT_SOURCE);
        case CHANNEL_BUILDER:
          return new ChannelBuilderService(CHANNEL_BUILDER);
        case FULLY_CONNECTED:
          service = new FullyConnectedService(FULLY_CONNECTED);
          services.set(id, service);
          return service;
        case MESSAGE_BUILDER:
          service = new MessageBuilderService(MESSAGE_BUILDER);
          services.set(id, service);
          return service;
        default:
          throw new Error(id + ' is an Unknown service id');
      }
    }
  }]);
  return ServiceFactory;
}();

var MESSAGE_TYPE_ERROR = 4000;
var WEB_CHANNEL_NOT_FOUND = 4001;

/**
 * BotServer can listen on web socket. A peer can invite bot to join his `WebChannel`.
 * He can also join one of the bot's `WebChannel`.
 */

var BotServer = function () {
  /**
   * Bot server settings are the same as for `WebChannel` (see {@link WebChannelSettings}),
   * plus `host` and `port` parameters.
   *
   * @param {Object} options
   * @param {WEB_RTC|WEB_SOCKET} [options.connector=WEB_SOCKET] Which connector is preferable during connection establishment
   * @param {FULLY_CONNECTED} [options.topology=FULLY_CONNECTED] Fully connected topology is the only one available for now
   * @param {string} [options.signalingURL='wss://sigver-coastteam.rhcloud.com:8443'] Signaling server url
   * @param {RTCIceServer} [options.iceServers=[{urls:'stun:turn01.uswest.xirsys.com'}]] Set of ice servers for WebRTC
   * @param {string} [options.host='localhost']
   * @param {number} [options.port=9000]
   */
  function BotServer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, BotServer);

    /**
     * Default settings.
     * @private
     * @type {Object}
     */
    this.defaultSettings = {
      connector: WEB_SOCKET,
      topology: FULLY_CONNECTED,
      signalingURL: 'wss://sigver-coastteam.rhcloud.com:8443',
      iceServers: [{ urls: 'stun:turn01.uswest.xirsys.com' }],
      host: 'localhost',
      port: 9000
    };

    /**
     * @private
     * @type {Object}
     */
    this.settings = Object.assign({}, this.defaultSettings, options);
    this.settings.listenOn = 'ws://' + this.settings.host + ':' + this.settings.port;

    /**
     * @type {WebSocketServer}
     */
    this.server = null;

    /**
     * @type {WebChannel[]}
     */
    this.webChannels = [];

    /**
     * @type {function(wc: WebChannel)}
     */
    this.onWebChannel = function () {};
  }

  /**
   * Starts listen on socket.
   *
   * @returns {Promise<undefined,string>}
   */


  createClass(BotServer, [{
    key: 'start',
    value: function start() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var WebSocketServer = void 0;
        try {
          console.log('uws module would be used for Bot server');
          WebSocketServer = __webpack_require__(25).Server;
        } catch (err) {
          try {
            console.log(err.message + '. ws module will be used for Bot server instead');
            WebSocketServer = Util.require('ws').Server;
          } catch (err) {
            console.log(err.message + '. Bot server cannot be run');
          }
        }
        if (WebSocketServer === undefined) {
          console.log('Could not find uws module, thus ws module will be used for Bot server instead');
          WebSocketServer = Util.require('ws').Server;
        }

        _this.server = new WebSocketServer({
          host: _this.settings.host,
          port: _this.settings.port
        }, resolve);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this.webChannels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var wc = _step.value;

            wc.settings.listenOn = _this.settings.listenOn;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        _this.server.on('error', function (err) {
          console.error('Server error: ', err);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = _this.webChannels[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var wc = _step2.value;

              wc.settings.listenOn = '';
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          reject(err);
        });

        _this.server.on('connection', function (ws) {
          ws.onmessage = function (msgEvt) {
            try {
              var msg = JSON.parse(msgEvt.data);
              if ('join' in msg) {
                var wc = _this.getWebChannel(msg.join);
                if (wc === null) {
                  ws.send(JSON.stringify({ first: false, useThis: false }));
                } else {
                  ws.send(JSON.stringify({ first: false, useThis: true }));
                  wc.invite(ws);
                }
              } else if ('wcId' in msg) {
                var _wc = _this.getWebChannel(msg.wcId);
                if ('senderId' in msg) {
                  if (_wc !== null) {
                    ServiceFactory.get(CHANNEL_BUILDER).onChannel(_wc, ws, msg.senderId);
                  } else {
                    ws.close(WEB_CHANNEL_NOT_FOUND, msg.wcId + ' webChannel was not found (message received from ' + msg.senderId + ')');
                    console.error(msg.wcId + ' webChannel was not found (message received from ' + msg.senderId + ')');
                  }
                } else if ('check' in msg) {
                  if (_wc === null || _wc.members.length === 0) {
                    ws.send(JSON.stringify({ inviteOk: true }));
                  } else {
                    ws.send(JSON.stringify({ inviteOk: false }));
                    console.error('Bot refused to join ' + msg.wcId + ' webChannel, because it is already in use');
                  }
                } else {
                  if (_wc === null) {
                    _wc = new WebChannel(_this.settings);
                    _wc.id = msg.wcId;
                    _this.addWebChannel(_wc);
                    _wc.join(ws).then(function () {
                      _this.onWebChannel(_wc);
                    });
                  } else if (_wc.members.length === 0) {
                    _this.removeWebChannel(_wc);
                    _wc = new WebChannel(_this.settings);
                    _wc.id = msg.wcId;
                    _this.addWebChannel(_wc);
                    _wc.join(ws).then(function () {
                      _this.onWebChannel(_wc);
                    });
                  } else {
                    ws.close();
                  }
                }
              }
            } catch (err) {
              ws.close(MESSAGE_TYPE_ERROR, 'Unsupported message type: ' + err.message);
              console.error('Unsupported message type: ' + err.message);
            }
          };
        });
      });
    }

    /**
     * Stops listen on web socket.
     */

  }, {
    key: 'stop',
    value: function stop() {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.webChannels[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var wc = _step3.value;

          wc.settings.listenOn = '';
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      this.server.close();
    }

    /**
     * Get `WebChannel` identified by its `id`.
     *
     * @param {number} id
     *
     * @returns {WebChannel|null}
     */

  }, {
    key: 'getWebChannel',
    value: function getWebChannel(id) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.webChannels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var wc = _step4.value;

          if (id === wc.id) return wc;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return null;
    }

    /**
     * Add `WebChannel`.
     *
     * @param {WebChannel} wc
     */

  }, {
    key: 'addWebChannel',
    value: function addWebChannel(wc) {
      this.webChannels[this.webChannels.length] = wc;
    }

    /**
     * Remove `WebChannel`
     *
     * @param {WebChannel} wc
     */

  }, {
    key: 'removeWebChannel',
    value: function removeWebChannel(wc) {
      this.webChannels.splice(this.webChannels.indexOf(wc), 1);
    }
  }]);
  return BotServer;
}();

/**
 * Create `WebChannel`.
 *
 * @param {WebChannelSettings} options
 * @param {WEB_RTC|WEB_SOCKET} [options.connector=WEB_RTC] Which connector is preferable during connection establishment
 * @param {FULLY_CONNECTED} [options.topology=FULLY_CONNECTED] Fully connected topology is the only one available for now
 * @param {string} [options.signalingURL='wss://sigver-coastteam.rhcloud.com:8443'] Signaling server url
 * @param {RTCIceServer} [options.iceServers=[{urls:'stun:turn01.uswest.xirsys.com'}]] Set of ice servers for WebRTC
 * @param {string} [options.listenOn=''] Server url when the peer is listen on web socket
 *
 * @returns {WebChannel}
 */
function create(options) {
  var defaultSettings = {
    connector: WEB_RTC,
    topology: FULLY_CONNECTED,
    signalingURL: 'wss://sigver-coastteam.rhcloud.com:8443',
    iceServers: [{ urls: 'stun:turn01.uswest.xirsys.com' }],
    listenOn: ''
  };
  var mySettings = Object.assign({}, defaultSettings, options);
  return new WebChannel(mySettings);
}



/**
 * An event handler to be called when the *close* event is received either by the *WebSocket* or by the *RTCDataChannel*.
 * @callback closeEventHandler
 * @param {external:CloseEvent} evt Close event object
 */

/**
 * An event handler to be called when a *Channel* has been established.
 * @callback channelEventHandler
 * @param {Channel} channel Netflux channel
 */




/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __webpack_require__(1);
const mute_core_1 = __webpack_require__(16);
const log_1 = __webpack_require__(5);
const pb = __webpack_require__(49);
// TODO: BotStorage should serialize document in DB
class BotStorage {
    constructor(pseudonym, webChannel, mongooseAdapter) {
        this.pseudonym = pseudonym;
        this.joinSubject = new rxjs_1.Subject();
        this.messageSubject = new rxjs_1.ReplaySubject();
        this.peerJoinSubject = new rxjs_1.ReplaySubject();
        this.peerLeaveSubject = new rxjs_1.ReplaySubject();
        this.stateSubject = new rxjs_1.Subject();
        this.webChannel = webChannel;
        webChannel.onMessage = (id, bytes, isBroadcast) => {
            const msg = pb.Message.deserializeBinary(bytes);
            if (msg.getService() === 'botprotocol') {
                const docKey = pb.BotProtocol.deserializeBinary(msg.getContent()).getKey();
                this.mongooseAdapter.find(docKey)
                    .then((doc) => {
                    this.initMuteCore(docKey);
                    this.joinSubject.next(new mute_core_1.JoinEvent(this.webChannel.myId, docKey, false));
                    if (doc === null) {
                        log_1.log.info(`Document ${docKey} was not found in database, thus create a new document`);
                        this.stateSubject.next(new mute_core_1.State(new Map(), []));
                    }
                    else {
                        log_1.log.info(`Document ${docKey} retreived from database`);
                        this.stateSubject.next(new mute_core_1.State(new Map(), doc));
                    }
                })
                    .catch((err) => {
                    log_1.log.error(`Error when searching for the document ${docKey}`, err);
                });
                webChannel.onMessage = (id, bytes, isBroadcast) => {
                    const msg = pb.Message.deserializeBinary(bytes);
                    this.messageSubject.next(new mute_core_1.NetworkMessage(msg.getService(), id, isBroadcast, msg.getContent()));
                };
            }
            else {
                this.messageSubject.next(new mute_core_1.NetworkMessage(msg.getService(), id, isBroadcast, msg.getContent()));
            }
        };
        const msg = new pb.BotProtocol();
        msg.setKey('');
        webChannel.sendTo(webChannel.members[0], this.buildMessage({
            service: 'botprotocol',
            content: msg.serializeBinary()
        }));
        // this.sendMyUrl()
        webChannel.onPeerJoin = (id) => {
            // this.sendMyUrl(id)
            this.peerJoinSubject.next(id);
        };
        webChannel.onPeerLeave = (id) => this.peerLeaveSubject.next(id);
        this.mongooseAdapter = mongooseAdapter;
    }
    initMuteCore(docKey) {
        // TODO: MuteCore should consume doc Object
        this.muteCore = new mute_core_1.MuteCore(42);
        this.muteCore.messageSource = this.messageSubject.asObservable();
        this.muteCore.onMsgToBroadcast.subscribe((bm) => {
            this.webChannel.send(this.buildMessage(bm));
        });
        this.muteCore.onMsgToSendRandomly.subscribe((srm) => {
            const index = Math.ceil(Math.random() * this.webChannel.members.length) - 1;
            this.webChannel.sendTo(this.webChannel.members[index], this.buildMessage(srm));
        });
        this.muteCore.onMsgToSendTo.subscribe((stm) => {
            this.webChannel.sendTo(stm.id, this.buildMessage(stm));
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
    sendMyUrl(id) {
        const msg = new pb.BotResponse();
        msg.setUrl(this.url);
        if (id !== undefined) {
            this.webChannel.sendTo(this.webChannel.members[0], this.buildMessage({
                service: 'botprotocol',
                content: msg.serializeBinary()
            }));
        }
        else {
            this.webChannel.send(this.buildMessage({
                service: 'botprotocol',
                content: msg.serializeBinary()
            }));
        }
    }
    buildMessage(msg) {
        const pbMsg = new pb.Message();
        pbMsg.setService(msg.service);
        pbMsg.setContent(msg.content);
        return pbMsg.serializeBinary();
    }
}
exports.BotStorage = BotStorage;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(52);
const mute_core_1 = __webpack_require__(16);
const log_1 = __webpack_require__(5);
class MongooseAdapter {
    constructor() {
        this.docSchema = new mongoose.Schema({
            key: { type: String, require: true },
            doc: { type: Object }
        });
        this.docModel = mongoose.model('Doc', this.docSchema);
    }
    connect(url) {
        const uri = `mongodb://${url}/docs`;
        return mongoose.connect(uri)
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
    save(key, doc) {
        const query = { key };
        const update = { doc };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        return this.docModel.findOneAndUpdate(query, update, options).exec();
    }
}
exports.MongooseAdapter = MongooseAdapter;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(1);
var _1 = __webpack_require__(14);
var _2 = __webpack_require__(15);
var _3 = __webpack_require__(18);
var MuteCore = (function () {
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
    MuteCore.prototype.clean = function () {
        this.collaboratorsService.clean();
        this.docService.clean();
        this.syncService.clean();
        this.syncMessageService.clean();
    };
    return MuteCore;
}());
exports.MuteCore = MuteCore;
//# sourceMappingURL=MuteCore.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(1);
var _1 = __webpack_require__(6);
var Collaborator_1 = __webpack_require__(13);
var pb = __webpack_require__(43);
var CollaboratorsService = (function () {
    function CollaboratorsService() {
        this.collaboratorChangePseudoSubject = new rxjs_1.Subject();
        this.collaboratorJoinSubject = new rxjs_1.Subject();
        this.collaboratorLeaveSubject = new rxjs_1.Subject();
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
                .filter(function (msg) { return msg.service === CollaboratorsService.ID; })
                .subscribe(function (msg) {
                var pbCollaborator = new pb.Collaborator.deserializeBinary(msg.content);
                var id = msg.id;
                var pseudo = pbCollaborator.getPseudo();
                _this.collaboratorChangePseudoSubject.next(new Collaborator_1.Collaborator(id, pseudo));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollaboratorsService.prototype, "peerJoinSource", {
        set: function (source) {
            var _this = this;
            this.peerJoinSubscription = source.subscribe(function (id) {
                _this.emitPseudo(_this.pseudonym, id);
                _this.collaboratorJoinSubject.next(new Collaborator_1.Collaborator(id, 'Anonymous'));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollaboratorsService.prototype, "peerLeaveSource", {
        set: function (source) {
            var _this = this;
            this.peerLeaveSubscription = source.subscribe(function (id) {
                _this.collaboratorLeaveSubject.next(id);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollaboratorsService.prototype, "pseudoSource", {
        set: function (source) {
            var _this = this;
            this.pseudoSubscription = source.subscribe(function (pseudo) {
                _this.pseudonym = pseudo;
                _this.emitPseudo(pseudo);
            });
        },
        enumerable: true,
        configurable: true
    });
    CollaboratorsService.prototype.emitPseudo = function (pseudo, id) {
        var collabMsg = new pb.Collaborator();
        collabMsg.setPseudo(pseudo);
        if (id) {
            var msg = new _1.SendToMessage(CollaboratorsService.ID, id, collabMsg.serializeBinary());
            this.msgToSendToSubject.next(msg);
        }
        else {
            var msg = new _1.BroadcastMessage(CollaboratorsService.ID, collabMsg.serializeBinary());
            this.msgToBroadcastSubject.next(msg);
        }
    };
    CollaboratorsService.prototype.clean = function () {
        this.collaboratorChangePseudoSubject.complete();
        this.collaboratorJoinSubject.complete();
        this.collaboratorLeaveSubject.complete();
        this.msgToBroadcastSubject.complete();
        this.msgToSendRandomlySubject.complete();
        this.msgToSendToSubject.complete();
        this.peerJoinSubscription.unsubscribe();
        this.peerLeaveSubscription.unsubscribe();
        this.pseudoSubscription.unsubscribe();
    };
    return CollaboratorsService;
}());
CollaboratorsService.ID = 'Collaborators';
exports.CollaboratorsService = CollaboratorsService;
//# sourceMappingURL=CollaboratorsService.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(1);
var mute_structs_1 = __webpack_require__(10);
var DocService = (function () {
    function DocService(id) {
        this.doc = new mute_structs_1.LogootSRopes(id);
        this.disposeSubject = new rxjs_1.Subject();
        this.docDigestSubject = new rxjs_1.Subject();
        this.docTreeSubject = new rxjs_1.Subject();
        this.docValueSubject = new rxjs_1.Subject();
        this.localLogootSOperationSubject = new rxjs_1.Subject();
        this.remoteTextOperationsSubject = new rxjs_1.Subject();
    }
    Object.defineProperty(DocService.prototype, "initSource", {
        set: function (source) {
            var _this = this;
            source
                .takeUntil(this.disposeSubject)
                .subscribe(function (key) {
                _this.docID = key;
                _this.docValueSubject.next(_this.doc.str);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocService.prototype, "localTextOperationsSource", {
        set: function (source) {
            var _this = this;
            this.localOperationsSubscription = source.subscribe(function (textOperations) {
                _this.handleTextOperations(textOperations);
            });
            source
                .takeUntil(this.disposeSubject)
                .debounceTime(1000)
                .subscribe(function () {
                _this.docTreeSubject.next(JSON.stringify(_this.doc));
                _this.docDigestSubject.next(_this.doc.digest());
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocService.prototype, "remoteLogootSOperationSource", {
        set: function (source) {
            var _this = this;
            this.remoteLogootSOperationsSubscription = source.subscribe(function (logootSOps) {
                var remoteTextOps = logootSOps
                    .map(function (logootSOp) {
                    return _this.handleRemoteOperation(logootSOp);
                })
                    .reduce(function (acc, textOps) {
                    return acc.concat(textOps);
                }, []);
                _this.remoteTextOperationsSubject.next(remoteTextOps);
            });
            source
                .takeUntil(this.disposeSubject)
                .debounceTime(1000)
                .subscribe(function () {
                _this.docTreeSubject.next(JSON.stringify(_this.doc));
                _this.docDigestSubject.next(_this.doc.digest());
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
    Object.defineProperty(DocService.prototype, "onDocValue", {
        get: function () {
            return this.docValueSubject.asObservable();
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
    DocService.prototype.clean = function () {
        this.disposeSubject.complete();
        this.docValueSubject.complete();
        this.localLogootSOperationSubject.complete();
        this.remoteTextOperationsSubject.complete();
        this.localOperationsSubscription.unsubscribe();
        this.remoteLogootSOperationsSubscription.unsubscribe();
    };
    DocService.prototype.handleTextOperations = function (array) {
        var _this = this;
        array.forEach(function (textOperations) {
            textOperations.forEach(function (textOperation) {
                var logootSOperation = textOperation.applyTo(_this.doc);
                _this.localLogootSOperationSubject.next(logootSOperation);
            });
        });
        // log.info('operation:doc', 'updated doc: ', this.doc)
    };
    DocService.prototype.handleRemoteOperation = function (logootSOperation) {
        var textOperations = logootSOperation.execute(this.doc);
        // log.info('operation:doc', 'updated doc: ', this.doc)
        return textOperations;
    };
    DocService.prototype.idFromIndex = function (index) {
        var respIntnode = this.doc.searchNode(index);
        if (respIntnode !== null) {
            return {
                index: respIntnode.i,
                last: respIntnode.node.offset + respIntnode.i,
                base: respIntnode.node.block.id.base
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
/* 36 */
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
var AbstractMessage_1 = __webpack_require__(2);
var BroadcastMessage = (function (_super) {
    __extends(BroadcastMessage, _super);
    function BroadcastMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BroadcastMessage;
}(AbstractMessage_1.AbstractMessage));
exports.BroadcastMessage = BroadcastMessage;
//# sourceMappingURL=BroadcastMessage.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JoinEvent = (function () {
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
/* 38 */
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
var AbstractMessage_1 = __webpack_require__(2);
var NetworkMessage = (function (_super) {
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
/* 39 */
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
var AbstractMessage_1 = __webpack_require__(2);
var SendRandomlyMessage = (function (_super) {
    __extends(SendRandomlyMessage, _super);
    function SendRandomlyMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SendRandomlyMessage;
}(AbstractMessage_1.AbstractMessage));
exports.SendRandomlyMessage = SendRandomlyMessage;
//# sourceMappingURL=SendRandomlyMessage.js.map

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
var AbstractMessage_1 = __webpack_require__(2);
var SendToMessage = (function (_super) {
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mute_structs_1 = __webpack_require__(10);
var rxjs_1 = __webpack_require__(1);
var Interval_1 = __webpack_require__(7);
var _1 = __webpack_require__(6);
var ReplySyncEvent_1 = __webpack_require__(8);
var RichLogootSOperation_1 = __webpack_require__(9);
var pb = __webpack_require__(44);
var SyncMessageService = (function () {
    function SyncMessageService() {
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
            this.localRichLogootSOperationSubscription = source.subscribe(function (richLogootSOp) {
                var richLogootSOpMsg = _this.generateRichLogootSOpMsg(richLogootSOp);
                var msg = new _1.BroadcastMessage(SyncMessageService.ID, richLogootSOpMsg.serializeBinary());
                _this.msgToBroadcastSubject.next(msg);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncMessageService.prototype, "messageSource", {
        set: function (source) {
            var _this = this;
            this.messageSubscription = source
                .filter(function (msg) { return msg.service === SyncMessageService.ID; })
                .subscribe(function (msg) {
                var content = new pb.Sync.deserializeBinary(msg.content);
                switch (content.getTypeCase()) {
                    case pb.Sync.TypeCase.RICHLOGOOTSOP:
                        _this.handleRichLogootSOpMsg(content.getRichlogootsop());
                        break;
                    case pb.Sync.TypeCase.QUERYSYNC:
                        _this.remoteQuerySyncIdSubject.next(msg.id); // Register the id of the peer
                        _this.handleQuerySyncMsg(content.getQuerysync());
                        break;
                    case pb.Sync.TypeCase.REPLYSYNC:
                        _this.handleReplySyncMsg(content.getReplysync());
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
            this.querySyncSubscription = source.subscribe(function (vector) {
                var querySyncMsg = _this.generateQuerySyncMsg(vector);
                var msg = new _1.SendRandomlyMessage(SyncMessageService.ID, querySyncMsg.serializeBinary());
                _this.msgToSendRandomlySubject.next(msg);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncMessageService.prototype, "replySyncSource", {
        set: function (source) {
            var _this = this;
            this.replySyncSubscription = rxjs_1.Observable.zip(source, this.remoteQuerySyncIdSubject.asObservable(), function (replySyncEvent, id) {
                return { id: id, replySyncEvent: replySyncEvent };
            })
                .subscribe(function (_a) {
                var id = _a.id, replySyncEvent = _a.replySyncEvent;
                var replySyncMsg = _this.generateReplySyncMsg(replySyncEvent.richLogootSOps, replySyncEvent.intervals);
                var msg = new _1.SendToMessage(SyncMessageService.ID, id, replySyncMsg.serializeBinary());
                _this.msgToSendToSubject.next(msg);
            });
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
    SyncMessageService.prototype.clean = function () {
        this.msgToBroadcastSubject.complete();
        this.msgToSendRandomlySubject.complete();
        this.msgToSendToSubject.complete();
        this.remoteQuerySyncSubject.complete();
        this.remoteQuerySyncIdSubject.complete();
        this.remoteRichLogootSOperationSubject.complete();
        this.remoteReplySyncSubject.complete();
        this.localRichLogootSOperationSubscription.unsubscribe();
        this.messageSubscription.unsubscribe();
        this.querySyncSubscription.unsubscribe();
        this.replySyncSubscription.unsubscribe();
    };
    SyncMessageService.prototype.handleRichLogootSOpMsg = function (content) {
        var richLogootSOp = this.deserializeRichLogootSOperation(content);
        this.remoteRichLogootSOperationSubject.next(richLogootSOp);
    };
    SyncMessageService.prototype.handleQuerySyncMsg = function (content) {
        var vector = content.getVectorMap();
        this.remoteQuerySyncSubject.next(vector);
    };
    SyncMessageService.prototype.handleReplySyncMsg = function (content) {
        var _this = this;
        var richLogootSOpsList = content.getRichlogootsopsList();
        var richLogootSOps = richLogootSOpsList.map(function (richLogootSOpMsg) {
            return _this.deserializeRichLogootSOperation(richLogootSOpMsg);
        });
        var intervals = content.getIntervalsList().map(function (interval) {
            return new Interval_1.Interval(interval.getId(), interval.getBegin(), interval.getEnd());
        });
        var replySyncEvent = new ReplySyncEvent_1.ReplySyncEvent(richLogootSOps, intervals);
        this.remoteReplySyncSubject.next(replySyncEvent);
    };
    SyncMessageService.prototype.generateRichLogootSOpMsg = function (richLogootSOp) {
        var richLogootSOperationMsg = this.serializeRichLogootSOperation(richLogootSOp);
        var msg = new pb.Sync();
        msg.setRichlogootsop(richLogootSOperationMsg);
        return msg;
    };
    SyncMessageService.prototype.serializeRichLogootSOperation = function (richLogootSOp) {
        var richLogootSOperationMsg = new pb.RichLogootSOperation();
        richLogootSOperationMsg.setId(richLogootSOp.id);
        richLogootSOperationMsg.setClock(richLogootSOp.clock);
        var logootSOp = richLogootSOp.logootSOp;
        if (logootSOp instanceof mute_structs_1.LogootSAdd) {
            richLogootSOperationMsg.setLogootsadd(this.generateLogootSAddMsg(logootSOp));
        }
        else if (logootSOp instanceof mute_structs_1.LogootSDel) {
            richLogootSOperationMsg.setLogootsdel(this.generateLogootSDelMsg(logootSOp));
        }
        return richLogootSOperationMsg;
    };
    SyncMessageService.prototype.deserializeRichLogootSOperation = function (content) {
        var id = content.getId();
        var clock = content.getClock();
        var logootSOp;
        if (content.hasLogootsadd()) {
            var logootSAddMsg = content.getLogootsadd();
            var identifier = new mute_structs_1.Identifier(logootSAddMsg.getId().getBaseList(), logootSAddMsg.getId().getLast());
            logootSOp = new mute_structs_1.LogootSAdd(identifier, logootSAddMsg.getContent());
        }
        else {
            var logootSDelMsg = content.getLogootsdel();
            var lid = logootSDelMsg.getLidList().map(function (identifier) {
                return new mute_structs_1.IdentifierInterval(identifier.getBaseList(), identifier.getBegin(), identifier.getEnd());
            });
            logootSOp = new mute_structs_1.LogootSDel(lid);
        }
        return new RichLogootSOperation_1.RichLogootSOperation(id, clock, logootSOp);
    };
    SyncMessageService.prototype.generateLogootSAddMsg = function (logootSAdd) {
        var identifier = new pb.Identifier();
        identifier.setBaseList(logootSAdd.id.base);
        identifier.setLast(logootSAdd.id.last);
        var logootSAddMsg = new pb.LogootSAdd();
        logootSAddMsg.setId(identifier);
        logootSAddMsg.setContent(logootSAdd.l);
        return logootSAddMsg;
    };
    SyncMessageService.prototype.generateLogootSDelMsg = function (logootSDel) {
        var _this = this;
        var lid = logootSDel.lid.map(function (id) {
            var identifierInterval = _this.generateIdentifierIntervalMsg(id);
            return identifierInterval;
        });
        var logootSDelMsg = new pb.LogootSDel();
        logootSDelMsg.setLidList(lid);
        return logootSDelMsg;
    };
    SyncMessageService.prototype.generateIdentifierIntervalMsg = function (id) {
        var identifierIntervalMsg = new pb.IdentifierInterval();
        identifierIntervalMsg.setBaseList(id.base);
        identifierIntervalMsg.setBegin(id.begin);
        identifierIntervalMsg.setEnd(id.end);
        return identifierIntervalMsg;
    };
    SyncMessageService.prototype.generateQuerySyncMsg = function (vector) {
        var querySyncMsg = new pb.QuerySync();
        var map = querySyncMsg.getVectorMap();
        vector.forEach(function (clock, id) {
            map.set(id, clock);
        });
        var msg = new pb.Sync();
        msg.setQuerysync(querySyncMsg);
        return msg;
    };
    SyncMessageService.prototype.generateReplySyncMsg = function (richLogootSOps, intervals) {
        var _this = this;
        var replySyncMsg = new pb.ReplySync();
        replySyncMsg.setRichlogootsopsList(richLogootSOps.map(function (richLogootSOp) {
            return _this.serializeRichLogootSOperation(richLogootSOp);
        }));
        var intervalsMsg = intervals.map(function (interval) {
            var intervalMsg = new pb.Interval();
            intervalMsg.setId(interval.id);
            intervalMsg.setBegin(interval.begin);
            intervalMsg.setEnd(interval.end);
            return intervalMsg;
        });
        replySyncMsg.setIntervalsList(intervalsMsg);
        var msg = new pb.Sync();
        msg.setReplysync(replySyncMsg);
        return msg;
    };
    return SyncMessageService;
}());
SyncMessageService.ID = 'SyncMessage';
exports.SyncMessageService = SyncMessageService;
//# sourceMappingURL=SyncMessageService.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(1);
var Interval_1 = __webpack_require__(7);
var ReplySyncEvent_1 = __webpack_require__(8);
var RichLogootSOperation_1 = __webpack_require__(9);
var State_1 = __webpack_require__(17);
var SyncService = (function () {
    function SyncService(id) {
        this.id = -1;
        this.clock = 0;
        this.vector = new Map();
        this.richLogootSOps = [];
        this.id = id;
        this.appliedOperationsSubject = new rxjs_1.Subject();
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
            return new State_1.State(this.vector, this.richLogootSOps);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncService.prototype, "localLogootSOperationSource", {
        set: function (source) {
            var _this = this;
            this.localLogootSOperationSubscription = source.subscribe(function (logootSOp) {
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
            this.remoteQuerySyncSubscription = source.subscribe(function (vector) {
                var missingRichLogootSOps = _this.richLogootSOps.filter(function (richLogootSOperation) {
                    var id = richLogootSOperation.id;
                    var clock = richLogootSOperation.clock;
                    var v = vector.get(id);
                    return v === undefined ? true : v < clock ? true : false;
                });
                // TODO: Add sort function to apply LogootSAdd operations before LogootSDel ones
                var missingIntervals = [];
                vector.forEach(function (clock, id) {
                    var v = _this.vector.get(id);
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
            this.remoteReplySyncSubscription = source.subscribe(function (replySyncEvent) {
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
            this.remoteRichLogootSOperationSubscription = source.subscribe(function (richLogootSOp) {
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
            this.storedStateSubscription = source.subscribe(function (state) {
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
            triggerQuerySyncObservable = joinSource.zip(this.isReadySubject, function (joinEvent) {
                return joinEvent;
            });
        }
        triggerQuerySyncObservable
            .take(1)
            .subscribe(function (joinEvent) {
            if (!joinEvent.created) {
                console.log('SyncService: performing querySync at init');
                _this.querySyncSubject.next(_this.vector);
            }
        });
    };
    SyncService.prototype.initPeriodicQuerySync = function () {
        var _this = this;
        this.triggerQuerySyncSubscription = this.triggerQuerySyncSubject.subscribe(function () {
            console.log('SyncService: performing a periodic querySync');
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
    SyncService.prototype.clean = function () {
        this.appliedOperationsSubject.complete();
        this.isReadySubject.complete();
        this.localRichLogootSOperationSubject.complete();
        this.querySyncSubject.complete();
        this.remoteLogootSOperationSubject.complete();
        this.replySyncSubject.complete();
        this.stateSubject.complete();
        this.localLogootSOperationSubscription.unsubscribe();
        this.remoteQuerySyncSubscription.unsubscribe();
        this.remoteReplySyncSubscription.unsubscribe();
        this.remoteRichLogootSOperationSubscription.unsubscribe();
        if (this.storedStateSubscription !== undefined) {
            this.storedStateSubscription.unsubscribe();
        }
        this.triggerQuerySyncSubscription.unsubscribe();
    };
    SyncService.prototype.applyRichLogootSOperations = function (richLogootSOps) {
        var _this = this;
        // Keep only new operations
        var newRichLogootSOps = richLogootSOps.filter(function (richLogootSOp) {
            var id = richLogootSOp.id;
            var clock = richLogootSOp.clock;
            return !_this.isAlreadyApplied(id, clock);
        });
        if (newRichLogootSOps.length > 0) {
            var logootSOperations_1 = [];
            newRichLogootSOps
                .forEach(function (richLogootSOp) {
                var id = richLogootSOp.id;
                var clock = richLogootSOp.clock;
                if (_this.isAppliable(id, clock)) {
                    _this.updateState(richLogootSOp);
                    logootSOperations_1.push(richLogootSOp.logootSOp);
                    // Notify that the operation has been delivered
                    _this.appliedOperationsSubject.next({ id: id, clock: clock });
                }
                else {
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
                        if (!_this.isAlreadyApplied(id, clock)) {
                            _this.applyRichLogootSOperations([richLogootSOp]);
                        }
                    });
                }
            });
            this.remoteLogootSOperationSubject.next(logootSOperations_1);
        }
    };
    SyncService.prototype.updateState = function (richLogootSOp) {
        console.assert(this.isAppliable(richLogootSOp.id, richLogootSOp.clock));
        this.vector.set(richLogootSOp.id, richLogootSOp.clock);
        this.richLogootSOps.push(richLogootSOp);
    };
    SyncService.prototype.isAlreadyApplied = function (id, clock) {
        var v = this.vector.get(id);
        return v !== undefined && v >= clock;
    };
    SyncService.prototype.isAppliable = function (id, clock) {
        if (this.isAlreadyApplied(id, clock)) {
            return false;
        }
        var v = this.vector.get(id);
        if (v === undefined) {
            return clock === 0;
        }
        return clock === v + 1;
    };
    return SyncService;
}());
exports.SyncService = SyncService;
//# sourceMappingURL=SyncService.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(12);
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.Collaborator', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Collaborator = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Collaborator, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Collaborator.displayName = 'proto.Collaborator';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Collaborator.prototype.toObject = function(opt_includeInstance) {
  return proto.Collaborator.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Collaborator} msg The msg instance to transform.
 * @return {!Object}
 */
proto.Collaborator.toObject = function(includeInstance, msg) {
  var f, obj = {
    pseudo: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Collaborator}
 */
proto.Collaborator.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Collaborator;
  return proto.Collaborator.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Collaborator} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Collaborator}
 */
proto.Collaborator.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setPseudo(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.Collaborator} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.Collaborator.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Collaborator.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.Collaborator.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getPseudo();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string pseudo = 1;
 * @return {string}
 */
proto.Collaborator.prototype.getPseudo = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.Collaborator.prototype.setPseudo = function(value) {
  jspb.Message.setField(this, 1, value);
};


goog.object.extend(exports, proto);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(12);
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.Identifier', null, global);
goog.exportSymbol('proto.IdentifierInterval', null, global);
goog.exportSymbol('proto.Interval', null, global);
goog.exportSymbol('proto.LogootSAdd', null, global);
goog.exportSymbol('proto.LogootSDel', null, global);
goog.exportSymbol('proto.QuerySync', null, global);
goog.exportSymbol('proto.ReplySync', null, global);
goog.exportSymbol('proto.RichLogootSOperation', null, global);
goog.exportSymbol('proto.Sync', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Sync = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.Sync.oneofGroups_);
};
goog.inherits(proto.Sync, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Sync.displayName = 'proto.Sync';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.Sync.oneofGroups_ = [[1,2,3]];

/**
 * @enum {number}
 */
proto.Sync.TypeCase = {
  TYPE_NOT_SET: 0,
  RICHLOGOOTSOP: 1,
  QUERYSYNC: 2,
  REPLYSYNC: 3
};

/**
 * @return {proto.Sync.TypeCase}
 */
proto.Sync.prototype.getTypeCase = function() {
  return /** @type {proto.Sync.TypeCase} */(jspb.Message.computeOneofCase(this, proto.Sync.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Sync.prototype.toObject = function(opt_includeInstance) {
  return proto.Sync.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Sync} msg The msg instance to transform.
 * @return {!Object}
 */
proto.Sync.toObject = function(includeInstance, msg) {
  var f, obj = {
    richlogootsop: (f = msg.getRichlogootsop()) && proto.RichLogootSOperation.toObject(includeInstance, f),
    querysync: (f = msg.getQuerysync()) && proto.QuerySync.toObject(includeInstance, f),
    replysync: (f = msg.getReplysync()) && proto.ReplySync.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Sync}
 */
proto.Sync.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Sync;
  return proto.Sync.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Sync} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Sync}
 */
proto.Sync.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.RichLogootSOperation;
      reader.readMessage(value,proto.RichLogootSOperation.deserializeBinaryFromReader);
      msg.setRichlogootsop(value);
      break;
    case 2:
      var value = new proto.QuerySync;
      reader.readMessage(value,proto.QuerySync.deserializeBinaryFromReader);
      msg.setQuerysync(value);
      break;
    case 3:
      var value = new proto.ReplySync;
      reader.readMessage(value,proto.ReplySync.deserializeBinaryFromReader);
      msg.setReplysync(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.Sync} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.Sync.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Sync.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.Sync.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getRichlogootsop();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.RichLogootSOperation.serializeBinaryToWriter
    );
  }
  f = this.getQuerysync();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.QuerySync.serializeBinaryToWriter
    );
  }
  f = this.getReplysync();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.ReplySync.serializeBinaryToWriter
    );
  }
};


/**
 * optional RichLogootSOperation richLogootSOp = 1;
 * @return {?proto.RichLogootSOperation}
 */
proto.Sync.prototype.getRichlogootsop = function() {
  return /** @type{?proto.RichLogootSOperation} */ (
    jspb.Message.getWrapperField(this, proto.RichLogootSOperation, 1));
};


/** @param {?proto.RichLogootSOperation|undefined} value */
proto.Sync.prototype.setRichlogootsop = function(value) {
  jspb.Message.setOneofWrapperField(this, 1, proto.Sync.oneofGroups_[0], value);
};


proto.Sync.prototype.clearRichlogootsop = function() {
  this.setRichlogootsop(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Sync.prototype.hasRichlogootsop = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional QuerySync querySync = 2;
 * @return {?proto.QuerySync}
 */
proto.Sync.prototype.getQuerysync = function() {
  return /** @type{?proto.QuerySync} */ (
    jspb.Message.getWrapperField(this, proto.QuerySync, 2));
};


/** @param {?proto.QuerySync|undefined} value */
proto.Sync.prototype.setQuerysync = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.Sync.oneofGroups_[0], value);
};


proto.Sync.prototype.clearQuerysync = function() {
  this.setQuerysync(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Sync.prototype.hasQuerysync = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional ReplySync replySync = 3;
 * @return {?proto.ReplySync}
 */
proto.Sync.prototype.getReplysync = function() {
  return /** @type{?proto.ReplySync} */ (
    jspb.Message.getWrapperField(this, proto.ReplySync, 3));
};


/** @param {?proto.ReplySync|undefined} value */
proto.Sync.prototype.setReplysync = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.Sync.oneofGroups_[0], value);
};


proto.Sync.prototype.clearReplysync = function() {
  this.setReplysync(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Sync.prototype.hasReplysync = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.RichLogootSOperation = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.RichLogootSOperation.oneofGroups_);
};
goog.inherits(proto.RichLogootSOperation, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.RichLogootSOperation.displayName = 'proto.RichLogootSOperation';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.RichLogootSOperation.oneofGroups_ = [[3,4]];

/**
 * @enum {number}
 */
proto.RichLogootSOperation.TypeCase = {
  TYPE_NOT_SET: 0,
  LOGOOTSADD: 3,
  LOGOOTSDEL: 4
};

/**
 * @return {proto.RichLogootSOperation.TypeCase}
 */
proto.RichLogootSOperation.prototype.getTypeCase = function() {
  return /** @type {proto.RichLogootSOperation.TypeCase} */(jspb.Message.computeOneofCase(this, proto.RichLogootSOperation.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.RichLogootSOperation.prototype.toObject = function(opt_includeInstance) {
  return proto.RichLogootSOperation.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.RichLogootSOperation} msg The msg instance to transform.
 * @return {!Object}
 */
proto.RichLogootSOperation.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    clock: jspb.Message.getFieldWithDefault(msg, 2, 0),
    logootsadd: (f = msg.getLogootsadd()) && proto.LogootSAdd.toObject(includeInstance, f),
    logootsdel: (f = msg.getLogootsdel()) && proto.LogootSDel.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.RichLogootSOperation}
 */
proto.RichLogootSOperation.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.RichLogootSOperation;
  return proto.RichLogootSOperation.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.RichLogootSOperation} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.RichLogootSOperation}
 */
proto.RichLogootSOperation.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setClock(value);
      break;
    case 3:
      var value = new proto.LogootSAdd;
      reader.readMessage(value,proto.LogootSAdd.deserializeBinaryFromReader);
      msg.setLogootsadd(value);
      break;
    case 4:
      var value = new proto.LogootSDel;
      reader.readMessage(value,proto.LogootSDel.deserializeBinaryFromReader);
      msg.setLogootsdel(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.RichLogootSOperation} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.RichLogootSOperation.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.RichLogootSOperation.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.RichLogootSOperation.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = this.getClock();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = this.getLogootsadd();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.LogootSAdd.serializeBinaryToWriter
    );
  }
  f = this.getLogootsdel();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.LogootSDel.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 id = 1;
 * @return {number}
 */
proto.RichLogootSOperation.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.RichLogootSOperation.prototype.setId = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional int32 clock = 2;
 * @return {number}
 */
proto.RichLogootSOperation.prototype.getClock = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.RichLogootSOperation.prototype.setClock = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional LogootSAdd logootSAdd = 3;
 * @return {?proto.LogootSAdd}
 */
proto.RichLogootSOperation.prototype.getLogootsadd = function() {
  return /** @type{?proto.LogootSAdd} */ (
    jspb.Message.getWrapperField(this, proto.LogootSAdd, 3));
};


/** @param {?proto.LogootSAdd|undefined} value */
proto.RichLogootSOperation.prototype.setLogootsadd = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.RichLogootSOperation.oneofGroups_[0], value);
};


proto.RichLogootSOperation.prototype.clearLogootsadd = function() {
  this.setLogootsadd(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.RichLogootSOperation.prototype.hasLogootsadd = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional LogootSDel logootSDel = 4;
 * @return {?proto.LogootSDel}
 */
proto.RichLogootSOperation.prototype.getLogootsdel = function() {
  return /** @type{?proto.LogootSDel} */ (
    jspb.Message.getWrapperField(this, proto.LogootSDel, 4));
};


/** @param {?proto.LogootSDel|undefined} value */
proto.RichLogootSOperation.prototype.setLogootsdel = function(value) {
  jspb.Message.setOneofWrapperField(this, 4, proto.RichLogootSOperation.oneofGroups_[0], value);
};


proto.RichLogootSOperation.prototype.clearLogootsdel = function() {
  this.setLogootsdel(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.RichLogootSOperation.prototype.hasLogootsdel = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.LogootSAdd = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.LogootSAdd, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.LogootSAdd.displayName = 'proto.LogootSAdd';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.LogootSAdd.prototype.toObject = function(opt_includeInstance) {
  return proto.LogootSAdd.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.LogootSAdd} msg The msg instance to transform.
 * @return {!Object}
 */
proto.LogootSAdd.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: (f = msg.getId()) && proto.Identifier.toObject(includeInstance, f),
    content: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.LogootSAdd}
 */
proto.LogootSAdd.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.LogootSAdd;
  return proto.LogootSAdd.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.LogootSAdd} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.LogootSAdd}
 */
proto.LogootSAdd.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Identifier;
      reader.readMessage(value,proto.Identifier.deserializeBinaryFromReader);
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.LogootSAdd} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.LogootSAdd.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.LogootSAdd.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.LogootSAdd.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getId();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.Identifier.serializeBinaryToWriter
    );
  }
  f = this.getContent();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional Identifier id = 1;
 * @return {?proto.Identifier}
 */
proto.LogootSAdd.prototype.getId = function() {
  return /** @type{?proto.Identifier} */ (
    jspb.Message.getWrapperField(this, proto.Identifier, 1));
};


/** @param {?proto.Identifier|undefined} value */
proto.LogootSAdd.prototype.setId = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.LogootSAdd.prototype.clearId = function() {
  this.setId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.LogootSAdd.prototype.hasId = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string content = 2;
 * @return {string}
 */
proto.LogootSAdd.prototype.getContent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.LogootSAdd.prototype.setContent = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Identifier = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Identifier.repeatedFields_, null);
};
goog.inherits(proto.Identifier, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Identifier.displayName = 'proto.Identifier';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Identifier.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Identifier.prototype.toObject = function(opt_includeInstance) {
  return proto.Identifier.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Identifier} msg The msg instance to transform.
 * @return {!Object}
 */
proto.Identifier.toObject = function(includeInstance, msg) {
  var f, obj = {
    baseList: jspb.Message.getField(msg, 1),
    last: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Identifier}
 */
proto.Identifier.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Identifier;
  return proto.Identifier.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Identifier} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Identifier}
 */
proto.Identifier.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Array.<number>} */ (reader.readPackedInt32());
      msg.setBaseList(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setLast(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.Identifier} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.Identifier.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Identifier.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.Identifier.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getBaseList();
  if (f.length > 0) {
    writer.writePackedInt32(
      1,
      f
    );
  }
  f = this.getLast();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * repeated int32 base = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<number>}
 */
proto.Identifier.prototype.getBaseList = function() {
  return /** @type {!Array.<number>} */ (jspb.Message.getField(this, 1));
};


/** @param {!Array.<number>} value */
proto.Identifier.prototype.setBaseList = function(value) {
  jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {!number} value
 * @param {number=} opt_index
 */
proto.Identifier.prototype.addBase = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


proto.Identifier.prototype.clearBaseList = function() {
  this.setBaseList([]);
};


/**
 * optional int32 last = 2;
 * @return {number}
 */
proto.Identifier.prototype.getLast = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.Identifier.prototype.setLast = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.LogootSDel = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.LogootSDel.repeatedFields_, null);
};
goog.inherits(proto.LogootSDel, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.LogootSDel.displayName = 'proto.LogootSDel';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.LogootSDel.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.LogootSDel.prototype.toObject = function(opt_includeInstance) {
  return proto.LogootSDel.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.LogootSDel} msg The msg instance to transform.
 * @return {!Object}
 */
proto.LogootSDel.toObject = function(includeInstance, msg) {
  var f, obj = {
    lidList: jspb.Message.toObjectList(msg.getLidList(),
    proto.IdentifierInterval.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.LogootSDel}
 */
proto.LogootSDel.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.LogootSDel;
  return proto.LogootSDel.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.LogootSDel} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.LogootSDel}
 */
proto.LogootSDel.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.IdentifierInterval;
      reader.readMessage(value,proto.IdentifierInterval.deserializeBinaryFromReader);
      msg.addLid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.LogootSDel} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.LogootSDel.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.LogootSDel.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.LogootSDel.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getLidList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.IdentifierInterval.serializeBinaryToWriter
    );
  }
};


/**
 * repeated IdentifierInterval lid = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.IdentifierInterval>}
 */
proto.LogootSDel.prototype.getLidList = function() {
  return /** @type{!Array.<!proto.IdentifierInterval>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.IdentifierInterval, 1));
};


/** @param {!Array.<!proto.IdentifierInterval>} value */
proto.LogootSDel.prototype.setLidList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.IdentifierInterval=} opt_value
 * @param {number=} opt_index
 * @return {!proto.IdentifierInterval}
 */
proto.LogootSDel.prototype.addLid = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.IdentifierInterval, opt_index);
};


proto.LogootSDel.prototype.clearLidList = function() {
  this.setLidList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.IdentifierInterval = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.IdentifierInterval.repeatedFields_, null);
};
goog.inherits(proto.IdentifierInterval, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.IdentifierInterval.displayName = 'proto.IdentifierInterval';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.IdentifierInterval.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.IdentifierInterval.prototype.toObject = function(opt_includeInstance) {
  return proto.IdentifierInterval.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.IdentifierInterval} msg The msg instance to transform.
 * @return {!Object}
 */
proto.IdentifierInterval.toObject = function(includeInstance, msg) {
  var f, obj = {
    baseList: jspb.Message.getField(msg, 1),
    begin: jspb.Message.getFieldWithDefault(msg, 2, 0),
    end: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.IdentifierInterval}
 */
proto.IdentifierInterval.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.IdentifierInterval;
  return proto.IdentifierInterval.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.IdentifierInterval} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.IdentifierInterval}
 */
proto.IdentifierInterval.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Array.<number>} */ (reader.readPackedInt32());
      msg.setBaseList(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBegin(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEnd(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.IdentifierInterval} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.IdentifierInterval.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.IdentifierInterval.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.IdentifierInterval.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getBaseList();
  if (f.length > 0) {
    writer.writePackedInt32(
      1,
      f
    );
  }
  f = this.getBegin();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = this.getEnd();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * repeated int32 base = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<number>}
 */
proto.IdentifierInterval.prototype.getBaseList = function() {
  return /** @type {!Array.<number>} */ (jspb.Message.getField(this, 1));
};


/** @param {!Array.<number>} value */
proto.IdentifierInterval.prototype.setBaseList = function(value) {
  jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {!number} value
 * @param {number=} opt_index
 */
proto.IdentifierInterval.prototype.addBase = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


proto.IdentifierInterval.prototype.clearBaseList = function() {
  this.setBaseList([]);
};


/**
 * optional int32 begin = 2;
 * @return {number}
 */
proto.IdentifierInterval.prototype.getBegin = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.IdentifierInterval.prototype.setBegin = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional int32 end = 3;
 * @return {number}
 */
proto.IdentifierInterval.prototype.getEnd = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.IdentifierInterval.prototype.setEnd = function(value) {
  jspb.Message.setField(this, 3, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.QuerySync = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.QuerySync, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.QuerySync.displayName = 'proto.QuerySync';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.QuerySync.prototype.toObject = function(opt_includeInstance) {
  return proto.QuerySync.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.QuerySync} msg The msg instance to transform.
 * @return {!Object}
 */
proto.QuerySync.toObject = function(includeInstance, msg) {
  var f, obj = {
    vectorMap: (f = msg.getVectorMap()) ? f.toArray() : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.QuerySync}
 */
proto.QuerySync.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.QuerySync;
  return proto.QuerySync.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.QuerySync} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.QuerySync}
 */
proto.QuerySync.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = msg.getVectorMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readInt32, jspb.BinaryReader.prototype.readInt32);
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.QuerySync} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.QuerySync.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.QuerySync.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.QuerySync.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getVectorMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(1, writer, jspb.BinaryWriter.prototype.writeInt32, jspb.BinaryWriter.prototype.writeInt32);
  }
};


/**
 * map<int32, int32> vector = 1;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<number,number>}
 */
proto.QuerySync.prototype.getVectorMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<number,number>} */ (
      jspb.Message.getMapField(this, 1, opt_noLazyCreate,
      null));
};


proto.QuerySync.prototype.clearVectorMap = function() {
  this.getVectorMap().clear();
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ReplySync = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ReplySync.repeatedFields_, null);
};
goog.inherits(proto.ReplySync, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.ReplySync.displayName = 'proto.ReplySync';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ReplySync.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ReplySync.prototype.toObject = function(opt_includeInstance) {
  return proto.ReplySync.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ReplySync} msg The msg instance to transform.
 * @return {!Object}
 */
proto.ReplySync.toObject = function(includeInstance, msg) {
  var f, obj = {
    richlogootsopsList: jspb.Message.toObjectList(msg.getRichlogootsopsList(),
    proto.RichLogootSOperation.toObject, includeInstance),
    intervalsList: jspb.Message.toObjectList(msg.getIntervalsList(),
    proto.Interval.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ReplySync}
 */
proto.ReplySync.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ReplySync;
  return proto.ReplySync.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ReplySync} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ReplySync}
 */
proto.ReplySync.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.RichLogootSOperation;
      reader.readMessage(value,proto.RichLogootSOperation.deserializeBinaryFromReader);
      msg.addRichlogootsops(value);
      break;
    case 2:
      var value = new proto.Interval;
      reader.readMessage(value,proto.Interval.deserializeBinaryFromReader);
      msg.addIntervals(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.ReplySync} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.ReplySync.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ReplySync.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.ReplySync.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getRichlogootsopsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.RichLogootSOperation.serializeBinaryToWriter
    );
  }
  f = this.getIntervalsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.Interval.serializeBinaryToWriter
    );
  }
};


/**
 * repeated RichLogootSOperation richLogootSOps = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.RichLogootSOperation>}
 */
proto.ReplySync.prototype.getRichlogootsopsList = function() {
  return /** @type{!Array.<!proto.RichLogootSOperation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.RichLogootSOperation, 1));
};


/** @param {!Array.<!proto.RichLogootSOperation>} value */
proto.ReplySync.prototype.setRichlogootsopsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.RichLogootSOperation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.RichLogootSOperation}
 */
proto.ReplySync.prototype.addRichlogootsops = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.RichLogootSOperation, opt_index);
};


proto.ReplySync.prototype.clearRichlogootsopsList = function() {
  this.setRichlogootsopsList([]);
};


/**
 * repeated Interval intervals = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.Interval>}
 */
proto.ReplySync.prototype.getIntervalsList = function() {
  return /** @type{!Array.<!proto.Interval>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Interval, 2));
};


/** @param {!Array.<!proto.Interval>} value */
proto.ReplySync.prototype.setIntervalsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.Interval=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Interval}
 */
proto.ReplySync.prototype.addIntervals = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.Interval, opt_index);
};


proto.ReplySync.prototype.clearIntervalsList = function() {
  this.setIntervalsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Interval = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Interval, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Interval.displayName = 'proto.Interval';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Interval.prototype.toObject = function(opt_includeInstance) {
  return proto.Interval.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Interval} msg The msg instance to transform.
 * @return {!Object}
 */
proto.Interval.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    begin: jspb.Message.getFieldWithDefault(msg, 2, 0),
    end: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Interval}
 */
proto.Interval.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Interval;
  return proto.Interval.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Interval} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Interval}
 */
proto.Interval.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBegin(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEnd(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.Interval} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.Interval.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Interval.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.Interval.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = this.getBegin();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = this.getEnd();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
};


/**
 * optional int32 id = 1;
 * @return {number}
 */
proto.Interval.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.Interval.prototype.setId = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional int32 begin = 2;
 * @return {number}
 */
proto.Interval.prototype.getBegin = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.Interval.prototype.setBegin = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional int32 end = 3;
 * @return {number}
 */
proto.Interval.prototype.getEnd = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.Interval.prototype.setEnd = function(value) {
  jspb.Message.setField(this, 3, value);
};


goog.object.extend(exports, proto);


/***/ }),
/* 45 */
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

var infinitestring_1 = __webpack_require__(46);
var identifier_1 = __webpack_require__(3);
function isMine(replica) {
    return function (base) { return base[base.length - 2] === replica; };
}
exports.isMine = isMine;
/**
 * Holds the minimum value an integer can have.
 */
var INT_32_MIN_VALUE = -0x80000000;
/**
 * Holds the maximum value an integer can have.
 */
var INT_32_MAX_VALUE = 0x7fffffff;
function createBetweenPosition(id1, id2, replicaNumber, clock) {
    console.assert(id1 === null || id1 instanceof identifier_1.Identifier, "id1 = " + id1);
    console.assert(id2 === null || id2 instanceof identifier_1.Identifier, "id2 = ", id2);
    console.assert(typeof replicaNumber === "number", "replicaNumber = ", replicaNumber);
    console.assert(typeof clock === "number", "clock = ", clock);
    var s1 = new infinitestring_1.InfiniteString(id1 !== null ? id1.base.concat(id1.last) : [], INT_32_MIN_VALUE);
    var s2 = new infinitestring_1.InfiniteString(id2 !== null ? id2.base.concat(id2.last) : [], INT_32_MAX_VALUE);
    var sb = [];
    do {
        var b1 = s1.next();
        var b2 = s2.next();
        if (b2 - b1 > 2) {
            var f = (Math.random() * (b2 - b1 - 2)) + b1 + 1;
            var i = f | 0; // Truncate the float in order to get a 32bits int
            sb.push(i);
            break;
        }
        else {
            sb.push(b1);
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
/* 46 */
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

var InfiniteString = (function () {
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

var identifierinterval_1 = __webpack_require__(0);
var IteratorHelperIdentifier = (function () {
    function IteratorHelperIdentifier(id1, id2) {
        console.assert(id1 instanceof identifierinterval_1.IdentifierInterval, "id1 = ", id1);
        console.assert(id2 instanceof identifierinterval_1.IdentifierInterval, "id2 = ", id2);
        this.id1 = id1;
        this.id2 = id2;
        this.nextOffset = -1;
    }
    IteratorHelperIdentifier.prototype.compareBase = function () {
        var b1 = this.id1.base;
        var b2 = this.id2.base;
        var minLength = Math.min(b1.length, b2.length);
        var i = 0;
        while (i < minLength && b1[i] === b2[i]) {
            i++;
        }
        if (i === minLength) {
            if (b1.length > minLength) {
                this.nextOffset = b1[i];
                if (this.nextOffset < this.id2.begin) {
                    return 1 /* B1_BEFORE_B2 */;
                }
                else if (this.nextOffset >= this.id2.end) {
                    return 0 /* B1_AFTER_B2 */;
                }
                else {
                    return 2 /* B1_INSIDE_B2 */;
                }
            }
            else if (b2.length > minLength) {
                this.nextOffset = b2[i];
                if (this.nextOffset < this.id1.begin) {
                    return 0 /* B1_AFTER_B2 */;
                }
                else if (this.nextOffset >= this.id1.end) {
                    return 1 /* B1_BEFORE_B2 */;
                }
                else {
                    return 3 /* B2_INSIDE_B1 */;
                }
            }
            else {
                if (this.id1.begin === this.id2.begin && this.id1.end === this.id2.end) {
                    return 6 /* B1_EQUALS_B2 */;
                }
                else if ((this.id1.end + 1) === this.id2.begin) {
                    return 4 /* B1_CONCAT_B2 */;
                }
                else if (this.id1.begin === (this.id2.end + 1)) {
                    return 5 /* B2_CONCAT_B1 */;
                }
                else if (this.id1.end < this.id2.begin) {
                    return 1 /* B1_BEFORE_B2 */;
                }
                else if (this.id2.end < this.id1.begin) {
                    return 0 /* B1_AFTER_B2 */;
                }
                else {
                    // This case should not occur
                    // Only malicious users would generate such operations
                    console.warn('IteratorHelperIdentifier.compareBase: ', this.id1, this.id2);
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
    };
    return IteratorHelperIdentifier;
}());
exports.IteratorHelperIdentifier = IteratorHelperIdentifier;
//# sourceMappingURL=iteratorhelperidentifier.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const netflux_1 = __webpack_require__(26);
const https = __webpack_require__(32);
const http = __webpack_require__(31);
const express = __webpack_require__(30);
const program = __webpack_require__(29);
const BotStorage_1 = __webpack_require__(27);
const MongooseAdapter_1 = __webpack_require__(28);
const log_1 = __webpack_require__(5);
// Default options
const defaults = {
    name: 'Repono',
    host: '',
    port: 8080,
    portBot: 9000,
    signalingURL: 'ws://vps387425.ovh.net:8000',
    useHttps: false,
    logLevel: 'info',
    logIntoFile: false
};
// Configure command-line interface
program
    .option('-n, --name <bot name>', `Specify a name for the bot, DEFAULT: "${defaults.name}"`, defaults.name)
    .option('-h, --host <ip or host name>', `Specify host address to bind to, DEFAULT: "${defaults.host}"`)
    .option('-p, --port <n>', `Specify port to use for the server (REST API), DEFAULT: ${defaults.port}`, defaults.port)
    .option('-b, --portBot <n>', `Specify port to use for the peer to peer bot, DEFAULT: ${defaults.portBot}`, defaults.portBot)
    .option('-s, --signalingURL <url>', `Specify Signaling server url for the peer to peer bot, DEFAULT: ${defaults.signalingURL}\n`, defaults.signalingURL)
    .option('-t, --https', `If present, the REST API server is listening on HTTPS instead of HTTP`)
    .option('-l, --logLevel <none|trace|debug|info|warn|error|fatal>', `Specify level for logging. DEFAULT: "info". `, /^(none|trace|debug|info|warn|error|fatal)$/i, defaults.logLevel)
    .option('-f, --logFile', `If specified, writes logs into file`)
    .parse(process.argv);
if (!program.host) {
    throw new Error('-h, --host options is required');
}
// Setup settings
const { name, host, port, portBot, signalingURL, logLevel } = program;
const useHttps = program.useHttps ? true : false;
const logIntoFile = program.logFile ? true : false;
// Configure logging
log_1.createLogger(logIntoFile, logLevel);
// Configure error handling on process
process.on('uncaughtException', (err) => log_1.log.fatal(err));
// Connect to MongoDB
let error = null;
const mongooseAdapter = new MongooseAdapter_1.MongooseAdapter();
mongooseAdapter.connect('localhost')
    .then(() => {
    log_1.log.info(`Successfully connected to the database`);
    // Configure & Start Peer To Peer storage bot
    const bot = new netflux_1.BotServer({ host: host, port: portBot, signalingURL });
    bot.onWebChannel = (wc) => {
        log_1.log.info('New peer to peer network invitation received. Waiting for a document key...');
        new BotStorage_1.BotStorage(name, wc, mongooseAdapter);
    };
    return bot.start();
})
    .then(() => {
    log_1.log.info(`Successfully started the storage bot server at ws://${host}:${portBot}`);
})
    .catch((err) => {
    error = err;
    log_1.log.fatal(`Error during database/bot initialization`, err);
});
// Configure & Start REST server
const app = express();
// Configure CORS: Cross-origin resource sharing middleware
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/name', (req, res) => {
    if (error === null) {
        res.send(name);
    }
    else {
        res.status(503).send(error.message);
    }
});
app.get('/docs', (req, res) => {
    mongooseAdapter.list()
        .then((docs) => {
        const docList = docs.map((doc) => { return { id: doc.key }; });
        res.json(docList);
    })
        .catch((err) => {
        log_1.log.error('Could not retreive the document list stored in database', err);
        res.status(500).send(err.message);
    });
});
// Start listen on http(s)
const server = useHttps ? https.createServer(app) : http.createServer(app);
server.listen(port, host, () => {
    log_1.log.info('Current settings are\n', { name, host, port, portBot, signalingURL, useHttps, logLevel, logIntoFile });
    log_1.log.info(`Successfully started the REST API server at http${useHttps ? 's' : ''}://${host}:${port}`);
});


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(12);
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.BotProtocol', null, global);
goog.exportSymbol('proto.BotResponse', null, global);
goog.exportSymbol('proto.Message', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Message = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Message, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Message.displayName = 'proto.Message';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Message.prototype.toObject = function(opt_includeInstance) {
  return proto.Message.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Message} msg The msg instance to transform.
 * @return {!Object}
 */
proto.Message.toObject = function(includeInstance, msg) {
  var f, obj = {
    service: jspb.Message.getFieldWithDefault(msg, 1, ""),
    content: msg.getContent_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Message}
 */
proto.Message.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Message;
  return proto.Message.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Message} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Message}
 */
proto.Message.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setService(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Message.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Message.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Message} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.Message.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getService();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContent_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional string service = 1;
 * @return {string}
 */
proto.Message.prototype.getService = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.Message.prototype.setService = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional bytes content = 2;
 * @return {!(string|Uint8Array)}
 */
proto.Message.prototype.getContent = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes content = 2;
 * This is a type-conversion wrapper around `getContent()`
 * @return {string}
 */
proto.Message.prototype.getContent_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getContent()));
};


/**
 * optional bytes content = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getContent()`
 * @return {!Uint8Array}
 */
proto.Message.prototype.getContent_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getContent()));
};


/** @param {!(string|Uint8Array)} value */
proto.Message.prototype.setContent = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.BotProtocol = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.BotProtocol, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.BotProtocol.displayName = 'proto.BotProtocol';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.BotProtocol.prototype.toObject = function(opt_includeInstance) {
  return proto.BotProtocol.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.BotProtocol} msg The msg instance to transform.
 * @return {!Object}
 */
proto.BotProtocol.toObject = function(includeInstance, msg) {
  var f, obj = {
    key: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.BotProtocol}
 */
proto.BotProtocol.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.BotProtocol;
  return proto.BotProtocol.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.BotProtocol} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.BotProtocol}
 */
proto.BotProtocol.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setKey(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.BotProtocol.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.BotProtocol.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.BotProtocol} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.BotProtocol.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getKey();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string key = 1;
 * @return {string}
 */
proto.BotProtocol.prototype.getKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.BotProtocol.prototype.setKey = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.BotResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.BotResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.BotResponse.displayName = 'proto.BotResponse';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.BotResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.BotResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.BotResponse} msg The msg instance to transform.
 * @return {!Object}
 */
proto.BotResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    url: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.BotResponse}
 */
proto.BotResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.BotResponse;
  return proto.BotResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.BotResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.BotResponse}
 */
proto.BotResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.BotResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.BotResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.BotResponse} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.BotResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUrl();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string url = 1;
 * @return {string}
 */
proto.BotResponse.prototype.getUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.BotResponse.prototype.setUrl = function(value) {
  jspb.Message.setField(this, 1, value);
};


goog.object.extend(exports, proto);


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("eventsource");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("text-encoding");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("wrtc");

/***/ })
/******/ ]);