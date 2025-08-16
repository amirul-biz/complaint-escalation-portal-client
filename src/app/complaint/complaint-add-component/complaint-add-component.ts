import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { finalize, forkJoin, tap } from 'rxjs';
import { AuthService } from '../../component/auth/auth-service/auth-service';
import { ComplaintForm } from '../complaint-form/complaint-form';
import { getComplaintForm } from '../complaint-form/complaint-form.config';
import { ICreateComplaintRequest, IPriority, IStatus } from '../complaint.interface';
import { ComplaintService } from '../complaint-service/complaint-service';

@Component({
  selector: 'app-complaint-add-component',
  imports: [RouterModule, CommonModule, ComplaintForm],
  templateUrl: './complaint-add-component.html',
  styleUrl: './complaint-add-component.scss',
})
export class ComplaintAddComponent {
  complaintService = inject(ComplaintService);
  authService = inject(AuthService);
  form = getComplaintForm();
  priorityList!: IPriority[];
  statusList!: IStatus[];
  location = inject(Location);

  ngOnInit() {
    this.getMetadata();
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

  createComplaint() {
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
}
