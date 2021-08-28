import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CarsComponent } from './components/cars/cars.component';

import { AngularMaterialModule } from './components/shared/angular-material.module';
import { SpinnerComponent } from './components/shared/spinner.component';

import { CarService } from './services/car.service';
import { CarComponent } from './components/cars/car/car.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    SpinnerComponent,
    CarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    CarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
