import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private supabase: SupabaseClient;

  constructor() { 
    this.supabase = createClient(
      environment.supabaseConfig.url,
      environment.supabaseConfig.apikey);
  }

  async uploadFile(file: File, userName: string, fileName: string){
    file.name;
    
    const { data, error } = await this.supabase.storage.from('instapic').upload(`${userName}/${fileName}`, file)
    if (error) {
      console.log(error)
      // Handle error;
    }else{
    // Handle success;
      console.log("data: " + data.fullPath);
    }

    //const resp  = await this.supabase.storage.from('instapic').getPublicUrl(`${userName}/${fileName}`);
  }
}
