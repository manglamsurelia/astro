import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
// import { MessagesService } from '../../services/messages.service';
import { UserService } from '../../services/user.service';
export interface Client {
  id: number;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  estimatedSale: number;
  lastContact: Date;
  nextAction: string;
  nextContact: Date;
  leadStatus: string;
  leadSource: string;
  notes: string;
  currency: string;
}
export const clientColumns = [{key: 'clientName'},{key: 'clientPhone'},{key: 'clientEmail'},{key: 'estimatedSale'},{key: 'lastContact'},{key: 'nextAction'},{key: 'nextContact'},{key: 'leadStatus'},{key: 'leadSource'},{key: 'notes'},{key: 'options'}
];
@Component({
  selector: 'app-client-tab',
  templateUrl: './client-tab.component.html',
  styleUrls: ['./client-tab.component.scss']
})
export class ClientTabComponent implements OnInit,AfterViewInit {
  addNewClientForm: FormGroup
  editClientForm:FormGroup
  dataSource = new MatTableDataSource<Client>;
  displayedColumns: string[] = clientColumns.map((col) => col.key);
  leadStatus=[{name:'Won'},{name:'Cold'}]
  leadSource=[{name:'Website'},{name:'Yoututbe'},{name:'Refferal'}]
  columnsSchema: any = clientColumns;
  private idColumn = 'id';
  private dsData: any;

  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  currencies=['INR','DOLLAR']
  closeResult: string;
  tableData:boolean=false
  clientSpinner:boolean=true
  constructor(private toaster: ToastrService,private modalService: NgbModal, public dialog: MatDialog, private userService: UserService) { }
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.userService.allClient().subscribe(res => {
        if(res.sucess == true){
          this.dataSource.data = res.data;
          setTimeout(() => {
            this.clientSpinner =false;
          }, 200);
        }
    })

    this.addNewClientForm = new FormGroup({
      clientName: new FormControl(),
      clientPhone: new FormControl(),
      clientEmail: new FormControl(),
      estimatedSale: new FormControl(),
      lastContact: new FormControl(),
      nextAction: new FormControl(),
      nextContact: new FormControl(),
      leadStatus: new FormControl(),
      leadSource: new FormControl(),
      notes: new FormControl(),
      currency: new FormControl()
    })
  }
  addNewClient() {
    this.userService.addNewClient(this.addNewClientForm.value).subscribe(res => {
      if (res.sucess == true) {
        this.clientSpinner=true
        this.toaster.success("Client Added successfully !!", "Client added successfully !!");
        this.addNewClientForm.reset();
        this.ngOnInit();
      }
    })
  }

  
  editRecord(event,content) {
    this.editClientForm = new FormGroup({
      clientName: new FormControl(),
      clientPhone: new FormControl(),
      clientEmail: new FormControl(),
      estimatedSale: new FormControl(),
      lastContact: new FormControl(),
      nextAction: new FormControl(),
      nextContact: new FormControl(),
      leadStatus: new FormControl(),
      leadSource: new FormControl(),
      notes: new FormControl(),
      currency: new FormControl()
    })
    this.editClientForm.patchValue(event);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {  
        this.userService.updateClient(this.editClientForm.value, event.clientId).subscribe(res=>{
          if(res.sucess === true){
            this.clientSpinner=true
            this.toaster.success("Client Updated successfully !!", "Client Updated successfully !!")
            this.ngOnInit();
          }
        })
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  deleteCLient(id,modal){
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {  
        this.deleteRecord(id);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        
    });
  }
  deleteRecord(id) {
    const dsData = this.dataSource.data;
    const record = dsData.find(obj => obj[this.idColumn] === id);
    this.userService.deleteClient(id).subscribe(res => {
      if (res.sucess == true) {
        this.toaster.success("Client deleted successfully !!", "Client deleted successfully !!")
        this.deleteRowDataTable (id, this.idColumn, this.paginator, this.dataSource);
      }
    })

  }
  private deleteRowDataTable (recordId, idColumn, paginator, dataSource) {
    this.dsData = dataSource.data;
    const itemIndex = this.dsData.findIndex(obj => obj[idColumn] === recordId);
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }
}
