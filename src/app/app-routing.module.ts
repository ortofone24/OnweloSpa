import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnweloComponent } from './onwelo/onwelo.component';

const routes: Routes = [
  { path: 'onwelo', component: OnweloComponent },
  { path: '', redirectTo: '/onwelo', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
