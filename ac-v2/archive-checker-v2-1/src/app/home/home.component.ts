import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'archive-checker-v2';
  author = 'skm';
  user : String
  
  
  constructor() { }

  ngOnInit() {
  }

  getData(){
    console.log(this.user);  
  }

}
