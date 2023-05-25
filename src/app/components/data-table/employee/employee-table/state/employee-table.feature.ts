/* ============  Model  ================= */

import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { EmployeeTableActions } from './employee-table.action';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface rowData {
  'Employee Id': number;
  Name: string;
  Email: string;
  'Devices Owned': string;
}

export interface employeeTableData {
  tableData: rowData[];
}

/* ============  Model State ================= */
export interface EmployeeTableState {
  tableData: [] | undefined;
  filter: string;
  error: string;
  paginator: any;
  sort: any;
  isLoaded: boolean;
}

const initialEmployeeTableState: EmployeeTableState = {
  tableData: [],
  filter: '',
  error: '',
  paginator: null,
  sort: null,
  isLoaded: false,
};

/* ============  Feature ================= */
export const EmployeeTableFeature = createFeature({
  name: 'EmployeeTable',
  reducer: createReducer(
    initialEmployeeTableState,
    on(
      EmployeeTableActions.initialisePaginator,
      (state, action): EmployeeTableState => {
        return {
          ...state,
          paginator: action.paginator,
        };
      }
    ),
    on(
      EmployeeTableActions.initialiseSort,
      (state, action): EmployeeTableState => {
        return {
          ...state,
          sort: action.sort,
        };
      }
    ),
    on(EmployeeTableActions.filter, (state, action): EmployeeTableState => {
      return {
        ...state,
        filter: action.filter,
      };
    }),
    on(
      EmployeeTableActions.loadTableSuccess,
      (state, action): EmployeeTableState => {
        return {
          ...state,
          tableData: action.tableData,
          isLoaded: true,
          error: '',
        };
      }
    ),
    on(
      EmployeeTableActions.loadTableFailure,
      (state, action): EmployeeTableState => {
        return {
          ...state,
          tableData: [],
          filter: '',
          isLoaded: false,
          error: action.errors,
        };
      }
    ),
    on(EmployeeTableActions.toggleLoad, (state): EmployeeTableState => {
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
  selectEmployeeTableState,
  selectTableData,
  selectFilter,
  selectError,
  selectPaginator,
  selectSort,
  selectIsLoaded,
} = EmployeeTableFeature;

export const selectDataSource = createSelector(
  selectEmployeeTableState,
  selectTableData,
  (state, tableData) => {
    let dataSource = new MatTableDataSource(tableData);
    console.log('ds0', dataSource);

    return dataSource;
  }
);
