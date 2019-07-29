import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Modal } from 'carbon-components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    Modal.init();
    this.loginForm = this.fb.group({});
  }

  login() {
    console.log('login');
  }
}
