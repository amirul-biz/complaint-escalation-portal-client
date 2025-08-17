import { CommonModule, Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { catchError, forkJoin, tap } from 'rxjs';
import { AuthService } from '../../auth/auth-service/auth-service';
import { IAuthError, IAuthErrorMessage } from '../../interfaces/interface.auth';
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
  authService = inject(AuthService);

  ngOnInit() {
    this.getMetadata();
    if (this.pageMode === ComplaintPageModeEnum.Edit) {
      this.getEditActions();
    }
  }

  getMetadata() {
    const statusList = this.complaintService.getStatuses().pipe(
      catchError((error: IAuthErrorMessage) => {
        return this.authService.httpErrorHandler(error);
      })
    );
    const priorityList = this.complaintService.getPriorities().pipe(
      catchError((error: IAuthErrorMessage) => {
        return this.authService.httpErrorHandler(error);
      })
    );

    forkJoin({
      statusList,
      priorityList,
    })
      .pipe(
        tap(({ statusList, priorityList }) => {
          this.statusList = statusList as IStatus[];
          this.priorityList = priorityList as IPriority[];
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
        }),
        catchError((error: IAuthErrorMessage) => {
          return this.authService.httpErrorHandler(error);
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
        tap(() => {
          alert('New Complaint created Successfully');
          this.location.back();
        }),
        catchError((error: IAuthErrorMessage) => {
          return this.authService.httpErrorHandler(error);
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
        tap(() => {
          alert('Complaint updated Successfully');
          this.location.back();
        }),
        catchError((error: IAuthErrorMessage) => {
          return this.authService.httpErrorHandler(error);
        })
      )
      .subscribe();
  }
}
