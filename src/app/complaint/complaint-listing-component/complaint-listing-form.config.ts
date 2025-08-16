import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface IGetPaginatedComplaintRequestForm {
  pageNumber: FormControl<number>;
  pageSize: FormControl<number>;
  search: FormControl<string | null>;
  statusId: FormControl<string | null>;
}

export function getListingForm(): FormGroup<IGetPaginatedComplaintRequestForm> {
  return new FormGroup<IGetPaginatedComplaintRequestForm>({
    pageNumber: new FormControl<number>(defaultPageNumber, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    pageSize: new FormControl<number>(defaultPageSize, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    search: new FormControl<string | null>(null),
    statusId: new FormControl<string | null>(null),
  });
}

export const pageSizeOptions = [5, 10, 20, 50];
export const defaultPageNumber = 1;
export const defaultPageSize = 5;
