import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const DeviceItemsActions = createActionGroup({
  source: 'Device Items',
  events: {
    'Toggle Load': emptyProps(),
    'Set Id': props<{ id: number }>(),
    'Load Form': props<{ id: any }>(),
    'Load Form Success': props<{ formData: any }>(),
    'Load Form Failure': props<{ errors: string }>(),
    'Submit Form': props<{ deviceId: any; formData: any }>(),
    'Submit Form Success': props<{ response: any }>(),
    'Submit Form Failure': props<{ errors: string }>(),
    'Submit Device Change Form': props<{ employeeId: any; deviceId: any }>(),
    'Submit Device Change Form Success': props<{ response: any }>(),
    'Submit Device Change Form Failure': props<{ errors: string }>(),
  },
});
