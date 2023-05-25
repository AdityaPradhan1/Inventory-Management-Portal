import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InventoryService } from 'src/app/services/inventory.service';
import { DeviceTableActions } from './device-table.action';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceTableFeature, DeviceTableState } from './device-table.feature';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class DeviceTableEffects {
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
      ofType(DeviceTableActions.loadTable),
      mergeMap((action) =>
        this.inventoryService.getDevices().pipe(
          tap((res: any) => {
            this.newTableData = res;
            // this.dataSource = new MatTableDataSource(res);
            // this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.sort;
          }),
          map((res: any) =>
            DeviceTableActions.loadTableSuccess({
              tableData: this.newTableData,
            })
          ),
          catchError((error) =>
            of(DeviceTableActions.loadTableFailure({ errors: error }))
          )
        )
      )
    );
  });
}
