"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getPercentage = exports.getGeneralMinMax = exports.getDataByState = exports.processCSV = exports.readFile = exports.extensionValidate = exports.existenceValidate = void 0;
var fs = require('fs'); // importo modulo fs
var path = require('path');
var existenceValidate = function (route) { return fs.existsSync(route) ? true : false; };
exports.existenceValidate = existenceValidate;
var extensionValidate = function (route) { return path.extname(route) === '.csv' ? true : false; };
exports.extensionValidate = extensionValidate;
var readFile = function (route) { return fs.readFileSync(route).toString(); };
exports.readFile = readFile;
var processCSV = function (fileContent, withoutHeader) {
    if (withoutHeader === void 0) { withoutHeader = false; }
    return fileContent.slice(withoutHeader ? fileContent.indexOf('\n') + 1 : 0) /// ajusta encabezado
        .split('\n') /// selecc por salto de linea
        .map(function (rowCity) { return rowCity.split(","); });
}; // separa por ,
exports.processCSV = processCSV;
var cleanData = function (value) { return Number(value.match(/([0-9])+/g)); }; /// tomar solo números
var selectTotalPopulation = function (row) { return row.findIndex(function (i) { return i === ' US"'; }) == -1 ? 13 : row.findIndex(function (i) { return i === ' US"'; }) + 1; };
var getDataByState = function (arrayCities, getTotalPopulation) {
    if (getTotalPopulation === void 0) { getTotalPopulation = false; }
    return arrayCities.reduce(function (acumulator, row) {
        if (!acumulator[row[6]]) {
            acumulator[row[6]] = cleanData(row[getTotalPopulation ? selectTotalPopulation(row) : row.length - 1]);
        }
        else {
            acumulator[row[6]] = acumulator[row[6]] + cleanData(row[getTotalPopulation ? selectTotalPopulation(row) : row.length - 1]);
        }
        return acumulator;
    }, {});
};
exports.getDataByState = getDataByState;
var cleanPercentage = function (percentage) { return Number(percentage.slice(0, -1)); };
var getGeneralMinMax = function (obj, percentaje) {
    if (percentaje === void 0) { percentaje = false; }
    var max = 0;
    var stateMax = "";
    var min = 0;
    var stateMin = "";
    for (var stateUS in obj) {
        if (percentaje == true ? max < cleanPercentage(obj[stateUS]) : max < obj[stateUS]) {
            max = percentaje == true ? cleanPercentage(obj[stateUS]) : obj[stateUS];
            stateMax = stateUS;
        }
        if (percentaje == true ? min >= cleanPercentage(obj[stateUS]) : min >= obj[stateUS]) {
            min = percentaje == true ? cleanPercentage(obj[stateUS]) : obj[stateUS];
            stateMin = stateUS;
        }
    }
    return { maxStateName: stateMax,
        maxStateValue: max,
        minStateName: stateMin,
        minStateValue: min
    };
};
exports.getGeneralMinMax = getGeneralMinMax;
var getPercentage = function (totalByState, deathByState) {
    return Object.keys(__assign({}, totalByState)).reduce(function (acum, item) {
        acum[item] = __assign({}, totalByState)[item] == 0 ? '0.00%' : (__assign({}, deathByState)[item] / __assign({}, totalByState)[item] * 100).toFixed(2) + "%"; ////
        return acum;
    }, {});
};
exports.getPercentage = getPercentage;
/* try {
    const rutaPrueba = 'time_series_covid19_deaths_US.csv';
    console.log(getGeneralMinMax(getDataByState(processCSV(readFile(rutaPrueba), true))), 'maximos y min');
    console.log(getDataByState(processCSV(readFile(rutaPrueba), true), true), 'poblacion total');
    console.log(getPercentage(getDataByState(processCSV(readFile(rutaPrueba), true), true), getDataByState(processCSV(readFile(rutaPrueba), true))));
} catch (e) {
    console.log(e, "es el error");
}
 */
