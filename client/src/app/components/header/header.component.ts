import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  toggle_color:boolean=false;
  constructor() 
  {
    this.toggleHome()
   }

  ngOnInit(): void {
    
  }
  toggleHome(){
    if(!this.toggle_color)
    {
      this.toggle_color=!this.toggle_color;
    }
  }

  toggleFavorite(){
    if(this.toggle_color)
    {
      this.toggle_color=!this.toggle_color;
    }
  }

}
