import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AuthSession, LoginRequest, LoginResponse} from '../../shared/Types/type';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private readonly baseUrl = '/auth';

  constructor(private http: HttpClient) {}

  login(body: LoginRequest):Observable<AuthSession>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, body).pipe(
      map((res) => ({
        accessToken: res.accessToken,
        user: { username: res.username, role: res.role },
      }))
    )
  }
}
