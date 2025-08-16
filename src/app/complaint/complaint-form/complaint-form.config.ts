import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PriorityEnum, StatusEnum } from '../complaint.enums';

export interface IComplaintFormModel {
  title: FormControl<string>;
  description: FormControl<string>;
  statusId: FormControl<StatusEnum>;
  priorityId: FormControl<PriorityEnum>;
}

export function getComplaintForm(): FormGroup<IComplaintFormModel> {
  return new FormGroup<IComplaintFormModel>({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(30)],
    }),
    statusId: new FormControl<StatusEnum>(StatusEnum.NEW, { nonNullable: true }),
    priorityId: new FormControl<PriorityEnum>(PriorityEnum.LOW, { nonNullable: true }),
  });
}
