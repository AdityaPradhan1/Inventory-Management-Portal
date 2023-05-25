import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InventoryService } from 'src/app/services/inventory.service';
import { EmployeeItemsActions } from './employee-items.action';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  of,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  EmployeeItemsFeature,
  EmployeeItemsState,
} from './employee-items.feature';

@Injectable({ providedIn: 'root' })
export class EmployeeItemsEffects {
  constructor(
    private actions$: Actions,
    private inventoryService: InventoryService,
    private store: Store<EmployeeItemsState>
  ) {}

  employeeData: any;

  loadForm$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeeItemsActions.loadForm),
      mergeMap((action) =>
        this.inventoryService.getEmployeeDetails(action.id).pipe(
          withLatestFrom(this.inventoryService.getDevices()),
          tap((res: any) => {
            console.log('rz->', res, '\naction', action);
            let data1 = res[0];
            let data2 = res[1];
            let result: any;
            result = data2
              .filter((ele: any) => ele.employeeIdLinked === data1.id)
              .map((obj: any) => obj.id);
            data1 = { ...data1, deviceIds: result.toString() };
            this.employeeData = data1;
          }),
          map((res) =>
            EmployeeItemsActions.loadFormSuccess({
              formData: this.employeeData,
            })
          ),

          catchError((error) =>
            of(EmployeeItemsActions.loadFormFailure({ errors: error }))
          )
        )
      )
    );
  });

  submitForm$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeeItemsActions.submitForm),
      mergeMap((action) =>
        this.inventoryService
          .patchEmployeeDetails(action.employeeId, action.formData)
          .pipe(
            map((res) =>
              EmployeeItemsActions.submitFormSuccess({
                response: res,
              })
            ),

            catchError((error) =>
              of(
                EmployeeItemsActions.submitFormFailure({
                  errors: error,
                })
              )
            )
          )
      )
    );
  });

  submitDeviceChangeForm$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EmployeeItemsActions.submitDeviceChangeForm),
      mergeMap((action) =>
        this.inventoryService.getDeviceDetails(action.deviceId).pipe(
          map((res: any) => ({
            ...res,
            employeeIdLinked: parseInt(action.employeeId),
          })),
          concatMap((res) =>
            this.inventoryService.patchDeviceDetails(action.deviceId, res)
          ),
          map((res) =>
            EmployeeItemsActions.submitDeviceChangeFormSuccess({
              response: res,
            })
          ),

          catchError((error) =>
            of(
              EmployeeItemsActions.submitDeviceChangeFormFailure({
                errors: error,
              })
            )
          )
        )
      )
    );
  });
}
