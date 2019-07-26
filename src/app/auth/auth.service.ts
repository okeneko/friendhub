import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Friend, FriendService } from '../friend.service';

export interface User {
  uid?: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  photoURL: string;
  friends?: Friend[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private friendService: FriendService
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return null;
        }
      })
    );
  }

  async emailSignUp(user: User, password: string) {
    try {
      const createdUser = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        password
      );
      const usersCollection = this.afs.collection<User>('users');
      await usersCollection.doc<User>(createdUser.user.uid).set(user);
      const newUser = usersCollection.doc<User>(createdUser.user.uid);
      const friendsCollection = newUser.collection<Friend>('friends');

      const friends = await this.friendService.getFirstFriends();

      friends.forEach(friend => {
        friendsCollection.doc<Friend>(friend.username).set(friend);
      });
    } catch (error) {
      return error;
    }
  }
}
