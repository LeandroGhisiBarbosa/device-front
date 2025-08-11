import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DeviceService } from './device.service';
import {
  DeviceRequest,
  DeviceResponse,
  DeviceListResponse,
  DeviceFilters,
} from '../models/device.model';
import { environment } from '../../environments/environment';

describe('DeviceService', () => {
  let apiUrl = `${environment.baseUrl}/devices`;

  let service: DeviceService;
  let httpMock: HttpTestingController;

  const mockDevice = {
    id: 1,
    name: 'Test Device',
    location: 'Test Location',
    purchase_date: '2023-01-01',
    in_use: 0,
    user_id: 1,
    created_at: '2023-01-01T00:00:00.000Z',
    updated_at: '2023-01-01T00:00:00.000Z',
    deleted_at: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DeviceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDevices', () => {
    it('should fetch devices without filters', () => {
      const mockResponse: DeviceListResponse = {
        success: true,
        message: 'Devices retrieved successfully',
        data: {
          data: [mockDevice],
          total: 1,
          per_page: 15,
          current_page: 1,
          last_page: 1,
          from: 1,
          to: 1,
        },
      };

      service.getDevices().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch devices with filters', () => {
      const filters: DeviceFilters = {
        page: 1,
        per_page: 10,
        in_use: true,
        location: 'office',
      };

      const mockResponse: DeviceListResponse = {
        success: true,
        message: 'Devices retrieved successfully',
        data: {
          data: [mockDevice],
          total: 1,
          per_page: 10,
          current_page: 1,
          last_page: 1,
          from: 1,
          to: 1,
        },
      };

      service.getDevices(filters).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        (req) =>
          req.url === apiUrl &&
          req.params.get('page') === '1' &&
          req.params.get('per_page') === '10' &&
          req.params.get('in_use') === 'true' &&
          req.params.get('location') === 'office'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getDevice', () => {
    it('should fetch a single device', () => {
      const mockResponse: DeviceResponse = {
        success: true,
        message: 'Device retrieved successfully',
        data: mockDevice,
      };

      service.getDevice(1).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('createDevice', () => {
    it('should create a new device', () => {
      const deviceData: DeviceRequest = {
        name: 'New Device',
        location: 'New Location',
        purchase_date: '2023-01-01',
        in_use: false,
      };

      const mockResponse: DeviceResponse = {
        success: true,
        message: 'Device created successfully',
        data: { ...mockDevice, ...deviceData },
      };

      service.createDevice(deviceData).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(deviceData);
      req.flush(mockResponse);
    });
  });

  describe('updateDevice', () => {
    it('should update an existing device', () => {
      const deviceData: DeviceRequest = {
        name: 'Updated Device',
        location: 'Updated Location',
        purchase_date: '2023-01-01',
        in_use: true,
      };

      const mockResponse: DeviceResponse = {
        success: true,
        message: 'Device updated successfully',
        data: { ...mockDevice, ...deviceData },
      };

      service.updateDevice(1, deviceData).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(deviceData);
      req.flush(mockResponse);
    });
  });

  describe('deleteDevice', () => {
    it('should delete a device', () => {
      service.deleteDevice(1).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('toggleDeviceUse', () => {
    it('should toggle device use status', () => {
      const mockResponse: DeviceResponse = {
        success: true,
        message: 'Device status updated',
        data: { ...mockDevice, in_use: 1 },
      };

      service.toggleDeviceUse(1).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/1/use`);
      expect(req.request.method).toBe('PATCH');
      req.flush(mockResponse);
    });
  });
});
