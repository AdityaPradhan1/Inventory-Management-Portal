import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, concat, concatMap, map, tap } from 'rxjs';
import { DeviceTableActions } from 'src/app/components/data-table/device/device-table/state/device-table.action';
import { DeviceTableState } from 'src/app/components/data-table/device/device-table/state/device-table.feature';
import { EmployeeTableActions } from 'src/app/components/data-table/employee/employee-table/state/employee-table.action';
import { EmployeeTableState } from 'src/app/components/data-table/employee/employee-table/state/employee-table.feature';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-edit-inventory',
  template: `
    <div class="center-span">Inventory Form</div>
    <div class="edit-container">
      <div>
        <label id="radio-group-label">Pick inventory item to add</label>
      </div>
      <mat-radio-group
        aria-labelledby="adio-group-label"
        class="radio-group"
        [(ngModel)]="inventoryItem"
      >
        <mat-radio-button
          class="radio-button"
          *ngFor="let item of inventoryCategories"
          [value]="item"
          color="primary"
        >
          <span style="color: black;"> {{ item }}</span>
        </mat-radio-button>
      </mat-radio-group>
      <div class="form-options">
        <div *ngIf="inventoryItem === 'Employee'">
          <mat-vertical-stepper
            [linear]="true"
            #stepper
            [animationDuration]="stepperAnimationValue"
          >
            <!-- <mat-step [stepControl]="firstFormGroupA">
              <form
                [formGroup]="firstFormGroupA"
                (ngSubmit)="form1A()"
                #formone="ngForm"
              >
                <ng-template matStepLabel>Enter Employee Id</ng-template>
                <mat-form-field>
                  <input
                    matInput
                    type="number"
                    placeholder="Device Id"
                    formControlName="firstCtrl"
                    required
                  />
                </mat-form-field>
                <div>
                  <button mat-button matStepperNext>Next</button>
                </div>
              </form>
            </mat-step> -->
            <mat-step [stepControl]="secondFormGroupA">
              <form
                [formGroup]="secondFormGroupA"
                (ngSubmit)="form2A()"
                #formtwo="ngForm"
              >
                <ng-template matStepLabel>Enter Employee Name</ng-template>
                <mat-form-field>
                  <input
                    matInput
                    placeholder="Name"
                    formControlName="secondCtrl"
                    required
                  />
                </mat-form-field>
                <div>
                  <button mat-button matStepperPrevious>Back</button>
                  <button mat-button matStepperNext>Next</button>
                </div>
              </form>
            </mat-step>
            <mat-step [stepControl]="thirdFormGroupA">
              <form
                [formGroup]="thirdFormGroupA"
                (ngSubmit)="form3A()"
                #formthree="ngForm"
              >
                <ng-template matStepLabel>Enter Employee Email</ng-template>
                <mat-form-field>
                  <input
                    matInput
                    type="email"
                    placeholder="Email"
                    formControlName="thirdCtrl"
                    required
                  />
                </mat-form-field>
                <div>
                  <button mat-button matStepperPrevious>Back</button>
                  <button mat-button matStepperNext>Next</button>
                </div>
              </form>
            </mat-step>
            <mat-step>
              <ng-template matStepLabel>Done</ng-template>

              <div>
                <button mat-button matStepperPrevious>Back</button>
                <button mat-button (click)="stepper.reset()">Reset</button>
                <button
                  mat-button
                  type="submit"
                  (click)="
                    formtwo.ngSubmit.emit();
                    formthree.ngSubmit.emit();
                    onSubmit();
                    stepper.reset()
                  "
                >
                  Submit
                </button>
              </div>
            </mat-step>
          </mat-vertical-stepper>
        </div>

        <div *ngIf="inventoryItem === 'Device'">
          <mat-vertical-stepper
            [linear]="true"
            #stepper
            [animationDuration]="stepperAnimationValue"
          >
            <!-- <mat-step [stepControl]="firstFormGroupB">
              <form
                [formGroup]="firstFormGroupB"
                (ngSubmit)="form1B()"
                #formone="ngForm"
              >
                <ng-template matStepLabel>Enter Device Id</ng-template>
                <mat-form-field>
                  <input
                    matInput
                    type="number"
                    placeholder="Id"
                    formControlName="firstCtrl"
                    required
                  />
                </mat-form-field>
                <div>
                  <button mat-button matStepperNext>Next</button>
                </div>
              </form>
            </mat-step> -->
            <mat-step [stepControl]="secondFormGroupB">
              <form
                [formGroup]="secondFormGroupB"
                (ngSubmit)="form2B()"
                #formtwo="ngForm"
              >
                <ng-template matStepLabel>Enter Device Type</ng-template>
                <mat-form-field>
                  <input
                    matInput
                    placeholder="Type"
                    formControlName="secondCtrl"
                    required
                  />
                </mat-form-field>
                <div>
                  <button mat-button matStepperPrevious>Back</button>
                  <button mat-button matStepperNext>Next</button>
                </div>
              </form>
            </mat-step>
            <mat-step [stepControl]="thirdFormGroupB">
              <form
                [formGroup]="thirdFormGroupB"
                (ngSubmit)="form3B()"
                #formthree="ngForm"
              >
                <ng-template matStepLabel>Enter Device Description</ng-template>
                <mat-form-field>
                  <input
                    matInput
                    placeholder="Description"
                    formControlName="thirdCtrl"
                    required
                  />
                </mat-form-field>
                <div>
                  <button mat-button matStepperPrevious>Back</button>
                  <button mat-button matStepperNext>Next</button>
                </div>
              </form>
            </mat-step>
            <mat-step>
              <ng-template matStepLabel>Done</ng-template>

              <div>
                <button mat-button matStepperPrevious>Back</button>
                <button mat-button (click)="stepper.reset()">Reset</button>
                <button
                  mat-button
                  type="submit"
                  (click)="
                    formtwo.ngSubmit.emit();
                    formthree.ngSubmit.emit();
                    onSubmit();
                    stepper.reset()
                  "
                >
                  Submit
                </button>
              </div>
            </mat-step>
          </mat-vertical-stepper>
        </div>

        <div *ngIf="inventoryItem === 'Link'">
          <mat-vertical-stepper
            [linear]="true"
            #stepper
            [animationDuration]="stepperAnimationValue"
          >
            <mat-step [stepControl]="firstFormGroupC">
              <form
                [formGroup]="firstFormGroupC"
                (ngSubmit)="form1C()"
                #formone="ngForm"
              >
                <ng-template matStepLabel>Enter Device Id</ng-template>
                <mat-form-field>
                  <input
                    matInput
                    type="number"
                    placeholder="Device Id"
                    formControlName="firstCtrl"
                    required
                  />
                </mat-form-field>
                <div>
                  <button mat-button matStepperNext>Next</button>
                </div>
              </form>
            </mat-step>
            <mat-step [stepControl]="secondFormGroupC">
              <form
                [formGroup]="secondFormGroupC"
                (ngSubmit)="form2C()"
                #formtwo="ngForm"
              >
                <ng-template matStepLabel>Enter Employee Id</ng-template>
                <mat-form-field>
                  <input
                    matInput
                    type="number"
                    placeholder="User Id"
                    formControlName="secondCtrl"
                    required
                  />
                </mat-form-field>
                <div>
                  <button mat-button matStepperPrevious>Back</button>
                  <button mat-button matStepperNext>Next</button>
                </div>
              </form>
            </mat-step>
            <!-- <mat-step [stepControl]="thirdFormGroup">
              <form
                [formGroup]="thirdFormGroup"
                (ngSubmit)="form3()"
                #formthree="ngForm"
              >
                <ng-template matStepLabel>Enter Device Description</ng-template>
                <mat-form-field>
                  <input
                    matInput
                    placeholder="Description"
                    formControlName="thirdCtrl"
                    required
                  />
                </mat-form-field>
                <div>
                  <button mat-button matStepperPrevious>Back</button>
                  <button mat-button matStepperNext>Next</button>
                </div>
              </form>
            </mat-step> -->
            <mat-step>
              <ng-template matStepLabel>Done</ng-template>

              <div>
                <button mat-button matStepperPrevious>Back</button>
                <button mat-button (click)="stepper.reset()">Reset</button>
                <button
                  mat-button
                  type="submit"
                  (click)="
                    formone.ngSubmit.emit();
                    formtwo.ngSubmit.emit();
                    onSubmit();
                    stepper.reset()
                  "
                >
                  Submit
                </button>
              </div>
            </mat-step>
          </mat-vertical-stepper>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .edit-container {
        margin: 3em;
        border: 0.1px solid rgba(95, 93, 93, 0.396);
        min-height: 40em;
        padding: 2em;
      }
      .center-span {
        padding-top: 1em;
        text-align: center;
        font-size: 2em;
      }
      mat-radio-button {
        padding-right: 2em;
      }
      .mat-mdc-radio-button.mat-primary {
        --mdc-radio-unselected-icon-color: #7b1fa2;
      }
    `,
  ],
})
export class EditInventoryComponent implements OnInit, OnDestroy {
  constructor(
    private _formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private _snackBar: MatSnackBar,
    private store1: Store<EmployeeTableState>,
    private store2: Store<DeviceTableState>
  ) {}
  inventoryItem: string = 'Employee';
  inventoryCategories: string[] = ['Employee', 'Device', 'Link'];
  stepperAnimationValue = '2000';
  firstFormGroupA!: FormGroup;
  secondFormGroupA!: FormGroup;
  thirdFormGroupA!: FormGroup;
  firstFormGroupB!: FormGroup;
  secondFormGroupB!: FormGroup;
  thirdFormGroupB!: FormGroup;
  firstFormGroupC!: FormGroup;
  secondFormGroupC!: FormGroup;
  thirdFormGroupC!: FormGroup;
  sub: any;

