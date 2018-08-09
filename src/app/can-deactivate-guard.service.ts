import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { GuardedComponent } from './guarded/guarded.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<GuardedComponent> {

  constructor() { }

  canDeactivate(component: GuardedComponent) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
