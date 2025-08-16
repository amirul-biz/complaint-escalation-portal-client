import { StatusEnum, PriorityEnum } from './complaint.enums';

export interface IGetComplaintResponse {
  id: string;
  customerName: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  priority: string;
  status: string;
}

export interface IGetPaginatedComplaintRequest {
  userId: string;
  pageNumber: number;
  pageSize: number;
  search: string;
  statusId: string;
}

export interface IGetPaginatedComplaintResponse {
  complaints: IGetComplaintResponse[];
  totalPageCount: number;
}

export interface ICreateComplaintRequest {
  title: string;
  description: string;
  priorityId: PriorityEnum;
}

export interface IUpdateComplaintRequest {
  title: string;
  description: string;
  priorityId: PriorityEnum;
  statusId: StatusEnum;
}
export interface IUpdateComplaintRequest {
  statusId: string;
  priorityId: string;
}

export interface IPriority {
  id: string;
  name: string;
}

export interface IStatus {
  id: string;
  name: string;
}
