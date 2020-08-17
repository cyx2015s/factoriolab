import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  HostBinding,
} from '@angular/core';

import { IdType, DisplayRate, Dataset } from '~/models';

@Component({
  selector: 'lab-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input() data: Dataset;
  @Input() selectedId: string;
  @Input() options: string[];
  @Input() selectType = IdType.Item;
  @Input() displayRate: DisplayRate;
  @Input() includeEmptyModule: boolean;
  @Input() parent: HTMLElement;

  @Output() cancel = new EventEmitter();
  @Output() selectId = new EventEmitter<string>();

  IdType = IdType;

  opening = true;

  @HostBinding('style.top.px') get top() {
    return this.parent ? this.parent.getBoundingClientRect().y - 4 : -4;
  }

  @HostBinding('style.left.px') get left() {
    return this.parent ? this.parent.getBoundingClientRect().x - 13 : -4;
  }

  constructor(private element: ElementRef) {}

  @HostBinding('style.width.rem')
  get width() {
    return this.options.length < 4 ? 9.625 : 7.375;
  }

  @HostListener('document:click', ['$event'])
  click(event: MouseEvent) {
    if (this.opening) {
      this.opening = false;
    } else if (!this.element.nativeElement.contains(event.target)) {
      this.cancel.emit();
    }
  }

  clickId(id: string, event: MouseEvent) {
    this.selectId.emit(id);
    this.cancel.emit();
    event.stopPropagation();
  }

  clickCancel(event: MouseEvent) {
    this.cancel.emit();
    event.stopPropagation();
  }
}