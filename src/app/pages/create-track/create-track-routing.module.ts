import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTrackPage } from './create-track.page';

const routes: Routes = [{ path: '', component: CreateTrackPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTrackPageRoutingModule {}