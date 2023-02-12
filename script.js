"use strict";
exports.__esModule = true;
var functions_1 = require("./functions");
var route = 'time_series_covid19_deaths_US.csv';
var analysisCovidImpact = function (route) {
    if ((0, functions_1.existenceValidate)(route) == false || (0, functions_1.extensionValidate)(route) == false) {
        throw TypeError(' The path is not valid');
    }
    else {
        console.log((0, functions_1.getGeneralMinMax)((0, functions_1.getDataByState)((0, functions_1.processCSV)((0, functions_1.readFile)(route), true))), 'Maximum and minimum values per state');
        console.log((0, functions_1.getPercentage)((0, functions_1.getDataByState)((0, functions_1.processCSV)((0, functions_1.readFile)(route), true), true), (0, functions_1.getDataByState)((0, functions_1.processCSV)((0, functions_1.readFile)(route), true))), 'Percentage death vs population by state');
        console.log((0, functions_1.getGeneralMinMax)((0, functions_1.getPercentage)((0, functions_1.getDataByState)((0, functions_1.processCSV)((0, functions_1.readFile)(route), true), true), (0, functions_1.getDataByState)((0, functions_1.processCSV)((0, functions_1.readFile)(route), true))), true), 'The most affected state');
        console.log((0, functions_1.getDataByState)((0, functions_1.processCSV)((0, functions_1.readFile)(route), true)), 'Death by state');
        console.log((0, functions_1.getDataByState)((0, functions_1.processCSV)((0, functions_1.readFile)(route), true), true), 'Total population by state');
    }
    return {
        generalMinMax: (0, functions_1.getGeneralMinMax)((0, functions_1.getDataByState)((0, functions_1.processCSV)((0, functions_1.readFile)(route), true))),
        percentageByState: (0, functions_1.getPercentage)((0, functions_1.getDataByState)((0, functions_1.processCSV)((0, functions_1.readFile)(route), true), true), (0, functions_1.getDataByState)((0, functions_1.processCSV)((0, functions_1.readFile)(route), true))),
        deathByState: (0, functions_1.getDataByState)((0, functions_1.processCSV)((0, functions_1.readFile)(route), true)),
        mostAndLessAffected: (0, functions_1.getGeneralMinMax)((0, functions_1.getPercentage)((0, functions_1.getDataByState)((0, functions_1.processCSV)((0, functions_1.readFile)(route), true), true), (0, functions_1.getDataByState)((0, functions_1.processCSV)((0, functions_1.readFile)(route), true))), true)
    };
};
analysisCovidImpact('time_series_covid19_deaths_US.csv');
