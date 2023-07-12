import { Component, OnInit } from '@angular/core';
import { TwitterserviceService } from 'src/app/services/twitterservice.service';
import { Fav } from './fav';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit {

  constructor(private api: TwitterserviceService) { }

  favs: any;
  flag:boolean=false;
  delay:number=800;
  users: Fav[];
  currentUser:string;
  loading:boolean=false;
  notFoundError:boolean=false;
  privateError:boolean=false;
  userHandle:string="";
  userID:any;
  




  ngOnInit(): void {



    this.getLikedTweets();
  }

  getLikedTweets(): void {
    this.users = [];
    this.sleep(this.delay).then(()=>(
    this.api.getHandle().subscribe(id=>{
      console.log(id)
      this.currentUser=id.userHandle})))
      .then(() => this.sleep(this.delay))
      .then(() => (
    this.api.getFavs().subscribe(favs => {

      

      this.favs = favs;
      
      console.log(this.favs)
      
try {
  

    this.favs.data.forEach((tweet:any) => {
        let favObject = this.users.find(x => x.userID === tweet.user.id)
      
        if(favObject!= undefined)
        {
            favObject.incrementCount(tweet.id_str, tweet.created_at);
        } else {
          this.users.push( new Fav(tweet.user.name, tweet.user.id, (tweet.user.profile_image_url_https).replace("_normal",""), ("https://www.twitter.com/" +tweet.user.screen_name),tweet.id_str, tweet.created_at , (tweet.user.profile_banner_url)))
        }

      

    });
  } catch (error) {
      this.privateError=true;
  }

    this.users.sort((a, b) => a.count > b.count ? -1 : a.count < b.count ? 1 : 0)




    })

      )
      )
   

  }


  private async idStuff(){

    this.sleep(this.delay)
    .then(() => ( (this.api.sendHandle(this.userHandle))).subscribe())
    .then(() => this.sleep(this.delay))
    .then(() => ( (this.api.getID())).subscribe(id=>{
      this.userID = id;
     // console.log(this.userID.data.id_str)
      

    }))
    .then(() => this.sleep(this.delay))

    .then(()=>console.log(this.userID.data.id_str))
     .catch(err => 
       this.notFoundError=true

      
     ).then(()=> console.log(this.notFoundError))
    
    .then(() => this.sleep(this.delay))
    .then(() => this.api.sendID(this.userID).subscribe())
    .then(() => this.sleep(300))
    .then(()=> this.reloadit())
  

  // console.log(this.userID.data.id_str)

  }
  reloadit(){

    if(!this.notFoundError)
    {location.reload()}
   

  }
    sendID(){
  //  this.error=false;
    this.notFoundError=false;
    this.privateError=false;
    this.loading=true;
    this.idStuff();
    
  }

  
  sleep(milliseconds: number) {
    let resolve: { (): any; (value: unknown): void; } | any;
    let promise = new Promise((_resolve) => {
      resolve = _resolve;
    });
    setTimeout(() => resolve(), milliseconds);
    return promise;
  }

}
