import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PriorityEnum, StatusEnum } from '../complaint.enums';

export interface ICreateComplaintRequest {
  title: FormControl<string>;
  description: FormControl<string>;
  statusId: FormControl<StatusEnum>;
  priorityId: FormControl<PriorityEnum>;
}

export function getComplaintForm(): FormGroup<ICreateComplaintRequest> {
  return new FormGroup<ICreateComplaintRequest>({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(10)],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(30)],
    }),
    statusId: new FormControl<StatusEnum>(StatusEnum.NEW, { nonNullable: true }),
    priorityId: new FormControl<PriorityEnum>(PriorityEnum.LOW, { nonNullable: true }),
  });
}
