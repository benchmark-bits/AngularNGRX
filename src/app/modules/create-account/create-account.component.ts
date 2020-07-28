import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignUp, LogOut } from '../../store/actions/auth.actions';
import { AppState, selectAuthState } from '../../store/app.states';
import { Observable } from 'rxjs';
import { ValidationMessageService } from '../../services/validation.message.service';
import { PageDataService } from '../../services/page.data.service';
import { ErrorHandler } from '../../helper/error-handler';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html'

})
export class CreateAccountComponent implements OnInit {

  termsOfServicesModal: boolean;
  privacyPolicyModal: boolean;
  termsOfServicesTitle: string;
  privacyPolicyTitle: string;
  termsOfServices: string;
  privacyPolicy: string;

  // alert message
  error: any = {};

  registerForm: FormGroup;
  validationMessage: object;
  hidePassword: boolean;
  hideConfirmPassword: boolean;
  user = null;
  getState: Observable<any>;
  isAuthenticated: false;

  constructor(
    private fb: FormBuilder,
    private validationMessageService: ValidationMessageService,
    private pageDataService: PageDataService,
    private store: Store<AppState>,
    private errorHandler: ErrorHandler,
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.createForm();
    this.getStoreState();
    this.error= {};
  }

  // create account form
  createForm() {
    this.hidePassword = true;
    this.hideConfirmPassword = true;
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{1,}')]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]+$')]],
        confirmPassword: ['', Validators.required],
      }, { validator: this.comparePassword }
    );
    this.getValidationMessage();
  }

  // compare password and confirm password
  comparePassword(group: FormGroup) {
    const pass = group.controls.password;
    const confirmPass = group.controls.confirmPassword;
    if ((pass.valid && confirmPass.valid) && (pass.value !== confirmPass.value)) {
      return { passwordNotSame: true };
    } else {
      return null;
    }
  }

  // get validation messages
  getValidationMessage() {
    this.validationMessageService.signupValidationMessage().subscribe(response => {
      this.validationMessage = response[0].messages;
    }, (error) => {
      this.error = this.errorHandler.errorCallback(error);
     });
  }

  // create account form submit
  submit() {
    if (this.registerForm.status === 'VALID') {
      const payload = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      try {
        this.error= {};
        this.store.dispatch(new SignUp(payload));
      } catch (error) { this.error = this.errorHandler.errorCallback(error) }
    } else {
      this.markControlsAsTouched(this.registerForm);
    }

  }

  // get store state
  getStoreState() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.error.message = state.errorMessage;
      if (this.user === null) {
        this.error.type = 'danger';
      }
      if (this.isAuthenticated) {
        this.registerForm.reset();
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

  // logout user
  logOut(): void {
    this.store.dispatch(new LogOut());
  }

  // on click open & close function for terms of services modal window
  openTermsOfServicesModal() {
    this.pageDataService.getServiceTerms().subscribe(response => {
      this.termsOfServicesTitle = response[0].title;
      this.termsOfServices = response[0].content;
      this.termsOfServicesModal = true;
    }, (error) => { this.error = this.errorHandler.errorCallback(error) });
  }

  closeTermsOfServicesModal() {
    this.termsOfServicesModal = false;
  }

  // on click open & close function for privacy policy modal window
  openPrivacyPolicyModal() {
    this.pageDataService.getPrivacyPolicy().subscribe(response => {
      this.privacyPolicyTitle = response[0].title;
      this.privacyPolicy = response[0].content;
      this.privacyPolicyModal = true;
    }, (error) => { this.error = this.errorHandler.errorCallback(error) });
  }

  closePrivacyPolicyModal() {
    this.privacyPolicyModal = false;
  }

}
