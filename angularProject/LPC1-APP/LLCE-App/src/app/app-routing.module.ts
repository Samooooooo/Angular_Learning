import { compileClassMetadata } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'check', loadChildren: () => import('./check/check.module').then(m => m.CheckModule) },
  { path: 'exam', loadChildren: () => import('./exam/exam.module').then(m => m.ExamModule) },
  { path: 'learn', loadChildren: () => import('./learn/learn.module').then(m => m.LearnModule) },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }