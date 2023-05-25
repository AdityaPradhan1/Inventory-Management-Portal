/* ============  Model  ================= */

import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { DeviceTableActions } from './device-table.action';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface rowData {
  'device Id': number;
  Name: string;
  Email: string;
  'Devices Owned': string;
}

export interface deviceTableData {
  tableData: rowData[];
}

/* ============  Model State ================= */
export interface DeviceTableState {
  tableData: [] | undefined;
  filter: string;
  error: string;
  paginator: any;
  sort: any;
  isLoaded: boolean;
}

const initialdeviceTableState: DeviceTableState = {
  tableData: [],
  filter: '',
  error: '',
  paginator: null,
  sort: null,
  isLoaded: false,
};

/* ============  Feature ================= */
export const DeviceTableFeature = createFeature({
  name: 'deviceTable',
  reducer: createReducer(
    initialdeviceTableState,
    on(
      DeviceTableActions.initialisePaginator,
      (state, action): DeviceTableState => {
        return {
          ...state,
          paginator: action.paginator,
        };
      }
    ),
    on(DeviceTableActions.initialiseSort, (state, action): DeviceTableState => {
      return {
        ...state,
        sort: action.sort,
      };
    }),
    on(DeviceTableActions.filter, (state, action): DeviceTableState => {
      return {
        ...state,
        filter: action.filter,
      };
    }),
    on(
      DeviceTableActions.loadTableSuccess,
      (state, action): DeviceTableState => {
        return {
          ...state,
          tableData: action.tableData,
          isLoaded: true,
          error: '',
        };
      }
    ),
    on(
      DeviceTableActions.loadTableFailure,
      (state, action): DeviceTableState => {
        return {
          ...state,
          tableData: [],
          isLoaded: false,
          filter: '',
          error: action.errors,
        };
      }
    ),
    on(DeviceTableActions.toggleLoad, (state): DeviceTableState => {
      return {
        ...state,
        isLoaded: !state.isLoaded,
      };
    })
  ),
});

export const {
  name,
  reducer,
  selectDeviceTableState,
  selectTableData,
  selectFilter,
  selectError,
  selectPaginator,
  selectSort,
  selectIsLoaded,
} = DeviceTableFeature;

export const selectDataSource = createSelector(
  selectDeviceTableState,
  selectTableData,
  (state, tableData) => {
    let dataSource = new MatTableDataSource(tableData);
    console.log('ds0', dataSource);

    return dataSource;
  }
);
