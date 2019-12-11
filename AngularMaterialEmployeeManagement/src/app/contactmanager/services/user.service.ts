import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserService {

  // Create immutable users
  private behaviorUsers: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[];
  }

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this.behaviorUsers = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    return this.behaviorUsers.asObservable();
  }

  loadAll() {
    // const usersUrl = 'https://angular-material-api.azurewebsites.net/users';
    const usersUrl = 'assets/users.json';

    return this.http.get<User[]>(usersUrl)
      .subscribe(
        data => {
          this.dataStore.users = data;

          // broadcast changes to subscribers, by creating a new copy of behaviour subject
          this.behaviorUsers.next(Object.assign({}, this.dataStore).users);
        },
        error => {
          console.error('Failed to fetch users');
        });
  }

}
