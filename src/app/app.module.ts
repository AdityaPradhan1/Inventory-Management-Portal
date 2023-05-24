import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatTableModule } from '@angular/material/table';
import { ViewInventoryComponent } from './pages/view-inventory/view-inventory.component';
import { EditInventoryComponent } from './pages/edit-inventory/edit-inventory.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeTableComponent } from './components/data-table/employee/employee-table/employee-table.component';
import { DeviceTableComponent } from './components/data-table/device/device-table/device-table.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DeviceItemsComponent } from './pages/edit-items/device/device-items/device-items.component';
import { EmployeeItemsComponent } from './pages/edit-items/employee/employee-items/employee-items.component';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ViewInventoryComponent,
    EditInventoryComponent,
    EmployeeTableComponent,
    DeviceTableComponent,
    DeviceItemsComponent,
    EmployeeItemsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    AppRoutingModule,
    HttpClientModule,
    MatSortModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
