import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  server_apiUrl = "http://localhost:3000/"
  favorites:any[]=[]
  constructor(private http:HttpClient) { 
  
  }

  ngOnInit(): void {
 
    this.http.get(this.server_apiUrl+"getAllFavorites",{responseType:'json'}).subscribe(result=>{
      let fav :any= result
      this.favorites = fav['data']['favorites']
  });
 
 
 
  }
  ngAfterViewInit() {

  }
}
