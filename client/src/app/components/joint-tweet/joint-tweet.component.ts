import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TwitterserviceService } from 'src/app/services/twitterservice.service';
import { Fav } from '../favs/fav';
import { JointUser } from './jointUser';

@Component({
  selector: 'app-joint-tweet',
  templateUrl: './joint-tweet.component.html',
  styleUrls: ['./joint-tweet.component.css']
})
export class JointTweetComponent implements OnInit {

  constructor(private api: TwitterserviceService) { }

  ngOnInit(): void {
    //  this.getTwitterMents()


    this.getTweets()
  }

  favs: any;
  flag: boolean = false;
  delay: number = 800;
  users: JointUser[] = [];
  jointUsers: JointUser[] = [];
  numbers: number[] = [];

  currentUser: string;
  loading: boolean = true;
  error: boolean = false;
  userHandle: string = "";
  userID: any;
  mentLine: any;
  userTweets:any;
  newTweet:string="";
  newWords: string[] = [];
  subLoading:boolean=false;

  tweetSub:any;
  buttonDisable:boolean=false;





  getTweets(): void {
    this.jointUsers=[];
    this.numbers=[];
    this.users = [];
    this.sleep(this.delay)
      .then(() => ((this.api.sendHandle("unalscape"))).subscribe())
      .then(() => this.sleep(this.delay))
      .then(() => ((this.api.getID())).subscribe(id => {
        this.userID = id;
        console.log("The user ID: " + this.userID)


      }))
      .then(() => this.sleep(this.delay*2))


      .then(() => (
        this.api.sendID(this.userID).subscribe()))
      .then(() => this.sleep(this.delay))
      .then(() => (
        this.api.getHandle().subscribe(id => {
          console.log(id)
          this.currentUser = id.userHandle
        })))
      .then(() => this.sleep(this.delay))
      .then(() => (
        this.api.getFavs().subscribe(favs => {



          this.favs = favs;

          console.log(this.favs)


          this.favs.data.forEach((tweet: any) => {
            let favObject = this.users.find(x => x.userID === tweet.user.id)

            if (favObject != undefined) {
              favObject.incrementCount(tweet.id_str, tweet.created_at);
            } else {
              this.users.push(new JointUser(tweet.user.name, tweet.user.id, (tweet.user.profile_image_url_https).replace("_normal", ""), ("https://www.twitter.com/" + tweet.user.screen_name), tweet.id_str, tweet.created_at, (tweet.user.profile_banner_url), true, tweet.user.screen_name))
            }



          });





        })

      ))
      .then(() => this.sleep(this.delay))
      .then(() => (
        this.api.getMents().subscribe(mentLine => {


          this.mentLine = mentLine;
          console.log(this.mentLine)


          this.mentLine.data.forEach((tweet: any) => {
            let jointObject = this.users.find(x => x.userID === tweet.user.id)

            if (jointObject != undefined) {
              jointObject.incrementMentsCount(tweet.id_str, tweet.created_at);
            } else {
              this.users.push(new JointUser(tweet.user.name, tweet.user.id, (tweet.user.profile_image_url_https).replace("_normal", ""), ("https://www.twitter.com/" + tweet.user.screen_name), tweet.id_str, tweet.created_at, (tweet.user.profile_banner_url), false, tweet.user.screen_name))
            }
            this.users.sort((a, b) => a.points > b.points ? -1 : a.points < b.points ? 1 : 0)




          })

        })


      ))
      // .then(() => this.sleep(this.delay))
      // .then(() => (




      // ))
      .then(() => this.sleep(this.delay))
      .then(() => (


        this.doTheMath()


      ))
      .then(() => this.sleep(this.delay))
      .then(() => (


        this.trimArray()

      ))
      .then(() => this.sleep(this.delay))
      .then(() => (


        this.loading = false

      ))




  }

  buttonPress(){
    location.reload();
  }

  getJointTweet(){
    console.log("button clicked")
    this.buttonDisable=true;
    this.subLoading=true;
    this.sleep(this.delay)

    
    .then(() => this.sleep(this.delay))

    .then(()=>(

      this.api.sendJointHandle(this.jointUsers[0].screen_name).subscribe().unsubscribe()

    ))
    .then(() => this.sleep(this.delay))
    .then(()=>(

      this.getTweetWord()

    ))
    .then(() => this.sleep(this.delay))
    .then(()=>(

      this.api.sendJointHandle(this.jointUsers[1].screen_name).subscribe().unsubscribe()

    ))
    .then(() => this.sleep(this.delay))
    .then(()=>(

      this.getTweetWord()

    ))
    
    .then(() => this.sleep(1600))
    .then(()=>(

      this.api.sendJointHandle(this.jointUsers[2].screen_name).subscribe().unsubscribe()

    ))
    .then(() => this.sleep(this.delay))
    .then(()=>(
//here
      this.getTweetWord()

    ))
    .then(() => this.sleep(this.delay))
    .then(()=>(

      this.api.sendJointHandle(this.jointUsers[3].screen_name).subscribe()

    ))
    .then(() => this.sleep(this.delay))
    .then(()=>(

      this.getTweetWord()

    ))
    .then(() => this.sleep(this.delay))
    .then(()=>(

      this.api.sendJointHandle(this.jointUsers[4].screen_name).subscribe()

    ))
    .then(() => this.sleep(this.delay))
    .then(()=>(

      this.getTweetWord()

    ))
    .then(() => this.sleep(this.delay))
    .then(()=>(

      this.newTweet= this.stringify(this.shuffle(this.newWords))


    ))
    .then(()=>(

      this.subLoading=false


    ))
    


    
  }

  getTweetWord(){
    this.tweetSub =  this.api.getUserTweets().subscribe(timeLine=>{
      this.userTweets = timeLine;
      
      let tmpStr = (this.userTweets.data[this.getRandomInt(19)].full_text).split(" ") // split the tweet into words

      this.newWords.push(tmpStr[this.getRandomInt(tmpStr.length-1)]) // get a random word
      
      tmpStr = (this.userTweets.data[this.getRandomInt(19)].full_text).split(" ")

      this.newWords.push(tmpStr[this.getRandomInt(tmpStr.length-1)]) // get a random word


     console.log(this.newTweet)
    })


    
  }

  doTheMath() {
    
    console.log(this.users)
    for (let index = 0; index < 5; index++) {
      let x = this.getRandomInt(9)
      if (this.numbers.indexOf(x) == -1) {
        this.numbers.push(x)

      }
      else {
        index = index - 1
      }
    }

   
  }

  postTweet(){

    this.api.tweet(this.newTweet).subscribe();

  }

  trimArray(){
    this.numbers.forEach(index => {
      this.jointUsers.push(this.users[index])
    });
    console.log(this.numbers);
      console.log(this.jointUsers)

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



  shuffle(array:string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }


    return array;
}

stringify(array:string[]){
 return array.slice(0, array.length).join(' ') + " --- Mashed tweets of: @" + this.jointUsers[0].screen_name + ", @" + this.jointUsers[1].screen_name + ", @" +  this.jointUsers[2].screen_name + ", @" +  this.jointUsers[3].screen_name + ", @" +  this.jointUsers[4].screen_name + " -- Generated with 'OurJointTweet'"
}


}
