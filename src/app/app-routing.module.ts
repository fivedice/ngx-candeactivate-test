import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GuardedComponent } from './guarded/guarded.component';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';

const routes: Routes = [{
    path: '',
    component: HomeComponent
  }, {
    path: 'guarded',
    component: GuardedComponent,
    canDeactivate: [CanDeactivateGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
