import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  addTodoForm: FormGroup
  editTodoForm:FormGroup
  priority = ['Low', 'Medium', 'High'];
  allRoles = ['User', 'SubAdmin']
  todoDaata=[
    // {done:0, description:'something', dueDate:'22-04-2022', priority:'low', assignedto:'nitesh'},
    // {done:0, description:'something2', dueDate:'23-04-2022', priority:'high', assignedto:'mangalam'},
    // {done:0, description:'something4', dueDate:'23-04-2022', priority:'low', assignedto:'admin'}
  ]
  allUser = []
  assign:any
  dueDate: Date
  dataSource=this.todoDaata;
  closeResult: string;
  displayedColumns: string[] = ['done', 'decription', 'dueDate', 'priority','assignTo','action'];
  constructor(private userService: UserService,private modalService: NgbModal) {
    this.listAllTodos()
  this.dataSource = this.todoDaata
   }

  ngOnInit(): void {
    this.addTodoForm = new FormGroup({
      decription: new FormControl(),
      priority: new FormControl()
    })
    this.listAllUsers();
  }
  addTask() {
    const assignVal = JSON.parse(this.assign)
    this.addTodoForm.addControl('assignTo', new FormControl(assignVal?.userName));
    this.addTodoForm.addControl('assignToId', new FormControl(assignVal?.id));
    const date = moment(this.dueDate).format("YYYY-MM-DD"); 
    this.addTodoForm.addControl('dueDate', new FormControl(date));  
    this.userService.createTodo(this.addTodoForm.value).subscribe(res=>{
      this.listAllTodos();
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
  ngAfterViewInit(): void {
    console.log(this.dataSource);
    this.dataSource =this.todoDaata    
  }
  listAllTodos(){
    this.userService.getAllTodos().subscribe(res=>{
      console.log(res);
      res?.data.forEach(data=>[
        this.todoDaata.push(data)
      ])
      
    })
  }
  done($event){
    console.log($event);
  }
  editTodo(event){
    this.editTodoForm = new FormGroup({
      
    })
    console.log(event);
  }
  deleteTodo(event){
    console.log(event);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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
}