  item1!: number;
  item2!: string;
  item3!: string;

  ngOnInit(): void {
    this.firstFormGroupA = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroupA = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroupA = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    this.firstFormGroupB = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroupB = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroupB = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    this.firstFormGroupC = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroupC = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroupC = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }
  form1A() {
    // console.log(this.firstFormGroup.value);
    this.item1 = parseInt(this.firstFormGroupA.value.firstCtrl);
  }

  form2A() {
    // console.log(this.secondFormGroup.value);
    this.item2 = this.secondFormGroupA.value.secondCtrl;
  }

  form3A() {
    // console.log(this.thirdFormGroup.value);
    this.item3 = this.thirdFormGroupA.value.thirdCtrl;
  }
  form1B() {
    // console.log(this.firstFormGroup.value);
    this.item1 = parseInt(this.firstFormGroupB.value.firstCtrl);
  }

  form2B() {
    // console.log(this.secondFormGroup.value);
    this.item2 = this.secondFormGroupB.value.secondCtrl;
  }

  form3B() {
    // console.log(this.thirdFormGroup.value);
    this.item3 = this.thirdFormGroupB.value.thirdCtrl;
  }
  form1C() {
    // console.log(this.firstFormGroup.value);
    this.item1 = parseInt(this.firstFormGroupC.value.firstCtrl);
  }

