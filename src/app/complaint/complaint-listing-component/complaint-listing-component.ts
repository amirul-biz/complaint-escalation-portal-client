import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { catchError, forkJoin, tap } from 'rxjs';
import { ComplaintService } from '../complaint-service/complaint-service';
import { IGetPaginatedComplaintResponse, IStatus } from '../complaint.interface';
import {
  defaultPageNumber,
  getListingForm,
  pageSizeOptions,
} from './complaint-listing-form.config';
import { Router, RouterModule } from '@angular/router';
import { ComplaintPageModeEnum } from '../complaint.pageMode.enum';
import { IAuthError } from '../../interfaces/interface.auth';
import { AuthService } from '../../component/auth/auth-service/auth-service';

@Component({
  selector: 'app-complaint-listing-component',
  imports: [CommonModule, NgbPaginationModule, ReactiveFormsModule, RouterModule],
  templateUrl: './complaint-listing-component.html',
  styleUrl: './complaint-listing-component.scss',
})
export class ComplaintListingComponent implements OnInit {
  complaintService = inject(ComplaintService);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  form = getListingForm();
  authService = inject(AuthService);
  complaintData!: IGetPaginatedComplaintResponse | null;
  statusList!: IStatus[];
  pageSizeOptions = pageSizeOptions;
  pageModeEnum = ComplaintPageModeEnum;

  ngOnInit(): void {
    forkJoin([this.getComplainListing(), this.getStatusList()]).subscribe(() =>
      this.cdr.markForCheck()
    );
  }

  getComplainListing() {
    return this.complaintService.getPaginatedComplaints(this.form.getRawValue()).pipe(
      tap((response) => {
        this.complaintData = response;
        this.cdr.markForCheck();
      }),
      catchError((error: IAuthError) => {
        return this.authService.httpErrorHandler(error);
      })
    );
  }

  getStatusList() {
    return this.complaintService.getStatuses().pipe(
      tap((response) => {
        this.statusList = response;
        this.cdr.markForCheck();
      }),
      catchError((error: IAuthError) => {
        return this.authService.httpErrorHandler(error);
      })
    );
  }

  resetSearch() {
    this.form = getListingForm();
    this.getComplainListing().subscribe();
  }

  pageSizeChange() {
    this.form.controls.pageNumber.patchValue(defaultPageNumber);
    this.getComplainListing().subscribe();
  }

  pageNumberChange(pageNumber: number) {
    this.form.controls.pageNumber.patchValue(pageNumber);
    this.getComplainListing().subscribe();
  }
}
