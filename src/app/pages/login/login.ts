import {Component, inject} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../core/auth/auth.service';
import {AuthStore} from '../../core/auth/auth.store';
import {Router} from '@angular/router';
import {MaintenanceService} from '../../shared/Services/maintenance.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(
    // private fb: FormBuilder,
    private auth: AuthService,
    private store: AuthStore,
    private ms: MaintenanceService,
    private router: Router
  ) {}

  private fb = inject(FormBuilder);

  loading = false
  error = '';

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  submit(): void {
    this.error = '';
    if(this.form.invalid) return;

    this.loading = true;

    const {username, password} = this.form.getRawValue();

    this.auth.login({username: username!, password: password!}).subscribe({
      next: () => {
        this.loading = false;

        const maintenanceOn = this.ms.isMaintenanceSync();
        const role = this.store.role();

        if (!maintenanceOn) {
          this.router.navigateByUrl('/home');
          return;
        }

        if (role === 'ADMIN') this.router.navigateByUrl('/home');
        else this.router.navigateByUrl('/maintenance');
      },
      error: (err) => {
        this.loading = false;
        // map lỗi đơn giản
        this.error = err?.error?.message ?? 'Đăng nhập thất bại. Vui lòng thử lại.';
      }
    })
  }

}
