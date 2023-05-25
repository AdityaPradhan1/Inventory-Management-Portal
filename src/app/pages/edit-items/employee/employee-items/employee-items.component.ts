import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { concatMap, map, tap, withLatestFrom } from 'rxjs';
import { EmployeeTableActions } from 'src/app/components/data-table/employee/employee-table/state/employee-table.action';
import { EmployeeTableState } from 'src/app/components/data-table/employee/employee-table/state/employee-table.feature';
import { InventoryService } from 'src/app/services/inventory.service';
import {
  EmployeeItemsFeature,
  EmployeeItemsState,
} from './state/employee-items.feature';
import { EmployeeItemsActions } from './state/employee-items.action';

@Component({
  selector: 'app-employee-items',
  template: `
    <div class="item-container" *ngIf="obs$ | async">
      <h1 class="title-text">Edit Employees Details</h1>
      <form class="example-form" [formGroup]="formData" (ngSubmit)="onSubmit()">
        <div>
          <mat-form-field class="example-full-width">
            <mat-label>Employee Id</mat-label>
            <input matInput disabled [value]="id" />
          </mat-form-field>
        </div>
        <div>
          <mat-form-field class="example-full-width">
            <mat-label>Employee Name</mat-label>
            <input
              matInput
              [value]="employeeData?.name"
              formControlName="name"
            />
          </mat-form-field>
        </div>
        <div>
          <mat-form-field class="example-full-width">
            <mat-label>Employee Email </mat-label>
            <input
              matInput
              [value]="employeeData?.email"
              formControlName="email"
            />
          </mat-form-field>
        </div>

        <div>
          <mat-form-field class="example-full-width">
            <mat-label>Device Ids (Seperate with commas)</mat-label>
            <input
              matInput
              [value]="employeeData?.deviceIds ? employeeData?.deviceIds : '-'"
              formControlName="deviceIds"
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
        min-width: 20em;
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
export class EmployeeItemsComponent implements OnInit {
  id: any;
  obs$: any;
  employeeData: any;
  numberOfDevices = 0;
  formData!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private storeTable: Store<EmployeeTableState>,
    private storeItems: Store<EmployeeItemsState>
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    console.log('id->', this.id);
    // this.storeItems.dispatch(EmployeeItemsActions.setId(this.id));
    this.storeItems.dispatch(EmployeeItemsActions.loadForm({ id: this.id }));
    this.obs$ = this.storeItems
      .select(EmployeeItemsFeature.selectFormData)
      .pipe(
        tap((res) => {
          this.employeeData = res;
          console.log('res', res);
        })
      );
    // this.obs$ = this.inventoryService.getEmployeeDetails(this.id).pipe(
    //   withLatestFrom(this.inventoryService.getDevices()),
    //   tap((res: any) => {
    //     console.log('ressss', res);
    //     let data1 = res[0];
    //     let data2 = res[1];
    //     let result: any;

    //     result = data2
    //       .filter((ele: any) => ele.employeeIdLinked === data1.id)
    //       .map((obj: any) => obj.id);
    //     this.numberOfDevices = result.length;
    //     data1 = { ...data1, deviceIds: result.toString() };
    //     this.employeeData = data1;
    //     console.log(this.employeeData);
    //     // this.buildForm();
    //   })
    // );
    this.buildForm();
  }
  private buildForm() {
    this.formData = this.fb.group({
      name: [this.employeeData?.name, { updateOn: 'submit' }],
      email: [this.employeeData?.email, { updateOn: 'submit' }],
      deviceIds: [this.employeeData?.deviceIds, { updateOn: 'submit' }],
    });
  }
  onSubmit() {
    let tempData: any = { ...this.formData.value };
    let tempName = tempData.name ? tempData.name : this.employeeData.name;
    let tempEmail = tempData.email ? tempData.email : this.employeeData.email;
    let tempId = tempData.deviceIds
      ? tempData.deviceIds
      : this.employeeData.deviceIds;
    let tempValue = { name: tempName, email: tempEmail };
    delete this.formData.value.deviceIds;
    console.log('Submitting form: ', tempValue);
    this.storeItems.dispatch(
      EmployeeItemsActions.submitForm({
        employeeId: this.id,
        formData: tempValue,
      })
    );
    // this.inventoryService.patchEmployeeDetails(this.id, tempValue).subscribe();

    //changing devices tables
    console.log('tempData', tempData);

    let devicesArray = tempId.split(',');
    devicesArray.forEach((deviceId: any) => {
      this.storeItems.dispatch(
        EmployeeItemsActions.submitDeviceChangeForm({
          employeeId: this.id,
          deviceId: deviceId,
        })
      );

      // this.inventoryService
      //   .getDeviceDetails(deviceId)
      //   .pipe(
      //     map((res: any) => ({
      //       ...res,
      //       employeeIdLinked: parseInt(this.id),
      //     })),
      //     concatMap((res) =>
      //       this.inventoryService.patchDeviceDetails(deviceId, res)
      //     )
      //   )
      //   .subscribe((res: any) => {});
    });
    this._snackBar.open('Employeee Detail Successfully Edited', '', {
      duration: 1500,
    });
    this.storeTable.dispatch(EmployeeTableActions.toggleLoad());
  }
}
