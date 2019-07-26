import { Component, OnInit } from '@angular/core';

import { Modal } from 'carbon-components';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private friendService: FriendService) {}

  ngOnInit() {
    Modal.init();
  }

  async login() {
    console.log(await this.friendService.getFirstFriends());
  }
}
