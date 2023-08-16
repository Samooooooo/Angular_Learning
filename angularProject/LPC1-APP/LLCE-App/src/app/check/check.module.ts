import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckRoutingModule } from './check-routing.module';
import { CheckQDetailsComponent } from './check-q-details/check-q-details.component';
import { CheckScoreComponent } from './check-score/check-score.component';

@NgModule({
  declarations: [CheckQDetailsComponent, CheckScoreComponent],
  imports: [CommonModule, CheckRoutingModule],
})
export class CheckModule {}
