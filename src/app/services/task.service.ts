import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.interface';
import { GMGService } from './gmg.service';

@Injectable()
export class TaskService extends GMGService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  /**
   * Get tasks from user id
   * @param {string} userId
   * @returns {Observable<User[]>}
   */
  public getTasks(userId: string): Observable<Task[]> {
    const params = { userId };
    return this.http.get(`${this.API_URL}/tasks/list`, { params }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Delete tasks
   * @param {string[]} taskIds
   * @param {string} userId
   * @returns {Observable<*>}
   */
  public deleteTasks(taskIds: string[], userId: string): Observable<any> {
    const params = { tasks: taskIds };
    return this.http.post(`${this.API_URL}/users/${userId}/deleteTasks`, params).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Update tasks
   * @param {Task[]} tasks
   * @param {string} userId
   * @returns {Observable<*>}
   */
  public updateTasks(tasks: Task[], userId: string): Observable<any> {
    const params = { tasks };
    return this.http.put(`${this.API_URL}/users/${userId}/tasks`, params).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**
   * Store new tasks
   * @param {Task[]} tasks
   * @param {string} userId
   * @returns {Observable<*>}
   */
  public storeTasks(tasks: Task[], userId: string): Observable<any> {
    const params = { tasks };
    return this.http.post(`${this.API_URL}/users/${userId}/tasks`, params).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
