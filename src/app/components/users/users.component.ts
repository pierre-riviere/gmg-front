import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService],
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  public isUserFormActive: boolean = true;

  private getUserSub: Subscription;

  constructor(private userService: UserService, private router: Router) {}

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
        this.displayError(error);
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
    this.isUserFormActive = !this.isUserFormActive;
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

  /* PRIVATE */

  /**
   * Display error helper
   * @param {any} error
   * @returns {void}
   */
  private displayError(error: any): void {
    Swal.fire({ icon: 'warning', text: 'An error has occurred. Please try again later...' });
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
