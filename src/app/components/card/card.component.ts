import { Component, Input, OnInit } from '@angular/core';
import { Coordinates } from 'src/app/models/coordinates-model';
import { Item } from 'src/app/models/item-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {
  @Input() item: Item = new Item();
  private coordinates: Coordinates = new Coordinates();
  public distance: number = 0;
  constructor() { }

  ngOnInit() {
    this.coordinates = JSON.parse(localStorage.getItem('session-context')).position;
    this.distance = this.calcDistance(this.coordinates,this.item.coords);
    console.log(this.distance)
  }
  calcDistance(to: Coordinates, from: Coordinates) {
    let dist: number = Math.sqrt(Math.pow((from.lat - to.lat),2) + Math.pow((from.lon -to.lon),2))*100
    return parseFloat(dist.toFixed(2));
  }
}
