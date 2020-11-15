import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceHelper } from '../../helpers/service.helper';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [UserService, ServiceHelper],
})
export class UserFormComponent implements OnInit {
  /** user to handle */
  private _user: User;

  /** User updated */
  @Output() updatedUser: EventEmitter<User> = new EventEmitter();

  /**
   * @param {User} user
   */
  @Input() set user(user: User) {
    this._user = { ...user } || {
      name: null,
      firstname: null,
      email: null,
    };
  }

  /**
   * @returns {User}
   */
  get user(): User {
    return this._user;
  }

  constructor(private userService: UserService, private serviceHelper: ServiceHelper) {}

  ngOnInit(): void {}

  /**
   * Save user from form data
   *
   * @returns {void}
   */
  public saveUser(): void {
    if (!this.validateUserForm(this.user)) {
      this.serviceHelper.fireModalMsg({ icon: 'warning', html: 'Please fill all fields.' });
      return;
    }

    if (this.user.id) {
      // update user
      this.userService.updateUser(this.user).subscribe(
        (data) => {
          this.callbackUserSave(data);
        },
        (error) => {
          this.serviceHelper.displayError(error.error);
        }
      );
    } else {
      // create user
      this.userService.storeUser(this.user).subscribe(
        (data) => {
          this.callbackUserSave(data);
        },
        (error) => {
          this.serviceHelper.displayError(error.error);
        }
      );
    }
  }

  /* PRIVATE */

  /**
   * Callback user save
   * @param {*} data
   * @returns {void}
   */
  private callbackUserSave(data: any): void {
    if (!data || !data.user) {
      return;
    }
    const user = data.user;
    this.updatedUser.emit(user);
    this.serviceHelper.fireModalMsg({
      icon: 'success',
      html: `User <span class="font-weight-bold">${user.firstname} ${user.name}</span> successfully saved.`,
    });
  }

  /**
   * Get form title (edit|new)
   * @returns {string}
   */
  public getTitleForm(): string {
    return this.user && this.user.id ? `Edit user id ${this.user.id}` : `New user`;
  }

  /**
   * Validate required user input values
   *
   * @param {User} user
   * @returns {boolean}
   */
  private validateUserForm(user: User): boolean {
    return Boolean(this.user.name && this.user.firstname && this.user.email);
  }
}
