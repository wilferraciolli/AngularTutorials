import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-health-questionnaire',
  templateUrl: './health-questionnaire.component.html',
  styleUrls: ['./health-questionnaire.component.scss']
})
export class HealthQuestionnaireComponent {
  public onSubmit(form: NgForm): void {
    return;
  }

  public onClick(form: NgForm): void {
    const json = JSON.stringify(form.value);

    console.log(json);
  }
}
