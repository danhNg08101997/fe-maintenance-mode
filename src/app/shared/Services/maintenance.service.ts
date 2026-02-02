import {MaintenanceConfig} from '../Models/maintenance.model';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, distinctUntilChanged } from 'rxjs';

const DEFAULT_CONFIG: MaintenanceConfig = {
  enabled: false,
  message: 'Hệ thống đang bảo trì, vui lòng quay lại sau.',
  allowRoles: ['ADMIN'],
};

@Injectable({ providedIn: 'root' })
export class MaintenanceService {
  private readonly _config$ = new BehaviorSubject<MaintenanceConfig>(DEFAULT_CONFIG);

  config$(): Observable<MaintenanceConfig> {
    return this._config$.asObservable();
  }

  configSync(): MaintenanceConfig {
    return this._config$.value;
  }

  isMaintenance$(): Observable<boolean> {
    return this._config$.pipe(
      map(cfg => this.computeEnabled(cfg)),
      distinctUntilChanged()
    );
  }

  isMaintenanceSync(): boolean {
    return this.computeEnabled(this._config$.value);
  }

  /** Logic tính enable: có thể theo lịch (startsAt/endsAt) */
  private computeEnabled(cfg: MaintenanceConfig): boolean {
    if (!cfg.enabled) return false;

    // Nếu không dùng lịch => chỉ cần enabled = true
    if (!cfg.startsAt && !cfg.endsAt) return true;

    const now = Date.now();
    const start = cfg.startsAt ? Date.parse(cfg.startsAt) : Number.NEGATIVE_INFINITY;
    const end = cfg.endsAt ? Date.parse(cfg.endsAt) : Number.POSITIVE_INFINITY;

    // Nếu parse lỗi (NaN) thì fallback: coi như enabled
    if (Number.isNaN(start) || Number.isNaN(end)) return true;

    return now >= start && now <= end;
  }
}
