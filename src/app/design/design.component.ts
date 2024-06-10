import { Component, Inject, ViewChild } from '@angular/core';
import { TreeViewComponent, NodeClickEventArgs, BeforeOpenCloseMenuEventArgs, MenuEventArgs, MenuItemModel, ContextMenuComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
    selector: 'app-container',
  templateUrl: './design.component.html'
    // template: `<div id='treeparent'>
    //              <ejs-treeview  id='tree' #treevalidate [fields]='field' (nodeClicked)='nodeclicked($event)'></ejs-treeview>
    //              </div>
    //              <ejs-contextmenu #contentmenutree id='contentmenutree' target='#tree' [items]='menuItems' (beforeOpen)='beforeopen($event)' (select)='menuclick($event)'></ejs-contextmenu>`
})
export class DesignComponent {

  public hierarchicalData: Object[] = [
    // {
    //   id: '01',
    //   name: 'collections',
    //   hasAttribute: {selected : 'True'}
    // }
        // {
        // id: '01', name: 'Local Disk (C:)', expanded: true, hasAttribute: {class: 'remove rename'},
        //     subChild: [
        //         {
        //             id: '01-01', name: 'Program Files',
        //             subChild: [
        //                 { id: '01-01-01', name: 'Windows NT' },
        //                 { id: '01-01-02', name: 'Windows Mail' },
        //                 { id: '01-01-03', name: 'Windows Photo Viewer' },
        //             ]
        //         },
        //         {
        //             id: '01-02', name: 'Users', expanded: true,
        //             subChild: [
        //                 { id: '01-02-01', name: 'Smith' },
        //                 { id: '01-02-02', name: 'Public' },
        //                 { id: '01-02-03', name: 'Admin' },
        //             ]
        //         },
        //         {
        //             id: '01-03', name: 'Windows',
        //             subChild: [
        //                 { id: '01-03-01', name: 'Boot' },
        //                 { id: '01-03-02', name: 'FileManager' },
        //                 { id: '01-03-03', name: 'System32' },
        //             ]
        //         },
        //     ]
        // },
        // {
        //     id: '02', name: 'Local Disk (D:)', hasAttribute: {class: 'remove'},
        //     subChild: [
        //         {
        //             id: '02-01', name: 'Personals',
        //             subChild: [
        //                 { id: '02-01-01', name: 'My photo.png' },
        //                 { id: '02-01-02', name: 'Rental document.docx' },
        //                 { id: '02-01-03', name: 'Pay slip.pdf' },
        //             ]
        //         },
        //         {
        //             id: '02-02', name: 'Projects',
        //             subChild: [
        //                 { id: '02-02-01', name: 'ASP Application' },
        //                 { id: '02-02-02', name: 'TypeScript Application' },
        //                 { id: '02-02-03', name: 'React Application' },
        //             ]
        //         },
        //         {
        //             id: '02-03', name: 'Office',
        //             subChild: [
        //                 { id: '02-03-01', name: 'Work details.docx' },
        //                 { id: '02-03-02', name: 'Weekly report.docx' },
        //                 { id: '02-03-03', name: 'Wish list.csv' },
        //             ]
        //         },
        //     ]
        // },
        // {
        //     id: '03', name: 'Local Disk (E:)', icon: 'folder', hasAttribute: {class: 'rename'},
        //     subChild: [
        //         {
        //             id: '03-01', name: 'Pictures',
        //             subChild: [
        //                 { id: '03-01-01', name: 'Wind.jpg' },
        //                 { id: '03-01-02', name: 'Stone.jpg' },
        //                 { id: '03-01-03', name: 'Home.jpg' },
        //             ]
        //         },
        //         {
        //             id: '03-02', name: 'Documents',
        //                 subChild: [
        //                 { id: '03-02-01', name: 'Environment Pollution.docx' },
        //                 { id: '03-02-02', name: 'Global Warming.ppt' },
        //                 { id: '03-02-03', name: 'Social Network.pdf' },
        //             ]
        //         },
        //         {
        //             id: '03-03', name: 'Study Materials',
        //             subChild: [
        //                 { id: '03-03-01', name: 'UI-Guide.pdf' },
        //                 { id: '03-03-02', name: 'Tutorials.zip' },
        //                 { id: '03-03-03', name: 'TypeScript.7z' },
        //             ]
        //         },
        //     ]
        // }
    ];
    // Mapping TreeView fields property with data source properties
    public field: Object = { dataSource: this.hierarchicalData, id: 'id', text: 'name', child: 'subChild', htmlAttributes: 'hasAttribute' };

