import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BallComponent } from './components/ball/ball.component';

const routes: Routes = [
  {
    path: '',
    component: BallComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
