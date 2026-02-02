import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AuthSession, Role} from '../../shared/Types/type';

@Injectable({providedIn: 'root'})
export class AuthStore {
  private readonly _session$ = new BehaviorSubject<AuthSession | null>(null);

  session$ = this._session$.asObservable();

  setSession(session: AuthSession | null): void {
    this._session$.next(session);
  }

  sessionSync(): AuthSession | null {
    return this._session$.value;
  }

  isLoggedIn(): boolean {
    return !!this._session$.value?.accessToken;
  }

  role(): Role | null {
    return this._session$.value?.user.role ?? null;
  }
}
