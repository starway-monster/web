import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneEventsHandlerService {

  private hoveredZonesSubj = new BehaviorSubject<string[]>([]);
  public hoveredZones$ = this.hoveredZonesSubj.asObservable();

  setHoveredZones(... value: string[]) {
    this.hoveredZonesSubj.next(value);
  }
}
