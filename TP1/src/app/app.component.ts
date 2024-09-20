import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Album } from './models/Albums';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TP1';

  artist : string = "";
  ListAlbum : Album[] = [];
  ListChansons : string[] = [];

  constructor(public http : HttpClient){}

  async searchArtist():Promise<void>{

    let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=" + this.artist + "&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json"));
    console.log(x);
    this.ListAlbum = [];
    for(let i = 0; i < x.topalbums.album.length; i++){
      const albumData = x.topalbums.album[i]
      this.ListAlbum.push(new Album(albumData.name, albumData.artist.name, albumData.image[2]['#text']))
    }
  }

  newSearch():void{
    this.ListAlbum = []
    this.artist = ""
  }
}
