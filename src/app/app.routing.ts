import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarComponent } from './components/cars/car/car.component';
import { CarsComponent } from './components/cars/cars.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/cars',
      pathMatch: 'full'
    },
    {
      path: 'cars',
      component: CarsComponent,
    },
    {
      path: 'cars/:source/:id',
      component: CarComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
