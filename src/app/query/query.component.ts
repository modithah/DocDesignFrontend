import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  option: any;
  workload = {
		done : false,
		name : 'Equal probabilities',
		queries : [ {
			name : 'User by U_ID',
			frequency : 1,
			selectName : 'U_ID',
			projections : [ 'U_F_NAME', 'U_L_NAME', 'U_ABOUT' ]
		} ],
		selections : [ {
			id : 1,
			name : 'B_ID'
		}, {
			id : 2,
			name : 'C_ID'
		} ,
    {
			id : 3,
			name : 'P_ID'
		},
    {
			id : 4,
			name : 'R_ID'
		},
    {
			id : 5,
			name : 'U_ID'
		}],
		projections : [ {
			id : 1,
			name : 'B_ID'
		}, {
			id : 2,
			name : 'B_PRICE'
		}, {
			id : 3,
			name : 'B_DATE'
		}, {
			id : 4,
			name : 'C_ID'
		} , {
			id : 5,
			name : 'C_TITLE'
		} , {
			id : 6,
			name : 'C_TEXT'
		} , {
			id : 7,
			name : 'C_DATE'
		} , {
			id : 8,
			name : 'P_ID'
		} , {
			id : 9,
			name : 'P_TITLE'
		} , {
			id : 10,
			name : 'P_PRICE'
		} , {
			id : 11,
			name : 'P_TYPE'
		} , {
			id : 12,
			name : 'P_DATE'
		} , {
			id : 13,
			name : 'P_DATE'
		} , {
			id : 14,
			name : 'P_DESCRIPTION'
		} , {
			id : 15,
			name : 'R_ID'
		} , {
			id : 16,
			name : 'R_NAME'
		}, {
			id : 17,
			name : 'U_ID'
		}, {
			id : 18,
			name : 'U_F_NAME'
		}, {
			id : 19,
			name : 'U_L_NAME'
		}, {
			id : 20,
			name : 'U_ABOUT'
		}],
	};
  constructor() { }

  ngOnInit(): void {
  }

  addQuery($event){
		$event.preventDefault();
  this.workload.queries.unshift({name: '<enter name>', frequency: 0.0, projections: [], selectName: null});
	}

  Download($event: MouseEvent) {
        let val = '{ "queries" :' + JSON.stringify(this.workload.queries, undefined, 2) + '}';
        let blob = new Blob([val], { type: 'application/JSON'});
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
            alert( 'Please disable your Pop-up blocker and try again.');
        }
  }
}
