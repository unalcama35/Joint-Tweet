import { Component, OnInit } from '@angular/core';
import { TwitterserviceService } from 'src/app/services/twitterservice.service';

@Component({
  selector: 'app-twitter-ments',
  templateUrl: './twitter-ments.component.html',
  styleUrls: ['./twitter-ments.component.css']
})
export class TwitterMentsComponent implements OnInit {

  mentLine: any;


  constructor(private api: TwitterserviceService) { }

  ngOnInit(): void {

    this.getTwitterMents();

  }

  getTwitterMents(): void{
    this.api.getMents().subscribe(mentLine=>{
      this.mentLine = mentLine;
      console.log(this.mentLine)
    })

  }


}
