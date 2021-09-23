import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HighlightJsModule } from 'ngx-highlight-js';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HighlightJsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
