import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
export interface Todo {
  todoId: number;
  done: string;
  description: string;
  dueDate: Date;
  priority: number;
  assignTo: string;
  assignBy: string;
  assignToId: string;
}
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  addTodoForm: FormGroup
  editTodoForm:FormGroup
  priorities = ['Low', 'Medium', 'High'];
  allRoles = ['User', 'SubAdmin']
  todoDaata=[]
  allUser = []
  assign:any
  dueDate: Date
  dataSource=new MatTableDataSource<Todo>;
  doneId;
  doneIdbool:boolean=false;
  closeResult: string;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  displayedColumns: string[] = ['done', 'decription', 'dueDate', 'priority','assignTo','action'];
  idColumn: any;
  dsData: any;
  todoSpinner:boolean=true
  constructor(private userService: UserService,private modalService: NgbModal, private toaster:ToastrService) {

   }

  ngOnInit(): void {
    this.addTodoForm = new FormGroup({
      description: new FormControl(),
      priority: new FormControl()
    })
    this.listAllUsers();
    this.listAllTodos();
  }
  addTask() {
    const assignVal = JSON.parse(this.assign)
    this.addTodoForm.addControl('assignTo', new FormControl(assignVal?.userName));
    this.addTodoForm.addControl('assignToId', new FormControl(assignVal?.id));
    const date = moment(this.dueDate).format("YYYY-MM-DD"); 
    this.addTodoForm.addControl('dueDate', new FormControl(date)); 
    console.log(this.addTodoForm.value);
    this.userService.createTodo(this.addTodoForm.value).subscribe(res=>{
      if(res.sucess === true){
        this.todoSpinner=  true
        this.toaster.success("Todo Added successfully !!", "Todo added successfully !!")
        this.listAllTodos();
      }  
    })
  }

  listAllUsers() {
    this.userService.userList().subscribe(res => {
      console.log(res);
      res.data.forEach(el => {
        this.allUser.push(el)
      })
    })
  }
  listAllTodos(){
    this.userService.getAllTodos().subscribe(res=>{
      if(res.sucess == true){
        this.dataSource.data = res.data
        setTimeout(() => {
          this.todoSpinner =false
        }, 100);
      }
    })
  }

  done(event){
    this.doneIdbool =! this.doneIdbool
    if(this.doneIdbool){
      this.doneId = event.todoId
    }
    else
    {
      this.doneId =''
    }
  }
  edit(event,content) {
    this.editTodoForm = new FormGroup({
      description: new FormControl(event),
      priority: new FormControl(),
      assignTo: new FormControl(),
      dueDate: new FormControl()
    })
    this.editTodoForm.patchValue(event);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {  
        this.editTodoForm.addControl('assignToId', new FormControl(event?.assignToId));
        this.editTodoForm.addControl('todoId', new FormControl(event?.todoId));
        this.userService.editTodo(this.editTodoForm.value).subscribe(res=>{
          if(res.sucess === true){
            this.todoSpinner=true
            this.toaster.success("Todo Updated successfully !!", "Todo Updated successfully !!")
            this.listAllTodos();
          }
        })
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  deleteTodo(event,modal){
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {  
        this.deleteSingleTodo(event);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        
    });
  }

  deleteSingleTodo(event){
    console.log(event);
    const dsData = this.dataSource.data;
    const record = dsData.find(obj => obj[this.idColumn] === event);
    const todoId = event.todoId;
    this.userService.deleteTodo(event).subscribe(res=>{
      if(res.sucess === true){
      this.toaster.success("Todo deleted successfully !!", "Todo deleted successfully !!")
      this.deleteRowDataTable (event, this.idColumn, this.paginator, this.dataSource);
    }
    })
    
  }
  private deleteRowDataTable (recordId, idColumn, paginator, dataSource) {
    this.dsData = dataSource.data;
    const itemIndex = this.dsData.findIndex(obj => obj[idColumn] === recordId);
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }
}
