const { isString } = require('lodash');

function isStringOrNull(value) {
    return isString(value) || value === null;
}

function isMatchType(value) {
    const arr = ['Crash', 'Hazard', 'Theft', 'Unconfirmed', 'Infrastructure issue', 'Chop shop'];

    return arr.includes(value);
}

module.exports = {
    isStringOrNull,
    isMatchType,
};
