import { v4 as uuid } from 'uuid';
import { createAction, props } from '@ngrx/store';

import { SitFilter, StatusFilter } from './tables.model';

export const actionTablesAdd = createAction(
  '[Tables] Add',
  (name: string, id: string = uuid()) => ({ name, id })
);

export const actionTablesToggle = createAction(
  '[Tables] Toggle',
  props<{ id: string }>()
);

export const actionTablesRemoveDone = createAction('[Tables] Remove Done');

export const actionTablesFilter = createAction(
  '[Tables] Filter',
  props<{ statusFilter: StatusFilter, sitFilter: SitFilter }>()
);

export const actionTableReserve = createAction(
  '[Tables] Reserve',
  props<{ id: string }>()
);