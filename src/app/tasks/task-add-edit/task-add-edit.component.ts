import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex } from 'rxjs';
import { Task } from 'src/app/interface/task';
import { LocalStorage } from 'src/app/service/local-storage';

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.css']
})
export class TaskAddEditComponent implements OnInit {
  public formGroup!: FormGroup;
  task: Task = new Task();
  loaded:boolean;
  assigns = [{key:1,value:"Vivek"},{key:2,value:"Bhavik"}];
  storage = new LocalStorage();
  btnName = 'Save';

  constructor(private fb: FormBuilder,private router:Router,private route: ActivatedRoute) { }

  

  ngOnInit(): void {
    const id = this.route.params['value'].id;
    if(id){
      this.btnName = 'Edit';
      const tasks = this.storage.get('tasks')
      this.task = tasks.find(task=>task.id == id);
    }
    this.createForm();
  }

  createForm(){
    const user = this.storage.get('user');
    this.formGroup = this.fb.group({
      id: [this.task.id],
      title: [
          this.task.title,
          Validators.compose([
              Validators.required,
              Validators.maxLength(50),
          ]),
      ],
      description: [this.task.description,Validators.required],
      assign: [this.task.assign,Validators.required],
      status: [this.task.status],
      user: [user.email],
  });
  this.loaded = true;
  }

  onSubmit(){
    let oldTasks = this.storage.get("tasks");
    this.formGroup.value.status = this.formGroup.value.status ?? 1;
    if(this.task.id){
      const id = this.route.params['value'].id;
      oldTasks.forEach(element => {
        
      });
      oldTasks = oldTasks.map(obj => this.task.id === obj.id ? this.formGroup.value : obj);

    }else{
      if(!oldTasks){
        this.formGroup.value.id =this.generateRandomNumber();
        oldTasks = [this.formGroup.value];
      }else{
        var id = this.generateRandomNumber();
        const oldIds = oldTasks.map((task)=>task.id);
        do {
          id = this.generateRandomNumber();
        } while (oldIds.includes(id));
        this.formGroup.value.id =this.generateRandomNumber();
        oldTasks.push(this.formGroup.value);
      }
    }
    this.storage.add("tasks",oldTasks); 
    this.router.navigate(['/']);
    
  }

  generateRandomNumber(){
    return Math.floor(100000 + Math.random() * 900000)
  }
}
