import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl: string = 'http://localhost:8090/client';

  constructor(private http: HttpClient) { }

  getClientInfo(documentType: string, documentNumber: string): Observable<any> {
    const url = `${this.baseUrl}?documentType=${documentType}&documentNumber=${documentNumber}`;
    return this.http.get<any>(url);
  }
}