import { Component, OnInit } from '@angular/core';

class Relationship {
  from: string;
  fromVal: number;
  to: string;
  toVal: number;
  readonly name: string;

  constructor(name: string, from: string, fromVal: number, to: string, toVal: number) {
    this.from = from;
    this.fromVal = fromVal;
    this.to = to;
    this.toVal = toVal;
    this.name = name;
  }
  get fullName(): string { // read-only property with getter function (this is not the same thing as a “function-property”)
        return this.from + 'has' + this.to;
    }
}

class Attribute{
  name: string;
  type: string;
  size: number;

  constructor(name: string, type: string, size: number) {
    this.name = name;
    this.type = type;
    this.size = size;
  }


  get stringValue(): string {
    return this.name + '[' + this.type + '(' + this.size + ')]';
  }
}

class Entity {
  name: string;
  id: string;
  attributes: Attribute[];
  newAtt: Attribute;
  count: number;

  constructor(name: string) {
    this.id  = name + '_ID';
    this.name = name;
    this.attributes = [];
    this.newAtt = new Attribute('', 'int', 4);
    this.count = 10;
  }
  public addAttribute(){
    this.attributes.push(this.newAtt);
    this.newAtt = new Attribute('', 'int', 4);
  }

  canAdd() {
    // return this.newAtt
    return (this.newAtt.name === undefined || this.newAtt.name.length === 0 || !this.newAtt.name.trim() || this.newAtt.name === null);
  }
}

@Component({
  selector: 'app-erd',
  templateUrl: './erd.component.html',
  styleUrls: ['./erd.component.css']
})
export class ErdComponent implements OnInit {

  public relationships: Relationship[] = [];
  public atoms: Entity[] = [];
  dTypes = ['int', 'varchar'];
  constructor() { }

  ngOnInit(): void {
  }

  addRelationship($event: MouseEvent) {
this.relationships.push(new Relationship('<>has<>', null, 0, null, 0));
  }

  addEntity($event) {
      this.atoms.push(new Entity('<New Entity>'));
      $event.preventDefault();
  }

  canAddRel() {
    return this.atoms.length === 0;
  }

  download($event: MouseEvent) {
    let val = '{\n' +
      '  "atoms": [{\n' +
      '    "USER": {\n' +
      '      "*U_ID": {\n' +
      '        "count": 500000,\n' +
      '        "size": 4\n' +
      '      },\n' +
      '      "U_NAME": varchar(10)\n' +
      '    }\n' +
      '  },{\n' +
      '    "REGION": {\n' +
      '      "*R_ID": {\n' +
      '        "count": 5,\n' +
      '        "size": 4\n' +
      '      },\n' +
      '      "R_NAME": varchar(10)\n' +
      '    }\n' +
      '  }],\n' +
      '  "relationships": [{\n' +
      '    "R_ID": {\n' +
      '      "U_ID": "1~100000"\n' +
      '    }\n' +
      '  }]\n' +
      '}';
        let blob = new Blob([val], { type: 'application/JSON'});
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
            alert( 'Please disable your Pop-up blocker and try again.');
        }
  }
}
