import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogOut } from '../../../../../store/actions/Account/auth.actions';
import { AppState} from '../../../../../store/app.states';
import { PageDataService } from '../../../../../services/page.data.service';
import { ErrorHandler } from '../../../../../helpers/error-handler';

@Component({
  selector: 'app-create-complete',
  templateUrl: './create-complete.component.html',
  styleUrls: ['./create-complete.component.scss']
})
export class CreateCompleteComponent implements OnInit {

  title: string;
  message: string;
  error: any = {};

  constructor(
    private store: Store<AppState>,
    private pageDataService: PageDataService,
    private errorHandler: ErrorHandler,
  ) {}

  ngOnInit(): void {
    this.accountCreatedMessage();
  }

   // logout user
   logOut(): void {
    this.store.dispatch(new LogOut());
  }

  // successful account creation message
  accountCreatedMessage(){
    this.pageDataService.getAccountCreationMessage().subscribe(response => {
      this.title = response[0].title;
      this.message = response[0].content;
    }, (error) => { this.error = this.errorHandler.errorCallback(error); });
  }

}
