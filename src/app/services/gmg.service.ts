import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class GMGService {
  constructor(protected http: HttpClient) {}

  protected API_URL = environment.gmgBackApiUrl;
}
