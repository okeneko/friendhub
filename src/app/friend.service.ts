import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import capitalize from 'capitalize';
import { getName } from 'country-list';

export interface Friend {
  uid?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  address: string;
  city: string;
  region: string;
  country: string;
  gender: string;
  phone: string;
  birthdate: string;
  age: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  url = 'https://randomuser.me/api/';

  options = {
    noinfo: '',
    nat: 'au,br,ca,ch,de,dk,es,fi,fr,gb,ie,no,nl,nz,tr,us'
  };

  constructor(private http: HttpClient) {}

  getFriend() {
    return this.http.get(this.url);
  }

  async getFirstFriends() {
    const { results }: any = await this.http
      .get(this.url, { params: { ...this.options, results: '10' } })
      .toPromise();
    const friends: Friend[] = [];
    results.forEach((f: any) => {
      friends.push(this.parseFriend(f));
    });
    return friends;
  }

  parseFriend(friend: any): Friend {
    return {
      firstName: capitalize.words(friend.name.first),
      lastName: capitalize.words(friend.name.last),
      email: friend.email,
      username: friend.login.username,
      address: capitalize.words(friend.location.street),
      city: capitalize.words(friend.location.city),
      region: capitalize.words(friend.location.state),
      country: getName(friend.nat),
      gender: friend.gender,
      phone: friend.cell,
      birthdate: new Date(friend.dob.date).toLocaleDateString('en-GB'),
      age: friend.dob.age,
      photoURL: friend.picture.large
    };
  }
}
