import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.formLogin = this.formBuilder.group({
        nombre: ["", [
            Validators.required,
        ]],
        contraseña: ["", [
            Validators.required,
        ]],
    });
  }

  iniciarSesion() {
    console.log(this.formLogin.value);
    const user = {
      "username": this.formLogin.value.nombre,
      "password": this.formLogin.value.contraseña
    };
    this.loginService.login(user).subscribe( (data:any) => {
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        this.router.navigate(['home']);
      }, 1000);
    });
  }

}
