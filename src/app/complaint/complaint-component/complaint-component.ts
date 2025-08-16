import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComplaintService } from '../complaint-service/complaint-service';
import { AuthService } from '../../component/auth/auth-service/auth-service';
@Component({
  selector: 'app-complaint-component',
  imports: [RouterModule],
  templateUrl: './complaint-component.html',
  styleUrl: './complaint-component.scss',
})
export class ComplaintComponent implements OnInit {
  complaintService = inject(ComplaintService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.complaintService.getStatuses().subscribe();
    console.log(this.authService.getToken());
  }
}
