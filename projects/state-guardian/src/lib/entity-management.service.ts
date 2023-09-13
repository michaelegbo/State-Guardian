import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntityManagementService<T> {
  addOne(state: T[], entity: T): T[] {
    return [...state, entity];
  }

  addMany(state: T[], entities: T[]): T[] {
    return [...state, ...entities];
  }

  updateOne(state: T[], entity: T, idSelector: (e: T) => any): T[] {
    const index = state.findIndex(e => idSelector(e) === idSelector(entity));
    if (index > -1) {
      state[index] = entity;
      return [...state];
    }
    return state;
  }

  deleteOne(state: T[], id: any, idSelector: (e: T) => any): T[] {
    return state.filter(e => idSelector(e) !== id);
  }
}
