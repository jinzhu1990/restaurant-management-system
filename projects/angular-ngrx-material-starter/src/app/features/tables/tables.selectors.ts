import { createSelector } from '@ngrx/store';

import { MainState, selectMain } from '../main/main.state';
import { Table } from './tables.model';

export const selectTablesState = createSelector(
  selectMain,
  (state: MainState) => state.tables
);

export const selectTablesItems = createSelector(
  selectTablesState,
  (state) => state.items
);

export const selectStatusFilter = createSelector(
  selectTablesState,
  (state) => state.statusFilter
);

export const selectSitFilter = createSelector(
  selectTablesState,
  (state) => state.sitFilter
);

export const selectTables = createSelector(
  selectTablesItems,
  selectStatusFilter,
  selectSitFilter,
  (items, statusFilter, sitFilter) => {
    let result = items;
    if (statusFilter !== 'ALL') {
      const predicate =
        statusFilter === 'RESERVED' ? (t: Table) => t.reserved : (t: Table) => !t.reserved;
      result = result.filter(predicate);
    }

    if (sitFilter !== 'ALL') {
      result = result.filter(item => item.sit === Number(sitFilter));
    }

    return result;
  }
);

export const selectRemoveDoneTablesDisabled = createSelector(
  selectTablesItems,
  (items) => !items.some((item) => item.reserved)
);
