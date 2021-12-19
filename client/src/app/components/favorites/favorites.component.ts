import { HttpClient, HttpParams } from '@angular/common/http';
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
    this.getFromApi()
 
 
}
  removeFromFavorites(fav:any){
    
    this.http.put(this.server_apiUrl+'removeFromFavorites',fav).subscribe((result: any) => {
      this.getFromApi()
    });
 
  }
  getFromApi(){
    this.http.get(this.server_apiUrl+"getAllFavorites",{responseType:'json'}).subscribe(result=>{
      let fav :any= result
      this.favorites = fav['data']['favorites']
  });
  }
  ngAfterViewInit() {

  }
}
