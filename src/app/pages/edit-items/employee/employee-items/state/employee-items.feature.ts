import { createFeature, createReducer, on } from '@ngrx/store';
import { EmployeeItemsActions } from './employee-items.action';
import { Action } from 'rxjs/internal/scheduler/Action';

/* ============  Model State ================= */
export interface EmployeeItemsState {
  employeeId: number;
  employeeName: string;
  employeeEmail: string;
  formData: {};
  response: string;
  isLoaded: boolean;
  error: string;
}

const initialEmployeeItemsState: EmployeeItemsState = {
  employeeId: 0,
  employeeName: '',
  employeeEmail: '',
  formData: {},
  response: '',
  isLoaded: false,
  error: '',
};

/* ============  Feature ================= */
export const EmployeeItemsFeature = createFeature({
  name: 'EmployeeItems',
  reducer: createReducer(
    initialEmployeeItemsState,
    on(EmployeeItemsActions.toggleLoad, (state): EmployeeItemsState => {
      return {
        ...state,
        isLoaded: !state.isLoaded,
      };
    }),
    on(EmployeeItemsActions.setId, (state, action): EmployeeItemsState => {
      return {
        ...state,
        employeeId: action.id,
      };
    }),
    on(
      EmployeeItemsActions.loadFormSuccess,
      (state, action): EmployeeItemsState => {
        return {
          ...state,
          employeeId: action.formData.id,
          employeeName: action.formData.name,
          employeeEmail: action.formData.email,
          formData: action.formData,
          isLoaded: true,
          error: '',
        };
      }
    ),
    on(
      EmployeeItemsActions.loadFormFailure,
      (state, action): EmployeeItemsState => {
        return {
          ...state,
          employeeId: 0,
          employeeName: '',
          employeeEmail: '',
          isLoaded: false,
          error: action.errors,
        };
      }
    ),
    on(
      EmployeeItemsActions.submitFormSuccess,
      (state, action): EmployeeItemsState => {
        return {
          ...state,
          response: action.response,
          error: '',
        };
      }
    ),
    on(
      EmployeeItemsActions.submitFormFailure,
      (state, action): EmployeeItemsState => {
        return {
          ...state,
          response: '',
          error: action.errors,
        };
      }
    ),
    on(
      EmployeeItemsActions.submitDeviceChangeFormSuccess,
      (state, action): EmployeeItemsState => {
        return {
          ...state,
          response: action.response,
          error: '',
        };
      }
    ),
    on(
      EmployeeItemsActions.submitDeviceChangeFormFailure,
      (state, action): EmployeeItemsState => {
        return {
          ...state,
          response: '',
          error: action.errors,
        };
      }
    )
  ),
});

export const {
  name,
  reducer,
  selectEmployeeItemsState,
  selectEmployeeId,
  selectEmployeeName,
  selectEmployeeEmail,
  selectError,
  selectIsLoaded,
  selectFormData,
} = EmployeeItemsFeature;
