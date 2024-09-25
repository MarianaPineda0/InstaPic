import { Component, signal } from '@angular/core';
import {RouterLink} from '@angular/router';
import { UserService } from '../../../auth/services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { GalleryItem } from '../../interfaces/gallery-item.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  followers = 5;
  requests: number = 250; // redundante, si se le asigna valor de una, no poner tipo
  profilePhoto = ''
  
  user;
  
  galleryItems = signal<GalleryItem[]>([]);
  

  constructor(private userService: UserService){
      this.user = userService.getUser();
      this.galleryItems.set(this.userService.getGallery(this.user().userName));
  }

  onDelete(id:string){
    Swal.fire({
      title: "¿Está seguro de que desea eliminar la imagen?",
      icon: "warning",
      iconColor: "#219ebc",
      showCancelButton: true,
      confirmButtonColor: "#023047",
      cancelButtonColor: "#d00000",
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Imagen eliminada', '', 'success')
        this.galleryItems.update(items=> items.filter(item=>item.id !== id));
        this.userService.updateGalleryItem(this.galleryItems(), this.user().userName)
      }else if (result.isDismissed) {
        Swal.fire('Operación cancelada', '', 'info')
      }
    });

  }

 
  onAddComment(event: Event, id:string){
    const input = event.target as HTMLInputElement
    if(!input.value){
      return;
    }
    this.galleryItems.update(items => {
      let selected = items.find(item => item.id === id)
      if (selected){
        selected!.comments = [...selected!.comments, input.value]
      }
      return items
    })
    this.userService.updateGalleryItem(this.galleryItems(),this.user().userName)
    input.value = ''
  }

  onViewComments(comments:string[]){
    let htmlText = 'Aún no hay comentarios';
    if(comments.length > 0){
      htmlText = '<div>'
      comments.forEach(comment => {
        htmlText += `<p>${comment}</p>`;
      });
      htmlText += '</div>';
    }
    Swal.fire({
      html: htmlText
    })

  }

}
