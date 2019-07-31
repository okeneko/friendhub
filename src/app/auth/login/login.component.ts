import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormModalComponent } from 'src/app/modal/form-modal/form-modal.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild(FormModalComponent, { static: true }) formModal: FormModalComponent;

  modal: any;
  loginForm: FormGroup;
  submitted: boolean;
  disabled: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.submitted = false;
    this.disabled = null;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.modal = this.formModal.modal;
  }

  public get f() {
    return this.loginForm.controls;
  }

  async login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.disabled = true;

    try {
      await this.authService.login(this.f.email.value, this.f.password.value);
      this.modal.hide();
    } catch (error) {
      this.disabled = null;
      this.f.email.setErrors({ loginError: true });
    }
  }

  @HostListener('modal-hidden', ['$event'])
  onModalClose(event) {
    this.loginForm.reset();
    this.submitted = false;
    this.disabled = null;
  }
}
