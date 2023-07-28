import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../../core/core.module';

import { tablesReducer } from '../tables/tables.reducer';
import { TablesState } from '../tables/tables.model';

export const FEATURE_NAME = 'main';
export const selectMain = createFeatureSelector<State, MainState>(
  FEATURE_NAME
);
export const reducers: ActionReducerMap<MainState> = {
  tables: tablesReducer,
};

export interface MainState {
  tables: TablesState;
}

export interface State extends AppState {
  main: MainState;
}
