# Analisis de datos covid- 19

## Índice

* [1. Descripción](#1-preámbulo)
* [2. Funcionamiento básico](#2-funcionamiento-básico)


***

## 1. Descripción
El presente proyecto en typescript permite a partir de un archivo de extensión .csv con datos estandarizados de los estados afectados por el covid 19, obtener estandares de:
1.	Estado con mayor acumulado de muertes a la fecha.
2.	Estado con menor acumulado de muertes a la fecha.
3.	El porcentaje de muertes vs el total de población por estado.
4.	Cual fue el estado más afectado tomando como criterio el item anterior (El más afectado corresponde al estado con mayor porcentaje de muertes).

## 2. Funcionamiento básico

Para llegar al objetivo, se ejecutan diversas funciones que permiten:
* Validar la existencia de la ruta del archivo: función existenceValidate
* Validar la extensión del archivo: función extensionValidate
* Lectura del archivo: función readFile
* Procesamiento del contenido: función processCSV
* Obtener datos por estado: función getDataByState (permite obtener  muertes por estado o totales por estado según los argumentos)
* Obtener valores máximos y mínimos respecto a todos los estados: función getGeneralMinMax (utilizada para obtener los estados con más y menos muertes y para encontrar los estados más y menos afectados)
* Obtener porcentualmente el número de muertes  vs el total de población por estado: función getPercentage




