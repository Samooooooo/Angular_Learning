import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { QuestionListComponent } from './question-list/question-list.component';


@NgModule({
  declarations: [
    QuestionListComponent
  ],
  imports: [
    CommonModule,
    LearnRoutingModule
  ]
})
export class LearnModule { }
