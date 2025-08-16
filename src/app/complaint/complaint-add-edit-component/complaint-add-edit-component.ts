import { CommonModule, Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { finalize, forkJoin, tap } from 'rxjs';
import { ComplaintForm } from '../complaint-form/complaint-form';
import { getComplaintForm } from '../complaint-form/complaint-form.config';
import { ComplaintService } from '../complaint-service/complaint-service';
import { StatusEnum } from '../complaint.enums';
import { ICreateComplaintRequest, IPriority, IStatus } from '../complaint.interface';
import { ComplaintPageModeEnum } from '../complaint.pageMode.enum';

@Component({
  selector: 'app-complaint-add-edit-component',
  imports: [RouterModule, CommonModule, ComplaintForm],
  templateUrl: './complaint-add-edit-component.html',
  styleUrl: './complaint-add-edit-component.scss',
})
export class ComplaintAddComponent {
  @Input() pageMode!: string;
  @Input() complaintId!: string;
  complaintService = inject(ComplaintService);
  form = getComplaintForm();
  priorityList!: IPriority[];
  statusList!: IStatus[];
  location = inject(Location);
  pageModeEnum = ComplaintPageModeEnum;

  ngOnInit() {
    this.getMetadata();
    if (this.pageMode === ComplaintPageModeEnum.Edit) {
      this.getEditActions();
    }

    console.log(this.pageMode);
  }

  getMetadata() {
    const statusList = this.complaintService.getStatuses();
    const priorityList = this.complaintService.getPriorities();

    forkJoin({
      statusList,
      priorityList,
    })
      .pipe(
        tap(({ statusList, priorityList }) => {
          this.statusList = statusList;
          this.priorityList = priorityList;
        })
      )
      .subscribe();
  }

  getEditActions() {
    this.complaintService
      .getComplaintById(this.complaintId)
      .pipe(
        tap((response) => {
          const data = response.complaint;
          this.form.patchValue({
            title: data.title,
            description: data.description,
            priorityId: data.priorityId,
            statusId: data.statusId,
          });

          const controls = this.form.controls;
          const disabledControl = [controls.title, controls.description, controls.priorityId];
          disabledControl.forEach((control) => control.disable());
        })
      )
      .subscribe();
  }

  addComplaint() {
    const form = this.form.value;
    this.complaintService
      .createComplaint({
        title: form.title,
        description: form.description,
        priorityId: form.priorityId,
      } as ICreateComplaintRequest)
      .pipe(
        finalize(() => {
          alert('New Complaint created Successfully');
          this.location.back();
        })
      )
      .subscribe();
  }

  updateComplaint() {
    const form = this.form.value;
    this.complaintService
      .updateComplaint(this.complaintId, {
        statusId: form.statusId as StatusEnum,
      })
      .pipe(
        finalize(() => {
          alert('Complaint updated Successfully');
          this.location.back();
        })
      )
      .subscribe();
  }
}
