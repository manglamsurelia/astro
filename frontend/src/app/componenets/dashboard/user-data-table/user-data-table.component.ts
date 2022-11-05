import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { UserDataTableService } from '../../services/user-data-table.service';
export interface userDataTable {
  id: number;
  boy_Name: string,
      boy_birthPlace: string,
      boy_birthTime: string,
      boy_dob:Date,
      girl_Name: string,
      girl_birthPlace: string,
      girl_birthTime: string,
      girl_dob: Date,
      name:string,
      dob: Date,
      birthPlace: string,
      birthTime: string,
      native_question: string,
      comment: string
}
@Component({
  selector: 'app-user-data-table',
  templateUrl: './user-data-table.component.html',
  styleUrls: ['./user-data-table.component.css']
})
export class UserDataTableComponent implements OnInit {
  addUserDataForm:FormGroup;
  editUserForm:FormGroup
  girl_dob:any;
  // category:any
  boy_dob:any;
  selectedCategory:any
  dataSource = new MatTableDataSource<userDataTable>;
  dataSourceMarriage= new MatTableDataSource<userDataTable>;
  dataSourceCareer= new MatTableDataSource<userDataTable>;
  dataSourceProgeny= new MatTableDataSource<userDataTable>;
  dataSourceEducation= new MatTableDataSource<userDataTable>;
  dataSourceTravel= new MatTableDataSource<userDataTable>;
  dataSourceHealth= new MatTableDataSource<userDataTable>;
  dataSourceLitigation= new MatTableDataSource<userDataTable>;
  dataSourceLongevity= new MatTableDataSource<userDataTable>;
  subCategoriesCareer=['Types of Profession']
  subCategoriesEducation=['Break in Education','Education condition','Types of Education']
  subCategoriesProgeny=['Late Child','Miscarriages','Others']
  subCategoriesTravel=['Foreign travel promised']
  subCategoriesHealth=['Chronic disease','Other']
  subCategoriesLongevity=['Others']
  subCategoriesMarriage=['Love Marriage','Divorce','More than One Marriage','Disturbed Marriage','Late Marriage','Early Marriage','No Marriage']
  Categories=['Marriage','Career & Finance','Progeny','education','travel','health','litigation','longevity']
  displayedColumnsMarriage: string[] = ['category','Boy Name', 'Boy BirthPlace', 'Boy BirthTime', 'Boy birthDate','Girl Name','Girl BirthPlace', 'Girl BirthTime','Girl BirthDate','action']
  displayedColumnsProgeny: string[] = ['category','Boy Name', 'Boy BirthPlace', 'Boy BirthTime', 'Boy birthDate','Girl Name','Girl BirthPlace', 'Girl BirthTime','Girl BirthDate','action']
  displayedColumnsCareer: string[] = ['category','name','dob','birth_time','birth_place','native_question','comment','action']
  displayedColumnsEducation: string[] = ['category','name','dob','birth_time','birth_place','native_question','comment','action']
  displayedColumnsTravel: string[] = ['category','name','dob','birth_time','birth_place','native_question','comment','action']
  displayedColumnsHealth: string[] = ['category','name','dob','birth_time','birth_place','native_question','comment','action']
  displayedColumnsLitigation: string[] = ['category','name','dob','birth_time','birth_place','native_question','comment','action']
  displayedColumnsLongevity: string[] = ['category','name','dob','birth_time','birth_place','native_question','comment','action']
  closeResult: string;
  constructor(public userDataService:UserDataTableService,private modalService: NgbModal, private toaster:ToastrService) { }

  public ngOnInit(): void {
     this.addUserDataForm = new FormGroup({
      category: new FormControl(),
      subCategory: new FormControl(),
      boy_Name: new FormControl(),
      boy_birthPlace: new FormControl(),
      boy_birthTime: new FormControl(),
      boy_dob:new FormControl(),
      girl_Name: new FormControl(),
      girl_birthPlace: new FormControl(),
      girl_birthTime: new FormControl(),
      girl_dob: new FormControl(),
      name:new FormControl(),
      dob: new FormControl('',),
      birthPlace: new FormControl(),
      birthTime: new FormControl(),
      native_question: new FormControl(),
      comment: new FormControl()
     })
     this.listAllUserData();
  }
  addTask(){
    console.log(this.addUserDataForm.value);
    this.userDataService.addNewUserData(this.addUserDataForm.value).subscribe(res=>{
      if (res.sucess == true){
        this.toaster.success("UserData Added successfully !!", "UserData added successfully !!");
         this.listAllUserData();
      }      
    })
  }
  listAllUserData(){
    this.userDataService.allUsersData().subscribe(res=>{
      if(res.sucess == true){
        var array1:any=[]
        var array2:any=[]
        var array3:any=[]
        var array4:any=[]
        var array5:any=[]
        var array6:any=[]
        var array7:any=[]
        var array8:any=[]
        res.data.forEach(element => {
          if( element.category === 'Marriage'){
            array1.push(element) 
          }
          else if(element.category === 'travel'){
            array2.push(element)
          }
          else if(element.category === 'Progeny'){
            array3.push(element)
          }
          else if(element.category === 'Career & Finance'){
            array4.push(element)
          }
          else if(element.category === 'education'){
            array5.push(element)
          }
          else if(element.category === 'health'){
            array6.push(element)
          }
          else if(element.category === 'litigation'){
            array7.push(element)
          }
          else if(element.category === 'longevity'){
            array8.push(element)
          }
        });
        this.dataSourceMarriage=array1;
        this.dataSourceTravel=array2
        this.dataSourceProgeny=array3
        this.dataSourceCareer=array4
        this.dataSourceEducation=array5
        this.dataSourceHealth=array6
        this.dataSourceLitigation=array7
        this.dataSourceLongevity=array8
        
      }
    })
  }
  editUserData(event,content){
    this.editUserForm = new FormGroup({
      category: new FormControl(),
      subCatogory: new FormControl(),
      boy_Name: new FormControl(),
      boy_birthPlace: new FormControl(),
      boy_birthTime: new FormControl(),
      boy_dob:new FormControl(),
      girl_Name: new FormControl(),
      girl_birthPlace: new FormControl(),
      girl_birthTime: new FormControl(),
      girl_dob: new FormControl(),
      name:new FormControl(),
      dob: new FormControl('',),
      birthPlace: new FormControl(),
      birthTime: new FormControl(),
      native_question: new FormControl(),
      comment: new FormControl()
    })
    // this.category='Marriage'
    this.selectedCategory = event.category
    this.editUserForm.patchValue(event);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {  
        this.userDataService.updateUserData(this.editUserForm.value,event.user_id).subscribe(res=>{
          if(res.sucess === true){
            this.toaster.success("UserData Updated successfully !!", "UserData Updated successfully !!")
            this.listAllUserData();
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
  deleteMarriageData(id, modal){
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {  
        this.deleteByID(id);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        
    });
    
  }
  deleteByID(id){
// const dsData = this.dataSource.data;
    // const record = dsData.find(obj => obj[this.idColumn] === id);
    this.userDataService.deleteUserData(id).subscribe(res => {
      if (res.sucess == true) {
        this.toaster.success("Client deleted successfully !!", "Client deleted successfully !!")
        // this.deleteRowDataTable (id, this.idColumn, this.paginator, this.dataSource);
        this.listAllUserData();
      }
    })
  }
  setCategory(event){
    this.selectedCategory= event.target.value
    
  }
}
