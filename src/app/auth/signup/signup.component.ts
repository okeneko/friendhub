import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User, AuthService } from '../auth.service';
import { FriendService } from '../../friend.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  submitted: boolean;
  defaultPhoto =
    'https://pixabay.com/get/5fe7d6474c52b10ff3d89938b977692b083edbe35750724b71267c/blank-profile-picture-973460_640.png';
  photos = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private friendService: FriendService
  ) {}

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
      const randomNumber = Math.floor(Math.random() * 99);
      this.photos.push({ gender, id: randomNumber });
    }
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

  signUp() {
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
    this.authService.emailSignUp(user, this.f.password.value).then(res => {
      console.log(res);
    });
    // IDEA: modal with loading that displays either error or success!
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
