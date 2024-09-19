import { Routes } from '@angular/router';
import { LoginComponent } from "./auth/pages/login/login.component";
import { HomeComponent } from "./features/pages/home/home.component";
import { SignUpComponent } from "./auth/pages/sign-up/sign-up.component";
import { NewPostComponent } from './features/posts/pages/new-post/new-post.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent} ,
    {path: 'sign-up', component: SignUpComponent},
    {path: 'home', component: HomeComponent},
    {path: 'new-post', component: NewPostComponent},
    {path:'', redirectTo: 'login', pathMatch: 'full'},
    {path:'**', redirectTo: 'login', pathMatch: 'full'},
];
