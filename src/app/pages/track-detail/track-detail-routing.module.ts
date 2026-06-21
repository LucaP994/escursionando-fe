import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackDetailPage } from './track-detail.page';

const routes: Routes = [{ path: '', component: TrackDetailPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackDetailPageRoutingModule {}