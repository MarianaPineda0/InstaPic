import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpForm = this.fb.group({
    userName: ['',[Validators.required, Validators.minLength(7), Validators.maxLength(15)]], 
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
    rePassword: ['',[Validators.required]]
  } );

  userService = new UserService();

  constructor(private fb:FormBuilder, private router:Router){

  }


  onRegister(){
    
    if(!this.signUpForm.valid){
      Swal.fire({
          title: "Registrar usuario",
          text: "Por favor, complete todos los campos",
          icon: "error",
      });
      return;
    }
    
    const userName = this.signUpForm.value.userName;
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const rePassword = this.signUpForm.value.rePassword;

    // Verificación password y repassword
    if(password !== rePassword){
      alert('Las contraseñas no coinciden');
      return;
    }


    // Para hacer uso del servicio
    const response = this.userService.register({userName: userName!, password: password!, email: email!});

    if (response.success){
      this.router.navigateByUrl('/home');
    }else{
      Swal.fire({
        text: "Por favor, complete todos los campos",
        icon: "info"
      
      });
    }

  }

}
