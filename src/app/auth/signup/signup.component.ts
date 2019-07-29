import { Component, OnInit, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Modal } from 'carbon-components';

import { User, AuthService } from '../auth.service';
import { FormModalComponent } from 'src/app/modal/form-modal/form-modal.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit, AfterViewInit {
  @ViewChild(FormModalComponent, { static: true }) formModal: FormModalComponent;

  modal: any;
  signUpForm: FormGroup;
  submitted: boolean;
  defaultPhoto =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
  photos = [];

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.submitted = false;
    this.signUpForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.pattern('(^$|(fe)?male)')],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordAgain: ['', Validators.required],
        photo: ['', Validators.pattern('(^$|[0-9]{1,2})')]
      },
      { validator: this.passwordMatch }
    );
  }

  ngAfterViewInit(): void {
    this.modal = this.formModal.modal;
  }

  close() {
    this.modal.hide();
  }

  public get f() {
    return this.signUpForm.controls;
  }

  passwordMatch(group: FormGroup) {
    const password = group.controls.password.value;
    const passwordAgain = group.controls.passwordAgain.value;
    return password === passwordAgain ? null : { passwordsDontMatch: true };
  }

  generatePhotos() {
    this.photos.length = 0;
    let gender = '';
    if (this.f.gender.value === 'male') {
      gender = 'men';
    } else if (this.f.gender.value === 'female') {
      gender = 'women';
    }

    for (const i of [1, 2, 3, 4, 5]) {
      if (this.f.gender.value === '' || gender === '') {
        // If no gender is specified, randomize it
        gender = ['men', 'women'][Math.floor(Math.random() * 2)];
      }
      const randomNumber = this.getRandomNumber();
      this.photos.push({ gender, id: randomNumber });
    }
  }

  getRandomNumber() {
    const num = Math.floor(Math.random() * 99);
    // If the number is already in the photos array, randomize another one.
    return this.photos.map(({ id }) => id).includes(num) ? this.getRandomNumber() : num;
  }

  cancelGeneratedPhotos() {
    this.photos.length = 0;
    this.f.photo.reset('');
  }

  /*
      Get the gender of the random picture selected.
      This gender value is only used to form the photo URL during sign up.
  */
  getPhotoGender() {
    let gender: string;
    this.photos.forEach((photo, index) => {
      if ((document.getElementById(`photo${index}`) as HTMLInputElement).checked) {
        gender = photo.gender;
      }
    });
    return gender;
  }

  async signUp() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }

    const url =
      this.f.photo.value === ''
        ? this.defaultPhoto
        : `https://randomuser.me/api/portraits/${this.getPhotoGender()}/${this.f.photo.value}.jpg`;

    const user: User = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      gender: this.f.gender.value,
      email: this.f.email.value,
      photoURL: url
    };
    try {
      await this.authService.emailSignUp(user, this.f.password.value);
      this.modal.hide();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        this.f.email.setErrors({ notExists: true });
      }
    }
  }

  @HostListener('modal-hidden', ['$event'])
  onModalClose(event) {
    this.signUpForm.reset({
      gender: ''
    });
    this.submitted = false;
    this.photos.length = 0;
  }
}
