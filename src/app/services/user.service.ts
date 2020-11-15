import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.interface';
import { GMGService } from './gmg.service';

@Injectable()
export class UserService extends GMGService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  /**
   * Get all users from back api
   *
   * @returns {Observable<User[]>}
   */
  public getAllUsers(): Observable<User[]> {
    return this.http.get(`${this.API_URL}/users`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Store a user
   *
   * @param {User} user
   * @returns {Observable<*>}
   */
  public storeUser(user: User): Observable<any> {
    return this.http.post(`${this.API_URL}/users`, user).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
