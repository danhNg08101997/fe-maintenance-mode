import {Injectable} from '@angular/core';
import {AuthSession} from '../../shared/Types/type';

const KEY = 'TOKEN_LOGIN';

@Injectable({ providedIn: 'root' })
export class TokenStorage {
  get() : AuthSession | null {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;

    try{
      return JSON.parse(raw) as AuthSession;
    }catch {
      localStorage.removeItem(KEY);
      return null;
    }
  }

  set(session: AuthSession) : void {
    localStorage.setItem(KEY, JSON.stringify(session));
  }

  clear() : void {
    localStorage.removeItem(KEY);
  }

}
