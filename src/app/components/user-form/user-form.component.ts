import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [UserService],
})
export class UserFormComponent implements OnInit {
  /** User updated */
  @Output() updatedUser: EventEmitter<User> = new EventEmitter();

  /** User */
  public user: User = {
    name: null,
    firstname: null,
    email: null,
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  /**
   * Save user from form data
   *
   * @returns {void}
   */
  public saveUser(): void {
    if (!this.validateUserForm(this.user)) {
      Swal.fire({ icon: 'warning', html: 'Please fill all fields.' });
      return;
    }
    this.userService.storeUser(this.user).subscribe(
      (data) => {
        if (!data || !data.user) {
          return;
        }
        const user = data.user;
        this.updatedUser.emit(user);
        this.fireModalMsg({
          icon: 'success',
          html: `User <span class="font-weight-bold">${user.firstname} ${user.name}</span> successfully created.`,
        });
      },
      (error) => {
        this.displayError(error.error);
      }
    );
  }

  /* PRIVATE */

  /**
   * Validate required user input values
   *
   * @param {User} user
   * @returns {boolean}
   */
  private validateUserForm(user: User): boolean {
    return Boolean(this.user.name && this.user.firstname && this.user.email);
  }

  /**
   * Display error helper
   *
   * @param {HttpErrorResponse} error
   * @returns {void}
   */
  private displayError(error: HttpErrorResponse): void {
    const errors = {
      default: 'An error has occurred. Please try again later...',
    };
    const errorMsg = error && error.error ? error.error : errors.default;
    this.fireModalMsg({ icon: 'warning', html: errorMsg });
  }

  /**
   * Swal fire helper
   *
   * @param {*} options
   * @returns {void}
   */
  private fireModalMsg(options: any): void {
    Swal.fire(options);
  }
}
