# NgxJsonToCSVGenerator


* A simple `directive` to be used to download CSV from Json data.
* It is developed using `Angular >=6.0.0` and its newly introduced `ng g library` schematics.
* This library is part of NgxJsonToCSVGenerator project and it is generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.
* Library location: `projects/ngx-json-to-csvgenerator` directory of this repository.

![angularjs_logo](https://user-images.githubusercontent.com/4659608/37036392-9bf53686-2160-11e8-95fc-bbab638d7d60.png)

# ngx-json-to-csvgenerator | Export Json to CSV

[![npm version](https://badge.fury.io/js/%40nikhil200816%2Fngx-json-to-csvgenerator.svg)](https://badge.fury.io/js/%40nikhil200816%2Fngx-json-to-csvgenerator) ![Angular](https://img.shields.io/badge/Angular-%3E%3D6.0-red.svg)  [![GitHub license](https://img.shields.io/github/license/NikhilVashistha/NgxJsonToCSVGenerator.svg)](https://github.com/NikhilVashistha/NgxJsonToCSVGenerator)

> A directive to export CSV file from json in Angular 6 and above
> 

## Installation 

```javascript
npm install --save @nikhil200816/ngx-json-to-csvgenerator
```

## Examples/Demo
* A simple Example can be found under `src/app` directory of this repository.

> Add module in **app.module.ts**

```javascript
import { NgxJsonToCSVGeneratorModule } from '@nikhil200816/ngx-json-to-csvgenerator';
```
> Add in **imports** section

```javascript
imports: [
  BrowserModule,
  NgxJsonToCSVGeneratorModule
],
```
> Use in **component** 

```javascript

const dataList = [
                    {
                        id: 1,
                        name: 'github',
                        price: '200$',
                        publisher: {
                            name: 'hieutran',
                            company: 'Dtag-VN'
                        },
                        nested:[
                         {
                            name: 'name1',
                            company: 'company1'
                        },
                        {
                            name: 'name2',
                            company: 'company2'
                        }]
                    },
                     {
                        id: 2,
                        name: 'twitter',
                        price: '500$',
                        publisher: {
                            name: 'twitter tran',
                            company: 'Canada'
                        },
                         nested:[]
                    },
                   
                    {
                        id: 3,
                        name: 'google',
                        price: '300$',
                        publisher: {
                            name: 'tran',
                            company: 'Vietname'
                        },
                         nested:[
                         {
                            name: 'name3',
                            company: 'company3'
                        },
                        {
                            name: 'name4',
                            company: 'company4'
                        }]
                    }
                ];

```

```html

<button ngx-json-to-csvgenerator 
    [data]="dataList" 
    [reportFields]="{id: 'ID Heder', name: 'Name Header', price: 'Price Head',
        'publisher.name': 'Publisher Head', 'publisher.company': 'Company Head'}" 
    nestedDataProperty="nested" 
    [nestedReportFields]="{name: 'Nested Name', company: 'Nested Company'}" 
    filename="Export_Report">
    Export Button
</button>

<div ngx-json-to-csvgenerator 
    [data]="dataList"
    [reportFields]="{id: 'ID Header', name: 'Name Header'}"
    nestedDataProperty="nested" 
    [nestedReportFields]="{name: 'Nested Name', company: 'Nested Company'}"
    filename="Export_Report">
    Export Button
</div>

```

## Options

| Option        | Description  |
| :-------------| -----|
| **data**      |  Set the data array |
| **report-fields**      | Name of the coloumn and keys to be exported |
| **nested-data-property** | If provided, will use nested value to export |
| **nested-report-fields** | Name of the coloumn and keys to be exported  |
| **filename**      | Set to change the file name  |

## Running the example in local environment

* `npm install`
* Run `ng serve` for a dev server and running the demo app. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build the NgxJsonToCSVGenerator module

Run `ng build NgxJsonToCSVGenerator` to build the library. The build artifacts will be stored in the `dist/ngx-json-to-csvgenerator` directory. Use the `--prod` flag for a production build.
