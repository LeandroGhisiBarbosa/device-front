import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { DeviceService } from '../../../services/device.service';
import { NotificationService } from '../../../services/notification.service';
import { Device, DeviceRequest } from '../../../models/device.model';

@Component({
  selector: 'app-device-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './device-form.component.html',
  styleUrl: './device-form.component.scss',
})
export class DeviceFormComponent implements OnInit {
  deviceForm!: FormGroup;
  loading = false;
  isEditMode = false;
  deviceId: number | null = null;
  device: Device | null = null;

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.checkRouteParams();
  }

  private createForm(): void {
    this.deviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      location: ['', [Validators.required, Validators.minLength(2)]],
      purchase_date: ['', [Validators.required]],
      in_use: [false, [Validators.required]],
    });
  }

  private checkRouteParams(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.deviceId = +id;
      this.loadDevice();
    }
  }

  private loadDevice(): void {
    if (!this.deviceId) return;

    this.loading = true;
    this.deviceService.getDevice(this.deviceId).subscribe({
      next: (response) => {
        this.device = response.data;
        this.populateForm();
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.showError('Erro ao carregar dispositivo');
        this.router.navigate(['/app/devices']);
      },
    });
  }

  private populateForm(): void {
    if (!this.device) return;

    this.deviceForm.patchValue({
      name: this.device.name,
      location: this.device.location,
      purchase_date: new Date(this.device.purchase_date),
      in_use: !!this.device.in_use,
    });
  }

  onSubmit(): void {
    if (this.deviceForm.valid && !this.loading) {
      this.loading = true;

      const formValue = this.deviceForm.value;
      const deviceData: DeviceRequest = {
        name: formValue.name,
        location: formValue.location,
        purchase_date: this.formatDate(formValue.purchase_date),
        in_use: formValue.in_use,
      };

      const operation = this.isEditMode
        ? this.deviceService.updateDevice(this.deviceId!, deviceData)
        : this.deviceService.createDevice(deviceData);

      operation.subscribe({
        next: (response) => {
          this.loading = false;
          const message = this.isEditMode
            ? 'Dispositivo atualizado com sucesso!'
            : 'Dispositivo criado com sucesso!';
          this.notificationService.showSuccess(message);
          this.router.navigate(['/app/devices']);
        },
        error: (error) => {
          this.loading = false;
          const message = this.isEditMode
            ? 'Erro ao atualizar dispositivo'
            : 'Erro ao criar dispositivo';
          this.notificationService.showError(message);
        },
      });
    }
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onCancel(): void {
    this.router.navigate(['/app/devices']);
  }

  get title(): string {
    return this.isEditMode ? 'Editar Dispositivo' : 'Novo Dispositivo';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Atualizar' : 'Criar';
  }
}
