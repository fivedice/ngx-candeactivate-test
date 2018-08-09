import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardedComponent } from './guarded.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';

describe('GuardedComponent', () => {
  let component: GuardedComponent;
  let fixture: ComponentFixture<GuardedComponent>;
  const routes = [{ path: 'home', component: GuardedComponent }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes) ],
      declarations: [ GuardedComponent ],
      providers: [
        ConfirmationService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
