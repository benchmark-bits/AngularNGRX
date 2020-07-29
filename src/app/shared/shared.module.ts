import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { MessageComponent } from './components/message/message.component';
import { ModalComponent } from './components/modal/message.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    MessageComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessageComponent,
    ModalComponent
  ],
  providers: [
  ],
})
export class SharedModule { }
