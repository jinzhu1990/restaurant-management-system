import { selectSitFilter, selectStatusFilter } from './../tables.selectors';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';

import {
  ROUTE_ANIMATIONS_ELEMENTS,
  NotificationService
} from '../../../core/core.module';

import * as tableActions from '../tables.actions';
import { Table, StatusFilter, SitFilter } from '../tables.model';
import { selectTables, selectRemoveDoneTablesDisabled } from '../tables.selectors';
import { State } from '../../main/main.state';

@Component({
  selector: 'anms-tables',
  templateUrl: './tables-container.component.html',
  styleUrls: ['./tables-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  tables$: Observable<Table[]> | undefined;
  statusFilter$: Observable<StatusFilter> | undefined;
  sitFilter$: Observable<SitFilter> | undefined;
  removeDoneDisabled$: Observable<boolean> = observableOf(false);
  newTable = '';
  statusFilter: StatusFilter = 'ALL';
  sitFilter: SitFilter = 'ALL';
  sits: SitFilter[] = ['ALL', '2', '4', '6', '8', '10']

  constructor(
    public store: Store<State>,
    public snackBar: MatSnackBar,
    public translateService: TranslateService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.tables$ = this.store.pipe(select(selectTables));
    this.statusFilter$ = this.store.pipe(select(selectStatusFilter));
    this.sitFilter$ = this.store.pipe(select(selectSitFilter));
    this.removeDoneDisabled$ = this.store.pipe(
      select(selectRemoveDoneTablesDisabled)
    );
  }

  onAddTable() {
    this.store.dispatch(tableActions.actionTablesAdd(this.newTable));
    const addedMessage = this.translateService.instant(
      'anms.examples.tables.added.notification',
      { name: this.newTable }
    );
    this.notificationService.info(addedMessage);
    this.newTable = '';
  }

  onReserve(id: string) {
    this.store.dispatch(tableActions.actionTableReserve({ id }));
  }

  onFilterTables(statusFilter: StatusFilter) {
    this.statusFilter = statusFilter;
    this.filter();
  }

  onFilterSit(sitFilter: SitFilter) {
    this.sitFilter = sitFilter;
    this.filter();
  }

  filter() {
    this.store.dispatch(tableActions.actionTablesFilter({ statusFilter: this.statusFilter, sitFilter: this.sitFilter }));
    this.notificationService.info("Filtered");
  }
}
