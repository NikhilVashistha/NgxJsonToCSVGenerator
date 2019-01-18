import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dataList = [
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
}
