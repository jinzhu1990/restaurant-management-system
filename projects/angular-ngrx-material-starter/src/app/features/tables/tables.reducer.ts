import { v4 as uuid } from 'uuid';
import { createReducer, on, Action } from '@ngrx/store';
import * as tableAction from './tables.actions';
import { Table, TablesState } from './tables.model';

export const initialState: TablesState = {
  items: [
    { id: uuid(), location: 'Table 1', sit: 4, reserved: true },
    { id: uuid(), location: 'Table 2', sit: 6, reserved: false },
    { id: uuid(), location: 'Table 3', sit: 8, reserved: false },
    { id: uuid(), location: 'Table 4', sit: 4, reserved: true },
    { id: uuid(), location: 'Table 5', sit: 10, reserved: false },
    { id: uuid(), location: 'Table 6', sit: 2, reserved: false },
    { id: uuid(), location: 'Table 7', sit: 4, reserved: false },
    { id: uuid(), location: 'Table 8', sit: 4, reserved: false },
    { id: uuid(), location: 'Table 9', sit: 8, reserved: false },
    { id: uuid(), location: 'Table 10', sit: 10, reserved: true },
    { id: uuid(), location: 'Table 11', sit: 4, reserved: false },
    { id: uuid(), location: 'Table 12', sit: 4, reserved: false },
  ],
  statusFilter: 'ALL',
  sitFilter: 'ALL',
};

const reducer = createReducer(
  initialState,
  on(tableAction.actionTablesFilter, (state, table) => ({
    ...state,
    statusFilter: table.statusFilter,
    sitFilter: table.sitFilter
  })),

  on(tableAction.actionTableReserve, (state, table) => ({
    ...state,
    items: state.items.map((item: Table) =>
      item.id === table.id ? { ...item, reserved: !item.reserved } : item
    )
  })),
);

export function tablesReducer(state: TablesState | undefined, action: Action) {
  return reducer(state, action);
}
