import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: FormGroup;
  roles: FormArray;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: 'Wiliam',
      email: 'wil@wil.com',
      roles: this.formBuilder.array([ this.createItem() ])
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      roleId: 'ROLE_ADMIN',
      name: 'Admin'
    });
  }

  addRole(): void {
    this.roles = this.form.get('roles') as FormArray;
    this.roles.push(this.createItem());
  }

  login() {
    console.log(this.form.value);
  }
}
