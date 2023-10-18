import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { User } from './models/user-model';
import { Gender } from './models/gender';
import { AppContext } from './context/app-context';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public loaded: boolean = false;
  constructor(
    private sessionContext: AppContext
  ) { }

  ngOnInit(){
    let user = new User();
    user.name = "Luca";
    user.surname = "Puglisi";
    user.email = "luca-puglisi@outlook.com";
    user.username = "lPuglisi994";
    user.gender = Gender.MALE;
    user.userImage = "../../../assets/images/profile.jpg";
    user.walkedDistance = 15.50;
    user.tripNumber = 4;
    user.lastTrip = "Crateri Silvestri - 15/09/2023";
    user.level = 3;
    this.sessionContext.user = user
    this.sessionContext.onLoaded.subscribe(res => {
      this.loaded = res;
      console.log(this.loaded)
    })
  }
}
