import {Injectable} from '@angular/core';
import {AuthApi} from './auth.api';
import {AuthStore} from './auth.store';
import { TokenStorage} from './token.storage';
import {tap} from 'rxjs';
// import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthSession, LoginRequest} from '../../shared/Types/type';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private api: AuthApi,
              private store: AuthStore,
              private storage: TokenStorage,) {}

  bootstrapFromStorage(): void {
    const session = this.storage.get();
    this.store.setSession(session);
  }

  login(req: LoginRequest): Observable<AuthSession> {
    return this.api.login(req).pipe(
      tap((session) => {
        this.storage.set(session);
        this.store.setSession(session);
      })
    );
  }

  logout(): void {
    this.storage.clear();
    this.store.setSession(null);
  }
}
