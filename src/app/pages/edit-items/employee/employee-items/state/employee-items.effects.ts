import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InventoryService } from 'src/app/services/inventory.service';
import { EmployeeItemsActions } from './employee-items.action';
import { mergeMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeItemsEffects {
  constructor(
    private action$: Actions,
    private inventoryService: InventoryService
  ) {}

  // loadForm$ = createEffect(()=>{
  //   return this.action$.pipe(
  //     ofType(EmployeeItemsActions.loadForm),
  //     mergeMap((action)=>
  //       this.inventoryService.getEmployeeDetails
  //     )
  //   )
  // })
}
