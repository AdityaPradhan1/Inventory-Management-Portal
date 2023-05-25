import { createFeature, createReducer, on } from '@ngrx/store';
import { DeviceItemsActions } from './device-items.action';
import { Action } from 'rxjs/internal/scheduler/Action';

/* ============  Model State ================= */
export interface DeviceItemsState {
  deviceId: number;
  deviceName: string;
  deviceEmail: string;
  formData: {};
  response: string;
  isLoaded: boolean;
  error: string;
}

const initialDeviceItemsState: DeviceItemsState = {
  deviceId: 0,
  deviceName: '',
  deviceEmail: '',
  formData: {},
  response: '',
  isLoaded: false,
  error: '',
};

/* ============  Feature ================= */
export const DeviceItemsFeature = createFeature({
  name: 'DeviceItems',
  reducer: createReducer(
    initialDeviceItemsState,
    on(DeviceItemsActions.toggleLoad, (state): DeviceItemsState => {
      return {
        ...state,
        isLoaded: !state.isLoaded,
      };
    }),
    on(DeviceItemsActions.setId, (state, action): DeviceItemsState => {
      return {
        ...state,
        deviceId: action.id,
      };
    }),
    on(
      DeviceItemsActions.loadFormSuccess,
      (state, action): DeviceItemsState => {
        return {
          ...state,
          deviceId: action.formData.id,
          deviceName: action.formData.name,
          deviceEmail: action.formData.email,
          formData: action.formData,
          isLoaded: true,
          error: '',
        };
      }
    ),
    on(
      DeviceItemsActions.loadFormFailure,
      (state, action): DeviceItemsState => {
        return {
          ...state,
          deviceId: 0,
          deviceName: '',
          deviceEmail: '',
          isLoaded: false,
          error: action.errors,
        };
      }
    ),
    on(
      DeviceItemsActions.submitFormSuccess,
      (state, action): DeviceItemsState => {
        return {
          ...state,
          response: action.response,
          error: '',
        };
      }
    ),
    on(
      DeviceItemsActions.submitFormFailure,
      (state, action): DeviceItemsState => {
        return {
          ...state,
          response: '',
          error: action.errors,
        };
      }
    ),
    on(
      DeviceItemsActions.submitDeviceChangeFormSuccess,
      (state, action): DeviceItemsState => {
        return {
          ...state,
          response: action.response,
          error: '',
        };
      }
    ),
    on(
      DeviceItemsActions.submitDeviceChangeFormFailure,
      (state, action): DeviceItemsState => {
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
  selectDeviceItemsState,
  selectDeviceId,
  selectDeviceName,
  selectDeviceEmail,
  selectError,
  selectIsLoaded,
  selectFormData,
} = DeviceItemsFeature;
