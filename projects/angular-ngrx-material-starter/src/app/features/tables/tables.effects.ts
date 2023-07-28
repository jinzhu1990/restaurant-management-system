import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '../../core/core.module';

import { State } from '../main/main.state';
import * as tableAction from './tables.actions';
import { selectTablesState } from './tables.selectors';

export const TABLES_KEY = 'EXAMPLES.TABLES';

@Injectable()
export class TablesEffects {
  persistTables = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          tableAction.actionTablesAdd,
          tableAction.actionTablesFilter,
          tableAction.actionTablesRemoveDone,
          tableAction.actionTablesToggle,
          tableAction.actionTableReserve
        ),
        withLatestFrom(this.store.pipe(select(selectTablesState))),
        tap(([action, tables]) =>
          this.localStorageService.setItem(TABLES_KEY, tables)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private localStorageService: LocalStorageService
  ) { }
}
