import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { IZone } from 'src/app/api/models/zone.model';

@Component({
  selector: 'sm-zone-selector',
  templateUrl: './zone-selector.component.html',
  styleUrls: ['./zone-selector.component.scss']
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

  get selectedItem(): string {
    return this.currentSelectedItem;
  }
}
