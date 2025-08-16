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
  pageNumber: number;
  pageSize: number;
  search?: string | null;
  statusId?: string | null;
}

export interface IGetPaginatedComplaintResponse {
  complaints: IGetComplaintResponse[];
  totalPageCount: number;
  totalComplaintsCount: number;
  pageNumber: number;
  pageSize: number;
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

export interface IPriority {
  id: string;
  name: string;
}

export interface IStatus {
  id: string;
  name: string;
}
