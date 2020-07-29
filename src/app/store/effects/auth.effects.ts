import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  SignUp, SignUpSuccess, SignUpFailure
} from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';
// import { map } from 'rxjs-compat/operator/map';
import { User } from '../../models/user.model';
@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) { }

  // added effects for login (call to login service if success call login success action  if failure call action login failure)
  // @Effect()
  // LogIn: Observable<any> = this.actions
  // .ofType(AuthActionTypes.LOGIN)
  // .map((action: LogIn) => action.payload)
  // .switchMap(payload => {
  //   return this.authService.logIn(payload.email, payload.password)
  //     .map((user) => {
  //       return new LogInSuccess({token: user.accessToken, email: payload.email});
  //     })
  //     .catch((error) => {
  //       return Observable.of(new LogInFailure({ error }));
  //     });
  // });
  @Effect()
  LogIn: Observable<any> = this.actions
    .pipe(ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        return this.authService.logIn(payload.email, payload.password)
          .pipe(map((user) => {
            console.log(user);
            return new LogInSuccess({ token: user.token, email: payload.email });
          }),
            catchError((error) => {
              console.log(error);
              return of(new LogInFailure({ error: error }));
            })
          );
      }));


  // added effects for login success here access token has been set in localstorage and it will redirect to setup profile page
  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('accessToken', user.payload.token);
      this.router.navigate(['/setup-profile']);
    })
  );

  // added effect for login failure
  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
  );

  // @Effect()
  // SignUp: Observable<any> = this.actions.pipe(
  //   ofType(AuthActionTypes.SIGNUP))
  //   .map((action: SignUp) => action.payload)
  //   .switchMap(payload => {
  //     return this.authService.signUp(payload.email, payload.password)
  //       .map((user) => {
  //         return new SignUpSuccess({ token: user.accessToken, email: payload.email });
  //       })
  //       .catch((error) => {
  //         return Observable.of(new SignUpFailure({ error }));
  //       });
  //   });

@Effect()
  SignUp: Observable<any> = this.actions.pipe(
    
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload.email, payload.password)
        .pipe(
          map((user) => {
          return new SignUpSuccess({ token: user.accessToken, email: payload.email });
        }),
        catchError((error) => {
          return Observable.of(new SignUpFailure({ error }));
        })
        )
    })
  );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      localStorage.setItem('accessToken', user.payload.token);
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE),
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('accessToken');
      this.router.navigate(['/login']);
    })
  );
}
