import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TP1';
  
  result = false;

  artist : string = "";
  ListAlbum : string[] = [];

  constructor(public http : HttpClient){}

  async searchArtist():Promise<void>{
    this.result = true;

    let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=" + this.artist + "&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json"));
    console.log(x);
    this.ListAlbum = [];
    this.ListAlbum.push(x.topalbums.titre)
  }

  newSearch():void{
    this.result = false;
  }
}
