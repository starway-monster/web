import { ZoneEventsHandlerService } from './../services/zone-events-handler.service';
import { ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'sm-zone-selector',
  templateUrl: './zone-selector.component.html',
  styleUrls: ['./zone-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZoneSelectorComponent {

  private currentSelectedItem: string;

  @Input() items: string[] = [];
  @Input() label: string;
  @Input() isMultiple: boolean;
  @Input() colors: d3.ScaleOrdinal<string, string, never>;
  @Output() selectedItemChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() set selectedItem(value: string) {
      this.currentSelectedItem = value;
      this.selectedItemChange.emit(value);
  }

  constructor(private readonly zoneEventsHandlerService: ZoneEventsHandlerService) { }

  get selectedItem(): string {
    return this.currentSelectedItem;
  }

  public hoverItem(hoveredZone: string) {
    this.zoneEventsHandlerService.hoveredZone = hoveredZone;
  }
}
