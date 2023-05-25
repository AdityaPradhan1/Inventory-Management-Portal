import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { employeeTableData } from './employee-table.feature';

export const EmployeeTableActions = createActionGroup({
  source: 'Employee Table',
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
