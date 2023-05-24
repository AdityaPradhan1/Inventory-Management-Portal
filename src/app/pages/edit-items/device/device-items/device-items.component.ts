import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { InventoryService } from 'src/app/services/inventory.service';

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
        margin-top: 5em;
        margin-left: 33em;
      }
      .title-text {
        padding-left: 15em;
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
export class DeviceItemsComponent implements OnInit {
  id: any;
  obs$: any;
  deviceData: any;
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
    this.obs$ = this.inventoryService.getDeviceDetails(this.id).pipe(
      tap((res) => {
        this.deviceData = res;
        console.log(this.deviceData);
        this.buildForm();
      })
    );
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
    console.log('Submitting form: ', this.formData.value);
    this.inventoryService
      .patchDeviceDetails(this.id, this.formData.value)
      .subscribe((res: any) => {
        this._snackBar.open('Device Detail Successfully Edited', '', {
          duration: 1500,
        });
      });
  }
}
