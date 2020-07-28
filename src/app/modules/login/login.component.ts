import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { LogIn } from '../../store/actions/auth.actions';
import { ValidationMessageService } from '../../services/validation.message.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ErrorHandler } from '../../helpers/error-handler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  validationMessage: object;
  getState: Observable<any>;
  // alert message
  error: any = {};
  hidePassword: boolean;
  isAuthenticated: false;
  user: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private validationMessageService: ValidationMessageService,
    private router: Router,
    private errorHandler: ErrorHandler,
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.createLoginForm();
    this.getStoreState();
    this.error = {};
  }
  // create Login Form
  createLoginForm() {
    this.hidePassword = true;
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{1,}')]],
        password: ['', [Validators.required]],
      }
    );
    this.getValidationMessage();
  }

  // get validation messages
  getValidationMessage() {
    this.validationMessageService.loginValidationMessage().subscribe(response => {
      this.validationMessage = response[0].messages;
    }, (error) => { this.error = this.errorHandler.errorCallback(error); });
  }

  getStoreState() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      if (!this.isAuthenticated) {
        this.error.type = 'danger';
      }
      if (this.isAuthenticated) {
        this.loginForm.reset();
      }
    });
  }

  // Mark controls of form as touched.
  markControlsAsTouched(formRef: FormGroup) {
    for (const property in formRef.controls) {
      if (property) {
        formRef.controls[property].markAsTouched();
      }
    }
    window.scroll(0, 0);
  }

  // submit login form
  onSubmit(): void {
    if (this.loginForm.status === 'VALID') {
      const payload = {
        email: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      try {
        this.error = {};
        this.store.dispatch(new LogIn(payload));
      } catch (error) { this.error = this.errorHandler.errorCallback(error); console.log(this.error)}
    }
    else {
      this.markControlsAsTouched(this.loginForm);
    }
  }
}
