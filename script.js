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
var fs = require('fs'); // importo modulo fs
var path = require('path');
var rutaPrueba = 'time_series_covid19_deaths_US.csv';
//const rutaPrueba = 'falso.csv';
/* function extValidate(ruta: string) { //// valida si es o no un csv
    return path.extname(ruta) === '.csv' ? true : false
} */
var readFile = function (ruta) {
    return fs.readFileSync(ruta).toString();
};
////////////////en caso de o, volver asincrona
var procesarCSV = function (texto, sinEncabezado) {
    if (sinEncabezado === void 0) { sinEncabezado = false; }
    if (typeof texto !== 'string') {
        throw TypeError('no es una cadena de caracteres');
    }
    return texto.slice(sinEncabezado ? texto.indexOf('\n') + 1 : 0) /// ajusta encabezado
        .split('\n') /// selecc por salto de linea
        .map(function (l) { return l.split(","); }); // separa por ,
};
try {
    //console.log(procesarCSV('id,nombre\n101,anita\n102,alicia'));
    //console.log(procesarCSV(readFile(rutaPrueba)));// verif si debe ser asincrono
}
catch (e) {
    console.log(e, "es el error");
}
//const lector = new FileReader();
//lector.readAsText();//// traerse url
/////////////////////////////////////////
var arrayCities = [['alabama', '113'], ['alabama', '110'], ['oklahoma', '112'], ['ohio', '100']]; /////array de arrays
var muertesPorEstado = arrayCities.reduce(function (acum, row) {
    if (!acum[row[0]]) {
        acum[row[0]] = Number(row[row.length - 1]); //////////////////////////
    }
    else {
        acum[row[0]] = acum[row[0]] + Number(row[row.length - 1]); ////////////
    }
    return acum;
}, {}); /// ya traiga propiedades para llenar???
//console.log(muertesPorEstado);
var poblaciónPorEstado = arrayCities.reduce(function (acum, row) {
    if (!acum[row[0]]) {
        acum[row[0]] = Number(row[11]); //////////////////////////
    }
    else {
        acum[row[0]] = acum[row[0]] + Number(row[11]); ////////////
    }
    return acum;
}, {}); /// ya traiga propiedades para llenar???
//let  arrayCitiesEx: Array<string>= ['UID', 'iso2','iso3','code3', 'FIPS','Admin2','Province_State', 'Country_Region', 'Lat', 'Long_', 'Combined_Key', 'Population', '1/22/20', '1/23/20', '1/24/20', '1/25/20'];
//console.log(arrayCitiesEx[11], 'es impresion');//// 11
////////////////////////////////////////////////////////////////////////////////////////////////
var cleanData = function (value) { return Number(value.match(/([0-9])+/g)); }; /// tomar solo números
var selectTotales = function (row) { return row.findIndex(function (i) { return i === ' US"'; }) == -1 ? 13 : row.findIndex(function (i) { return i === ' US"'; }) + 1; };
var getData = function (arrayCities, getTotalPoblación) {
    if (getTotalPoblación === void 0) { getTotalPoblación = false; }
    return arrayCities.reduce(function (acum, row) {
        if (!acum[row[6]]) {
            acum[row[6]] = cleanData(row[getTotalPoblación ? selectTotales(row) : row.length - 1]); //////////////////////////
        }
        else {
            acum[row[6]] = acum[row[6]] + cleanData(row[getTotalPoblación ? selectTotales(row) : row.length - 1]); ////////////
        }
        return acum;
    }, {});
};
try {
    //console.log(procesarCSV(readFile(rutaPrueba)));
    //console.log(getData(arrayCities));
    //console.log(procesarCSV(readFile(rutaPrueba)));
    //console.log(getData(procesarCSV(readFile(rutaPrueba), true)), 'de funcion');
}
catch (e) {
    console.log(e, "es el error");
}
/////// probar colocando en objeto
var estadisticas = function (obj) {
    var max = 0;
    var estadoMax = "";
    var min = 0;
    var estadoMin = "";
    for (var stateUS in obj) {
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
};
console.log(estadisticas(getData(procesarCSV(readFile(rutaPrueba), true))), 'maximos y min');
console.log(getData(procesarCSV(readFile(rutaPrueba), true), true), 'poblacion total');
var porcentaje = function (totales, desesos) {
    return Object.keys(__assign({}, totales)).reduce(function (acum, item) {
        acum[item] = __assign({}, desesos)[item] / __assign({}, totales)[item] * 100;
        //console.log(acum, 'es acum');
        return acum;
    }, {});
};
console.log(porcentaje(getData(procesarCSV(readFile(rutaPrueba), true), true), getData(procesarCSV(readFile(rutaPrueba), true))));
