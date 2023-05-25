import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const DeviceTableActions = createActionGroup({
  source: 'Device Table',
  events: {
    'Initialise Paginator': props<{ paginator: any }>(),
    'Toggle Load': emptyProps(),
    'Initialise Sort': props<{ sort: any }>(),
    filter: props<{ filter: string }>(),
    'Load Table': emptyProps(),
    'Load Table Success': props<{ tableData: any }>(),
    'Load Table Failure': props<{ errors: string }>(),
  },
});
