import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ICreateComplaintRequest,
  IGetComplaintResponse,
  IGetPaginatedComplaintRequest,
  IGetPaginatedComplaintResponse,
  IPriority,
  IStatus,
  IUpdateComplaintRequest,
} from '../complaint.interface';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getComplaintById(id: string): Observable<IGetComplaintResponse> {
    return this.http.get<IGetComplaintResponse>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  getPaginatedComplaints(
    req: IGetPaginatedComplaintRequest
  ): Observable<IGetPaginatedComplaintResponse> {
    let params = new HttpParams().set('pageNumber', req.pageNumber).set('pageSize', req.pageSize);

    if (req.statusId) params.set('statusId', req.statusId);
    if (req.search) params.set('search', req.search);

    if (req.search) {
      params = params.set('search', req.search);
    }
    if (req.statusId) {
      params = params.set('statusId', req.statusId);
    }

    return this.http.get<IGetPaginatedComplaintResponse>(`${this.apiUrl}/complaints-listing`, {
      params,
      withCredentials: true,
    });
  }

  createComplaint(request: ICreateComplaintRequest): Observable<IGetComplaintResponse> {
    return this.http.post<IGetComplaintResponse>(`${this.apiUrl}/complaints`, request, {
      withCredentials: true,
    });
  }

  updateComplaint(id: string, request: IUpdateComplaintRequest): Observable<IGetComplaintResponse> {
    return this.http.put<IGetComplaintResponse>(`${this.apiUrl}/${id}`, request, {
      withCredentials: true,
    });
  }

  getPriorities(): Observable<IPriority[]> {
    return this.http.get<IPriority[]>(`${this.apiUrl}/priorities`, {
      withCredentials: true,
    });
  }

  getStatuses(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(`${this.apiUrl}/statuses`, {
      withCredentials: true,
    });
  }
}
