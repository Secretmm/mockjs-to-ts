"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var prettier = require("prettier");
function printToFile(name, mockjsObj) {
    var content = convert(mockjsObj);
    return fs.writeFileSync(name + ".ts", prettier.format("interface StringIndex<T> {\n        [index: string]: T;\n    }\n    interface " + name + " " + content, { parser: 'typescript', singleQuote: true, tabWidth: 4 }));
}
exports.printToFile = printToFile;
function convert(mockjsObj) {
    var parsed = parse(mockjsObj);
    var result = parsed.map(dispatch);
    var content = generate(result);
    return content;
}
exports.convert = convert;
function convert3(mockjsObj) {
    var parsed = parse(mockjsObj);
    var result = parsed.map(dispatch);
    var content = generate3(result);
    return content;
}
exports.convert3 = convert3;
function parse(mockjsObj) {
    var parsed = [];
    for (var rawKey in mockjsObj) {
        var value = mockjsObj[rawKey];
        var _a = rawKey.split('|'), key = _a[0], rule = _a[1];
        parsed.push({
            key: key,
            rule: rule,
            value: value
        });
    }
    return parsed;
}
function dispatch(entry) {
    var result = {
        key: entry.key,
        type: 'string'
    };
    var type = typeof entry.value;
    result.type = type; // string | number | boolean | function
    switch (type) {
        case 'object': {
            if (entry.value instanceof Array) {
                if (!entry.value.length) {
                    result.type = 'Array<any>';
                    break;
                }
                var item = entry.value[0];
                var itemType = typeof item;
                var finalType = itemType;
                var toElement = entry.rule === '1' || entry.rule === '+1'; // generate value is item of array
                if (itemType === 'object') {
                    var parsed_1 = parse(item);
                    finalType = generate(parsed_1.map(dispatch));
                }
                result.type = toElement ? finalType : "Array<" + finalType + ">";
                break;
            }
            // RegExp generate string
            if (entry.value instanceof RegExp) {
                result.type = 'string';
                break;
            }
            // string index
            if (entry.rule && entry.rule.match(/^[0-9]+(-[0-9]+)?$/)) {
                var parsed_2 = parse(entry.value);
                var value = parsed_2[0].value; // assume has same value type
                result.type = "StringIndex<" + generate(parse(value).map(dispatch)) + ">";
                break;
            }
            // normal object
            var parsed = parse(entry.value);
            result.type = generate(parsed.map(dispatch));
            break;
        }
        default:
            break;
    }
    return result;
}
var toCamelCaseVar = function (variable) {
    return variable.replace(/\_+[a-zA-Z]/g, function (str, index) { return index ? str.substr(-1).toUpperCase() : str; });
};
function generate(result) {
    var content = "{\n    " + result
        .map(function (item) {
        return item.key + ': ' + item.type + ';';
    })
        .join('\n    ') + "\n}\n";
    return content;
}
function generate3(result) {
    var content = "{\n    " + result
        .map(function (item) {
        return toCamelCaseVar(item.key) + ': ' + item.type + ';';
    })
        .join('\n    ') + "\n}\n";
    return content;
}
