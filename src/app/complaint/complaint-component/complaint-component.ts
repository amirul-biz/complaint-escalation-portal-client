import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth-service/auth-service';
@Component({
  selector: 'app-complaint-component',
  imports: [RouterModule],
  templateUrl: './complaint-component.html',
  styleUrl: './complaint-component.scss',
})
export class ComplaintComponent {
  authService = inject(AuthService);
}
