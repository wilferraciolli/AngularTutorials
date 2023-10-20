import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Order } from './order';

// TODO: Replace this with your own data model type

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Order[] = [
  { id: 242, date: '2020-06-01', name: 'Jennifer Smith', status: 'pending', orderTotal: 18, paymentMode: 'cash' },
  { id: 898, date: '2020-06-02', name: 'Jane Jones', status: 'shipped', orderTotal: 283, paymentMode: 'paypal' },
  { id: 283, date: '2020-06-03', name: 'Martha Clark', status: 'delivered', orderTotal: 493, paymentMode: 'card' },
  { id: 657, date: '2020-06-04', name: 'Wes Bean', status: 'pending', orderTotal: 32, paymentMode: 'apple pay' },
  { id: 209, date: '2020-06-05', name: 'James Long', status: 'shipped', orderTotal: 34, paymentMode: 'google pay' },
  { id: 178, date: '2020-06-06', name: 'Arthur Black', status: 'delivered', orderTotal: 67, paymentMode: 'store credit' },
  { id: 934, date: '2020-06-07', name: 'Paul White', status: 'pending', orderTotal: 34, paymentMode: 'cash' },
  { id: 298, date: '2020-06-08', name: 'Alexander Pole', status: 'shipped', orderTotal: 209, paymentMode: 'paypal' },
  { id: 382, date: '2020-06-09', name: 'Florence Machine', status: 'delivered', orderTotal: 237, paymentMode: 'card' },
  { id: 986, date: '2020-06-10', name: 'Multi Love', status: 'pending', orderTotal: 1067, paymentMode: 'apple pay' },
  { id: 493, date: '2020-06-11', name: 'Disco Lace', status: 'shipped', orderTotal: 853, paymentMode: 'google pay' },
  { id: 902, date: '2020-06-12', name: 'Linda Paul', status: 'delivered', orderTotal: 21, paymentMode: 'store credit' },
  { id: 201, date: '2020-06-13', name: 'Caramel Brown', status: 'pending', orderTotal: 56, paymentMode: 'cash' },
  { id: 893, date: '2020-06-14', name: 'Candy Sweet', status: 'shipped', orderTotal: 90, paymentMode: 'paypal' },
  { id: 398, date: '2020-06-15', name: 'Phillis Way', status: 'delivered', orderTotal: 87, paymentMode: 'card' },
  { id: 467, date: '2020-06-16', name: 'Sandra Dark', status: 'pending', orderTotal: 56, paymentMode: 'apple pay' },
  { id: 674, date: '2020-06-17', name: 'Nicole Zamata', status: 'shipped', orderTotal: 238, paymentMode: 'google pay' },
  { id: 902, date: '2020-06-18', name: 'Sasheer Byer', status: 'delivered', orderTotal: 384, paymentMode: 'store credit' },
  { id: 984, date: '2020-06-19', name: 'Paula Patel', status: 'shipped', orderTotal: 892, paymentMode: 'cash' },
  { id: 284, date: '2020-06-20', name: 'Carla Sanchex', status: 'pending', orderTotal: 382, paymentMode: 'card' }
];

/**
 * Data source for the OrdersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class OrdersTableDataSource extends DataSource<Order> {
  data: Order[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Order[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // @ts-ignore
    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Order[]): Order[] {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Order[]): Order[] {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
