import {Role} from '../Types/type';

export interface MaintenanceConfig {
  enabled: boolean;
  message?: string;

  // ai được phép bypass khi bảo trì bật
  allowRoles?: Role[]; // mặc định: ['ADMIN']

  // tuỳ chọn: hiển thị lịch
  startsAt?: string; // ISO string
  endsAt?: string;   // ISO string
}
