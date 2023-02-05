import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: "", component: BienvenidaComponent },
  { path: "bienvenida", component: BienvenidaComponent, },
  { path: "registro", component: RegisterComponent, },
  { path: "home", component: HomeComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
