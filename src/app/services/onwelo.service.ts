import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { createPerson, apiLink, voterHasVoted } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class OnweloService {

  private createPersonPath = environment.apiUrl + apiLink.cp;
  private getAllVotersPath = environment.apiUrl + apiLink.gav;
  private getAllCandidatesPath = environment.apiUrl + apiLink.gac;
  private getAllVotersWhoNotVotedPath = environment.apiUrl + apiLink.gavwnv;
  private voterHasVotedPath = environment.apiUrl + apiLink.vhv;
  private incrementVotesByOnePath = environment.apiUrl + apiLink.ivbo;

  constructor(private http: HttpClient) { }

  getAllVoters(): Observable<any> {
    return this.http.get(this.getAllVotersPath);
  }

  getAllCandidates(): Observable<any> {
    return this.http.get(this.getAllCandidatesPath);
  }

  getAllVotersWhoNotVoted(): Observable<any> {
    return this.http.get(this.getAllVotersWhoNotVotedPath);
  }

  postCreatePerson(data: createPerson): Observable<any> {
    return this.http.post(this.createPersonPath, data);
  }

  postIncrementVotesByOne(name: string) {
    return this.http.post(this.incrementVotesByOnePath + name, null, { responseType: 'text' });
  }

  putVoterHasVoted(data: voterHasVoted): Observable<any> {
    return this.http.put(this.voterHasVotedPath, data, { responseType: 'text' });
  }
}
