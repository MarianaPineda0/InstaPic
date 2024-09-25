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

  async uploadFile(file: File, fileName: string, folderName: string='base', bucket: string){
    
    const { error } = await this.supabase.storage.from(bucket).upload(`${folderName}/${fileName}`, file)
   
    if (error) {
      console.log(error)
      throw error;
    }
    const { data} = await this.supabase.storage.from(bucket).getPublicUrl(`${folderName}/${fileName}`)
    return data.publicUrl;
  }
    
}
    
    

   
