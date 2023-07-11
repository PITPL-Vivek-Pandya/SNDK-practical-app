import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgDragDropModule } from 'ng-drag-drop';
import { AppUrlsConstants } from '../constants';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {path: '',
  component: TasksComponent},
  {path: AppUrlsConstants.ADD,
  component: TaskAddEditComponent},
  {path: `${AppUrlsConstants.EDIT}${AppUrlsConstants.URL_SEPARATOR}:id`,
  component: TaskAddEditComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
