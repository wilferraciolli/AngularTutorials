import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = this.resolveId(params);
      this.user = null;

      this.userService.users.subscribe(users => {
        if (users.length == 0) {
          return;
        }

        // create a delay to display the spinner
        setTimeout(() => {
          this.user = this.userService.findUserById(id);
        }, 500);
      });
    });
  }

  private resolveId(params: Params) {
    let id = params.id;
    if (!id) {
      id = 1;
    }

    return id;
  }
}
