import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TwitterserviceService } from 'src/app/services/twitterservice.service';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  tweetForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";



  constructor(
    private api: TwitterserviceService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {

    this.tweetForm = this.formBuilder.group({
      tweetdata: ['', Validators.required]
    })


  }

  get f() {return this.tweetForm.controls;}


 

  submitTweet(){
    this.api.tweet(this.tweetForm.value.tweetdata).subscribe();
  }

}
