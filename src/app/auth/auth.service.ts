import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
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
          const userObs = this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          return userObs.pipe(
            map(u => {
              u.uid = user.uid;
              return u;
            })
          );
        } else {
          return of(null);
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
      throw error;
    }
  }

  async login(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.afAuth.auth.signOut();
  }
}