    @ViewChild ('treevalidate') treevalidate: TreeViewComponent;
    @ViewChild ('contentmenutree') contentmenutree: ContextMenuComponent;

 // Render the context menu with target as Treeview
public menuItems: MenuItemModel[] = [
     { text: 'Add Reference' },
  // { text: 'Add New Item' },
   { text: 'Add Nested Item' },
    { text: 'Rename Item' },
    { text: 'Remove Item' }
];

public index = 1;
relationships = ['R_ID<->U_ID', 'U_ID<->B_ID', 'U_ID<->C_ID', 'U_ID<->P_ID', 'B_ID<->P_ID', 'C_ID<->P_ID'];
atoms = ['B_ID', 'C_ID', 'P_ID', 'R_ID', 'U_ID'];

public  addCollection(){
  const nodeId: string = 'tree_' + this.index;
  const item: { [key: string]: Object } = { id: nodeId, name: 'New Collection' };
  this.treevalidate.addNodes([item], 'collections', null);
  this.index++;
  this.hierarchicalData.push(item);


   const nodeId2 = 'tree_' + this.index;
   const item2: { [key: string]: Object } = { id: nodeId2, name: '<Root name>' };
   this.treevalidate.addNodes([item2], nodeId, null);
   this.index++;
   this.hierarchicalData.push(item2);
   this.treevalidate.beginEdit(nodeId2);
}

    public nodeclicked(args: NodeClickEventArgs) {
        if (args.event.which === 3) {
            this.treevalidate.selectedNodes = [args.node.getAttribute('data-uid')];
        }
    }
public menuclick(args: MenuEventArgs) {
    const targetNodeId: string = this.treevalidate.selectedNodes[0];
    if (args.item.text == 'Add New Item') {
    const nodeId: string = 'tree_' + this.index;
    const item: { [key: string]: Object } = { id: nodeId, name: 'New Folder' };
    this.treevalidate.addNodes([item], targetNodeId, null);
    this.index++;
    this.hierarchicalData.push(item);
    this.treevalidate.beginEdit(nodeId);
    }
    else if (args.item.text == 'Remove Item') {
        this.treevalidate.removeNodes([targetNodeId]);
    }
    else if (args.item.text == 'Rename Item') {
        this.treevalidate.beginEdit(targetNodeId);
    }
    else if (args.item.text == 'Add Reference') {
        const nodeId: string = 'tree_' + this.index;
        const item: { [key: string]: Object } = { id: nodeId, name: 'Write Atom Name' };
        this.treevalidate.addNodes([item], targetNodeId, null);
        this.index++;
        this.hierarchicalData.push(item);
        this.treevalidate.beginEdit(nodeId);
    }
    else if (args.item.text == 'Add Nested Item') {
        const nodeId: string = 'tree_' + this.index;
        const item: { [key: string]: Object } = { id: nodeId, name: 'Nest' };
        this.treevalidate.addNodes([item], targetNodeId, null);
        this.index++;
        this.hierarchicalData.push(item);

        const nodeId2 = 'tree_' + this.index;
        const item2: { [key: string]: Object } = { id: nodeId2, name: 'Write Atom Name' };
        this.treevalidate.addNodes([item2], nodeId, null);
        this.index++;
        this.hierarchicalData.push(item2);
        this.treevalidate.beginEdit(nodeId2);
    }
}

public beforeopen(args: BeforeOpenCloseMenuEventArgs) {
    const targetNodeId: string = this.treevalidate.selectedNodes[0];
    const targetNode: Element = document.querySelector('[data-uid="' + targetNodeId + '"]');
    // targetNode.chi
    // console.log(targetNode.childNodes);
    // if (targetNode.classList.contains('remove')) {
    if (targetNode.childNodes.length > 2){
        this.contentmenutree.enableItems(['Remove Item'], false);
    }
    else {
        this.contentmenutree.enableItems(['Remove Item'], true);
    }
    // if (targetNode.classList.contains('rename')) {
    //     this.contentmenutree.enableItems(['Rename Item'], false);
    // }
    // else {
    //     this.contentmenutree.enableItems(['Rename Item'], true);
    // }
}

  evaluate() {

  }

  onFile2Change($event: Event) {

  }
}
