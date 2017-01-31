import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CompleterService } from 'ng2-completer';

import { Cell } from '../../../lib/data-set/cell';
import { DefaultCellType } from './default-cell-type';

@Component({
  selector: 'cell-type-completer',
  template: `
    <ng2-completer [(ngModel)]="completerStr"
                   [dataService]="cell.getColumn().getConfig().completer.dataService"
                   [minSearchLength]="cell.getColumn().getConfig().completer.minSearchLength || 0"
                   [pause]="cell.getColumn().getConfig().completer.pause || 0"
                   [placeholder]="cell.getColumn().getConfig().completer.placeholder || 'Start typing...'"
                   (selected)="onEditedCompleter($event)">
    </ng2-completer>
    `
})
export class CellCompleterComponent extends DefaultCellType {
  
  completerStr: string = '';

  constructor(private completerService: CompleterService) {
    super();
  }

  ngOnInit(): void {
		if (this.cell.getColumn().editor && this.cell.getColumn().editor.type === 'completer') {
			let config = this.cell.getColumn().getConfig().completer;
			config.dataService = this.completerService.local(config.data, config.searchFields, config.titleField);
			config.dataService.descriptionField(config.descriptionField);
		}
  }

  onEditedCompleter(event): boolean {
    this.cell.newValue = event.title;
    return false;
  }
}