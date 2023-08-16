import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckQDetailsComponent } from './check-q-details/check-q-details.component';
import { CheckScoreComponent } from './check-score/check-score.component';

const routes: Routes = [
  {
    path: '',
    component: CheckQDetailsComponent,
  },
  {
    path: 'score',
    component: CheckScoreComponent,
  },
  {
    path: ':index',
    component: CheckQDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckRoutingModule {}
