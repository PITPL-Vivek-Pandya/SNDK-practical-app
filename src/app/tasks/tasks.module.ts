import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgDragDropModule } from 'ng-drag-drop';
import { SharedModule } from '../common/shared.module';
import { MaterialModule } from '../matModule';
import { AssignToPipe } from '../pipe/assign-to.pipe';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks/tasks.component';



@NgModule({
  declarations: [
    TaskAddEditComponent,
    TasksComponent,
    AssignToPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TasksRoutingModule,
    NgDragDropModule.forRoot(),
    DragDropModule,
    MaterialModule
  ]
})
export class TasksModule { }
