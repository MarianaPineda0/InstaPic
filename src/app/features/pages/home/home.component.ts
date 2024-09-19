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
  
  
  currentUser;
  
  galleryItems = signal<GalleryItem[]>([
    {id:1, url:"/assets/images/gallery2.jpg", comments:[]},
    {id:2, url:"/assets/images/gallery3.jpg", comments:[]},
    {id:3, url:"/assets/images/gallery4.jpg", comments:[]},
    {id:4, url:"/assets/images/gallery5.jpg", comments:[]},
    {id:5, url:"/assets/images/gallery6.jpg", comments:[]},
    {id:6, url:"/assets/images/gallery7.jpg", comments:[]},
    {id:7, url:"/assets/images/gallery8.jpg", comments:[]},
    {id:8, url:"/assets/images/gallery9.jpeg", comments:[]},
    {id:9, url:"/assets/images/gallery10.jpg", comments:[]}
  ]);
  

  constructor(private userService: UserService){
      this.currentUser = this.userService.getUser(); 
  }

  onDelete(id:number){
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
        this.galleryItems.update(items=> items.filter(item=>item.id !== id));
      }
    });

  }

  onAddComment(event: Event, id: number) {
    const input = event.target as HTMLInputElement; //Otra forma de castear (as)
    const newComment = input.value;

    if(newComment){
      this.galleryItems.update(items=> {
        let selected = items.find(item=>item.id === id)
        selected!.comments = [...selected!.comments, newComment];
        return items;
      });
    }
    input.value='';
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
