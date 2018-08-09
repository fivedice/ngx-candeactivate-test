import { Observable } from 'rxjs';

export interface CanDeactivateGuarded {
  canDeactivate: () => boolean | Observable<boolean>;
}
