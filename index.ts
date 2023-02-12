const fs = require('fs');// importo modulo fs
const path = require('path');
const rutaPrueba = 'time_series_covid19_deaths_US.csv';
//const rutaPrueba = 'falso.csv';

/* function extValidate(ruta: string) { //// valida si es o no un csv
    return path.extname(ruta) === '.csv' ? true : false
} */

const readFile = (ruta: string) => {
    return fs.readFileSync(ruta).toString()
}

////////////////en caso de o, volver asincrona
const procesarCSV = (texto: string, sinEncabezado: boolean = false) => { /// texto es cadena de csv

    if (typeof texto !== 'string') {
        throw TypeError('no es una cadena de caracteres')
    }
    return texto.slice(sinEncabezado ? texto.indexOf('\n') + 1 : 0) /// ajusta encabezado
        .split('\n')/// selecc por salto de linea
        .map(l => l.split(","));// separa por ,
}

try {
    //console.log(procesarCSV('id,nombre\n101,anita\n102,alicia'));
    //console.log(procesarCSV(readFile(rutaPrueba)));// verif si debe ser asincrono
} catch (e) {
    console.log(e, "es el error");
}

//const lector = new FileReader();
//lector.readAsText();//// traerse url
/////////////////////////////////////////

let arrayCities: Array<Array<string>> = [['alabama', '113'], ['alabama','110'], ['oklahoma', '112'], ['ohio', '100']]/////array de arrays
let muertesPorEstado = arrayCities.reduce((acum: any, row) => {
    if (!acum[row[0]]) {
        acum[row[0]] = Number(row[row.length - 1]);//////////////////////////
    } else {
        acum[row[0]] = acum[row[0]] + Number(row[row.length - 1]);////////////
    }
    return acum
}, {});/// ya traiga propiedades para llenar???

//console.log(muertesPorEstado);

let poblaciónPorEstado = arrayCities.reduce((acum: any, row) => {
    if (!acum[row[0]]) {
        acum[row[0]] = Number(row[11]);//////////////////////////
    } else {
        acum[row[0]] = acum[row[0]] + Number(row[11]);////////////
    }
    return acum
}, {});/// ya traiga propiedades para llenar???

//let  arrayCitiesEx: Array<string>= ['UID', 'iso2','iso3','code3', 'FIPS','Admin2','Province_State', 'Country_Region', 'Lat', 'Long_', 'Combined_Key', 'Population', '1/22/20', '1/23/20', '1/24/20', '1/25/20'];
//console.log(arrayCitiesEx[11], 'es impresion');//// 11


////////////////////////////////////////////////////////////////////////////////////////////////

const cleanData =(value:string)=> Number(value.match(/([0-9])+/g)) /// tomar solo números
const selectTotales = (row:Array<string>)=>row.findIndex(i=> i=== ' US"') == -1 ?13: row.findIndex(i=> i=== ' US"')+ 1
const getData = (arrayCities: Array<Array<string>>, getTotalPoblación: boolean = false)=>{
   return arrayCities.reduce((acum: any, row: Array<string>) => {
        if (!acum[row[6]]) {
            acum[row[6]] = cleanData(row[getTotalPoblación? selectTotales(row) :row.length-1]);//////////////////////////
        } else {
            acum[row[6]] = acum[row[6]] + cleanData(row[getTotalPoblación? selectTotales(row) :row.length-1]);////////////
        }
        return acum
    }, {});
}

try{
    //console.log(procesarCSV(readFile(rutaPrueba)));
    //console.log(getData(arrayCities));
    //console.log(procesarCSV(readFile(rutaPrueba)));
    //console.log(getData(procesarCSV(readFile(rutaPrueba), true)), 'de funcion');
}catch(e){
    console.log(e, "es el error");
}

/////// probar colocando en objeto
 
const estadisticas = (obj: any)=>{
    let max: number = 0;
    let estadoMax: string = "";
    let min: number = 0;
    let estadoMin: string = "";
   
   for(let stateUS in obj){
   if(max < obj[stateUS]){
       max = obj[stateUS];
       estadoMax = stateUS;
   }
   if(min >= obj[stateUS]){
       min = obj[stateUS];
       estadoMin = stateUS; 
   }
   }
   return [estadoMax, max, estadoMin,min];
}

console.log(estadisticas(getData(procesarCSV(readFile(rutaPrueba), true))), 'maximos y min');

console.log(getData(procesarCSV(readFile(rutaPrueba), true), true), 'poblacion total');

const porcentaje =(totales: any, desesos:any)=>{
    return Object.keys({...totales}).reduce((acum: any, item)=>{
        acum[item]= {...desesos}[item]/{...totales}[item]* 100
        //console.log(acum, 'es acum');
        return acum
    },{}); 
}

console.log(porcentaje(getData(procesarCSV(readFile(rutaPrueba), true), true), getData(procesarCSV(readFile(rutaPrueba), true))));
