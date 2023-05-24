import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <div>
      <mat-toolbar color="primary">
        <mat-toolbar-row>
          <button
            mat-icon-button
            class="icon"
            aria-label="icon-button with menu icon"
          ></button>
          <span>IT INVENTORY DASHBOARD</span>
          <span class="spacer"></span>
          <button
            mat-icon-button
            class="icon user-icon"
            aria-label="icon-button with user icon"
          >
            <mat-icon>account_circle</mat-icon>
          </button>
        </mat-toolbar-row>
        <mat-toolbar-row id="second-row">
          <span>
            <a
              routerLink="../view"
              routerLinkActive="active-link"
              class="navbar-item"
              >View Inventory</a
            >
            <a
              routerLink="../edit"
              routerLinkActive="active-link"
              class="navbar-item"
              >Edit Inventory</a
            >
          </span>
        </mat-toolbar-row>
      </mat-toolbar>
    </div>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
      #second-row {
        background-color: black;
        color: white;
        height: 2em;
      }
      .navbar-item {
        color: white !important;
        margin-left: 50px;
        text-decoration: none;
      }
      .active-link {
        color: #7b1fa2 !important;
      }
    `,
  ],
})
export class ToolbarComponent {}
