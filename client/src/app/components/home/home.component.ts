import { Component, OnInit } from '@angular/core';
import { TwitterserviceService } from 'src/app/services/twitterservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api: TwitterserviceService) { }

  ngOnInit(): void {
  }



  signIn(){
    this.api.signIn().subscribe()
  }

}
