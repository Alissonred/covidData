import{extensionValidate, existenceValidate, readFile, processCSV, getDataByState, getGeneralMinMax, getPercentage } from './functions'
let route: string = 'time_series_covid19_deaths_US.csv';

const analysisCovidImpact = (route: string)=>{

    if(existenceValidate(route) == false || extensionValidate(route) == false ){
        throw TypeError(' The path is not valid');
    }
         console.log(getGeneralMinMax(getDataByState(processCSV(readFile(route), true))), 'Maximum and minimum values per state')
        console.log(getPercentage(getDataByState(processCSV(readFile(route), true), true), getDataByState(processCSV(readFile(route), true))), 'Percentage death vs population by state');
        console.log(getGeneralMinMax(getPercentage(getDataByState(processCSV(readFile(route), true), true), getDataByState(processCSV(readFile(route), true))), true), 'The most affected state')
        console.log(getDataByState(processCSV(readFile(route), true)), 'Death by state');
        console.log(getDataByState(processCSV(readFile(route), true), true), 'Total population by state'); 
    
    return {
        generalMinMax: getGeneralMinMax(getDataByState(processCSV(readFile(route), true))),
        percentageByState: getPercentage(getDataByState(processCSV(readFile(route), true), true), getDataByState(processCSV(readFile(route), true))),
        deathByState: getDataByState(processCSV(readFile(route), true)),
        mostAndLessAffected: getGeneralMinMax(getPercentage(getDataByState(processCSV(readFile(route), true), true), getDataByState(processCSV(readFile(route), true))), true)
    }
}

console.log(analysisCovidImpact('time_series_covid19_deaths_US.csv'))