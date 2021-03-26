import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneEventsHandlerService {

  private hoveredZoneSubj = new BehaviorSubject<string>(undefined);
  public hoveredZone$ = this.hoveredZoneSubj.asObservable();

  set hoveredZone(value: string) {
    this.hoveredZoneSubj.next(value);
  }
}
