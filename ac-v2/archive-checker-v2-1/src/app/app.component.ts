import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {DataService} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'archive-checker-v2';
  author = 'skm';
  user : String
  
  getData(){
    this.data.getUsers(this.user).subscribe(c => {
      console.log(c);
    });
    console.log(this.user);  
  }

  constructor(private data:DataService){};

}
