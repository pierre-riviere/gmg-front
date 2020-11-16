import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiceHelper } from '../../helpers/service.helper';
import { Task, TaskStatus } from '../../models/task.interface';
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

  public task: Task;
  public newTasks: Task[] = [];
  public updatedTasks: Task[] = [];

  public statusList: string[] = [];

  /* tasks to delete (list of id)*/
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

  ngOnInit(): void {
    this.clearNewTask();
    this.statusList = Object.keys(TaskStatus).map((status) => status);
  }

  /**
   * Get task form title
   * @returns {string}
   */
  public getTitleForm(): string {
    return this.task && this.task.id ? 'Edit task' : 'Add new task';
  }

  /**
   * Clear new handled task
   * @returns {void}
   */
  public clearNewTask(): void {
    this.task = { id: null, name: null, description: null, status: null };
  }

  /**
   * Save task from form
   * @returns {void}
   */
  public addTask(): void {
    if (this.task.id) {
      return;
    }
    if (!this.task.name || !this.task.description || !this.task.status) {
      this.serviceHelper.fireModalMsg({ icon: 'warning', html: 'Please fill all the inputs.' });
      return;
    }
    this.newTasks.push(this.task);
    this.clearNewTask();
  }

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
   * @param {Task} task
   * @returns {void}
   */
  public editTask(task: Task): void {
    if (!task || !task.id) {
      return;
    }
    this.updatedTasks = this.updatedTasks.filter((t) => t.id !== task.id);
    this.updatedTasks.push(task);
    this.task = task;
  }

  /**
   * Save edited tasks
   * @returns {void}
   */
  public saveEditedTasks(): void {
    if (this.updatedTasks.length === 0) {
      this.serviceHelper.fireModalMsg({ icon: 'info', html: 'No task to update.' });
      return;
    }

    this.taskService.updateTasks(this.updatedTasks, this.user.id).subscribe(
      (data) => {
        this.callbackTasksUpdate(data);
      },
      (error) => {
        this.serviceHelper.displayError(error);
      }
    );
  }

  /**
   * Clear new tasks
   * @returns {void}
   */
  public clearNewTasks(): void {
    this.newTasks = [];
  }

  /**
   * Store new tasks
   * @returns {void}
   */
  public saveNewTasks(): void {
    this.taskService.storeTasks(this.newTasks, this.user.id).subscribe(
      (data) => {
        this.callbackTasksCreate(data);
      },
      (error) => {
        this.serviceHelper.displayError(error);
      }
    );
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

    this.updatedTasks = this.updatedTasks.filter((task) => {
      return !tasks.includes(Number(task.id));
    });
    this.clearNewTask();
    this.tasksToDelete = [];
    this.getTasks();
  }

  /**
   * Callback tasks update
   * @param {*} data
   * @returns {void}
   */
  private callbackTasksUpdate(data: any): void {
    this.updatedTasks = [];
    this.serviceHelper.fireModalMsg({ icon: 'success', html: 'Tasks successfully updated.' });
  }

  /**
   * Callback tasks create
   * @param {*} data
   * @returns {void}
   */
  private callbackTasksCreate(data: any): void {
    this.serviceHelper.fireModalMsg({ icon: 'success', html: 'New tasks successfully saved.' });
    this.clearNewTasks();
    this.getTasks();
  }
}
