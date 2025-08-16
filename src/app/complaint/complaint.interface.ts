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

// get complaint by id Complain response
export interface IGetComplaintByIdResponse {
  complaint: {
    id: string;
    customerName: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    priorityId: PriorityEnum;
    statusId: StatusEnum;
  };
}

export interface IGetPaginatedComplaintRequest {
  pageNumber: number;
  pageSize: number;
  search?: string | null;
  statusId?: string | null;
}

export interface IGetPaginatedComplaintResponse {
  items: IGetComplaintResponse[];
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
