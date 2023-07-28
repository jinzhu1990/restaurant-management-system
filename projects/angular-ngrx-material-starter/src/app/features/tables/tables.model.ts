export interface Table {
  id: string;
  location: string;
  sit: number,
  reserved: boolean;
}

export type StatusFilter = 'ALL' | 'RESERVED' | 'EMPTY';
export type SitFilter = 'ALL' | '2' | '4' | '6' | '8' | '10';

export interface TablesState {
  items: Table[];
  statusFilter: StatusFilter;
  sitFilter: SitFilter;
}
