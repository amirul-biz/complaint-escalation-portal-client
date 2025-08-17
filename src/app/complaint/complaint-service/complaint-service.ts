import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ICreateComplaintRequest,
  IGetComplaintByIdResponse,
  IGetComplaintResponse,
  IGetPaginatedComplaintRequest,
  IGetPaginatedComplaintResponse,
  IPriority,
  IStatus,
  IUpdateComplaintRequest,
} from '../complaint.interface';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getComplaintById(id: string): Observable<IGetComplaintByIdResponse> {
    return this.http.get<IGetComplaintByIdResponse>(`${this.baseUrl}/api/v1/complaints/${id}`, {
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

    return this.http.get<IGetPaginatedComplaintResponse>(
      `${this.baseUrl}/api/v1/complaints-listing`,
      {
        params,
        withCredentials: true,
      }
    );
  }

  createComplaint(request: ICreateComplaintRequest): Observable<IGetComplaintResponse> {
    return this.http.post<IGetComplaintResponse>(`${this.baseUrl}/api/v1/complaints`, request, {
      withCredentials: true,
    });
  }

  updateComplaint(id: string, request: IUpdateComplaintRequest): Observable<IGetComplaintResponse> {
    return this.http.patch<IGetComplaintResponse>(
      `${this.baseUrl}/api/v1/complaints/${id}`,
      request,
      {
        withCredentials: true,
      }
    );
  }

  getPriorities(): Observable<IPriority[]> {
    return this.http.get<IPriority[]>(`${this.baseUrl}/api/v1/priorities`, {
      withCredentials: true,
    });
  }

  getStatuses(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(`${this.baseUrl}/api/v1/statuses`, {
      withCredentials: true,
    });
  }
}
