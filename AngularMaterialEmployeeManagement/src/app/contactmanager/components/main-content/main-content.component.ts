import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
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
      const id = params.id;

      this.userService.users.subscribe(users => {
        if (users.length == 0) {
          return;
        }

        this.user = this.userService.findUserById(id);
      });
      this.user = this.userService.findUserById(id);
    });
  }

}
