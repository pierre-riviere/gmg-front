import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceHelper } from '../../helpers/service.helper';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService, ServiceHelper],
})
export class UsersComponent implements OnInit {
  public user: User;
  public users: User[] = [];
  public isUserFormActive = true;

  private getUserSub: Subscription;

  constructor(private userService: UserService, private router: Router, private serviceHelper: ServiceHelper) {}

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Get user list
   * @returns {void}
   */
  private getUsers(): void {
    this.getUserSub = this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        this.serviceHelper.displayError(error);
      }
    );
  }

  /**
   * link to user profile from its id
   *
   * @param id
   */
  public goToUserProfile(id: string): void {
    if (id) {
      this.router.navigate(['/user', id]);
    }
  }

  /**
   * Display user form
   * @returns {void}
   */
  public displayUserForm(): void {
    this.initUser();
    this.isUserFormActive = true;
  }

  /**
   * On updated user from form refresh user list
   * @param {User} user
   * @returns {void}
   */
  public onUpdatedUser(user: User): void {
    if (user && user.id) {
      this.getUsers();
    }
  }

  /**
   * Update user
   * @param user
   * @returns {void}
   */
  public editUser(user: User): void {
    this.user = user;
  }

  /**
   * Delete user by id
   * @param {string} userId
   * @returns {void}
   */
  public deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      (data) => {
        this.callbackUserDelete(data);
      },
      (error) => {
        this.serviceHelper.displayError(error);
      }
    );
  }

  /* PRIVATE */

  /**
   * Callback delete user
   * @param {*} data
   * @returns {void}
   */
  private callbackUserDelete(data: any): void {
    if (!data || !data.user) {
      return;
    }
    const user = data.user;

    if (this.user && this.user.id === user.id) {
      this.initUser();
    }

    this.serviceHelper.fireModalMsg({
      icon: 'success',
      html: `User <span class="font-weight-bold">${user.firstname} ${user.name}</span> successfully deleted.`,
    });

    this.getUsers();
  }

  /**
   * Init current handled user
   * @returns {void}
   */
  private initUser(): void {
    this.user = {
      name: null,
      firstname: null,
      email: null,
    };
  }

  /**
   * Unsubscription helper
   * @param subscription
   * @returns {void}
   */
  private unsubscribe(subscription: Subscription): void {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}
