import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IComplaintFormModel } from './complaint-form.config';
import { IPriority, IStatus } from '../complaint.interface';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-complaint-form',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './complaint-form.html',
  styleUrl: './complaint-form.scss',
})
export class ComplaintForm {
  @Input() form!: FormGroup<IComplaintFormModel>;
  @Input() priorityList!: IPriority[];
  @Input() statusList!: IStatus[];
  @Output() submitEmitter = new EventEmitter();
}
