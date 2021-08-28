import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Car } from '../../../models/Car';

import { CarService } from '../../../services/car.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  title = 'Create New Car';
  btnName = 'Create';
  source: string;
  carId: string;
  car: Car = { id: 0 };

  // Form
  newForm: FormGroup = new FormGroup({});
  get f() { return this.newForm.controls; }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private formBuilder: FormBuilder) {
    this.source = this.route.snapshot.paramMap.get('source') || '';            
    this.carId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.initForm();

    if(atob(this.source) == 'edit') {
      this.title = 'Update a Car';
      this.btnName = 'Update'
      this.getCarById();
    }
  }

  getCarById() {
    this.carService.getCarById(this.carId).subscribe(
      data => {
        if(data) {
          this.newForm.patchValue(data);
        }
      }
    );
  }

  initForm() {
    this.newForm = this.formBuilder.group({
      brand: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      model: ['', [Validators.required]],
      maxKms: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cv: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      minTime: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cc: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cylinders: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      kg: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      image: ['', [Validators.required]],
    });
  }

  onSubmit() {
    // Validate the form
    if (this.newForm.invalid) {
      return;
    }
    
    if(atob(this.source) == 'edit') {
      this.updateCar();
    } else {
      this.createNewCar();
    }
  }

  updateCar() {
    this.carService.updateCar(this.carId, this.newForm.value).subscribe(
      data => {
        if(data) {
          swal.fire(
            'Updated!',
            'Your car has been updated.',
            'success'
          );
        } else {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
        }
      }
    );
  }

  createNewCar() {
    this.carService.createNewCar(this.newForm.value).subscribe(
      data => {
        if(data) {
          swal.fire(
            'Created!',
            'Your car has been created.',
            'success'
          );
        } else {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
        }
      }
    );
  }

  onReset() {
    this.newForm.reset();
  }

  onBack() {
    this.router.navigate(['/cars']);
  }
}
