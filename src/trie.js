"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.IpPrefixTrie = void 0;
var getIpAddrBits = function (addr) {
    return addr
        .split(".")
        .flatMap(function (p) {
        return __spreadArray([], Number.parseInt(p, 10).toString(2).padStart(8, "0")).map(function (c) {
            return c == "0" ? 0 : 1;
        });
    });
};
var IpPrefixTrie = /** @class */ (function () {
    function IpPrefixTrie(root) {
        if (root === void 0) { root = []; }
        this.root = root;
    }
    IpPrefixTrie.prototype.add = function (cidr, country) {
        var _a;
        if (!/^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/.test(cidr)) {
            throw new SyntaxError("Invalid CIDR: " + cidr);
        }
        var _b = cidr.split("/"), addr = _b[0], len = _b[1];
        var binStr = getIpAddrBits(addr).slice(0, +len);
        var cur = this.root;
        for (var _i = 0, binStr_1 = binStr; _i < binStr_1.length; _i++) {
            var bit = binStr_1[_i];
            cur = (_a = cur[bit]) !== null && _a !== void 0 ? _a : (cur[bit] = []);
        }
        if (cur[2] !== undefined && cur[2] !== country) {
            console.warn("Conflict for " + cidr + ": " + cur[2] + " will be replaced with " + country);
        }
        cur[2] = country;
    };
    IpPrefixTrie.prototype.check = function (ip) {
        var bits = getIpAddrBits(ip);
        var m = undefined;
        var cur = this.root;
        for (var _i = 0, bits_1 = bits; _i < bits_1.length; _i++) {
            var bit = bits_1[_i];
            cur = cur[bit];
            if (!cur) {
                break;
            }
            if (cur[2] != undefined) {
                m = cur[2];
            }
        }
        return m;
    };
    return IpPrefixTrie;
}());
exports.IpPrefixTrie = IpPrefixTrie;
