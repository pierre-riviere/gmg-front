import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class ServiceHelper {
  /**
   * Display error helper
   *
   * @param {HttpErrorResponse} error
   * @returns {void}
   */
  public displayError(error: HttpErrorResponse): void {
    const errors = {
      default: 'An error has occurred. Please try again later...',
    };
    const errorMsg = error && error.error && !error.error.type ? error.error : errors.default;
    this.fireModalMsg({ icon: 'warning', html: errorMsg });
  }

  /**
   * Swal fire helper
   *
   * @param {*} options
   * @returns {void}
   */
  public fireModalMsg(options: any): void {
    Swal.fire(options);
  }
}
