import { Component, OnInit } from '@angular/core';
import { AppContext } from 'src/app/context/app-context';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user: User;
  constructor(
    private sessionContext: AppContext
  ) { }

  ngOnInit() {
    this.user = this.sessionContext.context.user;
  }

}
