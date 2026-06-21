import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateTrackPageRoutingModule } from './create-track-routing.module';
import { CreateTrackPage } from './create-track.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CreateTrackPageRoutingModule],
  declarations: [CreateTrackPage]
})
export class CreateTrackPageModule {}