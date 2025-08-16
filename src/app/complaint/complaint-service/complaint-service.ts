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
} from '../complaint-model';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  private readonly apiUrl = 'http://localhost:3000'; // adjust your base API URL

  constructor(private http: HttpClient) {}

  getComplaintById(id: string): Observable<IGetComplaintResponse> {
    return this.http.get<IGetComplaintResponse>(`${this.apiUrl}/${id}`);
  }

  getPaginatedComplaints(
    req: IGetPaginatedComplaintRequest
  ): Observable<IGetPaginatedComplaintResponse> {
    let params = new HttpParams()
      .set('userId', req.userId)
      .set('pageNumber', req.pageNumber)
      .set('pageSize', req.pageSize)
      .set('statusId', req.statusId)
      .set('search', req.search);

    if (req.search) {
      params = params.set('search', req.search);
    }
    if (req.statusId) {
      params = params.set('statusId', req.statusId);
    }

    return this.http.get<IGetPaginatedComplaintResponse>(this.apiUrl, { params });
  }

  createComplaint(request: ICreateComplaintRequest): Observable<IGetComplaintResponse> {
    return this.http.post<IGetComplaintResponse>(this.apiUrl, request);
  }

  updateComplaint(id: string, request: IUpdateComplaintRequest): Observable<IGetComplaintResponse> {
    return this.http.put<IGetComplaintResponse>(`${this.apiUrl}/${id}`, request);
  }

  getPriorities(): Observable<IPriority[]> {
    return this.http.get<IPriority[]>(`${this.apiUrl}/priorities`);
  }

  getStatuses(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(`${this.apiUrl}/statuses`);
  }
}
