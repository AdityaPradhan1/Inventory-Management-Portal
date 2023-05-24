import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewInventoryComponent } from './pages/view-inventory/view-inventory.component';
import { EditInventoryComponent } from './pages/edit-inventory/edit-inventory.component';
import { DeviceItemsComponent } from './pages/edit-items/device/device-items/device-items.component';
import { EmployeeItemsComponent } from './pages/edit-items/employee/employee-items/employee-items.component';

const routes: Routes = [
  {
    path: 'view',
    component: ViewInventoryComponent,
  },
  {
    path: '',
    redirectTo: '/view',
    pathMatch: 'full',
  },
  {
    path: 'edit',
    component: EditInventoryComponent,
  },
  {
    path: 'items/employee/:id',
    component: EmployeeItemsComponent,
  },
  {
    path: 'items/device/:id',
    component: DeviceItemsComponent,
  },
  // {
  //   path: '**',
  //   component: ViewInventoryComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
