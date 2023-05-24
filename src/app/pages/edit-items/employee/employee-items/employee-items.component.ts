import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { concatMap, map, tap, withLatestFrom } from 'rxjs';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-employee-items',
  template: `
    <div class="item-container" [hidden]="(obs$ | async) ? false : true">
      <h1 class="title-text">Edit Employees Details</h1>
      <form class="example-form" [formGroup]="formData" (ngSubmit)="onSubmit()">
        <div>
          <mat-form-field class="example-full-width">
            <mat-label>Device Id</mat-label>
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
              [value]="numberOfDevices > 0 ? employeeData?.deviceIds : '-'"
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
        margin-top: 5em;
        margin-left: 33em;
      }
      .title-text {
        padding-left: 12em;
        margin-bottom: 2em;
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
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id->', this.id);
    this.obs$ = this.inventoryService.getEmployeeDetails(this.id).pipe(
      withLatestFrom(this.inventoryService.getDevices()),
      tap((res: any) => {
        console.log('ressss', res);
        let data1 = res[0];
        let data2 = res[1];
        let result: any;

        result = data2
          .filter((ele: any) => ele.employeeIdLinked === data1.id)
          .map((obj: any) => obj.id);
        this.numberOfDevices = result.length;
        data1 = { ...data1, deviceIds: result.toString() };
        this.employeeData = data1;
        console.log(this.employeeData);
        this.buildForm();
      })
    );
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
    delete this.formData.value.deviceIds;
    console.log('Submitting form: ', this.formData.value);
    this.inventoryService
      .patchEmployeeDetails(this.id, this.formData.value)
      .subscribe();

    //changing devices tables
    console.log('tempData', tempData);

    let devicesArray = tempData.deviceIds.split(',');
    devicesArray.forEach((deviceId: any) => {
      this.inventoryService
        .getDeviceDetails(deviceId)
        .pipe(
          map((res: any) => ({
            ...res,
            employeeIdLinked: parseInt(this.id),
          })),
          concatMap((res) =>
            this.inventoryService.patchDeviceDetails(deviceId, res)
          )
        )
        .subscribe((res: any) => {
          this._snackBar.open('Employeee Detail Successfully Edited', '', {
            duration: 1500,
          });
        });
    });
  }
}
