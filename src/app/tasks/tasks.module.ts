import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { NgDragDropModule } from 'ng-drag-drop';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import { AssignToPipe } from '../pipe/assign-to.pipe';
import { SharedModule } from '../common/shared.module';



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
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ]
})
export class TasksModule { }
