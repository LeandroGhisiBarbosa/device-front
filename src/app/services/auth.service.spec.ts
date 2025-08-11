import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../models/user.model';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let apiUrl = `${environment.baseUrl}`;
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login user and store token', () => {
      const loginData: LoginRequest = {
        email: 'test@example.com',
        password: 'password',
      };

      const mockResponse: AuthResponse = {
        success: true,
        message: 'User logged in successfully',
        data: {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
          },
          token: 'test-token',
          token_type: 'Bearer',
        },
      };

      service.login(loginData).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        expect(localStorage.getItem('token')).toBe('test-token');
        expect(service.getCurrentUser()?.name).toBe('Test User');
      });

      const req = httpMock.expectOne(`${apiUrl}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(loginData);
      req.flush(mockResponse);
    });
  });

  describe('register', () => {
    it('should register user and store token', () => {
      const registerData: RegisterRequest = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'password',
      };

      const mockResponse: AuthResponse = {
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
          },
          token: 'test-token',
          token_type: 'Bearer',
        },
      };

      service.register(registerData).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        expect(localStorage.getItem('token')).toBe('test-token');
        expect(service.getCurrentUser()?.name).toBe('Test User');
      });

      const req = httpMock.expectOne(`${apiUrl}/register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(registerData);
      req.flush(mockResponse);
    });
  });

  describe('logout', () => {
    it('should clear token and user data', () => {
      localStorage.setItem('token', 'test-token');
      localStorage.setItem(
        'user',
        JSON.stringify({ id: 1, name: 'Test User' })
      );

      service.logout();

      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
      expect(service.getCurrentUser()).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      localStorage.setItem('token', 'test-token');
      expect(service.isAuthenticated()).toBeTruthy();
    });

    it('should return false when token does not exist', () => {
      expect(service.isAuthenticated()).toBeFalsy();
    });
  });

  describe('getToken', () => {
    it('should return token from localStorage', () => {
      localStorage.setItem('token', 'test-token');
      expect(service.getToken()).toBe('test-token');
    });

    it('should return null when no token', () => {
      expect(service.getToken()).toBeNull();
    });
  });
});
