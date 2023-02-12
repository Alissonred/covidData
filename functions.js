"use strict";
const fs = require('fs'); // importo modulo fs
const path = require('path');
const rutaPrueba = 'time_series_covid19_deaths_US.csv';
//const rutaPrueba = 'falso.csv';
/* function extValidate(ruta: string) { //// valida si es o no un csv
    return path.extname(ruta) === '.csv' ? true : false
} */
const readFile = (ruta) => {
    return fs.readFileSync(ruta).toString();
};
/* try{
    console.log(readFile(rutaPrueba));
    
} catch(e){
    console.log(e,"es el error del read");
}
 */
////////////////en caso de o, volver asincrona
const leerCsv = (texto, sinEncabezado = false) => {
    if (typeof texto !== 'string') {
        throw TypeError('no es una cadena de caracteres');
    }
    return texto.slice(sinEncabezado ? texto.indexOf('\n') + 1 : 0) /// ajusta encabezado
        .split('\n') /// selecc por salto de linea
        .map(l => l.split(",")); // separa por ,
};
try {
    //console.log(leerCsv('id,nombre\n101,anita\n102,alicia'));
    console.log(leerCsv(readFile(rutaPrueba)));
}
catch (e) {
    console.log(e, "es el error");
}
//const lector = new FileReader();
//lector.readAsText();//// traerse url


