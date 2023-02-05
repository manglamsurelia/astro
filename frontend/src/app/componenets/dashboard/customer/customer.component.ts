import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../services/customer.service';
export interface Customer {
  sale_id: number;
  date_of_sale: Date;
  customer_name: string;
  currency: string;
  amount: number;
  item: string;
  invoice: number;
  address: string;
  notes: string
}
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, AfterViewInit {
  customerSpinner: boolean = true;
  addNewCustomerForm: FormGroup;
  editCustomerForm: FormGroup;
  closeResult: string;
  currencies = ['INR', '$'];
  private dsData: any;
  private idColumn = 'id';
  dataSource = new MatTableDataSource<Customer>;
  displayedColumns: string[] = ['date_of_sale', 'customer_name', 'amount', 'item', 'invoice', 'address', 'notes', 'options'];

  // @ViewChild(MatPaginator) paginator2: MatPaginator;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(private toaster: ToastrService, private modalService: NgbModal, public dialog: MatDialog, public customerService: CustomerService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.customerService.customerList().subscribe(res => {
      console.log(res);
      if (res.sucess == true) {
        this.dataSource.data = res.data;
        setTimeout(() => {
          this.customerSpinner = false;
        }, 200);
      }
    })

    this.addNewCustomerForm = new FormGroup({
      date_of_sale: new FormControl(),
      customer_name: new FormControl(),
      currency: new FormControl("INR"),
      amount: new FormControl(),
      item: new FormControl(),
      invoice: new FormControl(Math.floor(Math.random() * 100000)),
      address: new FormControl(),
      notes: new FormControl()
    })
  }

  addNewCustomer() {
    this.addNewCustomerForm.value.date_of_sale = moment(this.addNewCustomerForm.value.date_of_sale).format("YYYY-MM-DD");
    this.customerService.addCustomer(this.addNewCustomerForm.value).subscribe(res=>{
      if (res.sucess == true) {
        this.customerSpinner=true
        this.toaster.success("Customer Added successfully !!", "Customer added successfully !!");
        this.addNewCustomerForm.reset();
        this.ngOnInit();
      }
      else{
        console.log('Some Error');
      }
    })
  }

  editRecord(event, content) {
    this.editCustomerForm = new FormGroup({
      date_of_sale: new FormControl(),
      customer_name: new FormControl(),
      currency: new FormControl(),
      amount: new FormControl(),
      item: new FormControl(),
      invoice: new FormControl(),
      address: new FormControl(),
      notes: new FormControl()
    })
    this.editCustomerForm.patchValue(event);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with :${result}`;
      if (result == 'yes') {
        this.editCustomerForm.value.date_of_sale = moment(this.editCustomerForm.value.date_of_sale).format("YYYY-MM-DD");
        console.log(this.editCustomerForm)
        this.customerService.updateCustomer(this.editCustomerForm.value, event.sale_id).subscribe(res => {
          if (res.sucess === true) {
            this.customerSpinner = true
            this.toaster.success("Customer Updated successfully !!", "Customer Updated successfully !!")
            this.ngOnInit();
          } else {
            console.log('Some Error');
          }
        })
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
    });
  }

  deleteCustomer(id, modal) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with : ${result}`;
      if (result == 'yes') {
        this.deleteSingleCustomer(id);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
    }
    )
  }
  deleteSingleCustomer(id) {
    const dsData = this.dataSource.data;
    const record = dsData.find(obj => obj[this.idColumn] === id);
    this.customerService.deleteCustomer(id).subscribe(res => {
      console.log(res);
      if (res.sucess == true) {
        this.toaster.success("Client deleted successfully !!", "Client deleted successfully !!")
        this.deleteRowDataTable(id, this.idColumn, this.paginator, this.dataSource);
      }
      else {
        console.log('Some Error ');
      }
    })
  }
  private deleteRowDataTable(recordId, idColumn, paginator, dataSource) {
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
      return `with: ${reason}`;
    }
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }
}
