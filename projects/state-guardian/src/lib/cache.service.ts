import { Injectable } from '@angular/core';

// cache.service.ts
@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any>();

  set(key: string, value: any): void {
    this.cache.set(key, value);
  }

  get(key: string): any {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  remove(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}
