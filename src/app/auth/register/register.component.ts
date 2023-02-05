import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegistroService } from 'src/app/services/registro/registro.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  formregistro!: FormGroup;

  constructor(private location: Location,
              private registroService: RegistroService,
              // private messageService: MessageService, 
              // private confirmationService: ConfirmationService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.formregistro = this.formBuilder.group({
        nombre: ["", [
            Validators.required,
        ]],
        correo: ["", [
            Validators.required,
            Validators.email
        ]],
        contraseña: ["", [
            Validators.required,
        ]],
    });
  }

  registrar() {
    const body = {
      "username": this.formregistro.value.nombre,
      "correo": this.formregistro.value.correo,
      "password": this.formregistro.value.contraseña
    }
    this.registroService.registrar(body).subscribe( (data) => {
      // this.createOrUpdateSuccess('actualizado');
      console.log(data);
      this.buildForm();
      this.messageService.add({severity:'success', summary: 'Bien', detail: 'Se ha Registrado exitosamente.', life: 1500});
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1500);
    });
  }

  volver() {
    this.location.back();
  }

}
