import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InventoryService } from 'src/app/services/inventory.service';
import { EmployeeTableActions } from './employee-table.action';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
@Injectable({ providedIn: 'root' })
export class EmployeeTableEffects {
  constructor(
    private action$: Actions,
    private inventoryService: InventoryService
  ) {}
  dataSource: any;
  //need to fix pagination and sort
  newTableData = [];
  paginator: any;
  sort: any;
  loadTable$ = createEffect(() => {
    return this.action$.pipe(
      ofType(EmployeeTableActions.loadTable),
      mergeMap((action) =>
        this.inventoryService
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
              this.newTableData = newData1;
              this.dataSource = new MatTableDataSource(newData1);
              console.log('datasource2', this.dataSource);
              this.dataSource.paginator = this.paginator;
              console.log('p1', this.paginator);

              this.dataSource.sort = this.sort;
            }),
            map((res: any) =>
              EmployeeTableActions.loadTableSuccess({
                tableData: this.newTableData,
              })
            ),
            catchError((error) =>
              of(EmployeeTableActions.loadTableFailure({ errors: error }))
            )
          )
      )
    );
  });
}
