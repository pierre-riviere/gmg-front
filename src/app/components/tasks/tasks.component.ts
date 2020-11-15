import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiceHelper } from '../../helpers/service.helper';
import { Task } from '../../models/task.interface';
import { User } from '../../models/user.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [TaskService, ServiceHelper],
})
export class TasksComponent implements OnInit {
  private _user: User;

  /** tasks to delete (list of id)*/
  public tasksToDelete: string[] = [];

  @Input() set user(user: User) {
    this._user = user;
    this.getTasks();
  }

  get user(): User {
    return this._user;
  }

  public tasks: Task[] = [];

  constructor(private taskService: TaskService, private serviceHelper: ServiceHelper) {}

  ngOnInit(): void {}

  /**
   * Delete tasks
   * @returns {void}
   */
  public deleteTasks(): void {
    const tasks = this.tasksToDelete;

    if (!tasks.length) {
      this.serviceHelper.fireModalMsg({ icon: 'warning', html: 'Please select tasks to delete.' });
      return;
    }

    Swal.fire({
      title: `Delete selected ${tasks.length > 1 ? 'tasks' : 'task'}?`,
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTasks(tasks, this.user.id).subscribe(
          (data) => {
            this.callbackTasksDelete(data);
          },
          (error) => {
            this.serviceHelper.displayError(error);
          }
        );
      }
    });
  }

  /**
   * On change of task delete checkbox
   * @param {string} id
   * @param {boolean} checked
   * @returns {void}
   */
  public onChangeDeleteCheck(id: string, checked: boolean): void {
    if (checked) {
      this.tasksToDelete.push(id);
    } else {
      this.tasksToDelete = this.tasksToDelete.reduce((memo, taskId) => {
        if (id !== taskId) {
          memo.push(taskId);
        }
        return memo;
      }, []);
    }
  }

  /**
   * Edit task
   * @param {string} id
   * @returns {void}
   */
  public editTask(id: string): void {
    //
  }

  /* PRIVATE */

  /**
   * Get user tasks
   *
   * @returns {void}
   */
  private getTasks(): void {
    if (!this.user || !this.user.id) {
      return;
    }

    this.taskService.getTasks(this.user.id).subscribe(
      (data) => {
        this.callbackTasksGet(data);
      },
      (error) => {
        this.serviceHelper.displayError(error);
      }
    );
  }

  /**
   * callback when getting user tasks
   *
   * @param {*} data
   * @returns {void}
   */
  private callbackTasksGet(data: any): void {
    if (!data) {
      return;
    }

    this.tasks = data;
  }

  /**
   * callback when deleting user tasks
   *
   * @param {*} data
   * @returns {void}
   */
  private callbackTasksDelete(data: any): void {
    if (!data) {
      return;
    }

    const tasks = data.tasks || [];

    this.serviceHelper.fireModalMsg({
      icon: 'warning',
      html: `The ${tasks.length > 1 ? 'tasks have' : 'task has'} been successfully deleted.`,
    });

    this.tasksToDelete = [];
    this.getTasks();
  }
}
