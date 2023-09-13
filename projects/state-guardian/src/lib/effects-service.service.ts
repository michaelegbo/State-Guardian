// effects.service.ts
import { Injectable } from '@angular/core';
import { CustomStore } from './custom-store.service';

// effects.service.ts
@Injectable({
  providedIn: 'root'
})
export class EffectsService {
  constructor(private store: CustomStore<any>) {}

  handleEffect(config: EffectConfig) {
    config.apiCall().subscribe({
      next: (data: any) => {
        const action = config.successHandler(data);
        this.store.dispatch(state => action);
      },
      error: (error: any) => {
        const action = config.errorHandler(error);
        this.store.dispatch(state => action);
      }
    });
  }
}

export interface EffectConfig {
  apiCall: Function;
  successHandler: (data: any) => any;
  errorHandler: (error: any) => any;
}

