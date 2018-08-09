import { CanDeactivate } from '@angular/router';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

export interface CanDeactivateGuarded {
  canDeactivate: () => boolean | Observable<boolean>;
}
