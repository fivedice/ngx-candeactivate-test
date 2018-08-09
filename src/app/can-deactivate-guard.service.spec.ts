import { TestBed, inject } from '@angular/core/testing';

import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { GuardedComponent } from './guarded/guarded.component';
import { CanDeactivate } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ConfirmationService } from 'primeng/primeng';
import { RouterTestingModule } from '@angular/router/testing';


class MockComponent extends GuardedComponent implements CanDeactivate<MockComponent> {
  // Set this to the value you want to mock being returned from GuardedComponent
  returnValue: boolean | Observable<boolean>;

  canDeactivate(): boolean | Observable<boolean> {
    return this.returnValue;
  }
}

describe('CanDeactivateGuardService', () => {
  let service: CanDeactivateGuardService;
  // The mock for our GuardedComponent.
  let mockComponent: MockComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // Router is a dependency of GuardedComponent:
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        CanDeactivateGuardService,
        // Now, for the cool stuff!
        // We're going to treat a component like a service and "provide" it!
        {
          provide: GuardedComponent, // Yes, you can 'provide' a component here!
          useClass: MockComponent // But we're mocking it away.
        },
        // Also have to bring in the dependencies of GuardedComponent:
        ConfirmationService
      ]
    });
    service = TestBed.get(CanDeactivateGuardService);
    // Ask for the real, get the mock:
    mockComponent = TestBed.get(GuardedComponent);
  });

  it('should be created', () => {
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

