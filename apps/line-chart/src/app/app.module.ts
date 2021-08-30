import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { PriceRealtimeChart } from './price-realtime-chart/price-realtime-chart.component'

@NgModule({
	declarations: [ AppComponent, PriceRealtimeChart ],
	imports: [ BrowserModule, BrowserAnimationsModule, FormsModule, NgxSelectModule, NgxChartsModule ],
	providers: [],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
