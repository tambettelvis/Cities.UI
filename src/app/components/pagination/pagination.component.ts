import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {

  @Output() pageClick = new EventEmitter<number>(); // returns index

  selectedIndex = 0;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  next(): void {
    this.selectedIndex++;
    this.pageClick.emit(this.selectedIndex);
  }

  previous(): void {
    if (this.selectedIndex - 1 < 0) {
      return;
    }

    this.selectedIndex--;
    this.pageClick.emit(this.selectedIndex);
  }

  reset(): void {
    this.selectedIndex = 0;
    this.cdRef.markForCheck();
  }
}
