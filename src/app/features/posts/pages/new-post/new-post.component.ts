import { Component } from '@angular/core';
import { UserService } from '../../../../auth/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  user; 
  constructor(private postsService: PostsService, private userService: UserService){
    this.user = userService.getUser();

  }

  onUpload(event:Event){
    const fileName = uuidv4();
    console.log(event);
    const input = event.target as HTMLInputElement;
    if(input.files!.length <= 0){
      return;
    }
    const file:File = input.files![0];
    this.postsService.uploadFile(file, this.user().userName, fileName);
  }
}
