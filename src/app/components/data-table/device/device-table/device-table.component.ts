import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-device-table',
  template: `
    <div [hidden]="(deviceData$ | async) ? false : true" class="device-data">
      <mat-form-field>
        <mat-label>Filter</mat-label>
        <input
          matInput
          (keyup)="applyFilter($event)"
          placeholder="Ex. Monitor"
          #input
        />
      </mat-form-field>

      <div class="mat-elevation-z8">
        <table mat-table [dataSource]="dataSource" matSort>
          <!-- ID Column -->
          <ng-container matColumnDef="deviceId">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Device ID</th>
            <td mat-cell *matCellDef="let row">{{ row.id }}</td>
          </ng-container>

          <!-- type Column -->
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Type</th>
            <td mat-cell *matCellDef="let row">{{ row.type }}</td>
          </ng-container>

          <!-- description Column -->
          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Description
            </th>
            <td mat-cell *matCellDef="let row">{{ row.description }}</td>
          </ng-container>

          <!-- employeeIdLinked Column -->
          <ng-container matColumnDef="employeeIdLinked">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Owner Employee Id
            </th>
            <td mat-cell *matCellDef="let row">
              {{ row.employeeIdLinked >= 0 ? row.employeeIdLinked : '-' }}
            </td>
          </ng-container>

          <!-- Edit Column -->
          <ng-container matColumnDef="edit">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Edit</th>
            <td mat-cell *matCellDef="let row">
              <button
                mat-icon-button
                class="icon edit-icon"
                aria-label="icon-button with edit icon"
                (click)="onEdit(row)"
              >
                <mat-icon>edit</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>

          <!-- Row shown when there is no matching data. -->
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="4">
              No data matching the filter "{{ input.value }}"
            </td>
          </tr>
        </table>

        <mat-paginator
          [pageSizeOptions]="[5, 10, 25, 100]"
          aria-label="Select page of users"
        ></mat-paginator>
      </div>
    </div>
  `,
  styles: [
    `
      .device-data {
        margin: 2em;
      }
      table {
        width: 100%;
      }

      .mat-mdc-form-field {
        font-size: 14px;
        width: 100%;
      }

      td,
      th {
        width: 25%;
      }
    `,
  ],
})
export class DeviceTableComponent implements OnInit {
  deviceData$: any;
  dataSource: any;
  displayedColumns: string[] = [
    'deviceId',
    'type',
    'description',
    'employeeIdLinked',
    'edit',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.deviceData$ = this.inventoryService.getDevices().pipe(
      tap((res: any) => {
        console.log(res);

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(data: any) {
    console.log('data->', data);
    this.router.navigate(['../items/device', data.id]);
  }
}
