import { Component, OnInit } from '@angular/core';

import { FriendService, Friend } from '../friend.service';
import { Observable, of } from 'rxjs';
import { AuthService, User } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // friends: Observable<Friend[]>;

  constructor(private auth: AuthService, private afs: AngularFirestore, private router: Router) {}

  ngOnInit() {
    // this.friends = this.auth.user.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       const userDoc = this.afs.doc<User>(`users/${user.uid}`);
    //       return userDoc.collection<Friend>('friends').valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // );
  }

  async logout() {
    await this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
