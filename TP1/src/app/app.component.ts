import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Album } from './models/Albums';
import { Song } from './models/Song';

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
  titre : string = "";
  ListAlbum : Album[] = [];
  ListChansons : string[] = [];

  constructor(public http : HttpClient){}

  async searchAlbum():Promise<void>{

    let x = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + this.artist + "&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json"));
    console.log(x);
    this.ListAlbum = [];
    for(let i = 0; i < x.topalbums.album.length; i++){
      const albumData = x.topalbums.album[i]
      this.ListAlbum.push(new Album(albumData.name, albumData.artist.name, albumData.image[2]['#text']))
    }
  }
  async GetSong(titreAlbum: string):Promise<void>{
    this.titre = titreAlbum
    let y = await lastValueFrom(this.http.get<any>("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=9a8a3facebbccaf363bb9fd68fa37abf&artist=" + this.artist + "&album=" + titreAlbum + "&format=json"));
    console.log(y);
    this.ListChansons = [];
    for(let i = 0; i < y.album.tracks.track.length; i++){
      this.ListChansons.push(y.album.tracks.track[i].name)
    }
  }

  newSearch():void{
    this.ListAlbum = []
    this.ListChansons = []
    this.artist = ""
  }
}
