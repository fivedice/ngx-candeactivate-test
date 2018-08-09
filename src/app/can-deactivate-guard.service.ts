import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { GuardedComponent } from './guarded/guarded.component';
import { CanDeactivateGuarded } from './can-deactivate-guarded';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<CanDeactivateGuarded> {
  canDeactivate(component: CanDeactivateGuarded) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
