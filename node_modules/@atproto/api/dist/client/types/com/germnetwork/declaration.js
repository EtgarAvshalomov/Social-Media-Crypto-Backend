"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMain = isMain;
exports.isRecord = isMain;
exports.validateMain = validateMain;
exports.validateRecord = validateMain;
exports.isMessageMe = isMessageMe;
exports.validateMessageMe = validateMessageMe;
const lexicons_1 = require("../../../lexicons");
const util_1 = require("../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.germnetwork.declaration';
const hashMain = 'main';
function isMain(v) {
    return is$typed(v, id, hashMain);
}
function validateMain(v) {
    return validate(v, id, hashMain, true);
}
const hashMessageMe = 'messageMe';
function isMessageMe(v) {
    return is$typed(v, id, hashMessageMe);
}
function validateMessageMe(v) {
    return validate(v, id, hashMessageMe);
}
//# sourceMappingURL=declaration.js.map