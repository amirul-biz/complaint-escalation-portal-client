import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComplaintForm } from '../complaint-form/complaint-form';

@Component({
  selector: 'app-complaint-add-component',
  imports: [RouterModule, CommonModule, ComplaintForm],
  templateUrl: './complaint-add-component.html',
  styleUrl: './complaint-add-component.scss',
})
export class ComplaintAddComponent {}
