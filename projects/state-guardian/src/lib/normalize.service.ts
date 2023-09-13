// normalization.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NormalizationService {
  constructor() {}

  normalize<T>(data: T[], key: keyof T): { [id: string]: T } {
    return data.reduce((acc: { [id: string]: T }, item) => {
      acc[String(item[key])] = item;
      return acc;
    }, {});
  }
}
