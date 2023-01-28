import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { createPerson } from '../interfaces/interface';


@Injectable({
  providedIn: 'root'
})
export class OnweloService {

  private createPersonPath = environment.apiUrl + 'CreatePerson';

  constructor(private http: HttpClient) { }

  createPerson(data: createPerson): Observable<any> {

    return this.http.post(this.createPersonPath, data);
  }

}
