import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {DataService} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Archive checker v2';
  author = 'skm';
  user : String;
  allData = [];
  
  getData(){
    this.data.getUsers(this.user).subscribe(c => {
      console.log(c);
    });
    console.log(this.user);  
  }
        
  getAllData(){
    this.data.getAllUsers().subscribe(c=> {
      console.log(c);
      var d = c as Array<String>;
      this.data.getAllUsersMetadata(d).subscribe(d => {
        this.allData = this.allData.concat(d);
      });
    })
  }

  constructor(private data:DataService){
    this.allData = [];
    this.getAllData();
  };

}
