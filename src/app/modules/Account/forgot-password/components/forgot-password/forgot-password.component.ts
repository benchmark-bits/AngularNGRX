import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  sentMesaage = false;
  forgotPasswordForm = true;

  constructor() { }

  ngOnInit(): void {
  }

  sentEmailMessage() {
    this.sentMesaage = true;
    this.forgotPasswordForm = false;
  }

}
