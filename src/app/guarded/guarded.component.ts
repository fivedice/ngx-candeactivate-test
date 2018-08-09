import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { CanDeactivateGuarded } from '../can-deactivate-guarded';

@Component({
  selector: 'fdp-guarded',
  templateUrl: './guarded.component.html',
  styleUrls: ['./guarded.component.scss']
})
export class GuardedComponent implements CanDeactivateGuarded {

  isGuarded = false;

  // never expose your subjects!
  private canDeactivate$: Subject<boolean>;

  constructor(private router: Router,
              private confirmationService: ConfirmationService) { }

  goHome() {
    this.router.navigate(['/']);
  }

  toggleGuard() {
    this.isGuarded = !this.isGuarded;
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.isGuarded) {
      this.canDeactivate$ = new Subject<boolean>();
      this.confirmationService.confirm({
        header: 'Wait!',
        message: 'Do you really want to leave?',
        acceptLabel: 'Leave',
        rejectLabel: 'Stay',
        accept: () => {
          // deactive (leave)
          this.canDeactivate$.next(true);
          this.canDeactivate$.complete();
        },
        reject: () => {
          // do not deactivate (stay put)
          this.canDeactivate$.next(false);
          this.canDeactivate$.complete();
        }
      });
      return this.canDeactivate$.asObservable();
    }

    return true;
  }
}
