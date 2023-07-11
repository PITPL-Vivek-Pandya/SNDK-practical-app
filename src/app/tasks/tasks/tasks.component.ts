import { Component, OnInit } from '@angular/core';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task } from 'src/app/interface/task';
import { LocalStorage } from 'src/app/service/local-storage';
import { Router } from '@angular/router';
import { AppUrlsConstants } from 'src/app/constants';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks:Task[] = [];
  storage = new LocalStorage();
  pending = [];
  completed = [];
  appUrlsConstants = AppUrlsConstants;
  constructor(private router:Router) { }
  ngOnInit(): void {
    const user = this.storage.get('user');
    this.tasks = this.storage.get("tasks").filter(t=>t.user === user.email);
    this.updateTaskList();
  }

  drop(event: CdkDragDrop<Task[]>) {
    const user = this.storage.get('user');
    const otherTasks = this.storage.get("tasks").filter(t=>t.user !== user.email);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const list:Task[] = this.pending.concat(this.completed);
      this.storage.update('tasks',list.concat(otherTasks))
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.pending.forEach(element => {
        element.status = 1;
      });
      this.completed.forEach(element => {
        element.status = 2;
      });
      const list:Task[] = this.pending.concat(this.completed);
      this.storage.update('tasks',list.concat(otherTasks))
    }
  }
  onEdit(id:number){
    this.router.navigate(['/tasks/edit/'+id]);
  }
  onDelete(id:number){
    const text = "You won't be able to revert this!"
    if(confirm(text) === true){
      const tasks = this.storage.get('tasks');
      const index = tasks.findIndex(task=>task.id == id);
      tasks.splice(index,1);
      this.storage.update("tasks",tasks);
      this.updateTaskList();
    }
  }
  updateTaskList(){
    const user = this.storage.get('user');
    const tasks = this.storage.get("tasks").filter(t=>t.user === user.email);
    this.pending = tasks.filter(t=>t.status == 1);
    this.completed = tasks.filter(t=>t.status == 2);
  }
}

