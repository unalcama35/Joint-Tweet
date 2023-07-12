import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TwitterserviceService } from 'src/app/services/twitterservice.service';
import { JointUser } from '../joint-tweet/jointUser';

@Component({
  selector: 'app-joint-users-tweet',
  templateUrl: './joint-users-tweet.component.html',
  styleUrls: ['./joint-users-tweet.component.css']
})
export class JointUsersTweetComponent implements OnInit {

  constructor(private api: TwitterserviceService,
    private formBuilder: FormBuilder) { }

  user1: string = 'unalscape'
  user2: string = 'denzov666'
  user3: string = 'yagizbetiin'
  delay: number = 800;
  jointUsers: JointUser[] = [];
  userTweets: any;
  newTweet: string = "";
  newWords: string[] = [];
  tweetForm: FormGroup;
  buttonClicked:boolean = false;
  loading:boolean = false;



  ngOnInit(): void {
    this.tweetForm = this.formBuilder.group({
      user1: ['', Validators.required],
      user2: ['', Validators.required],
      user3: ['', Validators.required]

    })

  }
  get f() { return this.tweetForm.controls; }

  submitSearch() {
    this.sleep(this.delay)
      .then(() => (

        this.interFunc()

      ))
      .then(() => this.sleep(this.delay))
      .then(() => (

        this.getJointTweet()
      ))
    
  }

  interFunc() {
    this.user1 = this.tweetForm.value.user1
    this.user2 = this.tweetForm.value.user2
    this.user3 = this.tweetForm.value.user3
    console.log("user1: " + this.user1 + " - user2: " + this.user2 + " - user3: " + this.user3)
    this.buttonClicked = true;
    this.loading=true;
  }
  getJointTweet() {
    console.log("button clicked")
    this.sleep(this.delay)
      .then(() => (

        this.api.sendJointHandle(this.user1).subscribe().unsubscribe()

      ))
      .then(() => this.sleep(this.delay))
      .then(() => (

        this.getTweetWord()

      ))
      .then(() => this.sleep(this.delay))
      .then(() => (

        this.api.sendJointHandle(this.user2).subscribe().unsubscribe()

      ))
      .then(() => this.sleep(this.delay))
      .then(() => (

        this.getTweetWord()

      ))

      .then(() => this.sleep(1600))
      .then(() => (

        this.api.sendJointHandle(this.user3).subscribe().unsubscribe()

      ))
      .then(() => this.sleep(this.delay))
      .then(() => (
        //here
        this.getTweetWord()

      ))
      .then(() => this.sleep(this.delay))
      .then(() => (

        this.newTweet = this.stringify(this.shuffle(this.newWords))


      ))
      .then(() => (

        this.loading=false


      )
      )




  }


  
  getTweetWord() {
    this.api.getUserTweets().subscribe(timeLine => {
      this.userTweets = timeLine;

      let tmpStr = (this.userTweets.data[this.getRandomInt(19)].full_text).split(" ") // split the tweet into words

      this.newWords.push(tmpStr[this.getRandomInt(tmpStr.length - 1)]) // get a random word

      tmpStr = (this.userTweets.data[this.getRandomInt(19)].full_text).split(" ")

      this.newWords.push(tmpStr[this.getRandomInt(tmpStr.length - 1)]) // get a random word

      tmpStr = (this.userTweets.data[this.getRandomInt(19)].full_text).split(" ")

      this.newWords.push(tmpStr[this.getRandomInt(tmpStr.length - 1)]) // get a random word


      console.log("GotTweetWord")
    })



  }




  getRandomInt(max: number) {
    return Math.floor(Math.random() * (max + 1))
  }


  sleep(milliseconds: number) {
    let resolve: { (): any; (value: unknown): void; } | any;
    let promise = new Promise((_resolve) => {
      resolve = _resolve;
    });
    setTimeout(() => resolve(), milliseconds);
    return promise;
  }



  shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }


    return array;
  }

  stringify(array: string[]) {
    return array.slice(0, array.length).join(' ') + " --- Mashed tweets of: @" + this.user1 + ", @" + this.user2 + ", @" + this.user3 + " -- Generated with 'OurJointTweet'"
  }







}
