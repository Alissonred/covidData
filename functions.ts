const fs = require('fs');
const path = require('path');

export const existenceValidate = (route: string) => fs.existsSync(route) ? true : false
export const extensionValidate = (route: string) => path.extname(route) === '.csv' ? true : false
export const readFile = (route: string) => fs.readFileSync(route).toString()
export const processCSV = (fileContent: string, withoutHeader: boolean = false) => fileContent.slice(withoutHeader ? fileContent.indexOf('\n') + 1 : 0) // convierte en array de arrays
    .split('\n')
    .map(rowCity => rowCity.split(","));

const cleanData = (value: string) => Number(value.match(/([0-9])+/g)) 
const selectTotalPopulation = (row: Array<string>) => row.findIndex(i => i === ' US"') == -1 ? 13 : row.findIndex(i => i === ' US"') + 1
export const getDataByState = (arrayCities: Array<Array<string>>, getTotalPopulation: boolean = false) => { // obtiene el numero de muertos por estado
    return arrayCities.reduce((acumulator: any, row: Array<string>) => {
        if (!acumulator[row[6]]) {
            acumulator[row[6]] = cleanData(row[getTotalPopulation ? selectTotalPopulation(row) : row.length - 1]);
        } else {
            acumulator[row[6]] = acumulator[row[6]] + cleanData(row[getTotalPopulation ? selectTotalPopulation(row) : row.length - 1]);
        }
        return acumulator
    }, {});
}

const cleanPercentage = (percentage: string) => Number(percentage.slice(0, -1))


export const getGeneralMinMax = (obj: any, percentaje: boolean = false) => {
    let max: number = 0;
    let stateMax: string = "";
    let min: number = 0;
    let stateMin: string = "";

    for (let stateUS in obj) {
        if (percentaje == true ? max < cleanPercentage(obj[stateUS]) : max < obj[stateUS]) {
            max = percentaje == true ? cleanPercentage(obj[stateUS]) : obj[stateUS];
            stateMax = stateUS;
        }
        if (percentaje == true ? min >= cleanPercentage(obj[stateUS]) : min >= obj[stateUS]) {
            min = percentaje == true ? cleanPercentage(obj[stateUS]) : obj[stateUS];
            stateMin = stateUS;
        }

    }
    return {
        maxStateName: stateMax,
        maxStateValue: max,
        minStateName: stateMin,
        minStateValue: min
    }
}

export const getPercentage = (totalByState: any, deathByState: any) => {
    return Object.keys({ ...totalByState }).reduce((acum: any, item) => {
        acum[item] = { ...totalByState }[item] == 0 ? '0.00%' : ({ ...deathByState }[item] / { ...totalByState }[item] * 100).toFixed(2) + "%"////
        return acum
    }, {});
}


/* try {
    const rutaPrueba = 'time_series_covid19_deaths_US.csv';
    console.log(getGeneralMinMax(getDataByState(processCSV(readFile(rutaPrueba), true))), 'maximos y min');
    console.log(getDataByState(processCSV(readFile(rutaPrueba), true), true), 'poblacion total');
    console.log(getPercentage(getDataByState(processCSV(readFile(rutaPrueba), true), true), getDataByState(processCSV(readFile(rutaPrueba), true))));
} catch (e) {
    console.log(e, "es el error");
}
 */
