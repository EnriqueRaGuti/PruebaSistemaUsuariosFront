import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class HomeComponent implements OnInit {

  usuarios = [];
  formDialog = false;
  formActualizaRegistro!: FormGroup;
  id = 0;

  constructor(private homeService: HomeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder, 
    private location: Location) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.buildForm();
  }

  obtenerUsuarios() {
    this.homeService.usuarios().subscribe( (data:any) => {
      this.usuarios = data;
    });
  }

  deleteProduct(usuario:any) {
    this.confirmationService.confirm({
        message: 'Esta seguro que quiere eliminar este usuario?',
        acceptLabel: "Aceptar",
        rejectLabel: "Cancelar",
        accept: () => {
            this.homeService.eliminarUsuario(usuario.id).then ( ()=> {
                this.messageService.add({severity:'success', summary: 'Bien', detail: 'Usuario eliminado con exito', life: 2000});
                this.obtenerUsuarios();
            });
        }
    });
  }

  editProduct(usuario: any) {
    this.id = usuario.id;
    this.formActualizaRegistro.patchValue(
        {   
          nombre: usuario.username,
          correo: usuario.correo,
          contraseña: usuario.password
        });
        usuario
    this.formDialog = true;
  }

  private buildForm(): void {
    this.formActualizaRegistro = this.formBuilder.group({
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

  seCerroELdialog() {

  }

  hideDialog() {
    this.formDialog = false;
}

saveProduct() {
  const usuario = {
    "username": this.formActualizaRegistro.value.nombre,
    "correo": this.formActualizaRegistro.value.correo,
    "password": this.formActualizaRegistro.value.contraseña
  }
  console.log(this.id);
  
  this.homeService.actualizarUsuario(this.id, usuario).then( () => {
    this.actualizado('actualizado');
  }).catch( resp => {
    console.log(resp);
    
  });
  
}

actualizado(messageType: string) {
  this.formDialog = false;
  this.messageService.add({severity:'success', summary: 'Bien', detail: 'Usuario '+ messageType + ' con exito', life: 2000});
  this.obtenerUsuarios();
}

volver() {
  this.location.back();
}

}
