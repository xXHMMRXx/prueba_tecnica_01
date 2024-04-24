import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatPaginator,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() displayedColumns: string[] = [];
  @Input('dataSource') set setDataSource(value: any) {
    this.dataSource = new MatTableDataSource<any>(value);
    this.tempDataSource = new MatTableDataSource<any>(value);
    this.dataSource.paginator = this.paginator;
  }
  @Input() configTable: any[] = [];
  @Output() selectedRow: EventEmitter<any> = new EventEmitter();

  dataSource: any;
  tempDataSource: any;
  filter = new FormControl('');
  tempSubscriptions: any;

  ngOnInit(): void {
    this.filterListener();
  }

  filterListener(): void {
    this.tempSubscriptions = this.filter.valueChanges.subscribe((data) => {
      this.dataSource.data = this.tempDataSource.data;
      this.search(data);
    });
  }

  resetTable(): void {
    this.filter.reset();
    this.dataSource.data = this.tempDataSource.data;
  }

  search(data: any) {
    this.dataSource.data = this.dataSource.data.filter(
      (d: any) =>
        d.name?.toLowerCase().includes(data?.toLowerCase()) ||
        d.username?.toLowerCase().includes(data?.toLowerCase()) ||
        d.email?.toLowerCase().includes(data?.toLowerCase())
    );
  }

  rowEvent(data: any): void {
    this.selectedRow.emit({ data });
  }
}