  form2C() {
    // console.log(this.secondFormGroup.value);
    this.item2 = this.secondFormGroupC.value.secondCtrl;
  }

  form3C() {
    // console.log(this.thirdFormGroup.value);
    this.item3 = this.thirdFormGroupC.value.thirdCtrl;
  }

  onSubmit() {
    // console.log(this.item1, this.item2, this.item3);
    let data = {};
    if (this.inventoryItem === 'Employee') {
      data = { employeeId: this.item1, name: this.item2, email: this.item3 };
      this.sub = this.inventoryService.postEmployees(data).subscribe((res) => {
        console.log('res', res);
      });
    } else if (this.inventoryItem === 'Device') {
      data = {
        deviceId: this.item1,
        type: this.item2,
        description: this.item3,
      };
      this.sub = this.inventoryService.postDevices(data).subscribe((res) => {
        console.log('res', res);
      });
    } else if (this.inventoryItem === 'Link') {
      let deviceId = this.item1;
      let employeeId = this.item2;
      let newData = {};
      this.sub = this.inventoryService
        .getDeviceDetails(deviceId)
        .pipe(
          map((res: any) => ({
            ...res,
            employeeIdLinked: employeeId,
          })),
          tap((res: any) => console.log('link', res)),
          concatMap((res) =>
            this.inventoryService.patchDeviceDetails(deviceId, res)
          )
        )
        .subscribe((res) => console.log('link2', res));
    }
    this._snackBar.open(this.inventoryItem + ' added!', '', {
      duration: 1500,
    });
    this.store1.dispatch(EmployeeTableActions.toggleLoad());
    this.store2.dispatch(DeviceTableActions.toggleLoad());
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
