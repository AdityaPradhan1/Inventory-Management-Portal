import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap, withLatestFrom } from 'rxjs';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-employee-table',
  template: `
    <div
      [hidden]="(employeeData$ | async) ? false : true"
      class="employee-data"
    >
      <mat-form-field>
        <mat-label>Filter</mat-label>
        <input
          matInput
          (keyup)="applyFilter($event)"
          placeholder="Ex. Aditya"
          #input
        />
      </mat-form-field>

      <div class="mat-elevation-z8">
        <table mat-table [dataSource]="dataSource" matSort>
          <!-- ID Column -->
          <ng-container matColumnDef="employeeId">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Employee Id
            </th>
            <td mat-cell *matCellDef="let row">{{ row.id }}</td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
            <td mat-cell *matCellDef="let row">{{ row.name }}</td>
          </ng-container>

          <!-- Email Column -->
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
            <td mat-cell *matCellDef="let row">{{ row.email }}</td>
          </ng-container>

          <!-- Device Column -->
          <ng-container matColumnDef="devicesOwned">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Devices Owned
            </th>
            <td mat-cell *matCellDef="let row">
              {{ row.devicesOwned !== '' ? row.devicesOwned : '-' }}
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
      .employee-data {
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
export class EmployeeTableComponent implements OnInit {
  employeeData$: any;
  dataSource: any;
  displayedColumns: string[] = [
    'employeeId',
    'name',
    'email',
    'devicesOwned',
    'edit',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.employeeData$ = this.inventoryService
      .getEmployees()
      //async doesnt work issue-> material ui https://github.com/angular/components/issues/10205
      //fixed tempory instead of ngif used hidden
      .pipe(
        withLatestFrom(this.inventoryService.getDevices()),
        tap((res: any) => {
          console.log('ressss', res);
          let data1 = res[0];
          let data2 = res[1];
          let result: any;
          let newData1: any = [];
          data1.forEach((element: any) => {
            result = data2
              .filter((ele: any) => ele.employeeIdLinked === element.id)
              .map((obj: any) => obj.type)
              .toString();
            element = { ...element, devicesOwned: result };
            newData1.push(element);
          });
          console.log('newsRes', newData1);

          this.dataSource = new MatTableDataSource(newData1);
          this.dataSource.paginator = this.paginator;
          console.log('p1', this.paginator);

          this.dataSource.sort = this.sort;
        })
      );
    // .subscribe((res: any) => {
    //   this.dataSource = new MatTableDataSource(res);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
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
    this.router.navigate(['../items/employee', data.id]);
  }
}
