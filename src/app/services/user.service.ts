import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.interface';

const API_URL = environment.gmgBackApiUrl;

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * Get all users from back api
   *
   * @returns {Observable<*>}
   */
  public getAllUsers(): Observable<User[]> {
    return this.http.get(`${API_URL}/users`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
