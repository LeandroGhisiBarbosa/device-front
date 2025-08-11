import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { Device, DeviceFilters } from '../../../models/device.model';
import { DeviceService } from '../../../services/device.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss',
})
export class DeviceListComponent implements OnInit, OnDestroy {
  devices: Device[] = [];
  displayedColumns: string[] = [
    'name',
    'location',
    'purchase_date',
    'in_use',
    'actions',
  ];
  loading = false;

  totalItems = 0;
  pageSize = 15;
  currentPage = 1;

  filtersForm!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private deviceService: DeviceService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createFiltersForm();
    this.loadFiltersFromStorage();
    this.setupFilterSubscriptions();
    this.loadDevices();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createFiltersForm(): void {
    this.filtersForm = this.fb.group({
      location: [''],
      in_use: [''],
      date_from: [''],
      date_to: [''],
    });
  }

  private setupFilterSubscriptions(): void {
    this.filtersForm.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage = 1;
        this.saveFiltersToStorage();
        this.loadDevices();
      });
  }

  private saveFiltersToStorage(): void {
    const filters = this.filtersForm.value;
    localStorage.setItem('deviceFilters', JSON.stringify(filters));
  }

  private loadFiltersFromStorage(): void {
    const savedFilters = localStorage.getItem('deviceFilters');
    if (savedFilters) {
      try {
        const filters = JSON.parse(savedFilters);
        this.filtersForm.patchValue(filters);
      } catch (error) {
        console.error('Error loading filters from storage:', error);
      }
    }
  }

  loadDevices(): void {
    this.loading = true;
    const filters: DeviceFilters = {
      page: this.currentPage,
      per_page: this.pageSize,
      ...this.filtersForm.value,
    };

    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof DeviceFilters];
      if (value === '' || value === null || value === undefined) {
        delete filters[key as keyof DeviceFilters];
      }
    });

    this.deviceService.getDevices(filters).subscribe({
      next: (response) => {
        this.devices = response.data.data;
        this.totalItems = response.data.total;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.showError('Erro ao carregar dispositivos');
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadDevices();
  }

  toggleDeviceUse(device: Device): void {
    this.deviceService.toggleDeviceUse(device.id).subscribe({
      next: (response) => {
        const index = this.devices.findIndex((d) => d.id === device.id);
        if (index !== -1) {
          this.devices[index].in_use = response.data.in_use;
        }
        const status = response.data.in_use ? 'em uso' : 'disponível';
        this.notificationService.showSuccess(
          `Dispositivo marcado como ${status}`
        );
      },
      error: (error) => {
        this.notificationService.showError(
          'Erro ao alterar status do dispositivo'
        );
      },
    });
  }

  editDevice(device: Device): void {
    this.router.navigate(['/app/devices/edit', device.id]);
  }

  deleteDevice(device: Device): void {
    if (confirm('Tem certeza que deseja excluir este dispositivo?')) {
      this.deviceService.deleteDevice(device.id).subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Dispositivo excluído com sucesso'
          );
          this.loadDevices();
        },
        error: (error) => {
          this.notificationService.showError('Erro ao excluir dispositivo');
        },
      });
    }
  }

  addDevice(): void {
    this.router.navigate(['/app/devices/new']);
  }

  clearFilters(): void {
    this.filtersForm.reset();
    localStorage.removeItem('deviceFilters');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  getStatusText(inUse: number | boolean): string {
    return inUse ? 'Em uso' : 'Disponível';
  }

  getStatusClass(inUse: number | boolean): string {
    return inUse ? 'status-in-use' : 'status-available';
  }
}
