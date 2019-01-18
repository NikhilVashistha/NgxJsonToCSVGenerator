import { Directive, ElementRef, Renderer, Input, OnInit, HostListener } from '@angular/core';
import { saveAs } from 'file-saver';

@Directive({
  selector: '[ngx-json-to-csvgenerator]'
})

/*

Created On        :- 25th Oct 2018
Created By        :- Nikhil Vashistha

Usage of this directive

<div ngx-json-to-csvgenerator 
    [data]="dataList"
    [reportFields]="{id: 'ID Header', 'publisher.name': 'Publisher Head'}"
    nestedDataProperty="nested" 
    [nestedReportFields]="{name: 'Nested Name', company: 'Nested Company'}"
    filename="Export_Report">
    Export Button
</div>

*/

export class NgxJsonToCSVGenerator implements OnInit {

  @Input() data: any;
  @Input() filename: string;
  @Input() reportFields: any;
  @Input() nestedReportFields: any;
  @Input() nestedDataProperty: string;

  public fieldsAndHeader: any;
  public fields: any;
  public nestedFieldsAndHeader: any;
  public nestedFields: any;
  public header: any;
  public nestedHeader: any;

  constructor(private el: ElementRef, private renderer: Renderer) {
  	renderer.setElementClass(el.nativeElement, 'btn', true);
  	renderer.setElementClass(el.nativeElement, 'btn-primary', true);
  	renderer.setElementStyle(el.nativeElement, 'marginLeft', '20px');
  }

  ngOnInit() {

  	this.filename = !!this.filename ? this.filename : "Report";

    this.fieldsAndHeader = this.generateFieldsAndHeaders(this.reportFields, [], []);

    this.fields = this.fieldsAndHeader.fields,
    this.header = this.fieldsAndHeader.header;
    this.nestedFieldsAndHeader = this.generateFieldsAndHeaders(this.nestedReportFields, [], [""]);
    this.nestedFields = this.nestedFieldsAndHeader.fields,
    this.nestedHeader = this.nestedFieldsAndHeader.header;
  }

  @HostListener('click', ['$event']) onClick($event){
        
        var bodyData = this.bodyData();
        var strData = this.convertToExcel(bodyData, this.header);
        var blob = new Blob([strData], {
          type: 'text/csv'
        });

        /*var url= window.URL.createObjectURL(blob);
  		window.open(url);*/

  		return saveAs(blob, this.filename + ".csv");
	}


  convertObjectToArray(dataObj) {
    let keyArr: any[] = Object.keys(dataObj),
      dataArr = [];

    // loop through the object,
    // pushing values to the return array
    keyArr.forEach((key: any) => {
      dataArr.push(dataObj[key]);
    });

    // return the resulting array
    return dataArr;
  }

  generateFieldsAndHeaders(fieldsObject, fields, header) {

    for (let field in fieldsObject) {

      if (!fieldsObject[field] || !field) {
        throw new Error("error json report fields");
      }
      fields.push(field);
      header.push(fieldsObject[field]);
    }

    return { fields: fields, header: header };
  }

  convertToExcel(body, header) {
    return header + "\n" + body;
  }

  objectToString(object) {
    var output = "";
    object.forEach((value, key) => {
      output += key + ":" + value + " ";
    });

    return "'" + output + "'";
  }

  stringReplace(repChar, stringToReplce, stringVal) {
    var regex = new RegExp(repChar, 'g');
    //replace via regex
    stringVal = stringVal.replace(regex, stringToReplce);
    return stringVal;
  }

  generateFieldValues(list, rowItems, dataItem) {
    list.forEach((field) => {
      var data = "",
        fieldValue = "",
        curItem = null;
      if (field.indexOf(".")) {
        field = field.split(".");
        curItem = dataItem;
        // deep access to obect property
        field.forEach((prop) =>  {
          if (curItem !== null && curItem !== undefined) {
            curItem = curItem[prop];
          }
        });
        data = curItem;
      } else {
        data = dataItem[field];
      }
      fieldValue = data !== null ? data : " ";

      if (fieldValue !== undefined && typeof(fieldValue) == 'object') {
        fieldValue = this.objectToString(fieldValue);
      }
      
      if( fieldValue !== undefined && fieldValue !== null && fieldValue !== " " && typeof(fieldValue) == 'string') {
        fieldValue = this.stringReplace(',' , ' -', fieldValue);
        fieldValue = this.stringReplace('\n', ' ', fieldValue);
      }

      rowItems.push(fieldValue);
      
    });
    return rowItems;
  }

  bodyData() {
    var body = "";

    this.data.forEach((dataItem) => {
      var rowItems = [];
      var nestedBody = "";
      rowItems = this.generateFieldValues(this.fields, rowItems, dataItem);
      //Nested Json body generation start 
      if (this.nestedDataProperty && dataItem[this.nestedDataProperty].length) {
        dataItem[this.nestedDataProperty].forEach((nestedDataItem) => {
          var nestedRowItems = [""];
          nestedRowItems = this.generateFieldValues(this.nestedFields, nestedRowItems, nestedDataItem);
          nestedBody += nestedRowItems.toString() + "\n";
        });
        var strData = this.convertToExcel(nestedBody, this.nestedHeader);
        body += rowItems.toString() + "\n" + strData;
        ////Nested Json body generation end 
      } else {
        body += rowItems.toString() + "\n";
      }
    });
    return body;
  }

}