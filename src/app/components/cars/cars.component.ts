import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Car } from '../../models/Car';

import { CarService } from '../../services/car.service';

import { environment } from '../../../environments/environment';

import swal from 'sweetalert2';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  carList: Car[] = [];

  constructor(private carService: CarService,
              private router: Router) {}

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe(
      data => {
        this.carList = [];
        if(data) {
          data.forEach(car => {
            car.image = environment.pathImages + car.image;
            this.carList.push(car);
          });
        }
      }
    );
  }

  onCreate() {
    this.router.navigate(['/cars/' + btoa('new') + '/' + btoa('0')]);
  }

  onEdit(car: Car) {
    this.router.navigate(['/cars/' + btoa('edit') + '/' + btoa(car.id.toString())]);
  }

  onDelete(car: Car) {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carService.deleteCar(car.id).subscribe(
          data => {
            if(data) {
              swal.fire(
                'Deleted!',
                'Your car has been deleted.',
                'success'
              );
            } else {
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              });
            }
            this.getCars();
          }
        );
      }
    })
  }

}
