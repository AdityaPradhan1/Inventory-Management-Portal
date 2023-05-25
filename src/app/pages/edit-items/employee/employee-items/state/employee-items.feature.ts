import { createFeature, createReducer, on } from '@ngrx/store';
import { EmployeeItemsActions } from './employee-items.action';

/* ============  Model State ================= */
export interface EmployeeItemsState {
  employeeId: number;
  employeeName: string;
  employeeEmail: string;
  isLoaded: boolean;
  error: string;
}

const initialEmployeeItemsState: EmployeeItemsState = {
  employeeId: 0,
  employeeName: '',
  employeeEmail: '',
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
    on(
      EmployeeItemsActions.loadFormSuccess,
      (state, action): EmployeeItemsState => {
        return {
          ...state,
          employeeId: action.formData.id,
          employeeName: action.formData.name,
          employeeEmail: action.formData.email,
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
    )
  ),
});
