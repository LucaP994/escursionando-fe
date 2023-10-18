import { Component } from '@angular/core';
import { Item } from '../models/item-model';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public itemList: Item[] = []

   constructor(
    private httpService: HttpService
  ) {}

  ngAfterViewInit() {
    this.httpService.getItems().subscribe(res =>{ 
      this.itemList = res;
      console.log(this.itemList)
    })
  }
}
