import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Car } from '../models/Car';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(environment.URL_API + `/`);
  }

  deleteCar(carId: number): Observable<number> {
    return this.http.delete<number>(environment.URL_API + `/${carId}`);
  }

  getCarById(carId: string): Observable<Car> {
    return this.http.get<Car>(environment.URL_API + `/${atob(carId)}`);
  }

  createNewCar(car: any): Observable<number> {
    return this.http.post<number>(environment.URL_API + `/`, car, httpOptions);
  }

  updateCar(carId: string, car: any): Observable<number> {
    return this.http.put<number>(environment.URL_API + `/${atob(carId)}`, car, httpOptions);
  }
}
