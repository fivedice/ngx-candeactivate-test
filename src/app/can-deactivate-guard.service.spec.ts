import { TestBed } from '@angular/core/testing';

import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { CanDeactivate } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CanDeactivateGuarded } from './can-deactivate-guarded';

class MockComponent implements CanDeactivateGuarded {
  // Set this to the value you want to mock being returned from GuardedComponent
  returnValue: boolean | Observable<boolean>;

  canDeactivate(): boolean | Observable<boolean> {
    return this.returnValue;
  }
}

describe('CanDeactivateGuardService', () => {
  let mockComponent: MockComponent;
  let service: CanDeactivateGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanDeactivateGuardService,
        MockComponent
      ]
    });
    service = TestBed.get(CanDeactivateGuardService);
    mockComponent = TestBed.get(MockComponent);
  });

  it('expect service to instantiate', () => {
    expect(service).toBeTruthy();
  });

  it('can route if unguarded', () => {
    // Mock GuardedComponent.isGuarded = false, which returns true from canActivate()
    mockComponent.returnValue = true;
    expect(service.canDeactivate(mockComponent)).toBeTruthy();
  });

  it('will route if guarded and user accepted the dialog', () => {
    // Mock the behavior of the GuardedComponent:
    const subject$ = new Subject<boolean>();
    mockComponent.returnValue = subject$.asObservable();
    const canDeactivate$ = <Observable<boolean>>service.canDeactivate(mockComponent);
    canDeactivate$.subscribe((deactivate) => {
      // This is the real test!
      expect(deactivate).toBeTruthy();
    });
    // emulate the accept()
    subject$.next(true);
  });

  it('will not route if guarded and user rejected the dialog', () => {
    // Mock the behavior of the GuardedComponent:
    const subject$ = new Subject<boolean>();
    mockComponent.returnValue = subject$.asObservable();
    const canDeactivate$ = <Observable<boolean>>service.canDeactivate(mockComponent);
    canDeactivate$.subscribe((deactivate) => {
      // This is the real test!
      expect(deactivate).toBeFalsy();
    });
    // emulate the reject()
    subject$.next(false);
  });
});

