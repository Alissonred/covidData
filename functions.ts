const fs = require('fs');// importo modulo fs
const path = require('path');
const rutaPrueba = 'time_series_covid19_deaths_US.csv';
//const rutaPrueba = 'falso.csv';
export const extValidate = (ruta: string) => path.extname(ruta) === '.csv' ? true : false
export const readFile = (ruta: string) => fs.readFileSync(ruta).toString()
export const processCSV = (texto: string, sinEncabezado: boolean = false) => texto.slice(sinEncabezado ? texto.indexOf('\n') + 1 : 0) /// ajusta encabezado
    .split('\n')/// selecc por salto de linea
    .map(l => l.split(","));// separa por ,

const cleanData = (value: string) => Number(value.match(/([0-9])+/g)) /// tomar solo números
const selectTotales = (row: Array<string>) => row.findIndex(i => i === ' US"') == -1 ? 13 : row.findIndex(i => i === ' US"') + 1
export const getData = (arrayCities: Array<Array<string>>, getTotalPoblación: boolean = false) => {
    return arrayCities.reduce((acum: any, row: Array<string>) => {
        if (!acum[row[6]]) {
            acum[row[6]] = cleanData(row[getTotalPoblación ? selectTotales(row) : row.length - 1]);//////////////////////////
        } else {
            acum[row[6]] = acum[row[6]] + cleanData(row[getTotalPoblación ? selectTotales(row) : row.length - 1]);////////////
        }
        return acum
    }, {});
}

export const getStadistics = (obj: any) => {
    let max: number = 0;
    let estadoMax: string = "";
    let min: number = 0;
    let estadoMin: string = "";

    for (let stateUS in obj) {
        if (max < obj[stateUS]) {
            max = obj[stateUS];
            estadoMax = stateUS;
        }
        if (min >= obj[stateUS]) {
            min = obj[stateUS];
            estadoMin = stateUS;
        }
    }
    return [estadoMax, max, estadoMin, min];
}

export const getPercentage = (totales: any, desesos: any) => {
    return Object.keys({ ...totales }).reduce((acum: any, item) => {
        acum[item] = ({ ...desesos }[item] / { ...totales }[item] * 100).toFixed(2) + "%"
        //console.log(acum, 'es acum');
        return acum
    }, {});
}


try {
    console.log(getStadistics(getData(processCSV(readFile(rutaPrueba), true))), 'maximos y min');
    console.log(getData(processCSV(readFile(rutaPrueba), true), true), 'poblacion total');
    console.log(getPercentage(getData(processCSV(readFile(rutaPrueba), true), true), getData(processCSV(readFile(rutaPrueba), true))));
} catch (e) {
    console.log(e, "es el error");
}

