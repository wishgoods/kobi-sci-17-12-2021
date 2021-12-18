import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  @ViewChild(HeaderComponent) header_child?:HeaderComponent;
  
  constructor() { }

  ngOnInit(): void {

  }

}
