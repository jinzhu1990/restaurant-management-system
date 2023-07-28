import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../main.state';

@Component({
  selector: 'anms-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  isAuthenticated$: Observable<boolean> | undefined;

  menus = [
    { link: 'tables', label: 'Tables' },
    { link: 'holiday', label: 'Holiday Service' },
    { link: 'feedback', label: 'Feedback' },
  ];

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
