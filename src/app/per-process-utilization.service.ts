import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerProcessUtilization } from './per-process-utilization.interface'; // Import the Comment interface

@Injectable({
  providedIn: 'root',
})
export class PerProcessUtilizationService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  public GetUtilization() : Observable<PerProcessUtilization[]> {
    return  this.http.get<PerProcessUtilization[]>(`${this.baseUrl}/api/v1/process_executable/aggregate`);
  }

}
