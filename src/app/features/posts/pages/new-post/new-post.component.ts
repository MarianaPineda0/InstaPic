import { Component } from '@angular/core';
import { UserService } from '../../../../auth/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  


  uploadedUrl:string = '';
  user; 
  constructor(private postsService: PostsService, private userService: UserService){
    this.user = userService.getUser();
    this.postsService = postsService;
    this.userService = userService;
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
    
    const file:File = inputFile.files![0];
    const filename = uuidv4();


    this.postsService.uploadFile(file, filename, this.user().userName, 'instapic')
    .then (data =>{ 
      this.uploadedUrl=data!;
      this.userService.saveGalleryItem({id: filename, url:this.uploadedUrl, comments: []}, this.user().userName);
      Swal.close();
      inputFile.value = '';
    }).catch(()=>{
      Swal.close();
      Swal.fire('Error',  'Ocurrió un error al cargar los datos', 'error');

  });

  }

}
