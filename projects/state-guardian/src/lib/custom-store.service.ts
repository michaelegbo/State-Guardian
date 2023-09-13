import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

// Define a generic state token
export const INITIAL_STATE_TOKEN = new InjectionToken<any>('INITIAL_STATE_TOKEN');


@Injectable({
  providedIn: 'root'
})
export class CustomStore<T> {
  private state$: BehaviorSubject<T>;

  constructor(@Inject(INITIAL_STATE_TOKEN) initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  select<K extends keyof T>(key: K): Observable<T[K]> {
    return this.state$.asObservable().pipe(pluck(key));
  }

  dispatch(mutator: (state: T) => Partial<T>): void {
    const newState = { ...this.state$.getValue(), ...mutator(this.state$.getValue()) };
    this.state$.next(newState);
  }
}
