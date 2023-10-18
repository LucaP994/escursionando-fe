import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent {

  constructor(
    private router: Router
  ) { }


  public navigateTo(path:string){
    this.router.navigateByUrl(path);
  }

}
