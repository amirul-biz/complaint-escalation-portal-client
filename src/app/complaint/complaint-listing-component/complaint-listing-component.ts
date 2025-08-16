import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, tap } from 'rxjs';
import { ComplaintService } from '../complaint-service/complaint-service';
import { IGetPaginatedComplaintResponse, IStatus } from '../complaint.interface';
import {
  defaultPageNumber,
  getListingForm,
  pageSizeOptions,
} from './complaint-listing-form.config';

@Component({
  selector: 'app-complaint-listing-component',
  imports: [CommonModule, NgbPaginationModule, ReactiveFormsModule],
  templateUrl: './complaint-listing-component.html',
  styleUrl: './complaint-listing-component.scss',
})
export class ComplaintListingComponent implements OnInit {
  complaintService = inject(ComplaintService);
  cdr = inject(ChangeDetectorRef);
  form = getListingForm();
  complaintData!: IGetPaginatedComplaintResponse | null;
  statusList!: IStatus[];
  pageSizeOptions = pageSizeOptions;

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
      })
    );
  }

  getStatusList() {
    return this.complaintService.getStatuses().pipe(
      tap((response) => {
        this.statusList = response;
        this.cdr.markForCheck();
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
