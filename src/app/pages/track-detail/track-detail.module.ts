import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrackDetailPageRoutingModule } from './track-detail-routing.module';
import { TrackDetailPage } from './track-detail.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TrackDetailPageRoutingModule],
  declarations: [TrackDetailPage]
})
export class TrackDetailPageModule {}