import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BallComponent } from './components/ball/ball.component';
import { BallResolver } from './components/ball/ball.resolver';

const routes: Routes = [
  {
    path: '',
    component: BallComponent,
    resolve: { ballData: BallResolver },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
