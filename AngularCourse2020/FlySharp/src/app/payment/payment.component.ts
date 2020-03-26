import {Component, OnInit, Input} from '@angular/core';
import {Flight} from '../model/flight';
import {Payment} from '../model/payment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  private _selectedFlight: Flight;
  model: Payment = new Payment();
  payForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildSampleModel();
  }

  get selectedFlight(): Flight {
    return this._selectedFlight;
  }

  @Input()
  set selectedFlight(value: Flight) {
    this._selectedFlight = value;
  }

  onSubmit(): void {

    alert(JSON.stringify(this.preparePaymentForSave()));
  }


  ngOnInit() {
    this.buildForm();
    this.payForm.setValue(this.model);
  }

  get jsonModel() {
    return JSON.stringify(this.model);
  }

  buildForm() {
    this.payForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      cardNum: ['', Validators.required],
      cardType: ['', Validators.required],
      expDate: ['', Validators.required],
    });
  }

  private preparePaymentForSave(): Payment {
    const formData = this.payForm.value;

    const payment: Payment = {
      name: formData.name,
      address: formData.address,
      email: formData.email,
      cardNum: formData.cardNum,
      cardType: formData.cardType,
      expDate: formData.expDate
    };

    return payment;
  }

  private buildSampleModel() {

    this.model.name = 'A Customer';
    this.model.address = 'Customer Address';
    this.model.email = 'a.customer@ltree.com';
    this.model.cardNum = '1234123412341234';
    this.model.cardType = 'VISA';
    this.model.expDate = new Date();
  }

}
