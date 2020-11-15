import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceHelper } from '../../helpers/service.helper';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserService, ServiceHelper],
})
export class UserProfileComponent implements OnInit {
  /** current user */
  public user: User;

  constructor(private userService: UserService, private route: ActivatedRoute, private serviceHelper: ServiceHelper) {}

  ngOnInit(): void {
    this.setProfile();
  }

  /**
   * Get user full name
   * @returns {string}
   */
  public userFullname(): string {
    if (!this.user) {
      return '';
    }
    const { name, firstname } = this.user;
    return `${firstname} ${name.toLocaleUpperCase()}`;
  }

  /* PRIVATE */

  /**
   * Set user profile
   * @returns {void}
   */
  private setProfile(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (!userId) {
      return;
    }

    this.userService.getUser(userId).subscribe(
      (data) => {
        this.callbackUserGet(data);
      },
      (error) => {
        this.serviceHelper.displayError(error);
      }
    );
  }

  /**
   * Callback get user
   *
   * @param {*} data
   * @returns {void}
   */
  private callbackUserGet(data: any): void {
    if (!data) {
      return;
    }
    this.user = data;
  }
}
