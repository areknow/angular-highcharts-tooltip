import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [AppComponent, ChartComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
