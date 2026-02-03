import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthSession } from '../../shared/Types/type';

const KEY = 'TOKEN_LOGIN';

@Injectable({ providedIn: 'root' })
export class TokenStorage {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get(): AuthSession | null {
    if (!this.isBrowser) return null; // ✅ SSR: không đọc localStorage

    const raw = localStorage.getItem(KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      localStorage.removeItem(KEY);
      return null;
    }
  }

  set(session: AuthSession): void {
    if (!this.isBrowser) return; // ✅ SSR: bỏ qua
    localStorage.setItem(KEY, JSON.stringify(session));
  }

  clear(): void {
    if (!this.isBrowser) return; // ✅ SSR: bỏ qua
    localStorage.removeItem(KEY);
  }
}
