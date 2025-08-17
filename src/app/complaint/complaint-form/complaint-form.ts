import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IPriority, IStatus } from '../complaint.interface';
import { IComplaintFormModel } from './complaint-form.config';

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
  @Input() isHideStatusField = false;
}
