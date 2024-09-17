import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: User = {
    userName: '',
    password: ''
  };

  loginForm = this.fb.group({
    userName:['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    password:['', [Validators.required]]
  });

  constructor(private fb:FormBuilder, private router:Router, private userService:UserService){

  }

  onLogin(){
    
    let userName = this.loginForm.value.userName;
    let password = this.loginForm.value.password;
  
    
    if (!userName || !password){
      Swal.fire({
        title: "Iniciar sesión",
        text: "Por favor complete todos los campos correctamente",
        icon: "error",
    });
    return;
    }
  

    const response = this.userService.login(userName, password);

    if (response.success){
      this.router.navigateByUrl('/home');
    }else{
      Swal.fire({
        title: "Iniciar sesión",
        text: response.message,
        icon: "error"
      });
    }



    /*
    const storedPassword =localStorage.getItem(userName.toLowerCase());

    if (storedPassword === null){
      Swal.fire({
        title: "Iniciar sesión",
        text: "Usuario no registrado",
        icon: "error",
    });
      return;
    }else if(storedPassword === password){

      Swal.fire({
        title: "Iniciar sesión",
        text: "Inicio de sesión exitoso",
        icon: "success",
    });
      this.router.navigateByUrl('/home');
    }else{
      Swal.fire({
        title: "Iniciar sesión",
        text: "Contraseña incorrecta",
        icon: "error",
    });

    */

    }




}




