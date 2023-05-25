import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const EmployeeItemsActions = createActionGroup({
  source: 'Employee Items',
  events: {
    'Toggle Load': emptyProps(),
    'Load Form': emptyProps(),
    'Load Form Success': props<{ formData: any }>(),
    'Load Form Failure': props<{ errors: string }>(),
  },
});
