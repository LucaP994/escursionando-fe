import { Component, OnInit } from '@angular/core';
import { AppContext } from 'src/app/context/app-context';
import { Coordinates } from 'src/app/models/coordinates-model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  public coords: Coordinates = new Coordinates();
  constructor(
    private sessionContext: AppContext
  ) { }

  ngOnInit() {
    this.coords.lat = this.sessionContext.context.position.lat;
    this.coords.lon = this.sessionContext.context.position.lon;
  }
  getMap(): string{
    return "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12576.084152404432!2d"+this.coords.lon+"!3d"+this.coords.lat+"!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sit!4v1697639449476!5m2!1sen!2sit"
  }
}
