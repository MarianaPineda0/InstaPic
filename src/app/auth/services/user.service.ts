import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LoginResponse, SignUpResponse } from '../interfaces/login-response.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser = signal<User>({userName: '', password:''});

  login(userName:string, password:string):LoginResponse {

    const userStr =localStorage.getItem(userName.toLowerCase());

    if (!userStr) {
      return{
        success: false,
        message: 'Usuario o contraseña incorrecta'
      }
    }
   const user: User = JSON.parse(userStr);
   if (user.password !== password) {
     return{
        success: false,
        message: 'Usuario o contraseña incorrecta'
      }
    }
    this.setUser(user);
    return {success:true}
  }

  register(user: User): SignUpResponse{
    
    // Verificar existencia de usuario
    if(localStorage.getItem(user.userName.trim().toLowerCase())){
      return{
        success: false,
        message: 'Usuario ya existente'
      }
    }


    const userStr = JSON.stringify(user);

      // Guardar usuario en local storage
    localStorage.setItem(user.userName.trim().toLowerCase(), userStr);
    this.setUser(user);
    return {success:true}
  }

  private setUser(user:User){
    localStorage.setItem('userLogged', JSON.stringify(user));
    this.currentUser.set(user);
  }

  getUser(){
    if(!this.currentUser().userName){
      const userSrt = localStorage.getItem('userLogged')
      if(userSrt){
        const userLoged: User = JSON.parse(userSrt);
        this.currentUser.set(userLoged);
      }
    }
    return this.currentUser();
  }






}



