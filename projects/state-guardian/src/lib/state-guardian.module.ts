import { StateGuardianComponent } from './state-guardian.component';
// state-management.module.ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { EffectsService } from './effects-service.service';
import { CustomStore, INITIAL_STATE_TOKEN } from './custom-store.service';
import { NormalizationService } from './normalize.service';
import { EntityManagementService } from './entity-management.service';
import { CacheService } from './cache.service';
import { MiddlewareService } from './middleware.service';


@NgModule({  
  declarations: [
  StateGuardianComponent
],
  imports: [
    HttpClientModule
  ],
  providers: [
    EffectsService,
    MiddlewareService,
    CacheService,
    NormalizationService,
    EntityManagementService,
    CustomStore,
    { provide: INITIAL_STATE_TOKEN, useValue: { user: null } } // This is just an example. Adjust the initial state as needed.
    // ... any other services or utilities you have
  ],
  exports: [
    StateGuardianComponent
  ]
})
export class StateGuardianModule { }
