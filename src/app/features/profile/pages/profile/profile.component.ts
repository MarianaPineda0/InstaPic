import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../../auth/services/user.service';
import { PostsService } from '../../../posts/services/posts.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  uploadedUrl: string = '';
  userService: UserService
  postService: PostsService
  user;

  constructor(userService:UserService, postService:PostsService){
    this.userService = userService;
    this.postService = postService;
    this.user = this.userService.getUser();
  }

  onUpload(event:Event){
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Muestra el indicador de carga
      }
    });
    let inputFile = event.target as HTMLInputElement;
    if(!inputFile.files || inputFile.files.length <= 0){
      return;
    }
    const file:File = inputFile.files[0];
    const filename = uuidv4()
    this.postService.uploadFile(file, filename, this.user().userName, 'profile')
    .then(data => {
      this.uploadedUrl = data!;
      this.userService.saveGalleryItem({ id:filename, url:this.uploadedUrl, comments:[] }, this.user().userName);
      Swal.close();
      inputFile.value = '';
    }).catch(()=>{
      Swal.close();
        Swal.fire('Error', 'Ocurrió un error al cargar los datos', 'error');
    });
  }

}

