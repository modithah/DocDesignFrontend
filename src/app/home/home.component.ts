import {Component, OnInit} from '@angular/core';
import {ChangeContext, Options} from '@angular-slider/ngx-slider';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
  }

  get f() {
    return this.myForm.controls;
  }

  y = '"Warehouses": {\n' +
    '\t"W_ID": int,\n' +
    '\t"W_NAME": varchar,\n' +
    '\t"Districts": ["D_ID": int]\n' +
    '}, \n' +
    '"Districts": {\n' +
    '\t"D_ID": int,\n' +
    '\t"D_NAME": varchar\n' +
    '}';

  z = '"Warehouses": {\n' +
    '\t"W_ID": int,\n' +
    '\t"W_NAME": varchar,\n' +
    '\t"Districts": [{\n' +
    '\t\t"D_ID": int,\n' +
    '\t\t"D_NAME": varchar,\n' +
    '\t\t}\n' +
    '\t]\n' +
    '}, "Districts": {\n' +
    '\t"D_ID": int,\n' +
    '\t"D_NAME": varchar,\n' +
    '\t"Warehouses": [{\n' +
    '\t\t"W_ID": int,\n' +
    '\t\t"W_NAME": varchar,\n' +
    '\t\t}\n' +
    '\t]\n' +
    '}';

  x = [{
    obj1: 'Query',
    obj2: 'Size',
    val: 5
  },
    {
      obj1: 'Query',
      obj2: 'Heterogeneity',
      val: 5
    },
    {
      obj1: 'Query',
      obj2: 'Depth',
      val: 5
    },
    {
      obj1: 'Size',
      obj2: 'Heterogeneity',
      val: 5
    },
    {
      obj1: 'Size',
      obj2: 'Depth',
      val: 5
    },
    {
      obj1: 'Depth',
      obj2: 'Heterogeneity',
      val: 5
    },
  ];

  options: Options = {
    floor: 0,
    ceil: 10,
    step: 1,
    hideLimitLabels: true,
    hidePointerLabels: true
  };
  map = new Map([['Query', 0.25], ['Size', 0.25], ['Depth', 0.25], ['Heterogeneity', 0.25]]);
  solution ={};
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    file2: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    fileSource2: new FormControl('', [Validators.required])
  });
  // code = JSON.stringify(this.y, undefined, 2); ;
  code ;
  iters = 10 ;
  ngOnInit(): void {}

  onUserChangeEnd($event: ChangeContext) {
    // let q, s, h, d;

    let q;
    let s;
    let h;
    let d;
    q = this.x.filter(a => a.obj1 === 'Query').map(a => a.val).reduce((a, b) => a + b);
    s = this.x.filter(a => a.obj1 === 'Size').map(a => a.val).reduce((a, b) => a + b) +
      this.x.filter(a => a.obj2 === 'Size').map(a => 10 - a.val).reduce((a, b) => a + b);
    h = this.x.filter(a => a.obj2 === 'Heterogeneity').map(a => 10 - a.val).reduce((a, b) => a + b);
    d = this.x.filter(a => a.obj1 === 'Depth').map(a => a.val).reduce((a, b) => a + b) +
      this.x.filter(a => a.obj2 === 'Depth').map(a => 10 - a.val).reduce((a, b) => a + b);
    // s = 6;
    // h = 10;
    // d = 11;
    this.map.set('Query', q / (q + s + h + d));
    this.map.set('Size', s / (q + s + h + d));
    this.map.set('Depth', d / (q + s + h + d));
    this.map.set('Heterogeneity', h / (q + s + h + d));
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  onFile2Change(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource2: file
      });
    }
  }

  submit() {
    const formData = new FormData();
    this.spinner.show();
    // setTimeout(() => {
    //   if (this.map.get('Query') === 0.25){
    //     this.code = this.y;
    //     this.solution = [{
    //       param: 'Query cost estimation',
    //       val: '14.74'
    //     },
    //     {
    //       param: 'Size estimation',
    //       val: '1.8GB'
    //     },
    //     {
    //       param: 'Maximum heterogeneity',
    //       val: '1'
    //     },
    //     {
    //       param: 'Maximum depth',
    //       val: '1'
    //     }];
    //   }
    //   else if(this.myForm.get('fileSource').value.name === 'tpcc-sample-3EntityRels.json' ){
    //     this.code ="\"WAREHOUSES\"{\n" +
    //       "\t\"W_ID\": int,\n" +
    //       "\t\"W_NAME\": varchar,\n" +
    //       "\t\"W_STREET_1\": varchar,\n" +
    //       "\t\"W_STREET_2\": varchar,\n" +
    //       "\t\"W_CITY\": varchar,\n" +
    //       "\t\"W_STATE\":varchar,\n" +
    //       "\t\"W_ZIP\": varchar,\n" +
    //       "\t\"W_TAX\":int,\n" +
    //       "\t\"W_YTD\":int\n" +
    //       "\t\"DISTRICTS\":{\n" +
    //       "\t\t\"D_ID\": int,\n" +
    //       "\t\t\"D_NAME\": varchar,\n" +
    //       "\t\t\"D_STREET_1\": varchar,\n" +
    //       "\t\t\"D_STREET_2\": varchar,\n" +
    //       "\t\t\"D_CITY\": varchar,\n" +
    //       "\t\t\"D_STATE\": varchar,\n" +
    //       "\t\t\"D_ZIP\": varchar,\n" +
    //       "\t\t\"D_TAX\": int,\n" +
    //       "\t\t\"D_YTD\": int,\n" +
    //       "\t\t\"D_NEXT_O_ID\": int\n" +
    //       "\t}\n" +
    //       "},\n" +
    //       "{\n" +
    //       "\"CUSOTMERS\":{\n" +
    //       "\t\"C_ID\": int\n" +
    //       "\t\"C_FIRST\": varchar,\n" +
    //       "\t\"C_MIDDLE\": varchar,\n" +
    //       "\t\"C_LAST\": varchar,\n" +
    //       "\t\"C_STREET_1\": varchar,\n" +
    //       "\t\"C_STREET_2\": varchar,\n" +
    //       "\t\"C_CITY\": varchar,\n" +
    //       "\t\"C_STATE\": varchar,\n" +
    //       "\t\"C_ZIP\": varchar,\n" +
    //       "\t\"C_PHONE\":varchar,\n" +
    //       "\t\"C_SINCE\": varchar,\n" +
    //       "\t\"C_CREDIT\": varchar,\n" +
    //       "\t\"C_CREDIT_LIM\": int,\n" +
    //       "\t\"C_DISCOUNT\": int,\n" +
    //       "\t\"C_BALANCE\": int,\n" +
    //       "\t\"C_YTD_PAYMENT\":int,\n" +
    //       "\t\"C_PAYMENT_CNT\": int,\n" +
    //       "\t\"C_DELIVERY_CNT\": int,\n" +
    //       "\t\"C_DATA\": varchar\n" +
    //       "\t\"D_ID\" : int\n" +
    //       "}\n" +
    //       "}\n";
    //     this.solution = [{
    //       param: 'Query cost estimation',
    //       val: '12.78'
    //     },
    //     {
    //       param: 'Size estimation',
    //       val: '3.1GB'
    //     },
    //     {
    //       param: 'Maximum heterogeneity',
    //       val: '1'
    //     },
    //     {
    //       param: 'Maximum Depth',
    //       val: '1'
    //     }];
    //   }
    //   else{
    //     this.code = this.z;
    //     this.solution = [{
    //       param: 'Query cost estimation',
    //       val: '5.57'
    //     },
    //     {
    //       param: 'Size estimation',
    //       val: '6.8GB'
    //     },
    //     {
    //       param: 'Maximum heterogeneity',
    //       val: '1'
    //     },
    //     {
    //       param: 'Maximum Depth',
    //       val: '1'
    //     }];
    //   }
    //   this.spinner.hide();
    // }, 5000);
    // formData.append('file', this.myForm.get('fileSource').value);
    this.http.get('http://localhost:4567/run/2')
      .subscribe(res => {
        console.log(res);
        // alert('Uploaded Successfully.');
        // @ts-ignore
        this.code = JSON.stringify(res.design.collections, undefined, 2);
        // @ts-ignore
        this.solution = res.meta;
        this.spinner.hide();
      });
    // JSON.stringify(JSON
		// 		.parse(response.data.designjson), undefined, 2);
  }
}
