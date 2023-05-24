import { Component } from '@angular/core';
@Component({
  selector: 'app-view-inventory',
  template: `'
    <div class="center-span">Inventory Database</div>
    <div class="view-container">
      <mat-tab-group>
        <mat-tab label="Employees">
          <app-employee-table></app-employee-table>
        </mat-tab>
        <mat-tab label="Devices">
          <app-device-table></app-device-table>
        </mat-tab>
      </mat-tab-group>
    </div> `,
  styles: [
    `
      .view-container {
        margin: 3em;
        border: 0.1px solid rgba(95, 93, 93, 0.396);
        min-height: 40em;
        padding: 2em;
      }

      mat-tab-group {
        --mat-tab-header-inactive-label-text-color: rgba(0, 0, 0, 0.6);
        --mat-tab-header-inactive-hover-label-text-color: rgba(0, 0, 0, 0.6);
      }
      .center-span {
        padding-top: 1em;
        text-align: center;
        font-size: 2em;
      }
    `,
  ],
})
export class ViewInventoryComponent {}
