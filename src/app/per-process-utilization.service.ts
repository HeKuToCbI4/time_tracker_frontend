import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PerProcessUtilization} from './per-process-utilization.interface'; // Import the Comment interface

@Injectable({
  providedIn: 'root',
})
export class PerProcessUtilizationService {
  private baseUrl = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient) {
  }

  public GetUtilization(host: string): Observable<PerProcessUtilization[]> {
    let queryParams = new HttpParams();
    if (host != 'all') {
      queryParams = queryParams.append('host', host);
    }
    return this.http.get<PerProcessUtilization[]>(`${this.baseUrl}/process_executable/aggregate`, {params: queryParams});
  }
}
