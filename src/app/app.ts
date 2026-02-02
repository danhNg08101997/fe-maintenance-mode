import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fe-maintenance-app');

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.bootstrapFromStorage();
  }
}
