import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InventoryService } from 'src/app/services/inventory.service';
import { DeviceItemsActions } from './device-items.action';
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
import { DeviceItemsFeature, DeviceItemsState } from './device-items.feature';

@Injectable({ providedIn: 'root' })
export class DeviceItemsEffects {
  constructor(
    private actions$: Actions,
    private inventoryService: InventoryService,
    private store: Store<DeviceItemsState>
  ) {}

  deviceData: any;

  loadForm$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeviceItemsActions.loadForm),
      mergeMap((action) =>
        this.inventoryService.getDeviceDetails(action.id).pipe(
          tap((res: any) => {
            this.deviceData = res;
          }),
          map((res) =>
            DeviceItemsActions.loadFormSuccess({
              formData: this.deviceData,
            })
          ),

          catchError((error) =>
            of(DeviceItemsActions.loadFormFailure({ errors: error }))
          )
        )
      )
    );
  });

  submitForm$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeviceItemsActions.submitForm),
      mergeMap((action) =>
        this.inventoryService
          .patchDeviceDetails(action.deviceId, action.formData)
          .pipe(
            map((res) =>
              DeviceItemsActions.submitFormSuccess({
                response: res,
              })
            ),

            catchError((error) =>
              of(
                DeviceItemsActions.submitFormFailure({
                  errors: error,
                })
              )
            )
          )
      )
    );
  });
}
