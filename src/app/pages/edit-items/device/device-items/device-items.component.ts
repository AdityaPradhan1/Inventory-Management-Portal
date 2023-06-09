import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { DeviceTableActions } from 'src/app/components/data-table/device/device-table/state/device-table.action';
import { DeviceTableState } from 'src/app/components/data-table/device/device-table/state/device-table.feature';
import { InventoryService } from 'src/app/services/inventory.service';
import {
  DeviceItemsFeature,
  DeviceItemsState,
} from './state/device-items.feature';
import { DeviceItemsActions } from './state/device-items.action';

@Component({
  selector: 'app-device-items',
  template: `
    <div class="item-container" [hidden]="(obs$ | async) ? false : true">
      <h1 class="title-text">Edit Device Details</h1>
      <form class="example-form" [formGroup]="formData" (ngSubmit)="onSubmit()">
        <div>
          <mat-form-field class="example-full-width">
            <mat-label>Device Id</mat-label>
            <input matInput disabled [value]="id" />
          </mat-form-field>
        </div>
        <div>
          <mat-form-field class="example-full-width">
            <mat-label>Device Type</mat-label>
            <input matInput [value]="deviceData?.type" formControlName="type" />
          </mat-form-field>
        </div>
        <div>
          <mat-form-field class="example-full-width">
            <mat-label>Device Description </mat-label>
            <input
              matInput
              [value]="deviceData?.description"
              formControlName="description"
            />
          </mat-form-field>
        </div>
        <div>
          <mat-form-field class="example-full-width">
            <mat-label>Employee Id</mat-label>
            <input
              matInput
              type="number"
              [value]="
                deviceData?.employeeIdLinked
                  ? deviceData?.employeeIdLinked
                  : '-'
              "
              formControlName="employeeIdLinked"
            />
          </mat-form-field>
        </div>
        <button mat-button type="submit">Submit</button>
      </form>
    </div>
  `,
  styles: [
    `
      .item-container {
        padding: 5em 33em;
      }
      .title-text {
        padding-: 2em 12em;
        font-size: 2em;
      }
      .example-form {
        min-width: 15em;
        max-width: 60em;
        width: 100%;
      }
      button {
        min-width: 15em;
        max-width: 60em;
        width: 100%;
        background-color: #4a4a4a;
      }

      .example-full-width {
        width: 100%;
      }
    `,
  ],
})
export class DeviceItemsComponent implements OnInit {
  id: any;
  obs$: any;
  deviceData: any;
  formData!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private storeTable: Store<DeviceTableState>,
    private storeItems: Store<DeviceItemsState>
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    console.log('id->', this.id);
    this.storeItems.dispatch(DeviceItemsActions.loadForm({ id: this.id }));
    this.obs$ = this.storeItems
      .select(DeviceItemsFeature.selectFormData)
      .pipe(tap((res) => (this.deviceData = res)));
    // this.obs$ = this.inventoryService.getDeviceDetails(this.id).pipe(
    //   tap((res) => {
    //     this.deviceData = res;
    //     console.log(this.deviceData);
    //     this.buildForm();
    //   })
    // );
    this.buildForm();
  }
  private buildForm() {
    this.formData = this.fb.group({
      type: [this.deviceData?.type, { updateOn: 'submit' }],
      description: [this.deviceData?.description, { updateOn: 'submit' }],
      employeeIdLinked: [
        this.deviceData?.employeeIdLinked,
        { updateOn: 'submit' },
      ],
    });
  }
  onSubmit() {
    this.formData.value.employeeIdLinked = parseInt(
      this.formData.value.employeeIdLinked
    );
    let tempData = this.formData.value;
    let tempValue = {
      description: tempData.description
        ? tempData.description
        : this.deviceData.description,
      type: tempData.type ? tempData.type : this.deviceData.type,
      id: this.id,
      employeeIdLinked: tempData.employeeIdLinked
        ? tempData.employeeIdLinked
        : this.deviceData.employeeIdLinked,
    };
    console.log('Submitting form: ', tempValue);
    this.storeItems.dispatch(
      DeviceItemsActions.submitForm({ deviceId: this.id, formData: tempValue })
    );
    // this.inventoryService
    //   .patchDeviceDetails(this.id, tempValue)
    //   .subscribe((res: any) => {});
    this._snackBar.open('Device Detail Successfully Edited', '', {
      duration: 1500,
    });
    this.storeTable.dispatch(DeviceTableActions.toggleLoad());
  }
}
