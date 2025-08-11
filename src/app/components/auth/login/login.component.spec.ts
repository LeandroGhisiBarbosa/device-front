import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['showSuccess', 'showError']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: NotificationService, useValue: notificationSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should mark form as invalid when fields are empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should mark form as valid when all fields are filled correctly', () => {
    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should show email validation errors', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    emailControl?.markAsTouched();
    expect(emailControl?.hasError('required')).toBeTruthy();

    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();
  });

  it('should show password validation errors', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('');
    passwordControl?.markAsTouched();
    expect(passwordControl?.hasError('required')).toBeTruthy();

    passwordControl?.setValue('123');
    expect(passwordControl?.hasError('minlength')).toBeTruthy();
  });

  it('should call login service on form submit', () => {
    const mockResponse = {
      success: true,
      message: 'Login successful',
      data: {
        user: { id: 1, name: 'Test User', email: 'test@example.com', created_at: '', updated_at: '' },
        token: 'test-token',
        token_type: 'Bearer'
      }
    };

    authService.login.and.returnValue(of(mockResponse));

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(notificationService.showSuccess).toHaveBeenCalledWith('Login realizado com sucesso!');
    expect(router.navigate).toHaveBeenCalledWith(['/app/devices']);
  });

  it('should handle login error', () => {
    const mockError = {
      error: { message: 'Invalid credentials' }
    };

    authService.login.and.returnValue(throwError(() => mockError));

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'wrongpassword'
    });

    component.onSubmit();

    expect(notificationService.showError).toHaveBeenCalledWith('Invalid credentials');
  });

  it('should navigate to register page', () => {
    component.goToRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });

  it('should toggle password visibility', () => {
    expect(component.hidePassword).toBeTruthy();
    component.hidePassword = false;
    expect(component.hidePassword).toBeFalsy();
  });

  it('should not submit form when invalid', () => {
    component.loginForm.patchValue({
      email: '',
      password: ''
    });

    component.onSubmit();

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should not submit form when loading', () => {
    component.loading = true;
    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });

    component.onSubmit();

    expect(authService.login).not.toHaveBeenCalled();
  });
});
