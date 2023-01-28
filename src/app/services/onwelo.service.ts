import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnweloService {

  constructor(private http: HttpClient) { }

  createPerson(data: any): Observable<any> {

    return this.http.post
  }

}
