import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Host} from "./host"

@Injectable({
  providedIn: 'root'
})
export class HostListRetrieverService {

  private baseUrl = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient) {
  }

  public GetHosts(): Observable<Host[]> {
    return this.http.get<Host[]>(`${this.baseUrl}/known_host/`);
  }
}
