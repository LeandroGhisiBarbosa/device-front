import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Device,
  DeviceRequest,
  DeviceResponse,
  DeviceListResponse,
  DeviceFilters,
} from '../models/device.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly apiUrl = `${environment.baseUrl}/devices`;

  constructor(private http: HttpClient) {}

  getDevices(filters?: DeviceFilters): Observable<DeviceListResponse> {
    let params = new HttpParams();

    if (filters) {
      Object.keys(filters).forEach((key) => {
        const value = filters[key as keyof DeviceFilters];
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<DeviceListResponse>(this.apiUrl, { params });
  }

  getDevice(id: number): Observable<DeviceResponse> {
    return this.http.get<DeviceResponse>(`${this.apiUrl}/${id}`);
  }

  createDevice(device: DeviceRequest): Observable<DeviceResponse> {
    return this.http.post<DeviceResponse>(this.apiUrl, device);
  }

  updateDevice(id: number, device: DeviceRequest): Observable<DeviceResponse> {
    return this.http.put<DeviceResponse>(`${this.apiUrl}/${id}`, device);
  }

  deleteDevice(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  toggleDeviceUse(id: number): Observable<DeviceResponse> {
    return this.http.patch<DeviceResponse>(`${this.apiUrl}/${id}/use`, {});
  }
}
