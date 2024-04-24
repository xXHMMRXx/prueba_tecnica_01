import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Users } from '../../interfaces/users-service.interface';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public getUsersById(id: number): Observable<Users> {
    return this.http
      .get<Users>(`${environment.API_DOMAIN}/users/${id}`)
      .pipe(retry(3));
  }

  public getUsers(): Observable<Users[]> {
    return this.http
      .get<Users[]>(`${environment.API_DOMAIN}/users`)
      .pipe(retry(3));
  }
}
