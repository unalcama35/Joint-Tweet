import { Component, OnInit } from '@angular/core';
import { TwitterserviceService } from 'src/app/services/twitterservice.service';

@Component({
  selector: 'app-twitter-timeline',
  templateUrl: './twitter-timeline.component.html',
  styleUrls: ['./twitter-timeline.component.css']

})
export class TwitterTimelineComponent implements OnInit {


timeLine: any;

  constructor(private api: TwitterserviceService) { }

  ngOnInit(): void {
    this.getTwitterTimeline();
  }

  getTwitterTimeline(): void{
    this.api.getTimeline().subscribe(timeLine=>{
      this.timeLine = timeLine;
      console.log(this.timeLine)
    })

  }

}
